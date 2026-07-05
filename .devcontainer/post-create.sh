#!/usr/bin/env bash
set -euo pipefail

# Entorno local: copiar plantilla si no existe (.env está gitignored)
if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
fi

echo "Installing npm dependencies..."
npm ci

echo "Installing Playwright browsers..."
npx playwright install --with-deps

# La imagen demo-app es linux/arm64; Codespaces suele ser amd64 → requiere QEMU
if [ "$(uname -m)" = "x86_64" ]; then
  echo "Setting up QEMU for ARM64 emulation (amd64 Codespace)..."
  docker run --privileged --rm tonistiigi/binfmt --install arm64
fi

echo "Pulling and starting demo-app..."
docker rm -f demo-app 2>/dev/null || true
docker pull automaticbytes/demo-app
docker run -d --name demo-app --platform linux/arm64 -p 3100:3100 automaticbytes/demo-app

echo "Waiting for demo-app at http://localhost:3100 (ARM emulation can take several minutes)..."
ready=false
for _ in $(seq 1 90); do
  if curl -sf http://localhost:3100 >/dev/null; then
    ready=true
    break
  fi
  sleep 3
done

if [ "$ready" = true ]; then
  echo "demo-app is ready."
else
  echo "WARNING: demo-app did not respond in time."
  docker logs demo-app 2>/dev/null || true
  exit 1
fi
