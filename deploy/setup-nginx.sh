#!/bin/bash
# ============================================================
# TADA CMS — Nginx Setup Script
# Run after setup-ec2.sh as: bash setup-nginx.sh
# ============================================================

set -e

DOMAIN="tada.jershmamet.com"
APP_DIR="/home/ubuntu/tada-cms"

echo "==> Installing Nginx..."
sudo apt-get install -y nginx

echo "==> Writing Nginx site config..."
sudo tee /etc/nginx/sites-available/tada-cms > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    # Allow large media uploads
    client_max_body_size 50M;

    # Security headers (Cloudflare handles SSL, these are for the EC2 → Cloudflare leg)
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 120s;
    }

    # Serve uploaded media directly via Nginx (faster than proxying through Node)
    location /api/media/file/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

echo "==> Enabling site..."
sudo ln -sf /etc/nginx/sites-available/tada-cms /etc/nginx/sites-enabled/tada-cms

echo "==> Removing default Nginx site..."
sudo rm -f /etc/nginx/sites-enabled/default

echo "==> Testing Nginx config..."
sudo nginx -t

echo "==> Restarting Nginx..."
sudo systemctl restart nginx
sudo systemctl enable nginx

echo ""
echo "============================================================"
echo " Nginx is live!"
echo " Next: create your admin account:"
echo ""
echo "   curl -X POST http://localhost:3000/api/seed-admin \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"name\":\"Your Name\",\"email\":\"you@email.com\",\"password\":\"StrongPass123!\"}'"
echo ""
echo " Then visit: https://$DOMAIN/exec/login"
echo "============================================================"
