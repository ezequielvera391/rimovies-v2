#!/bin/bash

# Obtener fecha, branch y commit
BUILD_DATE=$(date '+%d/%m/%Y %H:%M:%S')
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
GIT_COMMIT=$(git rev-parse --short HEAD)

# Mostrar información
echo "Building Docker image..."
echo "Build date: $BUILD_DATE"
echo "Git branch: $GIT_BRANCH"
echo "Git commit: $GIT_COMMIT"

# Ejecutar docker build
docker build \
  --build-arg BUILD_DATE="$BUILD_DATE" \
  --build-arg GIT_BRANCH="$GIT_BRANCH" \
  --build-arg GIT_COMMIT="$GIT_COMMIT" \
  -t rimovies-app .

echo "✅ Docker image 'rimovies-app' built successfully!"
