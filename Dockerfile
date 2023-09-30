# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.10-slim

EXPOSE 5002

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install system dependencies for building rhino3dm and SQLite3
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    sqlite3 \
    libsqlite3-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy SQLite library files into the container
RUN cp /usr/lib/x86_64-linux-gnu/libsqlite3.so* /usr/lib/

# Install pip requirements
COPY requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app

# Copy your Flask app code and the database file
COPY . /app/
COPY database.db /app/database.db

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# Run database migrations before starting the Flask app
CMD flask db migrate && flask db upgrade && gunicorn --bind 0.0.0.0:5002 server:app
