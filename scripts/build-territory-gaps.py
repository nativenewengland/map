"""Render the main sheet's unresolved-land overlay after editing features.csv."""
import csv
import json
import math
from pathlib import Path

from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
land = Image.open(root / "hydro/territory-mask.png").convert("L")
size = land.width
draw = ImageDraw.Draw(land)


def project(point):
    lat, lng = point
    y = math.asinh(math.tan(math.radians(lat)))
    return round(size * (lng + 180) / 360), round(size * (1 - y / math.pi) / 2)


with (root / "data/features.csv").open(encoding="utf-8-sig", newline="") as source:
    for row in csv.DictReader(source):
        if row["type"] == "polygon" and row["overlay"] == "Territories":
            draw.polygon([project(p) for p in json.loads(row["coords"])], fill=0)

# Palette index zero is transparent. Both shades are translucent over the artwork.
overlay = land.point(lambda v: int(v >= 128)).convert("P")
stripe = Image.new("1", land.size)
lines = ImageDraw.Draw(stripe)
for x in range(-size, size, 16):
    lines.line((x, 0, x + size, size), fill=1, width=2)
overlay.paste(land.point(lambda v: 2 if v >= 128 else 0), mask=stripe)
overlay.putpalette([0, 0, 0, 132, 119, 93, 110, 98, 76])
overlay.save(root / "hydro/territory-gaps.png", transparency=bytes([0, 14, 68]), bits=2)
