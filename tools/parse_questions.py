"""Parse the RNP-style Kinyarwanda question bank PDF into structured JSON.

The PDF marks the correct option in three different ways depending on the page:
  * bold font
  * red text
  * parentheses around the letter, e.g. "(c.)"
An earlier text-only pass missed all three, which is why the bank looked
incomplete. This parser reads characters with pdfplumber (font, colour, position)
so every marking style is detected, and it also extracts the sign images that
belong to the picture questions.

Input : C:\\Users\\User\\Downloads\\questions-1.pdf
Output: data/questions.rw.json, data/parse_report.txt, assets/q/*.png
"""

import json
import re
from collections import Counter
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
PDF = Path(r"C:\Users\User\Downloads\questions-1.pdf")
OUT = ROOT / "data" / "questions.rw.json"
REPORT = ROOT / "data" / "parse_report.txt"
IMG_DIR = ROOT / "assets" / "q"

QUESTION_RE = re.compile(r"^\s*(\d{1,3})\s*\.\s*(.*)$")
# A few questions run the number straight into the text, e.g.
# "225Wegereye inzira y'abanyamaguru ...".
QUESTION_TIGHT_RE = re.compile(r"^\s*(\d{1,3})(?=[A-Z])(.*)$")
OPTION_RE = re.compile(
    r"^\s*(?:\(\s*([a-dA-D])\s*[.)]?\s*\)|([a-dA-D])\s*[\).])\s*(.*)$"
)
INLINE_OPTION_RE = re.compile(r"(?<=\s)(?=\(\s*[a-dA-D]\s*[.)]?\s*\))")

# Only explicit "look at this picture" wording. Generic verbs such as
# "cyerekana" / "kivuga" describe signs in words and are not picture questions.
IMAGE_HINTS = (
    "iyi shusho", "iyi foto", "reba ifoto", "reba iyi", "muri ibi binyabiziga",
    "kuri iki cyapa", "kuri iyi", "kuri izi", "aha niki",
    "aha umuyobozi", "aha washobora", "aha hashobora", "ni ikihe cyapa",
    "ni ikihe kimenyetso", "iyi kamyo", "izi kamyo", "aka kaga", "ako kaga",
    "iyi modoka", "izi modoka", "bikozwe mu yihe shusho", "bikozwe muyihe shusho",
    "gikoze mw'ishusho", "gikoze mu ishusho", "aha hantu",
)

LINE_TOLERANCE = 2.2


def clean(text: str) -> str:
    text = text.replace("\ufffd", "'").replace("\u00a0", " ")
    text = text.replace("\u2019", "'").replace("\u2018", "'")
    text = text.replace("\u201c", '"').replace("\u201d", '"')
    text = text.replace("\u2013", "-").replace("\u2014", "-")
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    text = re.sub(r"\(\s+", "(", text)
    text = re.sub(r"\s+\)", ")", text)
    return text


def is_red(color):
    if not color:
        return False
    if isinstance(color, (int, float)):
        return False
    try:
        vals = tuple(float(c) for c in color)
    except (TypeError, ValueError):
        return False
    if len(vals) == 1:
        return vals[0] >= 0.55  # grayscale: dark red renders as mid grey
    if len(vals) == 3:
        r, g, b = vals
        return r >= 0.55 and g <= 0.45 and b <= 0.45
    if len(vals) == 4:  # CMYK
        c, m, y, k = vals
        return m >= 0.5 and y <= 0.6 and c <= 0.4 and k <= 0.4
    return False


def page_lines(page, page_no):
    chars = [c for c in page.chars if c.get("text", "").strip()]
    if not chars:
        return []
    chars.sort(key=lambda c: (round(c["top"], 1), c["x0"]))

    groups = []
    for c in chars:
        if groups and abs(c["top"] - groups[-1][0]) <= LINE_TOLERANCE:
            groups[-1][1].append(c)
        else:
            groups.append([c["top"], [c]])

    lines = []
    for top, row in groups:
        row.sort(key=lambda c: c["x0"])
        text = ""
        flags = []  # (bold, red) per character
        prev = None
        for c in row:
            # pdfplumber does not emit space glyphs, so rebuild them from the
            # horizontal gap between characters.
            if prev is not None:
                gap = c["x0"] - prev["x1"]
                threshold = max(0.9, 0.16 * float(c.get("size") or 12))
                if gap > threshold:
                    text += " "
                    flags.append((False, False))
            ch = c["text"]
            bold = "Bold" in str(c.get("fontname", ""))
            red = is_red(c.get("non_stroking_color"))
            text += ch
            flags.extend([(bold, red)] * len(ch))
            prev = c

        stripped = text.strip()
        if not stripped or re.fullmatch(r"\d{1,3}", stripped) or stripped == "RESTRICTED":
            continue

        # Leading marker weight (ignoring spaces).
        lead = 0
        lead_red = 0
        for ch, (b, r) in zip(text, flags):
            if ch.isspace():
                continue
            if b or r:
                lead += 1
                if r:
                    lead_red += 1
            else:
                break

        lines.append({
            "text": clean(text),
            "lead_bold": lead,
            "lead_red": lead_red,
            "page": page_no,
            "top": round(top, 1),
        })
    return lines


