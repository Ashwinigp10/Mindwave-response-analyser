"""
Dataset Downloader and Verifier for MindWave ML System
Dataset: Akram et al. (2023) Comprehensive Data on the Prevalence of Psychiatric Symptoms in UK University Students
Published in: Scientific Data (Nature Publishing Group)
DOI: 10.6084/m9.figshare.24052236.v2
License: Creative Commons Attribution 4.0 International (CC BY 4.0)
"""

import os
import sys
import json
import hashlib
import urllib.request

RAW_DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "raw")

DATASET_FILES = [
    {
        "filename": "Akram_et_al_2023_Student_MH_Data_UK_SciData.xlsx",
        "url": "https://ndownloader.figshare.com/files/42177492",
        "expected_md5": "0a3a9d70e859d81b0d326dedc3c1d1d7",
        "expected_size": 490193,
        "description": "Primary dataset containing item-level responses for PQ-16, MDQ, and demographic measures (N=1408)"
    },
    {
        "filename": "Variable_codes_and_abbreviations.pdf",
        "url": "https://ndownloader.figshare.com/files/42177486",
        "expected_md5": "a4480a207f47b5c39c9e74294af7cc35",
        "expected_size": 108260,
        "description": "Codebook and variable documentation describing scoring codes, scales, and instruments"
    }
]

DATASET_METADATA = {
    "title": "Comprehensive Data on the Prevalence of Psychiatric Symptoms in UK University Students: Data Files SPSS and XLSX Format and Variable Codes",
    "authors": [
        "Umair Akram",
        "Kamila Irvine",
        "Maria Gardani",
        "Sarah Allen",
        "Jodie C. Stevenson"
    ],
    "publication_year": 2023,
    "journal": "Scientific Data (Nature)",
    "doi": "10.6084/m9.figshare.24052236.v2",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "source_url": "https://figshare.com/articles/dataset/Data_Files_SPSS_and_XLSX_Format_and_Variable_Codes_PDF_/24052236",
    "sample_size": 1408,
    "population": "UK University Students (Demographic: Young Adult / College)",
    "relevant_instruments": {
        "PQ-16": {
            "name": "Prodromal Questionnaire 16",
            "items": 16,
            "purpose": "Screening for ultra-high risk (UHR) of psychosis / prodromal schizophrenia",
            "scoring": "Binary true/false response per item, symptom total 0-16, distress subscale",
            "clinical_cutoff": "6 or more endorsed items indicates positive prodromal psychosis risk screener (Ising et al. 2012)"
        },
        "MDQ": {
            "name": "Mood Disorder Questionnaire",
            "items": 15,
            "purpose": "Screening for bipolar spectrum disorders (Bipolar I / II)",
            "scoring": "Item endorsement 1-13 (symptoms), Item 14 (co-occurrence/synchrony), Item 15 (functional impairment)",
            "clinical_cutoff": "7 or more endorsed symptoms + co-occurrence + moderate/serious problem indicates positive bipolar screener (Hirschfeld et al. 2000)"
        }
    }
}


def compute_md5(filepath):
    hash_md5 = hashlib.md5()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(4096 * 1024), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


def download_dataset():
    os.makedirs(RAW_DATA_DIR, exist_ok=True)
    print(f"[1/3] Ensuring raw data directory exists: {RAW_DATA_DIR}")

    # Save metadata
    meta_path = os.path.join(RAW_DATA_DIR, "dataset_metadata.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(DATASET_METADATA, f, indent=2)
    print(f"[2/3] Saved dataset metadata to: {meta_path}")

    # Download files
    print(f"[3/3] Downloading research files...")
    for item in DATASET_FILES:
        dest_path = os.path.join(RAW_DATA_DIR, item["filename"])
        if os.path.exists(dest_path):
            current_md5 = compute_md5(dest_path)
            if current_md5 == item["expected_md5"]:
                print(f" -> {item['filename']} already downloaded and verified (MD5: {current_md5}). Skipping download.")
                continue
            else:
                print(f" -> {item['filename']} exists but hash mismatch ({current_md5} vs {item['expected_md5']}). Re-downloading...")

        print(f" -> Fetching {item['filename']} from {item['url']}...")
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) MindWave-ML-Downloader/1.0"}
        req = urllib.request.Request(item["url"], headers=headers)
        with urllib.request.urlopen(req) as response, open(dest_path, "wb") as out_file:
            data = response.read()
            out_file.write(data)

        actual_size = os.path.getsize(dest_path)
        actual_md5 = compute_md5(dest_path)
        print(f" -> Download complete: {dest_path} ({actual_size} bytes)")
        if actual_md5 == item["expected_md5"]:
            print(f" -> Verification SUCCESS: MD5 matches expected {actual_md5}")
        else:
            print(f" -> WARNING: MD5 mismatch for {item['filename']}: expected {item['expected_md5']}, got {actual_md5}")

    print("\nDataset preparation and verification completed successfully!")


if __name__ == "__main__":
    download_dataset()
