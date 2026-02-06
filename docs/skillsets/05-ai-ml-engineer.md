# AI/ML Engineer

## Role Overview

The AI/ML Engineer is responsible for building intelligent features for the JTLD Consulting Inc platform including candidate-job matching algorithms, resume parsing, skills extraction, and predictive analytics. This role powers the platform's competitive advantage through smart automation.

## Priority

**Medium** - Phase 3

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Python | Primary language for ML development |
| TensorFlow / PyTorch | Deep learning frameworks |
| scikit-learn | Classical ML algorithms |
| spaCy / NLTK | Natural Language Processing |
| Hugging Face Transformers | Pre-trained NLP models |
| FastAPI | Python API for ML model serving |
| OpenAI API / Azure OpenAI | Large Language Model integration |
| Pandas / NumPy | Data manipulation and analysis |

---

## Skills

### 1. Resume Parsing Pipeline

**Purpose:** This skill exists to convert unstructured resume files (PDF, DOCX) into structured candidate profile data that can be stored in PostgreSQL and consumed by the matching engine.

**Preconditions:**
- Python 3.10+ installed with a virtual environment activated.
- FastAPI microservice project initialized with `requirements.txt` including: `fastapi`, `uvicorn`, `python-multipart`, `pdfplumber`, `python-docx`, `spacy`, `pydantic`.
- spaCy English model downloaded (`python -m spacy download en_core_web_lg`).
- The output schema is defined and agreed upon with the Next.js backend team.
- A test set of at least 20 real resumes (mixed PDF and DOCX formats) is available for validation.

**Steps:**
1. Create a FastAPI endpoint `POST /api/v1/parse-resume` that accepts a file upload (`UploadFile`).
2. Detect the file type by extension. Use `pdfplumber` for PDF extraction and `python-docx` for DOCX extraction. Reject unsupported formats with a `400` response.
3. Extract raw text from the file. For PDFs, iterate over every page and concatenate text. For DOCX, iterate over every paragraph.
4. Clean the extracted text: normalize whitespace, remove non-printable characters, fix encoding issues.
5. Use spaCy NER to extract named entities: `PERSON` (name), `ORG` (companies), `DATE` (employment dates), `GPE` (locations).
6. Build a regex-based extractor for structured fields that NER misses: email addresses (`r"[\w.-]+@[\w.-]+\.\w+"`), phone numbers, LinkedIn URLs.
7. Use a custom skills extractor that matches text against a canonical skills taxonomy (loaded from a JSON file or database table). Match case-insensitively and handle aliases (e.g., "JS" maps to "JavaScript").
8. Parse experience sections by identifying patterns: job title, company name, date range, and bullet-point descriptions. Return as a list of experience objects.
9. Parse education sections by identifying institution names, degree types, fields of study, and graduation dates.
10. Assemble the final structured output matching this schema:
    ```python
    {
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "+1-555-123-4567",
      "location": "New York, NY",
      "skills": ["Python", "React", "AWS", "SQL"],
      "experience": [
        {
          "title": "Senior Developer",
          "company": "Tech Corp",
          "start_date": "2020-01",
          "end_date": "2023-06",
          "description": "Led backend team..."
        }
      ],
      "education": [
        {
          "institution": "MIT",
          "degree": "BS",
          "field": "Computer Science",
          "graduation_date": "2019"
        }
      ],
      "certifications": ["AWS Solutions Architect"]
    }
    ```
11. Validate the output using a Pydantic model before returning. Fields that could not be extracted should be `null`, not guessed.
12. Run the parser against the full test set of 20 resumes. Log extraction accuracy per field. Target: name extraction above 95%, email above 98%, skills above 85%.
13. Add error handling: return `422` if the file is corrupted, `413` if the file exceeds 10MB, `500` with a generic message if an internal error occurs.

