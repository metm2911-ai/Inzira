"""Build the runtime question bundle from the parsed JSON.

Reads
    data/questions.rw.json   the machine-parsed bank
    data/overrides.json      optional human edits (see below)
Writes
    data/bank.js             window.INZIRA_BANK
    data/precache.js         self.INZIRA_PRECACHE (image list for the service worker)

Only records with status == "verified" are shipped, unless an override makes a
record usable. Overrides are applied *after* parsing, so re-running
tools/parse_questions.py never destroys a human edit.

data/overrides.json shape (all keys optional):

{
  "patch": {
    "RW-0194": {
      "answer": "b",                 // correct option letter
      "question": "fixed wording",   // replace the question text
      "options": ["a", "b", "c", "d"],   // replace all options
      "topic": "signs",              // override the auto-topic
      "image": "assets/q/224.png",   // attach an image path, "" clears it
      "imageData": "data:image/png;base64,...",  // OR an uploaded image, which
                                     // is written to assets/q/<id>.png
      "explanation": "why it is right"
    }
  },
  "hide": ["RW-0360"],               // drop these ids from the app
  "add": [
    {
      "id": "NEW-001",
      "topic": "signs",
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "answer": 0,                   // 0-based index, or "a"
      "image": "assets/q/999.png",   // optional path
      "imageData": "data:image/...", // optional uploaded image
      "explanation": "..."           // optional
    }
  ]
}
"""

import base64
import json
from collections import Counter
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "data" / "questions.rw.json"
OVERRIDES = ROOT / "data" / "overrides.json"
OUT = ROOT / "data" / "bank.js"
PRECACHE = ROOT / "data" / "precache.js"
IMG_DIR = ROOT / "assets" / "q"

# An image narrower than this cannot be sharp on a modern phone screen and
# should be replaced (see INZIRA-VERCEL-DEPLOYMENT-READINESS.md, Part A).
SOFT_IMAGE_PX = 160

# Kinyarwanda keyword rules, checked in order (first match wins).
RULES = [
    ("signs", ("cyapa", "kimenyetso", "bimenyetso", "ibyapa", "ishusho", "kaga", "ibara ry")),
    ("lights", ("amatara", "urumuri", "utugarurarumuri", "icyatsi", "umuhondo", "feux", "phare")),
    ("docs", ("uruhushya", "isuzuma", "visite", "ubwishingizi", "assurance", "ikarita iranga", "carte grise", "pane", "toni ", "uburemere")),
    ("speed", ("umuvuduko", "km/h", "ibirometero", "kwihuta", "umuvuduko ntarengwa")),
    ("priority", ("isangano", "uburenganzira", "gutambuka mbere", "kunyuranaho", "inyuranaho", "guhindukira", "kata i", "umurongo", "inzira nyabagendwa", "iburyo", "ibumoso")),
]

LETTERS = "abcd"


def topic_of(text: str) -> str:
    t = text.lower()
    for topic, keys in RULES:
        if any(k in t for k in keys):
            return topic
    return "safety"


def load_overrides():
    if not OVERRIDES.exists():
        return {}, set(), []
    data = json.loads(OVERRIDES.read_text(encoding="utf-8"))
    return data.get("patch", {}), set(data.get("hide", [])), data.get("add", [])


def option_texts(options):
    """Accept ["text", ...] or [{"letter": "a", "text": "..."}, ...]."""
    out = []
    for o in options:
        if isinstance(o, str):
            out.append(o)
        elif isinstance(o, dict):
            out.append(o.get("text", ""))
    return [t.strip() for t in out if t and t.strip()]


def materialize_image(qid, data_url):
    """Write a data-URL image to assets/q/ and return its relative path.

    The review page has no server to upload to, so it embeds the chosen file as
    a data URL in overrides.json. This turns it back into a real file.
    """
    if not isinstance(data_url, str) or "," not in data_url or ";base64" not in data_url:
        return None
    header, b64 = data_url.split(",", 1)
    subtype = header.split("/", 1)[1].split(";", 1)[0].strip().lower() if "/" in header else "png"
    ext = {"jpeg": "jpg", "svg+xml": "svg", "x-icon": "ico"}.get(subtype, subtype)
    if ext not in ("png", "jpg", "webp", "gif", "svg", "avif"):
        ext = "png"
    try:
        raw = base64.b64decode(b64)
    except Exception as exc:  # noqa: BLE001
        print(f"warning: could not decode image for {qid}: {exc}")
        return None
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    name = f"{qid}.{ext}"
    (IMG_DIR / name).write_bytes(raw)
    return f"assets/q/{name}"


