# SIH Dataset Pipeline

This folder contains dataset inspection and preparation utilities for the BELTCORE SIH prototype.

## Dataset sources

- Source images: `datasets/`
- Processed output: `data/processed`
- Annotations: `data/annotations`

## Commands

```bash
python ai/dataset/inspect_dataset.py
python ai/dataset/validate_dataset.py
python ai/dataset/split_dataset.py
python ai/dataset/convert_annotations.py
```

## Notes

The raw dataset remains in its original location and is not modified. Processed/train/val/test splits are created separately so the original images remain intact.
