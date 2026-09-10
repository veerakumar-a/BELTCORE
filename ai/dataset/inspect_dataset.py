from __future__ import annotations

import hashlib
import imghdr
import json
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
DATASET_CANDIDATES = [ROOT / 'SIH' / 'SIH', ROOT / 'data' / 'raw' / 'SIH']
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tif', '.tiff', '.avif', '.webp'}
ANNOTATION_EXTENSIONS = {'.xml', '.json', '.txt', '.yaml', '.yml', '.csv'}


def find_dataset_root() -> Path:
    for candidate in DATASET_CANDIDATES:
        if candidate.exists():
            return candidate
    raise FileNotFoundError('No dataset directory found in SIH/SIH or data/raw/SIH')


def read_image_size(path: Path) -> tuple[int, int]:
    if imghdr.what(path) is None:
        raise ValueError(f'Not a recognized image: {path.name}')

    with path.open('rb') as handle:
        header = handle.read(24)

    if len(header) < 24:
        raise ValueError(f'Image header too short: {path.name}')

    if header[:8] == b'\x89PNG\r\n\x1a\n':
        width = int.from_bytes(header[8:12], 'big')
        height = int.from_bytes(header[12:16], 'big')
        return width, height

    if header[:2] == b'\xff\xd8':
        idx = 2
        while idx < len(header) - 1:
            if header[idx] != 0xFF:
                idx += 1
                continue
            marker = header[idx + 1]
            if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                if idx + 7 <= len(header):
                    height = int.from_bytes(header[idx + 5:idx + 7], 'big')
                    width = int.from_bytes(header[idx + 7:idx + 9], 'big')
                    return width, height
            idx += 1

    if header[:6] in (b'GIF87a', b'GIF89a'):
        width = int.from_bytes(header[6:8], 'little')
        height = int.from_bytes(header[8:10], 'little')
        return width, height

    if header[:4] == b'II*\x00':
        width = int.from_bytes(header[8:10], 'little')
        height = int.from_bytes(header[10:12], 'little')
        return width, height

    if header[:4] == b'MM\x00*':
        width = int.from_bytes(header[8:10], 'big')
        height = int.from_bytes(header[10:12], 'big')
        return width, height

    raise ValueError(f'Unsupported image format for dimensions: {path.name}')


def sha256_file(path: Path) -> str:
    hasher = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(65536), b''):
            hasher.update(chunk)
    return hasher.hexdigest()


def generate_dataset_report() -> dict[str, Any]:
    dataset_root = find_dataset_root()
    image_files = sorted(
        path for path in dataset_root.rglob('*')
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )
    annotation_files = sorted(
        path for path in dataset_root.rglob('*')
        if path.is_file() and path.suffix.lower() in ANNOTATION_EXTENSIONS
    )

    class_distribution: Counter[str] = Counter()
    dimensions: dict[str, int] = {}
    labels_by_class: Counter[str] = Counter()
    corrupt_images: list[str] = []
    duplicates: list[str] = []
    image_without_labels: list[str] = []
    seen_hashes: dict[str, str] = {}

    for image in image_files:
        rel = image.relative_to(dataset_root)
        class_name = rel.parts[0] if len(rel.parts) > 1 else 'unknown'
        class_distribution[class_name] += 1

        try:
            width, height = read_image_size(image)
            dimensions[str(image)] = width * height
        except Exception:
            corrupt_images.append(str(image.relative_to(dataset_root)))
            continue

        digest = sha256_file(image)
        if digest in seen_hashes:
            duplicates.append(str(image.relative_to(dataset_root)))
        else:
            seen_hashes[digest] = str(image.relative_to(dataset_root))

        label_path = image.with_suffix('.txt')
        if not label_path.exists():
            image_without_labels.append(str(image.relative_to(dataset_root)))
        else:
            labels_by_class[class_name] += 1

    report = {
        'dataset_root': str(dataset_root),
        'total_images': len(image_files),
        'total_annotations': len(annotation_files),
        'image_formats': dict(sorted(Counter(path.suffix.lower().lstrip('.') for path in image_files).items())),
        'class_distribution': dict(sorted(class_distribution.items())),
        'labels_by_class': dict(sorted(labels_by_class.items())),
        'images_without_labels': len(image_without_labels),
        'duplicate_images': duplicates,
        'corrupt_images': corrupt_images,
        'annotation_files': [str(path.relative_to(dataset_root)) for path in annotation_files],
        'dimensions': {
            'min_pixels': min(dimensions.values()) if dimensions else 0,
            'max_pixels': max(dimensions.values()) if dimensions else 0,
            'total_pixels': sum(dimensions.values()),
        },
        'sample_dimensions': {
            str(path.relative_to(dataset_root)): read_image_size(path)
            for path in image_files[:5]
        },
    }
    report['train_val_test_estimate'] = {
        'train': max(1, int(len(image_files) * 0.7)),
        'val': max(1, int(len(image_files) * 0.2)),
        'test': max(1, len(image_files) - (max(1, int(len(image_files) * 0.7)) + max(1, int(len(image_files) * 0.2)))),
    }
    return report


def main() -> None:
    report = generate_dataset_report()
    reports_dir = ROOT / 'reports'
    reports_dir.mkdir(exist_ok=True)
    (reports_dir / 'dataset_report.json').write_text(json.dumps(report, indent=2), encoding='utf-8')

    html = f"""<!DOCTYPE html>
<html lang='en'>
<head><meta charset='UTF-8'><title>SIH Dataset Report</title>
<style>body{{font-family:Arial,sans-serif;padding:32px;}} table{{border-collapse:collapse;width:100%;}} th,td{{border:1px solid #ddd;padding:10px;text-align:left;}} h1{{color:#123b68;}}</style>
</head>
<body>
<h1>SIH Dataset Report</h1>
<p>Total images: {report['total_images']}</p>
<p>Images without labels: {report['images_without_labels']}</p>
<table>
<tr><th>Class</th><th>Count</th></tr>
{''.join(f'<tr><td>{key}</td><td>{value}</td></tr>' for key, value in report['class_distribution'].items())}
</table>
</body>
</html>
"""
    (reports_dir / 'dataset_report.html').write_text(html, encoding='utf-8')
    print(json.dumps({'status': 'ok', 'total_images': report['total_images'], 'classes': report['class_distribution']}, indent=2))


if __name__ == '__main__':
    main()
