@echo off
echo Starting MindWave Random Forest Prediction Service on port 8000...
cd /d "%~dp0"
ml\venv\Scripts\python.exe -m uvicorn ml.src.api:app --host 127.0.0.1 --port 8000
pause
