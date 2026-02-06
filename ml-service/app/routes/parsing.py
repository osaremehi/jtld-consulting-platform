"""Resume parsing endpoints."""

from fastapi import APIRouter, File, HTTPException, Request, UploadFile
from pydantic import BaseModel

router = APIRouter()


class ParsedResume(BaseModel):
    """Structured resume data extracted from a document."""

    name: str | None = None
    email: str | None = None
    phone: str | None = None
    summary: str | None = None
    skills: list[str] = []
    experience: list[dict] = []
    education: list[dict] = []
    certifications: list[dict] = []


@router.post("/parse-resume", response_model=ParsedResume)
async def parse_resume(request: Request, file: UploadFile = File(...)):
    """Parse a resume file (PDF or DOCX) and extract structured data."""
    if file.content_type not in [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported",
        )

    if file.size and file.size > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds 10MB limit")

    content = await file.read()
    nlp = request.app.state.nlp

    # Extract text based on file type
    text = ""
    if file.content_type == "application/pdf":
        from PyPDF2 import PdfReader
        from io import BytesIO

        reader = PdfReader(BytesIO(content))
        text = " ".join(page.extract_text() or "" for page in reader.pages)
    else:
        from docx import Document
        from io import BytesIO

        doc = Document(BytesIO(content))
        text = " ".join(para.text for para in doc.paragraphs)

    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from file")

    # Use spaCy NLP for entity extraction
    doc = nlp(text[:100000])  # Limit to prevent memory issues

    # Extract entities
    skills = []
    name = None
    email = None

    for ent in doc.ents:
        if ent.label_ == "PERSON" and not name:
            name = ent.text
        elif ent.label_ == "ORG":
            pass  # Could be used for company extraction

    # Extract email with regex
    import re

    email_match = re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+", text)
    if email_match:
        email = email_match.group(0)

    # Extract phone
    phone_match = re.search(
        r"[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}", text
    )
    phone = phone_match.group(0) if phone_match else None

    return ParsedResume(
        name=name,
        email=email,
        phone=phone,
        summary=text[:500] if len(text) > 100 else None,
        skills=skills,
        experience=[],
        education=[],
        certifications=[],
    )
