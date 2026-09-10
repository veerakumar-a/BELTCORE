from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'SIH' / 'SIH'
TARGET = ROOT / 'data' / 'processed'

TARGET.mkdir(parents=True, exist_ok=True)
for split_name in ['train', 'val', 'test']:
    (TARGET / split_name / 'images').mkdir(parents=True, exist_ok=True)


for class_dir in SOURCE.iterdir():
    if not class_dir.is_dir():
        continue
    class_images = sorted([p for p in class_dir.iterdir() if p.is_file() and p.suffix.lower() in {'.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tif', '.tiff', '.avif', '.webp'}])
    for index, image in enumerate(class_images):
        if index % 10 == 0:
            split = 'test'
        elif index % 10 == 1:
            split = 'val'
        else:
            split = 'train'
        target_dir = TARGET / split / 'images'
        shutil.copy2(image, target_dir / image.name)

print('Dataset split complete. See data/processed/')
