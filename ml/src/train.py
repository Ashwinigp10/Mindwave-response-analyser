"""
Reproducible Random Forest Training Pipeline for MindWave
Trains:
1. Schizophrenia / Psychosis Risk Classifier (PQ-16)
2. Bipolar Disorder Spectrum Classifier (MDQ)

Using scikit-learn RandomForestClassifier only.
"""

import os
import json
import joblib
import pandas as pd
import numpy as np
from datetime import datetime

from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report
)
from sklearn.model_selection import StratifiedKFold, cross_val_score

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROCESSED_DATA_DIR = os.path.join(BASE_DIR, "data", "processed")
MODELS_DIR = os.path.join(BASE_DIR, "models")
REPORTS_DIR = os.path.join(BASE_DIR, "reports")

RANDOM_SEED = 42
MODEL_VERSION = "1.0.0-rf-mindwave"

def train_and_evaluate_model(name, train_path, test_path, feature_cols, target_col='target', class_names=None):
    print(f"\n=======================================================")
    print(f" TRAINING RANDOM FOREST: {name.upper()}")
    print(f"=======================================================")

    train_df = pd.read_csv(train_path)
    test_df = pd.read_csv(test_path)

    X_train = train_df[feature_cols]
    y_train = train_df[target_col]
    X_test = test_df[feature_cols]
    y_test = test_df[target_col]

    print(f"Features ({len(feature_cols)}): {feature_cols}")
    print(f"Training samples: {len(X_train)} (Positive: {y_train.sum()}, Negative: {len(y_train) - y_train.sum()})")
    print(f"Test samples:     {len(X_test)} (Positive: {y_test.sum()}, Negative: {len(y_test) - y_test.sum()})")

    # Define Random Forest pipeline
    # SimpleImputer ensures any missing response is safely imputed without crashing
    rf_classifier = RandomForestClassifier(
        n_estimators=150,
        max_depth=6,
        min_samples_split=4,
        min_samples_leaf=2,
        class_weight='balanced',
        random_state=RANDOM_SEED,
        n_jobs=-1
    )

    pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('classifier', rf_classifier)
    ])

    # 5-Fold Stratified Cross-Validation on training data
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_SEED)
    cv_scores = cross_val_score(pipeline, X_train, y_train, cv=cv, scoring='f1_macro')
    print(f"5-Fold Cross-Validation Macro F1: {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")

    # Fit pipeline strictly on training data
    pipeline.fit(X_train, y_train)

    # Evaluate on held-out test data
    y_pred = pipeline.predict(X_test)
    y_proba = pipeline.predict_proba(X_test)[:, 1]

    acc = accuracy_score(y_test, y_pred)
    prec_macro = precision_score(y_test, y_pred, average='macro', zero_division=0)
    rec_macro = recall_score(y_test, y_pred, average='macro', zero_division=0)
    f1_macro = f1_score(y_test, y_pred, average='macro', zero_division=0)

    prec_pos = precision_score(y_test, y_pred, pos_label=1, zero_division=0)
    rec_pos = recall_score(y_test, y_pred, pos_label=1, zero_division=0)
    f1_pos = f1_score(y_test, y_pred, pos_label=1, zero_division=0)

    roc_auc = roc_auc_score(y_test, y_proba)
    cm = confusion_matrix(y_test, y_pred).tolist()
    clf_report = classification_report(y_test, y_pred, target_names=class_names, output_dict=True, zero_division=0)

    print(f"\nHeld-Out Test Set Performance:")
    print(f"  Accuracy:         {acc * 100:.2f}%")
    print(f"  ROC AUC Score:    {roc_auc:.4f}")
    print(f"  Macro F1 Score:   {f1_macro:.4f}")
    print(f"  Positive Class Precision: {prec_pos:.4f}")
    print(f"  Positive Class Recall:    {rec_pos:.4f}")
    print(f"  Positive Class F1:        {f1_pos:.4f}")
    print(f"Confusion Matrix (TN={cm[0][0]}, FP={cm[0][1]}, FN={cm[1][0]}, TP={cm[1][1]}):")
    print(np.array(cm))

    # Feature Importances
    importances = pipeline.named_steps['classifier'].feature_importances_
    feat_imp = sorted(zip(feature_cols, importances), key=lambda x: x[1], reverse=True)
    print("\nTop 5 Most Informative Features:")
    for feat, imp in feat_imp[:5]:
        print(f"  - {feat}: {imp:.4f} ({imp*100:.1f}%)")

    metrics = {
        "model_name": name,
        "algorithm": "RandomForestClassifier",
        "random_seed": RANDOM_SEED,
        "n_estimators": 150,
        "max_depth": 6,
        "class_weight": "balanced",
        "train_samples": len(X_train),
        "test_samples": len(X_test),
        "train_positive_count": int(y_train.sum()),
        "test_positive_count": int(y_test.sum()),
        "cv_5fold_macro_f1_mean": float(cv_scores.mean()),
        "cv_5fold_macro_f1_std": float(cv_scores.std()),
        "test_accuracy": float(acc),
        "test_roc_auc": float(roc_auc),
        "test_macro_f1": float(f1_macro),
        "test_macro_precision": float(prec_macro),
        "test_macro_recall": float(rec_macro),
        "test_positive_f1": float(f1_pos),
        "test_positive_precision": float(prec_pos),
        "test_positive_recall": float(rec_pos),
        "confusion_matrix": {
            "true_negatives": cm[0][0],
            "false_positives": cm[0][1],
            "false_negatives": cm[1][0],
            "true_positives": cm[1][1]
        },
        "classification_report": clf_report,
        "feature_importances": {feat: float(imp) for feat, imp in feat_imp}
    }

    return pipeline, metrics


