@echo off
echo ===================================================
echo Running MindWave ML and System Automated Test Suite
echo ===================================================
cd /d "%~dp0"

echo.
echo [1/3] Running Python ML Test Suite (pytest)...
ml\venv\Scripts\pytest.exe ml\tests\test_ml.py -v
if errorlevel 1 (
    echo Python ML tests failed.
    pause
    exit /b 1
)

echo.
echo [2/3] Running MindWave Scoring Validation Tests...
node test-scoring.js
if errorlevel 1 (
    echo Scoring tests failed.
    pause
    exit /b 1
)

echo.
echo [3/3] Running Full-Stack Integration Tests...
node test-ml-integration.cjs
if errorlevel 1 (
    echo Integration tests failed.
    pause
    exit /b 1
)

echo.
echo ===================================================
echo ALL TESTS PASSED SUCCESSFULLY!
echo ===================================================
pause
