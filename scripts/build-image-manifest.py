"""Build the browser manifest from the supplied TechGlam product photographs."""

from pathlib import Path
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "Techglam images"
OPTIMIZED = ROOT / "assets" / "optimized"


def optimized(path):
    target = (OPTIMIZED / path.relative_to(SOURCE)).with_suffix(".webp")
    if not target.exists() or target.stat().st_mtime < path.stat().st_mtime:
        target.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(path) as original:
            image = ImageOps.exif_transpose(original)
            image.thumbnail((1400, 1400), Image.Resampling.LANCZOS)
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
            image.save(target, "WEBP", quality=84, method=6)
    return "./" + str(target.relative_to(ROOT))


def photos(folder):
    return [optimized(path) for path in sorted((SOURCE / folder).iterdir()) if path.suffix.lower() in {".jpg", ".png", ".webp"}]


def numbered(folder):
    return {int(path.name[:2]): photos(path.relative_to(SOURCE)) for path in sorted((SOURCE / folder).iterdir()) if path.is_dir()}


def numbered_files(folder):
    return {int(path.name[:2]): [optimized(path)] for path in sorted((SOURCE / folder).iterdir()) if path.is_file()}


images = {
    "brand": {
        "logo": photos("Logo")[0],
        "lila": photos("Lila Glam"),
    },
    "products": {
        "blush-bastao": numbered_files("BLUSHES/BLUSH EM BASTÃO "),
        "blush-liquido": numbered_files("BLUSHES/BLUSH LÍQUIDO "),
        "paleta-blush": numbered_files("BLUSHES/PALETA DE BLUSH"),
        "paleta-sombra": numbered("PALETAS DE SOMBRA "),
        "lip-gloss": numbered("LIP GLOSS"),
        "lip-oil-fruits": numbered("LIP OIL FRUIT"),
        "cartucho-individual": {number: [photo] for number, photo in enumerate([
            photos("GLAMIX/CARTUCHOS ")[4],
            photos("GLAMIX/CARTUCHOS ")[1],
            photos("GLAMIX/CARTUCHOS ")[0],
            photos("GLAMIX/CARTUCHOS ")[2],
            photos("GLAMIX/CARTUCHOS ")[3],
        ], start=1)},
        "kit-esponjas": photos("ESPONJINHAS DE MAQUIAGEM"),
        "kit-pinceis": photos("KIT DE PINCÉIS "),
        "maquina-glamix": [photos("GLAMIX/GLAMIX")[0], photos("GLAMIX/GLAMIX")[1]],
        "kit-cartuchos": [photos("GLAMIX/CARTUCHOS ")[5]],
    },
    "glamix": {
        "open": photos("GLAMIX/GLAMIX")[0],
        "closed": photos("GLAMIX/GLAMIX")[1],
        "cartridges": photos("GLAMIX/CARTUCHOS ")[5],
    },
}

output = ROOT / "assets" / "real-images.js"
output.write_text("/* Generated from assets/Techglam images. */\nconst REAL_IMAGES = " + json.dumps(images, ensure_ascii=False, separators=(",", ":")) + ";\n")
print(f"Wrote {output.relative_to(ROOT)}")
