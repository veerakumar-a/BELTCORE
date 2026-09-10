from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'SIH' / 'SIH'
TARGET = ROOT / 'data' / 'annotations'
TARGET.mkdir(parents=True, exist_ok=True)


def convert_annotations() -> dict:
    annotation_map = {}
    for class_dir in SOURCE.iterdir():
        if not class_dir.is_dir():
            continue
        for image in class_dir.iterdir():
            if image.is_file() and image.suffix.lower() in {'.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tif', '.tiff', '.avif', '.webp'}:
                annotation_map[str(image.name)] = {
                    'class': class_dir.name,
                    'source_directory': class_dir.name,
                    'label': 'defect' if class_dir.name == 'defect' else 'healthy',
                    'image_path': str(image),
                }

    annotation_file = TARGET / 'annotations.json'
    annotation_file.write_text(json.dumps(annotation_map, indent=2), encoding='utf-8')
    return {'status': 'ok', 'annotations': len(annotation_map)}


if __name__ == '__main__':
    result = convert_annotations()
    print(json.dumps(result, indent=2))
