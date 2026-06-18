#!/bin/bash
# ============================================================
# TADA CMS — EC2 One-Time Setup Script
# Run as: bash setup-ec2.sh
# Ubuntu 22.04 LTS
# ============================================================

set -e

APP_DIR="/home/ubuntu/tada-cms"
REPO="https://github.com/TMJ-24/tada-cms.git"
DOMAIN="tada.jershmamet.com"

echo "==> [1/7] Updating system packages..."
sudo apt-get update -y && sudo apt-get upgrade -y

echo "==> [2/7] Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git

echo "==> [3/7] Installing PM2 globally..."
sudo npm install -g pm2

echo "==> [4/7] Cloning repository..."
cd /home/ubuntu
git clone "$REPO" tada-cms
cd "$APP_DIR"

echo "==> [5/7] Creating .env file..."
cat > "$APP_DIR/.env" <<EOF
DATABASE_URL=file:/home/ubuntu/tada-cms/tada-cms.db
PAYLOAD_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
NEXT_PUBLIC_SERVER_URL=https://$DOMAIN
PROMOTE_ADMIN_SECRET=tada-bootstrap-2026
CRON_SECRET=$(node -e "console.log(require('crypto').randomBytes(16).toString('hex'))")
PREVIEW_SECRET=$(node -e "console.log(require('crypto').randomBytes(16).toString('hex'))")
EOF

echo ".env created:"
cat "$APP_DIR/.env"

echo "==> [6/7] Installing dependencies and building..."
npm install
npm run build

echo "==> [7/7] Starting app with PM2..."
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup | tail -1 | sudo bash   # auto-run the printed sudo command

echo ""
echo "============================================================"
echo " App is running! Now install Nginx:"
echo "   bash $APP_DIR/deploy/setup-nginx.sh"
echo "============================================================"