**What NOT to Do:**
- Do not infer or guess field values that are not present in the resume text. If a phone number is not found, return `null`.
- Do not assume all resumes follow the same format; handle chronological, functional, and hybrid layouts.
- Do not load the spaCy model on every request; load it once at application startup and reuse the instance.
- Do not return raw Python tracebacks to the client; wrap all errors in structured error responses.
- Do not skip the DOCX format; many candidates submit Word documents.
- Do not hardcode the skills taxonomy; load it from an external source so it can be updated without redeployment.

**Done Condition:** The `/api/v1/parse-resume` endpoint accepts PDF and DOCX files, returns a validated Pydantic response matching the schema above, and extracts name, email, skills, experience, and education from at least 85% of test resumes correctly. Errors return proper HTTP status codes. The endpoint responds within 5 seconds for a typical 2-page resume.

---

### 2. Skills Taxonomy and Extraction System

**Purpose:** This skill exists to maintain a hierarchical, canonical list of technology skills and to accurately extract and normalize skill mentions from free-text sources (resumes, job descriptions) so that matching is performed on standardized terms, not raw strings.

**Preconditions:**
- Resume parser (Skill 1) is functional and returns raw skill strings.
- A JSON or database table stores the initial skills taxonomy.
- spaCy or a similar NLP library is available.
- Access to the PostgreSQL database via the Next.js backend API or direct connection.

**Steps:**
1. Define the taxonomy schema as a hierarchical JSON structure:
   ```python
   {
     "Programming": {
       "Frontend": ["React", "Vue", "Angular", "HTML", "CSS", "TypeScript", "JavaScript"],
       "Backend": ["Node.js", "Python", "Java", "C#", ".NET", "Go", "Ruby"],
       "Mobile": ["React Native", "Flutter", "Swift", "Kotlin"]
     },
     "Cloud": {
       "AWS": ["EC2", "S3", "Lambda", "RDS", "CloudFront"],
       "Azure": ["App Service", "Functions", "Cosmos DB", "Blob Storage"],
       "GCP": ["Compute Engine", "Cloud Functions", "BigQuery"]
     },
     "Data": {
       "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
       "Analytics": ["Pandas", "NumPy", "Tableau", "Power BI"],
       "Big Data": ["Spark", "Hadoop", "Kafka", "Airflow"]
     }
   }
   ```
2. Build an alias mapping dictionary that maps variations to canonical names: `{"js": "JavaScript", "react.js": "React", "reactjs": "React", "node": "Node.js", "postgres": "PostgreSQL", "k8s": "Kubernetes"}`.
3. Implement a `normalize_skill(raw: str) -> str | None` function that: lowercases the input, checks the alias map, then checks the taxonomy. Returns the canonical name or `None` if no match is found.
4. Implement a `extract_skills(text: str) -> list[str]` function that: tokenizes the text, matches n-grams (1 to 3 words) against the taxonomy and alias map, deduplicates, and returns a sorted list of canonical skill names.
5. Create a FastAPI endpoint `POST /api/v1/extract-skills` that accepts `{"text": "..."}` and returns `{"skills": [...]}`.
6. Create a FastAPI endpoint `GET /api/v1/taxonomy` that returns the full taxonomy tree for use by the frontend (e.g., for skill selection dropdowns).
7. Create a FastAPI endpoint `POST /api/v1/taxonomy/suggest` that accepts unmatched skill strings and queues them for human review (stored in a `pending_skills` table or list).
8. Test extraction against 50 diverse job descriptions and 50 resumes. Calculate precision (no false positives) and recall (no missed skills). Target: precision above 90%, recall above 80%.
9. Integrate with the resume parser: after raw text extraction, pipe the text through `extract_skills` and return normalized skills in the parser output.

