"""
Convenience entry point for MindWave ML FastAPI Application
Allows launching via: uvicorn ml.app:app or python -m uvicorn ml.src.api:app
"""

from ml.src.api import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("ml.app:app", host="127.0.0.1", port=8000, reload=True)
