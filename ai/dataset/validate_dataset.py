from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATASET_ROOT = ROOT / 'SIH' / 'SIH'


def validate_dataset() -> dict:
    dataset_root = DATASET_ROOT
    if not dataset_root.exists():
        return {'status': 'missing', 'message': 'Dataset not found at SIH/SIH'}

    all_files = [p for p in dataset_root.rglob('*') if p.is_file()]
    images = [p for p in all_files if p.suffix.lower() in {'.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tif', '.tiff', '.avif', '.webp'}]
    classes = sorted({p.parent.name for p in images})
    report = {
        'status': 'validated',
        'dataset_root': str(dataset_root),
        'total_files': len(all_files),
        'total_images': len(images),
        'classes': classes,
        'has_defect': any('defect' in p.parts for p in images),
        'has_healthy': any('healthy' in p.parts for p in images),
    }
    return report


def main() -> None:
    report = validate_dataset()
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    main()