**What NOT to Do:**
- Do not treat skill extraction as simple keyword matching alone; handle multi-word skills ("React Native", "Machine Learning") and avoid false positives ("Java" inside "JavaScript").
- Do not add skills to the taxonomy without the alias mapping step; unmapped variations will cause duplicate entries.
- Do not assume the taxonomy is complete; always provide a mechanism for unmatched skills to be reviewed and added.
- Do not perform case-sensitive matching; "python", "Python", and "PYTHON" must all resolve to "Python".
- Do not return raw unmatched strings as skills; return only canonicalized names or flag them as unrecognized.

**Done Condition:** The taxonomy contains at least 200 canonical skills organized hierarchically. The alias map covers at least 3 aliases per top-20 skill. The `extract_skills` function achieves above 90% precision and above 80% recall on the test set. The `/api/v1/taxonomy` endpoint returns the full tree. Unmatched skills are queued for review.

---

### 3. Candidate-Job Matching Engine

**Purpose:** This skill exists to score and rank candidates against job postings using multi-factor matching (skills, experience, location, preferences) so that recruiters see the most relevant candidates first, with transparent explanations for each match.

**Preconditions:**
- Skills taxonomy and extraction system operational (Skill 2 completed).
- Resume parser producing structured candidate profiles (Skill 1 completed).
- Job postings stored in PostgreSQL with structured fields: `required_skills`, `preferred_skills`, `experience_min`, `experience_max`, `location`, `remote_ok`, `salary_min`, `salary_max`.
- Candidate profiles stored with: `skills`, `years_experience`, `location`, `remote_preference`, `salary_expectation`.
- FastAPI microservice is running and can query the PostgreSQL database or receive data via API.

**Steps:**
1. Define the matching score components and their weights:
   - Required skills match: 40% weight
   - Preferred skills match: 15% weight
   - Experience level match: 20% weight
   - Location/remote match: 15% weight
   - Salary alignment: 10% weight
2. Implement `score_skills(candidate_skills: list[str], required: list[str], preferred: list[str]) -> float`:
   - Calculate required coverage: `len(intersection(candidate, required)) / len(required)`.
   - Calculate preferred bonus: `len(intersection(candidate, preferred)) / len(preferred)`.
   - Use the taxonomy hierarchy for partial credit: if the job requires "React" and the candidate has "Vue", give partial credit (0.3) because both are under "Frontend".
3. Implement `score_experience(candidate_years: int, min_years: int, max_years: int) -> float`:
   - Return 1.0 if candidate years are within range.
   - Return 0.7 if within 1 year below minimum (slightly under-qualified).
   - Return 0.5 if more than 2 years above maximum (over-qualified risk).
   - Return 0.0 if more than 3 years below minimum.
4. Implement `score_location(candidate_location: str, job_location: str, remote_ok: bool, candidate_remote_pref: bool) -> float`:
   - Return 1.0 if locations match or if remote is acceptable to both parties.
   - Return 0.5 if partial metro area match.
   - Return 0.0 if locations conflict and remote is not an option.
5. Implement `score_salary(candidate_expectation: int, job_min: int, job_max: int) -> float`:
   - Return 1.0 if expectation is within the job range.
   - Return 0.5 if expectation is within 10% above job max.
   - Return 0.0 if expectation exceeds job max by more than 20%.
6. Implement `match(job: Job, candidate: Candidate) -> MatchResult`:
   - Compute each component score.
   - Compute the weighted total: `total = sum(weight * score for each component)`.
   - Generate a `reasons` list explaining the top contributing factors and any disqualifiers.
   - Return the result:
     ```python
     {
       "candidate_id": "c1",
       "score": 0.92,
       "breakdown": {
         "required_skills": 0.95,
         "preferred_skills": 0.80,
         "experience": 1.0,
         "location": 1.0,
         "salary": 0.75
       },
       "reasons": [
         "Matches 19/20 required skills",
         "5 years experience within 3-7 year range",
         "Open to remote work",
         "Salary expectation 8% above range midpoint"
       ]
     }
     ```
