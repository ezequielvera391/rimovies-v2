#!/bin/bash

# Obtener fecha, branch y commit
BUILD_DATE=$(date '+%d/%m/%Y %H:%M:%S')
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
GIT_COMMIT=$(git rev-parse --short HEAD)

# Mostrar información
echo "🚀 Building Docker image for Rimovies V2"
echo "📅 Build date: $BUILD_DATE"
echo "🌿 Git branch: $GIT_BRANCH"
echo "🔢 Git commit: $GIT_COMMIT"

# Detectar si se pasa --no-cache
NO_CACHE_FLAG=""
if [ "$1" == "--no-cache" ]; then
  NO_CACHE_FLAG="--no-cache"
  echo "⚡ Building without cache!"
fi

# Ejecutar docker-compose up --build (y limpiar cache si se pidió)
BUILD_DATE="$BUILD_DATE" \
GIT_BRANCH="$GIT_BRANCH" \
GIT_COMMIT="$GIT_COMMIT" \
docker-compose up --build $NO_CACHE_FLAG --force-recreate
