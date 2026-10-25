"""
Verification of dataset source, license, columns, and compatibility with MindWave
"""
import os
import json
import pandas as pd

RAW_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "raw")
META_PATH = os.path.join(RAW_DIR, "dataset_metadata.json")
EXCEL_PATH = os.path.join(RAW_DIR, "Akram_et_al_2023_Student_MH_Data_UK_SciData.xlsx")

with open(META_PATH, "r", encoding="utf-8") as f:
    meta = json.load(f)

print("--- 1. DATASET SOURCE & LICENSE ---")
print(f"Title:        {meta['title']}")
print(f"Publication:  {meta['journal']} ({meta['publication_year']})")
print(f"DOI:          {meta['doi']}")
print(f"License:      {meta['license']} ({meta['license_url']})")
print(f"Sample Size:  N = {meta['sample_size']}")
print(f"Population:   {meta['population']}")

df = pd.read_excel(EXCEL_PATH)
print("\n--- 2. DOWNLOADED FILE & STRUCTURE ---")
print(f"File Path:    {EXCEL_PATH}")
print(f"File Size:    {os.path.getsize(EXCEL_PATH):,} bytes")
print(f"Total Rows:   {len(df)}")
print(f"Total Cols:   {len(df.columns)}")

pro16_cols = [f'PRO16_{i}' for i in range(1, 17)]
mdq_cols = [f'MDQ1_{i}' for i in range(1, 14)] + ['MDQ_Frequency', 'MDQ3_Severity']

print("\n--- 3. QUESTIONNAIRE FEATURE ALIGNMENT ---")
print("PQ-16 (Schizophrenia / Psychosis Risk):")
print(f"  MindWave has 16 items. Dataset PRO16 columns present: {all(c in df.columns for c in pro16_cols)} ({len(pro16_cols)} items)")
print("  Sample row response values:", df[pro16_cols].iloc[0].to_dict())

print("\nMDQ (Bipolar Spectrum Disorder):")
print(f"  MindWave has 15 items. Dataset MDQ columns present: {all(c in df.columns for c in mdq_cols)} ({len(mdq_cols)} items)")
print("  Sample row response values:", df[mdq_cols].iloc[0].to_dict())

print("\n--- 4. CLINICAL TARGET LABELS ---")
# PQ-16 UHR Target: Ising et al. (2012) Cutoff >= 6
pq16_sum = df[pro16_cols].sum(axis=1)
pq16_uhr = (pq16_sum >= 6).astype(int)
print(f"PQ-16 Target (UHR Psychosis Risk >= 6):")
print(f"  Negative (Low Risk): {sum(pq16_uhr == 0)} ({sum(pq16_uhr == 0)/len(pq16_uhr)*100:.1f}%)")
print(f"  Positive (Ultra-High Risk): {sum(pq16_uhr == 1)} ({sum(pq16_uhr == 1)/len(pq16_uhr)*100:.1f}%)")

# MDQ Hirschfeld Target (2000): >= 7 symptoms + co-occurrence + moderate/severe problem
c1 = df[[f'MDQ1_{i}' for i in range(1, 14)]].sum(axis=1) >= 7
c2 = df['MDQ_Frequency'] == 1
c3 = df['MDQ3_Severity'] >= 3
bipolar_target = (c1 & c2 & c3).astype(int)
print(f"\nMDQ Target (Hirschfeld 3-Tier Bipolar Spectrum Risk):")
print(f"  Negative (Low Risk): {sum(bipolar_target == 0)} ({sum(bipolar_target == 0)/len(bipolar_target)*100:.1f}%)")
print(f"  Positive (Bipolar Risk): {sum(bipolar_target == 1)} ({sum(bipolar_target == 1)/len(bipolar_target)*100:.1f}%)")
