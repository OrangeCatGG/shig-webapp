#!/bin/bash
set -e  # exit if any command fails

# Switch to the feature branch
git checkout feature-branch

# Stage changes
git add .

# Commit with a message (use first argument if provided, else default)
msg=${1:-"i will put something"}
git commit -m "$msg"

# Push to remote feature branch
git push origin feature-branch