def parse(lines):
    expanded = []
    for ln in lines:
        parts = INLINE_OPTION_RE.split(ln["text"])
        if len(parts) > 1:
            for i, part in enumerate(parts):
                expanded.append({**ln, "text": part, "top": ln["top"] + i * 0.1})
        else:
            expanded.append(ln)
    lines = expanded

    questions = []
    current = None
    option = None
    last_number = 0

    def close_option():
        nonlocal option
        if current is not None and option is not None:
            option["text"] = clean(option["text"])
            if option["text"] or option.get("paren"):
                current["options"].append(option)
            option = None

    def close_question():
        nonlocal current
        if current is not None:
            close_option()
            current["question"] = clean(current["question"])
            questions.append(current)
            current = None

    for ln in lines:
        text = ln["text"]
        qm = QUESTION_RE.match(text) or QUESTION_TIGHT_RE.match(text)
        if qm:
            number = int(qm.group(1))
            body = qm.group(2).strip()
            # Page furniture and wrapped continuation lines occasionally look
            # like question starts ("156. kuk", "159. yasinzira yakora iki?").
            # A backwards jump of more than 25 items is page junk unless the
            # text clearly starts a question; short bodies are always junk.
            previous = current["source_number"] if current is not None else 0
            backwards_junk = number < previous - 25
            starts_like_question = bool(body) and (
                body[0].isupper() or body[0].isdigit() or body[0] in "\"'([«"
            )
            if len(body) < 4 or (backwards_junk and not starts_like_question):
                if current is not None and len(body) > 3:
                    current["question"] += " " + body
                continue
            close_question()
            last_number = number
            current = {
                "source_number": number,
                "question": body,
                "options": [],
                "page": ln["page"],
                "top": ln["top"],
            }
            continue

        if current is None:
            continue

        om = OPTION_RE.match(text)
        if om:
            close_option()
            marker_len = len(om.group(0)) - len(om.group(3))
            option = {
                "letter": (om.group(1) or om.group(2)).lower(),
                "text": om.group(3),
                "paren": bool(om.group(1)),
                "bold": ln["lead_bold"] >= max(1, marker_len - 1),
                "red": ln["lead_red"] >= max(1, marker_len - 1),
                "page": ln["page"],
                "top": ln["top"],
            }
            continue

        if option is not None:
            option["text"] += " " + text
            option["bold"] = option["bold"] or ln["lead_bold"] > 0
            option["red"] = option["red"] or ln["lead_red"] > 0
        else:
            current["question"] += " " + text

    close_question()
    return questions


def normalise_options(options):
    """Keep option lines in document order and re-letter them a, b, c, d.

    The source PDF frequently mislabels option letters (a repeated twice, b
    skipped, c used for the answer and again for an option). Document order is
    the only reliable signal, so letters are assigned from position instead.
    """
    ordered = []
    for o in options:
        text = clean(o["text"])
        if not text and not o.get("paren"):
            continue
        ordered.append({**o, "text": text})
    for idx, o in enumerate(ordered):
        if idx < 4:
            o["letter"] = "abcd"[idx]
    return ordered


