"""
Deep inspection of PQ-16 and MDQ columns
"""
import os
import pandas as pd

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "raw", "Akram_et_al_2023_Student_MH_Data_UK_SciData.xlsx")

df = pd.read_excel(DATA_PATH)

pro16_cols = [f'PRO16_{i}' for i in range(1, 17)]
print("PRO16 columns exist:", [c in df.columns for c in pro16_cols])
print("\nPRO16 sample values:")
print(df[pro16_cols].head())
print("\nPRO16 value counts per item (0 vs 1 vs other):")
for col in pro16_cols:
    print(col, df[col].value_counts().to_dict())

print("\nPRO16 sum & severity:")
print(df[['P16_Psychotic_Exp_Sum', 'Prodromal16_Psychotic_Exp_Severity']].describe())

mdq_items = [f'MDQ1_{i}' for i in range(1, 14)] + ['MDQ_Frequency', 'MDQ3_Severity']
print("\nMDQ items value counts:")
for col in mdq_items:
    print(col, df[col].value_counts().to_dict())

print("\nMDQ Mania score describe:")
print(df['MDQ_Mania'].describe())

print("\nMissing values in dataset:")
print(df[pro16_cols + ['P16_Psychotic_Exp_Sum', 'Prodromal16_Psychotic_Exp_Severity'] + mdq_items + ['MDQ_Mania']].isna().sum())

print("\nAge distribution:")
print(df['Age'].describe())
print(df['Age'].value_counts().head(10))