7. Create a FastAPI endpoint `POST /api/v1/match` that accepts a `job_id`, queries all active candidates, scores each, and returns the top N ranked matches (default N=20).
8. Implement batch processing: for a new job posting, compute matches for all candidates asynchronously and cache results. For a new candidate profile, compute matches against all open jobs.
9. Add filters: allow the caller to pre-filter by minimum score threshold, specific skills, or location before ranking.
10. Test with synthetic data: create 10 jobs and 100 candidates with known match qualities. Verify that the top-ranked candidates for each job are the ones a human recruiter would also rank highest.

**What NOT to Do:**
- Do not use a single score without a breakdown; recruiters need to understand why a candidate was ranked.
- Do not treat all skills as equally important; required skills must weigh more than preferred skills.
- Do not return candidates with a score of 0.0; filter them out before returning results.
- Do not hardcode scoring weights; store them in configuration so they can be tuned without code changes.
- Do not match against stale data; always use the latest candidate profile and job posting data.
- Do not assume that more experience is always better; over-qualification is a real disqualifier in staffing.

**Done Condition:** The `/api/v1/match` endpoint returns ranked candidates with scores and human-readable explanations. Scoring weights are configurable. Batch matching completes for 1000 candidates against 1 job in under 10 seconds. Manual review of top-10 results for 5 test jobs confirms ranking accuracy matches recruiter intuition.

---

### 4. OpenAI API Integration and Prompt Engineering

**Purpose:** This skill exists to integrate the OpenAI API (GPT-4) into the JTLD platform for tasks that benefit from large language model capabilities: generating job descriptions, summarizing candidate profiles, answering recruiter questions about candidates, and enhancing search queries.

**Preconditions:**
- OpenAI API key obtained and stored as `OPENAI_API_KEY` environment variable.
- `openai` Python package installed (`pip install openai`).
- FastAPI microservice running.
- Clear definitions of which tasks will use the LLM (not every task needs it; use traditional ML where appropriate).
- A cost budget established (GPT-4 tokens are expensive; define maximum tokens per request and daily spend limits).

**Steps:**
1. Create a shared OpenAI client wrapper at `app/services/llm_service.py`:
   ```python
   from openai import OpenAI
   import os

   client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

   async def call_llm(
       system_prompt: str,
       user_prompt: str,
       model: str = "gpt-4",
       max_tokens: int = 1000,
       temperature: float = 0.3
   ) -> str:
       response = client.chat.completions.create(
           model=model,
           messages=[
               {"role": "system", "content": system_prompt},
               {"role": "user", "content": user_prompt}
           ],
           max_tokens=max_tokens,
           temperature=temperature
       )
       return response.choices[0].message.content
   ```
2. Implement **Job Description Generation** (`POST /api/v1/generate-job-description`):
   - Accept: job title, required skills, experience range, company context.
   - System prompt: "You are a professional recruiter writing job descriptions for IT staffing positions. Write clear, inclusive, and specific descriptions. Include responsibilities, requirements, and benefits sections."
   - Validate the output contains all required sections before returning.
   - Max tokens: 1500. Temperature: 0.5 (allow some creativity).
3. Implement **Candidate Summary** (`POST /api/v1/summarize-candidate`):
   - Accept: full structured candidate profile (from resume parser).
   - System prompt: "You are a technical recruiter summarizing candidate profiles. Write a 3-4 sentence summary highlighting key skills, experience level, and notable achievements. Be factual; do not embellish."
   - Max tokens: 300. Temperature: 0.2 (keep it factual).
4. Implement **Search Query Enhancement** (`POST /api/v1/enhance-search`):
   - Accept: raw search query from a recruiter (e.g., "need a frontend dev who knows react and some backend").
   - System prompt: "Extract structured search criteria from the recruiter's natural language query. Return JSON with fields: skills (array), experience_min (int or null), experience_max (int or null), location (string or null), remote (boolean or null)."
   - Parse the LLM response as JSON. Validate with Pydantic. If parsing fails, fall back to the raw query.
   - Max tokens: 200. Temperature: 0.0 (deterministic).
