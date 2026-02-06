"""Candidate-job matching endpoints."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class MatchRequest(BaseModel):
    """Input for matching a candidate against a job."""

    candidate_skills: list[str]
    candidate_experience_years: int = 0
    candidate_location: str | None = None
    candidate_desired_rate: float | None = None
    candidate_work_arrangement: str | None = None
    job_required_skills: list[str]
    job_preferred_skills: list[str] = []
    job_experience_level: str | None = None
    job_location: str | None = None
    job_rate_min: float | None = None
    job_rate_max: float | None = None
    job_work_arrangement: str | None = None


class MatchResult(BaseModel):
    """Output of the matching algorithm."""

    overall_score: int  # 0-100
    skill_score: int
    experience_score: int
    location_score: int
    rate_score: int
    arrangement_score: int
    reasons: list[str]


@router.post("/match", response_model=MatchResult)
async def match_candidate_to_job(request: MatchRequest):
    """Calculate match score between a candidate and a job."""
    reasons = []

    # ── Skill matching (weight: 40%) ─────────────────────────
    candidate_skills_lower = {s.lower() for s in request.candidate_skills}
    required_lower = {s.lower() for s in request.job_required_skills}
    preferred_lower = {s.lower() for s in request.job_preferred_skills}

    required_matches = candidate_skills_lower & required_lower
    preferred_matches = candidate_skills_lower & preferred_lower

    if required_lower:
        required_pct = len(required_matches) / len(required_lower)
    else:
        required_pct = 1.0

    if preferred_lower:
        preferred_pct = len(preferred_matches) / len(preferred_lower)
    else:
        preferred_pct = 1.0

    skill_score = int((required_pct * 0.7 + preferred_pct * 0.3) * 100)

    if required_pct >= 0.8:
        reasons.append(f"Strong skill match ({len(required_matches)}/{len(required_lower)} required skills)")
    elif required_pct >= 0.5:
        reasons.append(f"Partial skill match ({len(required_matches)}/{len(required_lower)} required skills)")
    else:
        reasons.append(f"Low skill match ({len(required_matches)}/{len(required_lower)} required skills)")

    # ── Experience matching (weight: 20%) ────────────────────
    experience_map = {"JUNIOR": 1, "INTERMEDIATE": 3, "SENIOR": 5, "LEAD": 8, "EXECUTIVE": 10}
    expected_years = experience_map.get(request.job_experience_level or "", 0)

    if expected_years == 0:
        experience_score = 100
    elif request.candidate_experience_years >= expected_years:
        experience_score = 100
        reasons.append("Experience level meets or exceeds requirement")
    elif request.candidate_experience_years >= expected_years * 0.7:
        experience_score = 75
        reasons.append("Experience slightly below requirement")
    else:
        experience_score = max(0, int((request.candidate_experience_years / expected_years) * 100))

    # ── Location matching (weight: 15%) ──────────────────────
    if not request.job_location or not request.candidate_location:
        location_score = 80  # neutral
    elif request.job_work_arrangement == "REMOTE":
        location_score = 100
        reasons.append("Remote position - location flexible")
    elif request.candidate_location.lower() == request.job_location.lower():
        location_score = 100
        reasons.append("Location match")
    else:
        location_score = 40
        reasons.append("Location mismatch")

    # ── Rate matching (weight: 15%) ──────────────────────────
    if not request.candidate_desired_rate or not request.job_rate_max:
        rate_score = 80  # neutral
    elif request.job_rate_min and request.candidate_desired_rate >= request.job_rate_min and request.candidate_desired_rate <= request.job_rate_max:
        rate_score = 100
        reasons.append("Rate within budget range")
    elif request.candidate_desired_rate <= (request.job_rate_max * 1.1):
        rate_score = 70
        reasons.append("Rate slightly above budget")
    else:
        rate_score = 30
        reasons.append("Rate significantly above budget")

    # ── Work arrangement matching (weight: 10%) ──────────────
    if not request.job_work_arrangement or not request.candidate_work_arrangement:
        arrangement_score = 80
    elif request.candidate_work_arrangement == request.job_work_arrangement:
        arrangement_score = 100
        reasons.append("Work arrangement preference matches")
    elif request.job_work_arrangement == "HYBRID":
        arrangement_score = 70  # hybrid is flexible
    else:
        arrangement_score = 40
        reasons.append("Work arrangement preference mismatch")

    # ── Overall score (weighted) ─────────────────────────────
    overall_score = int(
        skill_score * 0.40
        + experience_score * 0.20
        + location_score * 0.15
        + rate_score * 0.15
        + arrangement_score * 0.10
    )

    return MatchResult(
        overall_score=min(overall_score, 100),
        skill_score=skill_score,
        experience_score=experience_score,
        location_score=location_score,
        rate_score=rate_score,
        arrangement_score=arrangement_score,
        reasons=reasons,
    )