def extract_images(pdf, questions):
    """Render each picture-question's sign image to assets/q/<source>.png.

    The document is laid out as a one-column table, one cell per question, and a
    question can straddle a page break. So:
      1. if the image sits in a cell that contains exactly one question start,
         that question owns it;
      2. otherwise the owner is the most recent question that started before the
         image in document order.
    """
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    ordered = sorted(questions, key=lambda q: (q["page"], q["top"]))

    cells = {}
    for page_no in range(1, len(pdf.pages) + 1):
        page = pdf.pages[page_no - 1]
        boxes = []
        try:
            for table in page.find_tables():
                for row in table.rows:
                    for cell in row.cells:
                        if cell:
                            boxes.append(cell)
        except Exception:
            pass
        cells[page_no] = boxes

    attached = 0
    for page_no in sorted(cells):
        page = pdf.pages[page_no - 1]
        for im in sorted(page.images, key=lambda i: i["top"]):
            cx = (im["x0"] + im["x1"]) / 2
            cy = (im["top"] + im["bottom"]) / 2

            owner = None
            for box in cells[page_no]:
                x0, top, x1, bottom = box
                if x0 - 1 <= cx <= x1 + 1 and top - 1 <= cy <= bottom + 1:
                    inside = [q for q in ordered
                              if q["page"] == page_no and top - 1 <= q["top"] <= bottom + 1]
                    if len(inside) == 1:
                        owner = inside[0]
                    break

            if owner is None:
                for q in ordered:
                    if (q["page"], q["top"]) <= (page_no, im["top"]):
                        owner = q
                    else:
                        break

            if owner is None or owner.get("image"):
                continue

            pad_x = 3
            box = (
                max(0, im["x0"] - pad_x),
                max(0, im["top"]),
                min(page.width, im["x1"] + pad_x),
                min(page.height, im["bottom"] + 2),
            )
            # Render at the picture's own resolution so the crop is never smaller
            # than the image embedded in the PDF (a fixed 200 dpi render used to
            # throw away up to half the pixels, which made sign photos look soft).
            # Clamp to [200, 600] dpi to bound file size and avoid fake detail.
            dpi = 200
            src_size = im.get("srcsize")
            span_pt = box[2] - box[0]
            if src_size and src_size[0] and span_pt > 0:
                dpi = max(200, min(600, round(src_size[0] / (span_pt / 72))))
            try:
                crop = page.crop(box).to_image(resolution=dpi)
                name = f"{owner['source_number']:03d}.png"
                crop.save(IMG_DIR / name)
                owner["image"] = f"assets/q/{name}"
                # Keep the picture's real resolution so the build can flag images
                # too small to ever look sharp (they need manual replacement).
                owner["image_native"] = src_size[0] if src_size else None
                attached += 1
            except Exception:
                pass
    return attached


def main():
    with pdfplumber.open(PDF) as pdf:
        lines = []
        for i, page in enumerate(pdf.pages, start=1):
            lines.extend(page_lines(page, i))

        raw = parse(lines)
        attached = extract_images(pdf, raw)

    data = []
    seen = {}
    for i, q in enumerate(raw, start=1):
        opts = normalise_options(q["options"])
        marked = [o["letter"] for o in opts if o["bold"] or o["red"] or o["paren"]]
        answer = marked[0] if len(marked) == 1 else None
        ambiguous = len(marked) > 1
        has_image = bool(q.get("image"))
        needs_image = (not has_image) and any(h in q["question"].lower() for h in IMAGE_HINTS)

        fingerprint = (q["question"].lower(), tuple(o["text"].lower() for o in opts))
        duplicate_of = seen.get(fingerprint)
        seen.setdefault(fingerprint, i)

        if duplicate_of:
            status = "duplicate"
        elif len(opts) != 4 or any(not o["text"] for o in opts):
            status = "bad_options"
        elif answer is None:
            status = "needs_key"
        elif needs_image:
            status = "needs_image"
        else:
            status = "verified"

        data.append({
            "id": f"RW-{i:04d}",
            "source_number": q["source_number"],
            "page": q["page"],
            "question": q["question"],
            "options": [{"letter": o["letter"], "text": o["text"]} for o in opts],
            "answer": answer,
            "ambiguous_key": ambiguous,
            "image": q.get("image"),
            "image_native": q.get("image_native"),
            "needs_image": needs_image,
            "status": status,
            "duplicate_of": duplicate_of,
            "topic": None,
            "explanation": None,
        })

    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    counts = Counter(q["status"] for q in data)
    report = [
        f"parsed records: {len(data)}",
        f"status: {dict(sorted(counts.items()))}",
        f"verified: {counts.get('verified', 0)}",
        f"needs_image: {counts.get('needs_image', 0)}",
        f"needs_key: {counts.get('needs_key', 0)}",
        f"bad_options: {counts.get('bad_options', 0)}",
        f"duplicate: {counts.get('duplicate', 0)}",
        f"images attached: {attached}",
        f"source number range: {min(q['source_number'] for q in data)}..{max(q['source_number'] for q in data)}",
    ]
    REPORT.write_text("\n".join(report), encoding="utf-8")
    print("\n".join(report))


if __name__ == "__main__":
    main()
