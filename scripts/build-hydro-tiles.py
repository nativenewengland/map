"""Build static SVG tiles from the five master layers in hydro/."""
import math
import re
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "hydro"
SIZE = 1024
PADDING = 3  # Keep artificial clipping edges outside the visible stroke.
NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", NS)


def midpoint(a, b):
    return tuple((x + y) / 2 for x, y in zip(a, b))


def quadratic(points, start, control, end):
    # The midpoint deviation bounds the parameter-matched chord error.
    actual = midpoint(midpoint(start, control), midpoint(control, end))
    if math.dist(actual, midpoint(start, end)) <= 0.06:
        points.append(end)
        return
    left, right = midpoint(start, control), midpoint(control, end)
    quadratic(points, start, left, actual)
    quadratic(points, actual, right, end)


def rings(path):
    for part in path.split("M")[1:]:
        points = []
        for cmd, raw in re.findall(r"([MLQHV])([^MLQHVZ]*)", "M" + part):
            nums = list(map(float, re.findall(r"-?[\d.]+", raw)))
            if cmd == "H":
                points.append((nums[0], points[-1][1]))
            elif cmd == "V":
                points.append((points[-1][0], nums[0]))
            elif cmd == "Q":
                quadratic(points, points[-1], tuple(nums[:2]), tuple(nums[2:]))
            else:
                points.extend(zip(nums[::2], nums[1::2]))
        yield points


def clip(points, axis, edge, direction):
    result = []
    previous = points[-1]
    for current in points:
        inside = (current[axis] - edge) * direction >= 0
        if inside != ((previous[axis] - edge) * direction >= 0):
            t = (edge - previous[axis]) / (current[axis] - previous[axis])
            result.append(tuple(a + t * (b - a) for a, b in zip(previous, current)))
        if inside:
            result.append(current)
        previous = current
    return result


def number(value):
    return f"{value:.2f}".rstrip("0").rstrip(".")


def build(source):
    template = source.read_text()
    root = ET.fromstring(template)
    paths = [p for p in root[-1] if p.tag == f"{{{NS}}}path"]
    chunks = {(x, y): [[] for _ in paths] for x in range(8) for y in range(8)}
    for index, path in enumerate(paths):
        for points in rings(path.attrib["d"]):
            xs, ys = zip(*points)
            for x in range(max(0, int((min(xs)-PADDING)//SIZE)), min(7, int((max(xs)+PADDING)//SIZE))+1):
                for y in range(max(0, int((min(ys)-PADDING)//SIZE)), min(7, int((max(ys)+PADDING)//SIZE))+1):
                    piece = points
                    for axis, tile in enumerate((x, y)):
                        for edge, direction in [(tile*SIZE-PADDING, 1), ((tile+1)*SIZE+PADDING, -1)]:
                            if piece:
                                piece = clip(piece, axis, edge, direction)
                    if len(piece) >= 3:
                        chunks[x,y][index].append("M"+" ".join(f"{number(a)},{number(b)}" for a,b in piece)+"Z")
    for (x,y), layers in chunks.items():
        root.set("viewBox", f"{x*SIZE} {y*SIZE} {SIZE} {SIZE}")
        for path, parts in zip(paths, layers):
            path.set("d", "".join(parts))
        dest = ROOT / "tiles" / source.stem / str(x) / f"{y}.svg"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(ET.tostring(root, encoding="utf-8"))


if __name__ == "__main__":
    for name in ("land", "ocean", "coast", "lakes", "rivers"):
        build(ROOT / f"{name}.svg")