def build_question(qid, question, option_list, answer, topic, image, explanation):
    if len(option_list) < 2 or not question.strip():
        return None
    # answer may be a 0-based index or a letter.
    if isinstance(answer, int):
        index = answer
    elif isinstance(answer, str) and answer.lower() in LETTERS:
        index = LETTERS.index(answer.lower())
    else:
        return None
    if index < 0 or index >= len(option_list):
        return None
    q = {
        "id": qid,
        "q": question.strip(),
        "o": option_list,
        "a": index,
        "t": topic or topic_of(question),
    }
    if image:
        q["img"] = image
    if explanation:
        q["e"] = explanation.strip()
    return q


def audit_images(questions, native_by_id):
    """Report images that are too small to look sharp, and return the full list.

    Flags the picture's *source* resolution (the hard ceiling), so images that
    were merely upscaled at render time are still caught. The returned list (in
    page order) is what the service worker pre-caches for offline use.
    """
    try:
        from PIL import Image
    except Exception:  # noqa: BLE001
        Image = None

    images = []
    soft = []
    for q in questions:
        path = q.get("img")
        if not path or path in images:
            continue
        images.append(path)
        width = native_by_id.get(q["id"])
        if width is None and Image is not None:
            try:
                width = Image.open(ROOT / path).width
            except Exception:  # noqa: BLE001
                print(f"warning: missing image file for {q['id']}: {path}")
                continue
        if width is not None and width < SOFT_IMAGE_PX:
            soft.append((q["id"], path, width))

    print(f"images in bundle: {len(images)}")
    if soft:
        print(f"soft images (<{SOFT_IMAGE_PX}px source) - replace these: {len(soft)}")
        for qid, path, width in soft:
            print(f"  {qid}  {path}  {width}px")
    return images


def write_precache(images):
    PRECACHE.write_text(
        "/* Generated by tools/build_data.py - do not edit by hand. */\n"
        "self.INZIRA_PRECACHE = "
        + json.dumps(images, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    print(f"wrote {PRECACHE.name}: {len(images)} images to pre-cache")


def main():
    records = json.loads(SRC.read_text(encoding="utf-8"))
    patch, hidden, added = load_overrides()

    questions = []
    used_ids = set()

    for r in records:
        qid = r["id"]
        if qid in hidden or qid in used_ids:
            continue
        p = patch.get(qid, {})

        question = p.get("question", r["question"])
        options = option_texts(p["options"]) if "options" in p else option_texts(r["options"])
        answer = p.get("answer", r["answer"])
        topic = p.get("topic") or None
        explanation = p.get("explanation", r.get("explanation"))
        if p.get("imageData"):
            image = materialize_image(qid, p["imageData"])
        elif "image" in p:
            image = p["image"] or None
        else:
            image = r.get("image")

        # Ship verified records; a patch can promote an unusable one.
        if r["status"] != "verified" and not p:
            continue

        q = build_question(qid, question, options, answer, topic, image, explanation)
        if q is None and not p:
            continue
        if q is None:
            print(f"warning: override for {qid} is still incomplete, skipped")
            continue
        questions.append(q)
        used_ids.add(qid)

    for a in added:
        qid = a.get("id", f"NEW-{len(used_ids) + 1:03d}")
        image = materialize_image(qid, a["imageData"]) if a.get("imageData") else a.get("image")
        q = build_question(
            qid,
            a.get("question", ""),
            option_texts(a.get("options", [])),
            a.get("answer"),
            a.get("topic"),
            image,
            a.get("explanation"),
        )
        if q is None:
            print(f"warning: added question {a.get('id')} is incomplete, skipped")
            continue
        if q["id"] in used_ids:
            print(f"warning: added id {q['id']} already exists, skipped")
            continue
        questions.append(q)
        used_ids.add(q["id"])

    payload = {
        "version": "0.12.0-pilot",
        "updated": date.today().isoformat(),
        "language": "rw",
        "count": len(questions),
        "questions": questions,
    }
    OUT.write_text(
        "/* Generated by tools/build_data.py - do not edit by hand. */\n"
        "window.INZIRA_BANK = "
        + json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    print(f"wrote {OUT.name}: {len(questions)} questions")
    print("topics:", dict(Counter(q["t"] for q in questions)))
    if patch or hidden or added:
        print(f"overrides applied: {len(patch)} patched, {len(hidden)} hidden, {len(added)} added")
    native_by_id = {r["id"]: r.get("image_native") for r in records}
    write_precache(audit_images(questions, native_by_id))


if __name__ == "__main__":
    main()
