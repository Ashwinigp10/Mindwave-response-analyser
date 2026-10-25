"""
Verify target labels and class distributions for PQ-16 and MDQ in the dataset
"""
import os
import pandas as pd
import numpy as np

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "raw", "Akram_et_al_2023_Student_MH_Data_UK_SciData.xlsx")
df = pd.read_excel(DATA_PATH)

# --- 1. PQ-16 Psychosis Risk Target ---
# Clinical cutoff: Ising et al. (2012) >= 6 endorsed items
pro16_cols = [f'PRO16_{i}' for i in range(1, 17)]
df['pq16_symptom_sum'] = df[pro16_cols].sum(axis=1)

# Target: Positive Psychosis Risk Screen (UHR threshold >= 6)
df['pq16_risk_label'] = (df['pq16_symptom_sum'] >= 6).astype(int)

print("--- PQ-16 Psychosis Risk Target (Cutoff >= 6) ---")
print("Class distribution (0=Low/Moderate, 1=High/UHR Risk):")
print(df['pq16_risk_label'].value_counts())
print(df['pq16_risk_label'].value_counts(normalize=True))

# --- 2. MDQ Bipolar Spectrum Target ---
# Hirschfeld et al. (2000) standard:
# Criterion 1: >= 7 symptom items endorsed (out of 13)
# Criterion 2: Symptoms co-occurred (MDQ_Frequency == 1)
# Criterion 3: Moderate or serious problem (MDQ3_Severity >= 3)
mdq_symptom_cols = [f'MDQ1_{i}' for i in range(1, 14)]
df['mdq_symptom_sum'] = df[mdq_symptom_cols].sum(axis=1)

# Standard strict Hirschfeld criteria
crit1 = df['mdq_symptom_sum'] >= 7
crit2 = df['MDQ_Frequency'] == 1
crit3 = df['MDQ3_Severity'] >= 3

df['mdq_bipolar_risk_label'] = (crit1 & crit2 & crit3).astype(int)

print("\n--- MDQ Bipolar Spectrum Target (Hirschfeld Criteria) ---")
print("Criterion 1 (>=7 symptoms):", crit1.sum())
print("Criterion 2 (Co-occurrence):", (df['MDQ_Frequency'] == 1).sum())
print("Criterion 3 (Mod/Serious problem):", (df['MDQ3_Severity'] >= 3).sum())
print("All 3 criteria met (Positive Bipolar Screen):")
print(df['mdq_bipolar_risk_label'].value_counts())
print(df['mdq_bipolar_risk_label'].value_counts(normalize=True))

# Also check lenient criterion (>= 7 symptoms regardless of severity):
df['mdq_symptom_cutoff_7'] = (df['mdq_symptom_sum'] >= 7).astype(int)
print("\nMDQ Symptom Cutoff >= 7 alone:")
print(df['mdq_symptom_cutoff_7'].value_counts())
