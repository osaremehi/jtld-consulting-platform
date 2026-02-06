"""JTLD Consulting Inc - ML Microservice."""

import os
from contextlib import asynccontextmanager
from datetime import datetime, timezone

import spacy
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import matching, parsing

nlp = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load ML models on startup."""
    global nlp
    nlp = spacy.load("en_core_web_sm")
    app.state.nlp = nlp
    yield
    nlp = None


app = FastAPI(
    title="JTLD Consulting ML Service",
    version="1.0.0",
    docs_url="/docs" if os.getenv("ENVIRONMENT") != "production" else None,
    redoc_url=None,
    lifespan=lifespan,
)

# CORS
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)

# Routes
app.include_router(parsing.router, prefix="/api/v1", tags=["parsing"])
app.include_router(matching.router, prefix="/api/v1", tags=["matching"])


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "1.0.0",
        "checks": {
            "nlp_model": {"status": "up" if app.state.nlp else "down"},
        },
    }