5. Add token usage tracking: log `prompt_tokens`, `completion_tokens`, and `total_tokens` for every request. Store in a `llm_usage` table with timestamp, endpoint, and user ID.
6. Implement rate limiting: maximum 100 LLM calls per user per hour, maximum 10,000 calls per day platform-wide.
7. Implement fallback behavior: if the OpenAI API returns an error or times out (set timeout to 30 seconds), return a graceful error message and log the failure. Do not crash the request.
8. Add a `/api/v1/llm/usage` endpoint for admins to monitor token consumption and costs.
9. Test each endpoint with at least 10 diverse inputs. Verify output quality, response times (under 10 seconds), and error handling.

**What NOT to Do:**
- Do not send sensitive personal data (SSN, full addresses, dates of birth) to the OpenAI API.
- Do not use high temperature (above 0.7) for factual extraction tasks; this introduces hallucinations.
- Do not skip token usage tracking; unmonitored LLM usage will cause unexpected costs.
- Do not cache LLM responses indefinitely; job descriptions and candidate data change.
- Do not use the LLM for tasks that a simple algorithm handles better (e.g., exact skill matching, date parsing).
- Do not trust LLM output without validation; always parse and validate the response before returning it to the client.
- Do not expose the OpenAI API key to the frontend or in logs.

**Done Condition:** All three LLM endpoints (job description, candidate summary, search enhancement) return validated results. Token usage is logged for every call. Rate limits are enforced. Timeout and error fallbacks work correctly. Average response time is under 10 seconds. Monthly cost projection based on test usage is within budget.

---

### 5. Retrieval Augmented Generation (RAG) for Recruitment Knowledge

**Purpose:** This skill exists to build a RAG system that enables the LLM to answer recruiter questions using the platform's own data (job postings, candidate profiles, company policies, placement history) instead of relying solely on the LLM's training data.

**Preconditions:**
- OpenAI API integration operational (Skill 4 completed).
- A vector database or vector-capable storage is available (options: pgvector extension for PostgreSQL, Pinecone, Weaviate, or ChromaDB).
- Platform data exists: at least 50 job postings, 100 candidate profiles, and internal knowledge documents (FAQ, policies).
- `openai` package supports embeddings (`text-embedding-ada-002` or `text-embedding-3-small`).

**Steps:**
1. Install and configure the vector storage. If using pgvector, enable the extension in PostgreSQL:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
   Create a table for embeddings:
   ```sql
   CREATE TABLE embeddings (
     id SERIAL PRIMARY KEY,
     source_type VARCHAR(50),  -- 'job', 'candidate', 'policy'
     source_id VARCHAR(100),
     content TEXT,
     embedding vector(1536),
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```
2. Build an embedding pipeline: for each document (job posting, candidate profile summary, policy document), call `openai.embeddings.create(model="text-embedding-3-small", input=text)` and store the resulting vector alongside the source metadata.
3. Implement a chunking strategy for long documents: split into chunks of 500 tokens with 50-token overlap. Each chunk gets its own embedding and retains the source reference.
4. Create a `search_similar(query: str, top_k: int = 5, source_type: str = None) -> list[dict]` function:
   - Generate an embedding for the query.
   - Perform a cosine similarity search against the vector store.
   - Filter by `source_type` if specified.
   - Return the top-k most similar documents with their content and similarity scores.
5. Create a FastAPI endpoint `POST /api/v1/rag/ask`:
   - Accept: `{"question": "...", "context_type": "jobs" | "candidates" | "all"}`.
   - Retrieve the top 5 relevant documents using `search_similar`.
   - Construct a prompt: system message explains the assistant role, user message includes the retrieved documents as context followed by the question.
   - Call the LLM with the augmented prompt.
   - Return the answer along with source references (so the recruiter can verify).
