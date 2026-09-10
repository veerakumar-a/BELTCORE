# BELTCORE Dataset

This repository keeps its dataset assets in the `datasets/` directory so the project can reference a stable, Git-friendly path while preserving the original dataset structure.

## Overview

The dataset contains conveyor belt joint image classes used for inspection and validation work. The repository keeps the source data in its original class structure and avoids unnecessary reorganization unless the downstream training pipeline requires it.

## Directory structure

```text
datasets/
├── defect/
├── healthy/
├── README.md
└── ...
```

## Notes

- Use `datasets/` as the canonical dataset path in scripts and configuration files.
- The dataset is kept in its original source format to minimize conversion risk.
- Licensing, provenance, and attribution should be reviewed before redistribution or production use.
- Do not treat the dataset as automatically MIT-licensed unless the data source explicitly permits that reuse.

## Validation and inspection

Use the repository AI scripts for dataset checks:

```bash
cd ai/dataset
python inspect_dataset.py
python validate_dataset.py
```
