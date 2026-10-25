# MindWave Random Forest Machine Learning Evaluation Report

- **Model Version:** `1.0.0-rf-mindwave`
- **Training Timestamp:** `2026-10-25T15:59:10.141039Z`
- **Algorithm:** `scikit-learn.ensemble.RandomForestClassifier` (Fixed Seed: `42`)
- **Dataset Source:** Akram et al. (2023), *Scientific Data* (Nature Publishing Group)
- **DOI:** [10.6084/m9.figshare.24052236.v2](https://doi.org/10.6084/m9.figshare.24052236.v2)
- **License:** Creative Commons Attribution 4.0 International (CC BY 4.0)

---

## 1. Schizophrenia / Psychosis Risk Classifier (PQ-16)

- **Instrument:** Prodromal Questionnaire 16 (16 item binary responses)
- **Clinical Target:** Ultra-High Risk (UHR) of Psychosis / Prodromal Schizophrenia (Ising et al. 2012 clinical research cutoff $\ge 6$)
- **Sample Counts:**
  - Training Samples: **1112** (Positive: 329, Negative: 783)
  - Held-out Test Samples: **279** (Positive: 82, Negative: 197)
- **5-Fold Cross-Validation Macro F1:** **0.9230** $\pm$ 0.0227
- **Held-Out Test Results:**
  - **Accuracy:** **97.49%**
  - **ROC-AUC Score:** **0.9959**
  - **Macro F1 Score:** **0.9703**
  - **Psychosis Risk Precision:** **93.10%**
  - **Psychosis Risk Recall:** **98.78%**
  - **Psychosis Risk F1:** **0.9586**

### Confusion Matrix (Test Set: N=279)
| | Predicted Negative (Low Risk) | Predicted Positive (Psychosis Risk) |
|---|---|---|
| **Actual Negative** | 191 (TN) | 6 (FP) |
| **Actual Positive** | 1 (FN) | 81 (TP) |

### Top Predictive PQ-16 Features
- **q_5**: 15.60% relative importance
- **q_9**: 14.18% relative importance
- **q_11**: 11.72% relative importance
- **q_12**: 11.44% relative importance
- **q_4**: 10.52% relative importance
- **q_14**: 7.62% relative importance

---

## 2. Bipolar Disorder Spectrum Classifier (MDQ)

- **Instrument:** Mood Disorder Questionnaire (15 items: 13 symptoms + synchrony + impairment)
- **Clinical Target:** Positive Bipolar Spectrum Disorder Screen (Hirschfeld et al. 2000 3-tier criteria)
- **Sample Counts:**
  - Training Samples: **1043** (Positive: 128, Negative: 915)
  - Held-out Test Samples: **261** (Positive: 32, Negative: 229)
- **5-Fold Cross-Validation Macro F1:** **0.7551** $\pm$ 0.0253
- **Held-Out Test Results:**
  - **Accuracy:** **84.67%**
  - **ROC-AUC Score:** **0.9327**
  - **Macro F1 Score:** **0.7563**
  - **Bipolar Risk Precision:** **44.29%**
  - **Bipolar Risk Recall:** **96.88%**
  - **Bipolar Risk F1:** **0.6078**

### Confusion Matrix (Test Set: N=261)
| | Predicted Negative (Low Risk) | Predicted Positive (Bipolar Spectrum Risk) |
|---|---|---|
| **Actual Negative** | 190 (TN) | 39 (FP) |
| **Actual Positive** | 1 (FN) | 31 (TP) |

### Top Predictive MDQ Features
- **q_15**: 20.56% relative importance
- **q_11**: 13.44% relative importance
- **q_4**: 12.09% relative importance
- **q_14**: 11.69% relative importance
- **q_12**: 9.19% relative importance
- **q_1**: 5.29% relative importance

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
