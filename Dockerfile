# ---- Base runtime ----
FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PATH="/home/appuser/.local/bin:${PATH}"

# Create non-root user
RUN useradd -m -u 10001 appuser

WORKDIR /app

# Install system deps only if you have packages that need compiling
# (safe to keep; it's small and helps manylibs like uwsgi/lxml/etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
      build-essential \
  && rm -rf /var/lib/apt/lists/*

# Copy deps first for better layer caching
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install -r requirements.txt \
 && pip install gunicorn

# Copy app source
COPY . .

# Ensure expected dirs/files exist (will be overridden by bind-mounts if present)
RUN mkdir -p /app/private \
 && touch /app/leaderboard.json \
 && chown -R appuser:appuser /app

USER appuser

# Gunicorn will bind to 5000 inside the container
EXPOSE 5000

# Use Gunicorn in production (3 workers, 60s timeout)
# If your Flask entrypoint is "app" inside app.py, this is correct ("app:app").
CMD ["gunicorn", "-w", "3", "-b", "0.0.0.0:5000", "--timeout", "60", "app:app"]
