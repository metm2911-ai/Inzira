"""Render the PWA icons from a small drawing (no external design tools needed)."""
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets"
OUT.mkdir(exist_ok=True)


def rounded(draw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def icon(size: int, maskable: bool = False) -> Image.Image:
    scale = 4
    s = size * scale
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    if maskable:
        d.rectangle([0, 0, s, s], fill=(11, 79, 138, 255))
        pad = int(s * 0.14)
        rounded(d, [pad, pad, s - pad, s - pad], int(s * 0.18), (247, 198, 0, 255))
    else:
        rounded(d, [0, 0, s, s], int(s * 0.22), (11, 79, 138, 255))
        pad = int(s * 0.19)
        rounded(d, [pad, pad, s - pad, s - pad], int(s * 0.14), (247, 198, 0, 255))

    cx = s // 2
    top = int(s * 0.31)
    bottom = int(s * 0.74)
    stroke = int(s * 0.10)
    d.line([(cx, bottom), (cx, top)], fill=(11, 79, 138, 255), width=stroke)
    d.line([(cx - int(s * 0.20), int(s * 0.50)), (cx, top), (cx + int(s * 0.20), int(s * 0.50))],
           fill=(11, 79, 138, 255), width=stroke, joint="curve")
    # Round the arrow head joins.
    r = stroke // 2
    for p in [(cx, top), (cx - int(s * 0.20), int(s * 0.50)), (cx + int(s * 0.20), int(s * 0.50))]:
        d.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=(11, 79, 138, 255))

    return img.resize((size, size), Image.LANCZOS)


for px in (192, 512):
    icon(px).save(OUT / f"icon-{px}.png")
icon(512, maskable=True).save(OUT / "icon-maskable-512.png")
print("icons written")