6. Build an indexing job that runs on a schedule (or triggered by webhooks): whenever a new job is posted or a candidate profile is updated, generate and store the embedding. Use batch processing for efficiency (up to 100 texts per embedding API call).
7. Implement a reindexing command for bulk rebuilds: `python -m app.tasks.reindex --source-type=jobs`.
8. Test with 20 recruiter-style questions. Evaluate: Does the answer reference real platform data? Is the answer factually accurate against the source documents? Are source references correct?

**What NOT to Do:**
- Do not embed entire databases in a single call; process in batches of 100 texts maximum per API call.
- Do not skip chunking for long documents; embeddings degrade in quality for texts longer than 500 tokens.
- Do not return RAG answers without source references; recruiters must be able to verify claims.
- Do not store embeddings without source metadata; orphaned vectors are useless for attribution.
- Do not assume embeddings are permanent; when source data changes, the corresponding embedding must be regenerated.
- Do not use RAG for simple lookup queries (e.g., "how many open jobs?"); use database queries for those.

**Done Condition:** The vector store contains embeddings for all active job postings, candidate summaries, and policy documents. The `/api/v1/rag/ask` endpoint returns answers grounded in platform data with source references. Answers to 20 test questions are factually accurate (verified against source documents). New data is automatically indexed within 5 minutes of creation. Reindexing the full dataset completes within 30 minutes.

---

### 6. Predictive Analytics Models

**Purpose:** This skill exists to train and deploy predictive models that help recruiters make data-driven decisions: predicting time-to-hire, candidate success probability, salary ranges, and demand trends.

**Preconditions:**
- Historical placement data exists in PostgreSQL: at least 200 completed placements with outcomes (hire date, start date, duration, success/failure, salary).
- Pandas, scikit-learn, and NumPy are installed.
- FastAPI microservice running for model serving.
- MLflow or a similar experiment tracking tool is configured.

**Steps:**
1. **Time-to-Hire Prediction:**
   - Extract features from historical data: job category, required skills count, experience range, location, salary range, employer hiring history.
   - Target variable: number of days from job posting to accepted offer.
   - Train a gradient boosting regressor (`GradientBoostingRegressor` from scikit-learn).
   - Split data: 80% train, 20% test. Evaluate with MAE (Mean Absolute Error) and R-squared.
   - Target: MAE under 7 days.
2. **Candidate Success Probability:**
   - Define "success" as: placement lasted at least 90 days and received positive feedback.
   - Extract features: skill match score, experience delta, location match, previous placement count, profile completeness score.
   - Train a logistic regression or random forest classifier.
   - Evaluate with precision, recall, F1, and AUC-ROC.
   - Target: AUC above 0.75.
3. **Salary Range Prediction:**
   - Extract features: skills list, years of experience, location (cost of living index), job category, education level.
   - Target: salary midpoint.
   - Train a gradient boosting regressor.
   - Evaluate with MAE and percentage error.
   - Target: prediction within 10% of actual salary for 70% of test cases.
4. **Demand Forecasting:**
   - Aggregate historical job postings by skill category and month.
   - Use time series analysis (ARIMA or Prophet) to forecast demand 3 months ahead.
   - Evaluate with MAPE (Mean Absolute Percentage Error).
   - Target: MAPE under 20%.
5. For each model:
   - Log the experiment in MLflow: parameters, metrics, and model artifact.
   - Serialize the best model using `joblib.dump`.
   - Load the model at FastAPI startup.
   - Create an endpoint for predictions: `POST /api/v1/predict/time-to-hire`, `POST /api/v1/predict/candidate-success`, `POST /api/v1/predict/salary`, `GET /api/v1/predict/demand-forecast`.
6. Implement model versioning: store model version in the response, support A/B testing by routing a percentage of requests to a new model version.
7. Set up a monthly retraining schedule: pull the latest data, retrain, evaluate against the previous model, and promote if metrics improve.
8. Add monitoring: track prediction distributions over time to detect model drift (e.g., if time-to-hire predictions suddenly shift by more than 20%, alert).

