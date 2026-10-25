"""
Data Preprocessing and Validation Pipeline for MindWave ML
Processes Akram et al. (2023) dataset into train and test splits for:
1. PQ-16 Schizophrenia / Psychosis Risk Model
2. MDQ Bipolar Disorder Spectrum Model
"""

import os
import json
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

RAW_DATA_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "data", "raw", "Akram_et_al_2023_Student_MH_Data_UK_SciData.xlsx"
)
PROCESSED_DATA_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "data", "processed"
)

RANDOM_STATE = 42

def run_preprocessing():
    os.makedirs(PROCESSED_DATA_DIR, exist_ok=True)
    print(f"Loading raw dataset from: {RAW_DATA_PATH}...")
    df = pd.read_excel(RAW_DATA_PATH)
    total_raw_rows = len(df)
    print(f"Loaded {total_raw_rows} raw participant records.")

    # Check duplicates
    duplicates = df.duplicated().sum()
    print(f"Duplicate rows detected: {duplicates}")

    # ---------------------------------------------------------
    # 1. PROCESS PQ-16 (SCHIZOPHRENIA / PSYCHOSIS RISK)
    # ---------------------------------------------------------
    print("\n--- Preprocessing PQ-16 (Psychosis Risk) Data ---")
    pq16_feature_cols = [f'PRO16_{i}' for i in range(1, 17)]
    
    # Check nulls in PQ16 items
    pq16_nulls = df[pq16_feature_cols].isna().sum().sum()
    print(f"Total null values across PQ-16 feature columns: {pq16_nulls}")

    # Filter records that have valid responses (drop rows with missing critical items)
    df_pq16 = df.dropna(subset=pq16_feature_cols).copy()
    print(f"Valid PQ-16 records after dropping missing rows: {len(df_pq16)} (retained {len(df_pq16)/total_raw_rows*100:.1f}%)")

    # Define ground truth target based on validated clinical literature (Ising et al. 2012)
    # Cutoff of >= 6 endorsed items distinguishes Ultra-High Risk (UHR) of psychosis
    symptom_sum = df_pq16[pq16_feature_cols].sum(axis=1)
    df_pq16['target'] = (symptom_sum >= 6).astype(int)

    # Standardize column names to match MindWave question IDs
    pq16_rename_map = {f'PRO16_{i}': f'q_{i}' for i in range(1, 17)}
    df_pq16_clean = df_pq16.rename(columns=pq16_rename_map)
    clean_pq16_features = [f'q_{i}' for i in range(1, 17)]

    # Stratified Train/Test Split (80% train, 20% test)
    X_pq16 = df_pq16_clean[clean_pq16_features]
    y_pq16 = df_pq16_clean['target']
    age_pq16 = df_pq16_clean['Age']

    X_train_pq16, X_test_pq16, y_train_pq16, y_test_pq16, age_train_pq16, age_test_pq16 = train_test_split(
        X_pq16, y_pq16, age_pq16,
        test_size=0.20,
        random_state=RANDOM_STATE,
        stratify=y_pq16
    )

    train_pq16_df = pd.concat([X_train_pq16, y_train_pq16, age_train_pq16], axis=1)
    test_pq16_df = pd.concat([X_test_pq16, y_test_pq16, age_test_pq16], axis=1)

    train_pq16_path = os.path.join(PROCESSED_DATA_DIR, "pq16_train.csv")
    test_pq16_path = os.path.join(PROCESSED_DATA_DIR, "pq16_test.csv")
    train_pq16_df.to_csv(train_pq16_path, index=False)
    test_pq16_df.to_csv(test_pq16_path, index=False)
    print(f"PQ-16 Training set saved: {len(train_pq16_df)} samples ({y_train_pq16.value_counts().to_dict()})")
    print(f"PQ-16 Test set saved: {len(test_pq16_df)} samples ({y_test_pq16.value_counts().to_dict()})")

    # ---------------------------------------------------------
    # 2. PROCESS MDQ (BIPOLAR SPECTRUM DISORDER)
    # ---------------------------------------------------------
    print("\n--- Preprocessing MDQ (Bipolar Spectrum) Data ---")
    mdq_symptom_cols = [f'MDQ1_{i}' for i in range(1, 14)]
    mdq_all_cols = mdq_symptom_cols + ['MDQ_Frequency', 'MDQ3_Severity']

    # Filter records with complete MDQ data
    df_mdq = df.dropna(subset=mdq_all_cols).copy()
    print(f"Valid MDQ records with complete items: {len(df_mdq)} (retained {len(df_mdq)/total_raw_rows*100:.1f}%)")

    # Target: Validated Hirschfeld et al. (2000) Criteria:
    # 1) >= 7 symptom items endorsed
    # 2) Symptoms co-occurred at the same time (MDQ_Frequency == 1)
    # 3) Symptoms caused moderate (3) or serious (4) problems (MDQ3_Severity >= 3)
    c1 = df_mdq[mdq_symptom_cols].sum(axis=1) >= 7
    c2 = df_mdq['MDQ_Frequency'] == 1
    c3 = df_mdq['MDQ3_Severity'] >= 3
    df_mdq['target'] = (c1 & c2 & c3).astype(int)

    # Feature mapping for MindWave 15 items:
    # q_1 to q_13: 13 MDQ symptoms
    # q_14: Co-occurrence / episode synchrony (MDQ_Frequency)
    # q_15: Functional impairment (MDQ3_Severity, converted to binary impact: >= 2 -> 1, else 0)
    # We also keep raw severity score
    mdq_features = pd.DataFrame(index=df_mdq.index)
    for i in range(1, 14):
        mdq_features[f'q_{i}'] = df_mdq[f'MDQ1_{i}'].astype(int)
    mdq_features['q_14'] = df_mdq['MDQ_Frequency'].astype(int)
    # In MindWave Q15 is emotional control / interference: high impact corresponds to severity >= 2
    mdq_features['q_15'] = (df_mdq['MDQ3_Severity'] >= 2).astype(int)

    clean_mdq_features = [f'q_{i}' for i in range(1, 16)]
    y_mdq = df_mdq['target']
    age_mdq = df_mdq['Age']

    X_train_mdq, X_test_mdq, y_train_mdq, y_test_mdq, age_train_mdq, age_test_mdq = train_test_split(
        mdq_features[clean_mdq_features], y_mdq, age_mdq,
        test_size=0.20,
        random_state=RANDOM_STATE,
        stratify=y_mdq
    )

    train_mdq_df = pd.concat([X_train_mdq, y_train_mdq, age_train_mdq], axis=1)
    test_mdq_df = pd.concat([X_test_mdq, y_test_mdq, age_test_mdq], axis=1)

    train_mdq_path = os.path.join(PROCESSED_DATA_DIR, "mdq_train.csv")
    test_mdq_path = os.path.join(PROCESSED_DATA_DIR, "mdq_test.csv")
    train_mdq_df.to_csv(train_mdq_path, index=False)
    test_mdq_df.to_csv(test_mdq_path, index=False)
    print(f"MDQ Training set saved: {len(train_mdq_df)} samples ({y_train_mdq.value_counts().to_dict()})")
    print(f"MDQ Test set saved: {len(test_mdq_df)} samples ({y_test_mdq.value_counts().to_dict()})")

    summary = {
        "dataset_name": "Akram et al. (2023) UK University Student Mental Health",
        "random_state": RANDOM_STATE,
        "total_raw_participants": total_raw_rows,
        "pq16": {
            "total_samples": len(df_pq16),
            "features": clean_pq16_features,
            "train_samples": len(train_pq16_df),
            "test_samples": len(test_pq16_df),
            "train_class_distribution": y_train_pq16.value_counts().to_dict(),
            "test_class_distribution": y_test_pq16.value_counts().to_dict(),
            "target_definition": "Prodromal Psychosis Risk (Cutoff >= 6 items endorsed, Ising et al. 2012)"
        },
        "mdq": {
            "total_samples": len(df_mdq),
            "features": clean_mdq_features,
            "train_samples": len(train_mdq_df),
            "test_samples": len(test_mdq_df),
            "train_class_distribution": y_train_mdq.value_counts().to_dict(),
            "test_class_distribution": y_test_mdq.value_counts().to_dict(),
            "target_definition": "Bipolar Spectrum Disorder Risk (Hirschfeld et al. 2000 3-tier criteria)"
        }
    }

    summary_path = os.path.join(PROCESSED_DATA_DIR, "preprocessing_summary.json")
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)
    print(f"\nPreprocessing summary saved to: {summary_path}")
    print("Preprocessing completed successfully!")

if __name__ == "__main__":
    run_preprocessing()
