#!/bin/bash
# ============================================================
# TADA CMS — Update Script
# Run after pushing new code to GitHub:
#   bash /home/ubuntu/tada-cms/deploy/update.sh
# ============================================================

set -e

APP_DIR="/home/ubuntu/tada-cms"

echo "==> Pulling latest code..."
cd "$APP_DIR"
git pull origin master

echo "==> Installing any new dependencies..."
npm install

echo "==> Rebuilding..."
npm run build

echo "==> Restarting app..."
pm2 restart tada-cms

echo "==> Done! App restarted."
pm2 status