**What NOT to Do:**
- Do not train on fewer than 200 records; the model will overfit and produce unreliable predictions.
- Do not deploy a model without evaluating on a held-out test set; training accuracy is misleading.
- Do not use protected attributes (race, gender, age) as features; this creates biased models that violate fair hiring practices.
- Do not present predictions as certainties to recruiters; always display a confidence range or probability.
- Do not skip the monthly retraining; models degrade as market conditions change.
- Do not ignore model drift alerts; a drifted model is worse than no model.

**Done Condition:** All four prediction endpoints are live and returning results. Each model meets its accuracy target on the test set. Experiments are logged in MLflow with parameters and metrics. Model versioning is active. Monthly retraining pipeline is scheduled. Drift monitoring is in place and alerts are configured.

---

### 7. ML Model Deployment and API Serving

**Purpose:** This skill exists to package all ML models into a production-grade FastAPI microservice with proper versioning, health checks, documentation, and containerization so that the Next.js backend can reliably consume ML predictions.

**Preconditions:**
- All ML models (resume parser, matching engine, LLM integration, predictive models) are developed and tested.
- Docker is installed.
- FastAPI application structure is established.
- The Next.js backend team has agreed on the API contract (endpoints, request/response schemas).

**Steps:**
1. Organize the FastAPI project:
   ```
   ml-service/
     app/
       main.py          # FastAPI app, startup events, router includes
       routers/
         parse.py        # Resume parsing endpoints
         match.py        # Matching endpoints
         predict.py      # Prediction endpoints
         llm.py          # LLM endpoints
         rag.py          # RAG endpoints
       models/           # Pydantic request/response models
       services/         # Business logic (matching, parsing, etc.)
       ml_models/        # Serialized model files (.joblib, .pkl)
       config.py         # Environment variable loading
     requirements.txt
     Dockerfile
     docker-compose.yml
     tests/
   ```
2. In `main.py`, load all ML models during the `startup` event:
   ```python
   @app.on_event("startup")
   async def load_models():
       app.state.ner_model = spacy.load("en_core_web_lg")
       app.state.tth_model = joblib.load("app/ml_models/time_to_hire_v1.joblib")
       # ... load all models
   ```
3. Add a health check endpoint `GET /health` that returns `{"status": "healthy", "models_loaded": true, "version": "1.0.0"}`.
4. Add a readiness check `GET /ready` that verifies all models are loaded and the database is reachable.
5. Enable automatic API documentation via FastAPI's built-in Swagger UI (`/docs`) and ReDoc (`/redoc`).
6. Add request/response logging middleware that logs: timestamp, endpoint, status code, response time, and (for errors) the error message. Do not log request bodies containing personal data.
7. Create the `Dockerfile`:
   ```dockerfile
   FROM python:3.11-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   RUN python -m spacy download en_core_web_lg
   COPY . .
   EXPOSE 8000
   CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```
8. Create `docker-compose.yml` that defines the ML service, sets environment variables, mounts model volumes, and connects to the platform network.
9. Add CORS configuration to allow requests from the Next.js backend domain.
10. Implement graceful shutdown: finish in-progress requests before stopping the container.
11. Test the containerized service: `docker compose up`, then hit every endpoint via `curl` or Postman. Verify all responses match the expected schemas.
12. Document the integration for the Next.js team: base URL, authentication (if any), endpoint list, request/response examples.

**What NOT to Do:**
- Do not load ML models on every request; load once at startup and access via `app.state`.
- Do not expose the ML service directly to the internet; it should be accessible only from the Next.js backend (internal network or VPN).
- Do not skip the health and readiness checks; Kubernetes and Docker orchestrators depend on them.
- Do not log full request bodies for endpoints that receive resumes or personal data; this violates privacy.
- Do not use `latest` as the Docker image tag; always tag with a semantic version.
- Do not bundle model files into the Docker image if they exceed 500MB; mount them as volumes instead.

