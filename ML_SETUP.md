# MindWave Machine Learning Setup & Operations Guide (Windows PowerShell)

This document provides complete instructions for setting up, training, serving, and testing the **Random Forest Machine Learning System** integrated into the MindWave platform.

---

## 1. Scientific Dataset Metadata & Provenance

- **Study Title:** *Comprehensive Data on the Prevalence of Psychiatric Symptoms in UK University Students*
- **Authors:** Umair Akram, Kamila Irvine, Maria Gardani, Sarah Allen, Jodie C. Stevenson
- **Publication:** *Scientific Data* (Nature Publishing Group), 2023
- **Persistent Identifier (DOI):** [10.6084/m9.figshare.24052236.v2](https://doi.org/10.6084/m9.figshare.24052236.v2)
- **License:** Creative Commons Attribution 4.0 International (**CC BY 4.0**)
- **Cohort Size:** $N = 1,408$ research participants (Demographic: University students, Young Adults aged 18–25+)
- **Storage Location in Project:**
  - Raw Data: `ml/data/raw/Akram_et_al_2023_Student_MH_Data_UK_SciData.xlsx`
  - Codebook & Documentation: `ml/data/raw/Variable_codes_and_abbreviations.pdf`
  - Manifest Metadata: `ml/data/raw/dataset_metadata.json`

### Supported Clinical Instruments & Models
1. **Schizophrenia / Psychosis Risk Classifier:**
   - **Instrument:** Prodromal Questionnaire 16 (**PQ-16**), 16 binary items.
   - **Ground-Truth Target:** Ultra-High Risk (UHR) of psychosis / prodromal schizophrenia indicator ($\ge 6$ endorsed items, Ising et al., 2012).
   - **Supported Demographics:** Young Adult (`19-25`) and adult cohorts (`26-31`, `32-36`, `37-43`, `44-50`, `50+`).
2. **Bipolar Disorder Spectrum Classifier:**
   - **Instrument:** Mood Disorder Questionnaire (**MDQ**), 15 items (13 core symptoms, Item 14 co-occurrence/synchrony, Item 15 functional impairment).
   - **Ground-Truth Target:** Positive Bipolar Spectrum Screen meeting strict 3-tier Hirschfeld et al. (2000) clinical research criteria ($\ge 7$ symptoms + simultaneous co-occurrence + moderate/serious functional impact).

---

## 2. Directory Structure

```text
c:\newresponseanalysermindwave\MINDWAVE-RESPONSE-ANALYZER-main\
├── ml/
│   ├── venv/                      # Project-local Python 3.12 virtual environment
│   ├── data/
│   │   ├── raw/                   # Unchanged raw Excel dataset & documentation
│   │   └── processed/             # Cleaned train/test CSV splits (80/20 stratified)
│   ├── models/
│   │   ├── random_forest_pipeline.joblib   # Master registry containing both models & schema
│   │   ├── schizophrenia_rf_pipeline.joblib # Standalone PQ-16 Random Forest pipeline
│   │   └── bipolar_rf_pipeline.joblib       # Standalone MDQ Random Forest pipeline
│   ├── reports/
│   │   ├── evaluation_report.json # Machine-readable performance metrics
│   │   └── evaluation_report.md   # Detailed Markdown evaluation breakdown
│   ├── src/
│   │   ├── download_dataset.py    # Automated dataset download & hash verifier
│   │   ├── preprocess.py          # Data cleaning, target encoding & train/test splitting
│   │   ├── train.py               # Reproducible scikit-learn Random Forest training
│   │   └── api.py                 # FastAPI prediction microservice (port 8000)
│   └── tests/
│       ├── test_ml.py             # Automated pytest suite (12 unit & integration tests)
│       └── live_test.py           # Live HTTP client verification script
├── src/
│   ├── components/
│   │   └── ExperimentalMlSection.jsx # UI component on the Result Page
│   └── services/
│       └── mlService.js           # Client fetch service for port 8000
├── ML_SETUP.md                    # This operations guide
├── test-ml-integration.cjs        # Node.js full-stack integration test
└── package.json
```

---

## 3. Prerequisites & Environment

- **Operating System:** Windows 10/11 (64-bit) with PowerShell.
- **Python:** Python 3.12.x installed.
- **Node.js:** Node.js v20.x or higher with npm.

All Python dependencies are installed in the project-local virtual environment `ml\venv`:
- `scikit-learn` 1.9.1 (Random Forest Classifier, Pipeline, SimpleImputer)
- `pandas` 3.1.0 and `numpy` 2.5.4
- `joblib` 1.6.0
- `fastapi` 0.162.0 and `uvicorn` 0.54.0
- `pydantic` 2.14.1
- `openpyxl` 3.1.5
- `httpx` and `pytest` 9.1.1

---

## 4. Quickstart: Step-by-Step Execution Commands (Windows PowerShell)

Open PowerShell in the project directory:
```powershell
cd c:\newresponseanalysermindwave\MINDWAVE-RESPONSE-ANALYZER-main
```

### Step 4.1: Download & Verify Dataset
*(Already completed automatically, but can be rerun anytime)*
```powershell
.\ml\venv\Scripts\python.exe ml\src\download_dataset.py
```

### Step 4.2: Preprocess & Split Data
```powershell
.\ml\venv\Scripts\python.exe ml\src\preprocess.py
```

### Step 4.3: Train Random Forest Models & Generate Reports
```powershell
.\ml\venv\Scripts\python.exe ml\src\train.py
```

### Step 4.4: Run Automated Tests
```powershell
# 1. Run Python ML test suite (12 tests)
.\ml\venv\Scripts\pytest.exe ml\tests\test_ml.py -v

# 2. Run Node.js scoring & validation tests (24 tests)
node test-scoring.js

# 3. Run full-stack integration test
node test-ml-integration.cjs
```

### Step 4.5: Start the Random Forest ML Microservice (Port 8000)
In a dedicated PowerShell terminal:
```powershell
.\ml\venv\Scripts\python.exe -m uvicorn ml.src.api:app --host 127.0.0.1 --port 8000
```
*Health probe:* Open browser at `http://127.0.0.1:8000/api/ml/health` or API docs at `http://127.0.0.1:8000/docs`.

### Step 4.6: Start the MindWave Frontend (Vite)
In a second PowerShell terminal:
```powershell
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 5. Model Evaluation & Performance Summary

Evaluated on held-out test data (20% stratified test partition, random seed 42):

| Metric | PQ-16 Schizophrenia / Psychosis Risk | MDQ Bipolar Spectrum Risk |
|---|---|---|
| **Algorithm** | `scikit-learn` Random Forest (`n_estimators=150`, `max_depth=6`) | `scikit-learn` Random Forest (`n_estimators=150`, `max_depth=6`) |
| **Training Samples** | 1,112 ($329$ positive, $783$ negative) | 1,043 ($128$ positive, $915$ negative) |
| **Held-Out Test Samples** | 279 ($82$ positive, $197$ negative) | 261 ($32$ positive, $229$ negative) |
| **5-Fold Cross-Val Macro F1** | **0.9230** $\pm$ 0.0227 | **0.7551** $\pm$ 0.0253 |
| **Held-Out Test Accuracy** | **97.49%** | **84.67%** |
| **Held-Out ROC-AUC** | **0.9959** | **0.9327** |
| **Sensitivity (Recall)** | **98.78%** ($81$ of $82$ true positives detected) | **96.88%** ($31$ of $32$ true positives detected) |
| **Precision** | **93.10%** | **44.29%** |
| **Test Set Confusion Matrix** | TN: $191$, FP: $6$, FN: $1$, TP: $81$ | TN: $190$, FP: $39$, FN: $1$, TP: $31$ |

Full details and feature split rankings are recorded in [`ml/reports/evaluation_report.md`](file:///c:/newresponseanalysermindwave/MINDWAVE-RESPONSE-ANALYZER-main/ml/reports/evaluation_report.md).

---

## 6. How to Test the Prediction Endpoint Manually

You can test the endpoint using PowerShell `Invoke-RestMethod`:

```powershell
# Test Schizophrenia Screening Request:
$body = @{
    assessment_type = "schizophrenia"
    age_group = "19-25"
    profession = "student"
    answers = 1..16 | ForEach-Object {
        @{
            id = $_
            answer = if ($_ -le 8) { "True" } else { "False" }
            followUp1 = 3
            followUp2 = 2
        }
    }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/ml/predict" -Method Post -Body $body -ContentType "application/json"
```

Or run the automated live test script:
```powershell
.\ml\venv\Scripts\python.exe ml\tests\live_test.py
```

---

## 7. Retraining and Model Versioning

To retrain the model or update hyperparameters:
1. Modify hyperparameters in `ml/src/train.py` (e.g. `n_estimators`, `max_depth`, `min_samples_split`).
2. Update `MODEL_VERSION` in `ml/src/train.py` (e.g. `"1.1.0-rf-mindwave"`).
3. Run:
   ```powershell
   .\ml\venv\Scripts\python.exe ml\src\train.py
   ```
4. Restart the FastAPI service to reload the updated model pipeline into memory.

---

## 8. Troubleshooting

- **Service returns `status: "offline"`:** Ensure the FastAPI microservice is running on port 8000 using `.\ml\venv\Scripts\python.exe -m uvicorn ml.src.api:app --host 127.0.0.1 --port 8000`.
- **`status: "unsupported"`:** Age groups `6-12` (Child) and `13-18` (Adolescent) are intentionally blocked from adult Random Forest inference because the underlying research dataset was validated on university/adult populations ($18-25+$). The UI clearly displays this distinction and preserves the primary screening score.
- **Port 8000 in use:** You can change the port in `ml/src/api.py` and `src/services/mlService.js` (e.g., to port 8001).