def main():
    os.makedirs(MODELS_DIR, exist_ok=True)
    os.makedirs(REPORTS_DIR, exist_ok=True)

    timestamp = datetime.utcnow().isoformat() + "Z"

    # 1. Train PQ-16 Schizophrenia/Psychosis Risk Random Forest
    pq16_features = [f'q_{i}' for i in range(1, 17)]
    train_pq16_path = os.path.join(PROCESSED_DATA_DIR, "pq16_train.csv")
    test_pq16_path = os.path.join(PROCESSED_DATA_DIR, "pq16_test.csv")

    pq16_pipeline, pq16_metrics = train_and_evaluate_model(
        name="schizophrenia_pq16",
        train_path=train_pq16_path,
        test_path=test_pq16_path,
        feature_cols=pq16_features,
        class_names=["Low_Risk", "Psychosis_Risk"]
    )

    # Save individual schizophrenia pipeline
    pq16_model_path = os.path.join(MODELS_DIR, "schizophrenia_rf_pipeline.joblib")
    joblib.dump(pq16_pipeline, pq16_model_path)
    print(f"\nSaved Schizophrenia RF Pipeline to: {pq16_model_path}")

    # 2. Train MDQ Bipolar Spectrum Risk Random Forest
    mdq_features = [f'q_{i}' for i in range(1, 16)]
    train_mdq_path = os.path.join(PROCESSED_DATA_DIR, "mdq_train.csv")
    test_mdq_path = os.path.join(PROCESSED_DATA_DIR, "mdq_test.csv")

    mdq_pipeline, mdq_metrics = train_and_evaluate_model(
        name="bipolar_mdq",
        train_path=train_mdq_path,
        test_path=test_mdq_path,
        feature_cols=mdq_features,
        class_names=["Low_Risk", "Bipolar_Spectrum_Risk"]
    )

    # Save individual bipolar pipeline
    mdq_model_path = os.path.join(MODELS_DIR, "bipolar_rf_pipeline.joblib")
    joblib.dump(mdq_pipeline, mdq_model_path)
    print(f"Saved Bipolar RF Pipeline to: {mdq_model_path}")

    # 3. Create Unified Pipeline Package
    unified_registry = {
        "model_version": MODEL_VERSION,
        "trained_at_utc": timestamp,
        "algorithm": "RandomForestClassifier",
        "framework": "scikit-learn",
        "dataset": {
            "citation": "Akram et al. (2023). Scientific Data, Nature.",
            "doi": "10.6084/m9.figshare.24052236.v2",
            "license": "CC BY 4.0",
            "cohort": "UK University Students (Demographic: 18-25+ young adults)"
        },
        "supported_assessments": {
            "schizophrenia": {
                "instrument": "Prodromal Questionnaire 16 (PQ-16)",
                "feature_count": 16,
                "features": pq16_features,
                "target_description": "Ultra-High Risk (UHR) of Psychosis / Prodromal Schizophrenia (Ising et al. 2012 clinical cutoff)",
                "supported_age_groups": ["19-25", "26-31", "32-36", "37-43", "44-50", "50+"],
                "unsupported_age_groups": ["6-12", "13-18"],
                "pipeline": pq16_pipeline,
                "metrics": pq16_metrics
            },
            "bipolar": {
                "instrument": "Mood Disorder Questionnaire (MDQ)",
                "feature_count": 15,
                "features": mdq_features,
                "target_description": "Positive Bipolar Spectrum Disorder Screen (Hirschfeld et al. 2000 3-tier criteria)",
                "supported_age_groups": ["19-25", "26-31", "32-36", "37-43", "44-50", "50+"],
                "unsupported_age_groups": ["6-12", "13-18"],
                "pipeline": mdq_pipeline,
                "metrics": mdq_metrics
            }
        }
    }

    unified_model_path = os.path.join(MODELS_DIR, "random_forest_pipeline.joblib")
    joblib.dump(unified_registry, unified_model_path)
    print(f"Saved Master Unified Model Registry to: {unified_model_path}")

    # 4. Save Evaluation Reports (JSON and Markdown)
    evaluation_full = {
        "model_version": MODEL_VERSION,
        "evaluation_timestamp": timestamp,
        "schizophrenia_pq16": pq16_metrics,
        "bipolar_mdq": mdq_metrics
    }

    json_report_path = os.path.join(REPORTS_DIR, "evaluation_report.json")
    with open(json_report_path, "w", encoding="utf-8") as f:
        json.dump(evaluation_full, f, indent=2)
    print(f"Saved JSON Evaluation Report to: {json_report_path}")

    # Generate Markdown Report
    md_content = f"""# MindWave Random Forest Machine Learning Evaluation Report

- **Model Version:** `{MODEL_VERSION}`
- **Training Timestamp:** `{timestamp}`
- **Algorithm:** `scikit-learn.ensemble.RandomForestClassifier` (Fixed Seed: `{RANDOM_SEED}`)
- **Dataset Source:** Akram et al. (2023), *Scientific Data* (Nature Publishing Group)
- **DOI:** [10.6084/m9.figshare.24052236.v2](https://doi.org/10.6084/m9.figshare.24052236.v2)
- **License:** Creative Commons Attribution 4.0 International (CC BY 4.0)

---

## 1. Schizophrenia / Psychosis Risk Classifier (PQ-16)

- **Instrument:** Prodromal Questionnaire 16 (16 item binary responses)
- **Clinical Target:** Ultra-High Risk (UHR) of Psychosis / Prodromal Schizophrenia (Ising et al. 2012 clinical research cutoff $\\ge 6$)
- **Sample Counts:**
  - Training Samples: **{pq16_metrics['train_samples']}** (Positive: {pq16_metrics['train_positive_count']}, Negative: {pq16_metrics['train_samples'] - pq16_metrics['train_positive_count']})
  - Held-out Test Samples: **{pq16_metrics['test_samples']}** (Positive: {pq16_metrics['test_positive_count']}, Negative: {pq16_metrics['test_samples'] - pq16_metrics['test_positive_count']})
- **5-Fold Cross-Validation Macro F1:** **{pq16_metrics['cv_5fold_macro_f1_mean']:.4f}** $\\pm$ {pq16_metrics['cv_5fold_macro_f1_std']:.4f}
- **Held-Out Test Results:**
  - **Accuracy:** **{pq16_metrics['test_accuracy'] * 100:.2f}%**
  - **ROC-AUC Score:** **{pq16_metrics['test_roc_auc']:.4f}**
  - **Macro F1 Score:** **{pq16_metrics['test_macro_f1']:.4f}**
  - **Psychosis Risk Precision:** **{pq16_metrics['test_positive_precision'] * 100:.2f}%**
  - **Psychosis Risk Recall:** **{pq16_metrics['test_positive_recall'] * 100:.2f}%**
  - **Psychosis Risk F1:** **{pq16_metrics['test_positive_f1']:.4f}**

### Confusion Matrix (Test Set: N={pq16_metrics['test_samples']})
| | Predicted Negative (Low Risk) | Predicted Positive (Psychosis Risk) |
|---|---|---|
| **Actual Negative** | {pq16_metrics['confusion_matrix']['true_negatives']} (TN) | {pq16_metrics['confusion_matrix']['false_positives']} (FP) |
| **Actual Positive** | {pq16_metrics['confusion_matrix']['false_negatives']} (FN) | {pq16_metrics['confusion_matrix']['true_positives']} (TP) |

### Top Predictive PQ-16 Features
"""
    for feat, imp in sorted(pq16_metrics['feature_importances'].items(), key=lambda x: x[1], reverse=True)[:6]:
        md_content += f"- **{feat}**: {imp * 100:.2f}% relative importance\n"

    md_content += f"""
---

## 2. Bipolar Disorder Spectrum Classifier (MDQ)

- **Instrument:** Mood Disorder Questionnaire (15 items: 13 symptoms + synchrony + impairment)
- **Clinical Target:** Positive Bipolar Spectrum Disorder Screen (Hirschfeld et al. 2000 3-tier criteria)
- **Sample Counts:**
  - Training Samples: **{mdq_metrics['train_samples']}** (Positive: {mdq_metrics['train_positive_count']}, Negative: {mdq_metrics['train_samples'] - mdq_metrics['train_positive_count']})
  - Held-out Test Samples: **{mdq_metrics['test_samples']}** (Positive: {mdq_metrics['test_positive_count']}, Negative: {mdq_metrics['test_samples'] - mdq_metrics['test_positive_count']})
- **5-Fold Cross-Validation Macro F1:** **{mdq_metrics['cv_5fold_macro_f1_mean']:.4f}** $\\pm$ {mdq_metrics['cv_5fold_macro_f1_std']:.4f}
- **Held-Out Test Results:**
  - **Accuracy:** **{mdq_metrics['test_accuracy'] * 100:.2f}%**
  - **ROC-AUC Score:** **{mdq_metrics['test_roc_auc']:.4f}**
  - **Macro F1 Score:** **{mdq_metrics['test_macro_f1']:.4f}**
  - **Bipolar Risk Precision:** **{mdq_metrics['test_positive_precision'] * 100:.2f}%**
  - **Bipolar Risk Recall:** **{mdq_metrics['test_positive_recall'] * 100:.2f}%**
  - **Bipolar Risk F1:** **{mdq_metrics['test_positive_f1']:.4f}**

### Confusion Matrix (Test Set: N={mdq_metrics['test_samples']})
| | Predicted Negative (Low Risk) | Predicted Positive (Bipolar Spectrum Risk) |
|---|---|---|
| **Actual Negative** | {mdq_metrics['confusion_matrix']['true_negatives']} (TN) | {mdq_metrics['confusion_matrix']['false_positives']} (FP) |
| **Actual Positive** | {mdq_metrics['confusion_matrix']['false_negatives']} (FN) | {mdq_metrics['confusion_matrix']['true_positives']} (TP) |

### Top Predictive MDQ Features
"""
    for feat, imp in sorted(mdq_metrics['feature_importances'].items(), key=lambda x: x[1], reverse=True)[:6]:
        md_content += f"- **{feat}**: {imp * 100:.2f}% relative importance\n"

    md_content += """
---

## 3. Scientific Discussion & Clinical Limitations

1. **False Positives vs False Negatives:**
   - In screening for psychosis and bipolar disorder, high recall (sensitivity) is prioritized to ensure vulnerable individuals are flagged for clinical consultation.
   - However, false positives could cause unnecessary distress. Thus, the Random Forest model operates strictly as an **Experimental Secondary Analysis** and never as a diagnostic determination.
2. **Class Imbalance:**
   - In natural epidemiological populations, bipolar disorder has a prevalence of ~10-12% in university samples. Class imbalance is handled with balanced subsampling weights (`class_weight='balanced'`).
3. **Age-Group Boundaries:**
   - This model was trained on university students and adult participants (18-56 years, primarily 18-25).
   - The ML service strictly rejects or marks as 'Unavailable' screening inputs from child (`6-12`) and adolescent (`13-18`) demographics where adult self-report instruments have not been validated.
4. **Distinction from Clinical Diagnosis:**
   - A questionnaire-based screening tool identifies risk markers, not biological illness. Formal clinical diagnosis requires comprehensive psychiatric interview (e.g. SCID, SIPS, CAARMS) by a licensed practitioner.
"""

    md_report_path = os.path.join(REPORTS_DIR, "evaluation_report.md")
    with open(md_report_path, "w", encoding="utf-8") as f:
        f.write(md_content)
    print(f"Saved Markdown Evaluation Report to: {md_report_path}")

    print("\nAll model training, validation, packaging, and reporting completed successfully!")

if __name__ == "__main__":
    main()