**Done Condition:** The FastAPI service starts in Docker, loads all models within 60 seconds, and passes health and readiness checks. Every endpoint returns correct responses with proper status codes. Swagger documentation is accessible at `/docs`. Response times are under 5 seconds for synchronous endpoints. The Next.js backend can call every endpoint successfully from its environment.

---

### 8. Responsible AI and Bias Prevention

**Purpose:** This skill exists to ensure that all AI/ML features on the platform make fair, unbiased, and transparent decisions, complying with employment law and ethical AI principles.

**Preconditions:**
- Matching engine and predictive models are built and producing outputs.
- Historical data is available for bias analysis.
- Legal/compliance guidance on fair hiring practices has been reviewed.

**Steps:**
1. Audit the training data for demographic imbalance: check distributions of gender, age, ethnicity (if available) in historical placement data. Document any skews.
2. Review all model features. Remove any features that are proxies for protected attributes:
   - Remove: zip code (proxy for race/income), graduation year (proxy for age), university name (proxy for socioeconomic status) if used as ranking features.
   - Keep: skills, years of experience, job-relevant certifications.
3. Run fairness metrics on the matching engine: for a set of test jobs, compare match score distributions across demographic groups. Use disparate impact ratio (should be above 0.8 for each group).
4. Run fairness metrics on predictive models: compare error rates across demographic groups. If the model predicts lower success probability for a demographic group, investigate and mitigate.
5. Implement an "explainability" layer for the matching engine: every match result must include human-readable reasons. No "black box" scores.
6. Add a bias monitoring dashboard: track match score distributions, prediction distributions, and hiring outcome rates over time, segmented by available demographic data.
7. Create a human-in-the-loop workflow: when the matching engine ranks a candidate unusually low (score below 0.3 despite meeting required skills), flag the result for human review.
8. Document all AI decisions: which model was used, which version, which features influenced the output. Store in an audit log table.
9. Establish a quarterly review cadence: retrain models, re-run fairness audits, and document findings.
10. Write a platform AI transparency page that explains to candidates and employers how AI is used in the matching process.

**What NOT to Do:**
- Do not use protected attributes (race, gender, age, disability, religion, national origin) as model features, directly or indirectly.
- Do not deploy a model without running fairness metrics first.
- Do not assume that "the algorithm is objective"; algorithms inherit biases from training data.
- Do not hide AI involvement from users; be transparent about where and how AI is used.
- Do not allow fully automated hiring decisions without human review.
- Do not skip the quarterly audit; bias can emerge over time as data distributions shift.

**Done Condition:** All model features have been reviewed and no proxy variables for protected attributes are used. Disparate impact ratio is above 0.8 for all measured demographic groups. Every match result includes human-readable explanations. An audit log records all AI-influenced decisions. A bias monitoring dashboard is live. The transparency page is published.

---

## Integration with Next.js Backend

```
Next.js Backend  <-->  FastAPI ML Service
     |                       |
  PostgreSQL            ML Models
  (main data)          (predictions)
```

- ML models run as a separate Python microservice (Docker container).
- Next.js backend calls ML service via REST API using `ML_SERVICE_URL` environment variable.
- Results are cached in Redis for performance (TTL: 1 hour for match scores, 24 hours for predictions).
- Batch processing for bulk matching jobs runs asynchronously via a task queue.

---

## Learning Resources

- [Fast.ai Practical Deep Learning](https://course.fast.ai/)
- [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course)
- [scikit-learn Documentation](https://scikit-learn.org/stable/documentation.html)
- [spaCy Documentation](https://spacy.io/usage)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Kaggle Learn](https://www.kaggle.com/learn)

## Tools

- Jupyter Notebooks (experimentation)
- Google Colab (free GPU access)
- MLflow (experiment tracking)
- Weights & Biases (model monitoring)
- Label Studio (data annotation)
- Postman (API testing)
