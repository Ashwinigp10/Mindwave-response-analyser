"""
Dataset Inspector for Akram et al. 2023 Student Mental Health Data
"""

import os
import pandas as pd
import json

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "raw", "Akram_et_al_2023_Student_MH_Data_UK_SciData.xlsx")

def inspect():
    print(f"Reading dataset: {DATA_PATH}...")
    xls = pd.ExcelFile(DATA_PATH)
    print(f"Sheet names: {xls.sheet_names}")

    df = pd.read_excel(xls, sheet_name=0)
    print(f"\nTotal Records: {len(df)}")
    print(f"Total Columns: {len(df.columns)}")

    cols = list(df.columns)
    print(f"\nAll column names:\n{cols}")

    # Search for PQ-16 columns
    pq16_cols = [c for c in cols if 'pq' in str(c).lower()]
    print(f"\nPQ-16 related columns ({len(pq16_cols)}):\n{pq16_cols}")

    # Search for MDQ columns
    mdq_cols = [c for c in cols if 'mdq' in str(c).lower()]
    print(f"\nMDQ related columns ({len(mdq_cols)}):\n{mdq_cols}")

    # Check first 5 rows of PQ-16
    if pq16_cols:
        print("\nPQ-16 head:")
        print(df[pq16_cols].head())
        print("\nPQ-16 describe:")
        print(df[pq16_cols].describe())

    # Check first 5 rows of MDQ
    if mdq_cols:
        print("\nMDQ head:")
        print(df[mdq_cols].head())
        print("\nMDQ describe:")
        print(df[mdq_cols].describe())

    # Check demographics
    demo_cols = [c for c in cols if any(term in str(c).lower() for term in ['age', 'gender', 'sex', 'year', 'course', 'study'])]
    print(f"\nDemographics columns ({len(demo_cols)}):\n{demo_cols}")
    if demo_cols:
        print(df[demo_cols].head())

if __name__ == "__main__":
    inspect()
