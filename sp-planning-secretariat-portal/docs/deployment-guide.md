# Deployment Guide
## SP Planning Secretariat Portal

**Version:** 1.0  
**Last Updated:** June 2026

---

## Overview

This system has two independent parts that must both be running for the portal to work:

| Part | What it is | Where it runs |
|---|---|---|
| **Frontend** | React SPA — the website users see | Any static file host (CDN, Nginx, Apache) |
| **Backend** | Node.js / Express REST API | A server with persistent disk (VPS, cloud VM) |

The frontend talks to the backend over HTTP/HTTPS using the `VITE_API_URL` environment variable.

---

## Prerequisites

Before you begin, make sure the server has:

- **Node.js 18 or later** (`node --version`)
- **npm 8 or later** (`npm --version`)
- A domain name or server IP address
- Outbound SMTP access (for the contact form email feature)
- At minimum 512 MB RAM and 1 GB free disk

---

## Part 1 — Backend Deployment

### Step 1 — Upload the backend files

Copy the entire `sp-planning-secretariat-portal/backend/` folder to your server.

### Step 2 — Install dependencies

```bash
cd backend
npm install --production
```

### Step 3 — Create the environment file

Create a file called `.env` inside the `backend/` folder:

```env
# Server
PORT=5000

# Security — CHANGE THIS before going live
JWT_SECRET=replace-this-with-a-long-random-string-minimum-32-characters

# CORS — the URL where your frontend is hosted
FRONTEND_URL=https://www.yourdomain.lk

# Email (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_NAME=SP Planning Portal
ADMIN_EMAIL=info@splanning.gov.lk
```

> **JWT_SECRET** must be changed. If left as the default, anyone who knows the source code can forge login tokens.

> **Gmail users:** You must use an App Password, not your regular Gmail password. Enable 2-factor authentication on your Google account, then generate an App Password at `myaccount.google.com/apppasswords`.

### Step 4 — Initialize the database

This creates all required JSON data files and the default admin user:

```bash
node src/db/seed.js
```

You should see output confirming that all files were created. This only needs to be run once. If you run it again, it will skip files that already exist.

**Default credentials created by the seed:**

| System | Username | Password |
|---|---|---|
| SMP (Store Management) | `Store` | `Store@123` |

> Change these immediately after first login.

### Step 5 — Start the backend

**For testing / development:**

```bash
node src/server.js
```

**For production (using PM2):**

Install PM2 globally if not already installed:
```bash
npm install -g pm2
```

Start the backend as a managed process:
```bash
pm2 start src/server.js --name sp-backend
pm2 save
pm2 startup
```

The last command (`pm2 startup`) prints a command you need to run with `sudo` — run it to make the backend auto-start on server reboot.

**Verify it is running:**
```bash
curl http://localhost:5000/api/health
```

Expected response: `{"status":"ok"}`

---

## Part 2 — Frontend Build & Deployment

### Step 1 — Set the API URL

Create a file called `.env.production` inside the `frontend/` folder on your **build machine** (not the server):

```env
VITE_API_URL=https://api.yourdomain.lk
```

Replace `https://api.yourdomain.lk` with the actual URL where your backend is accessible.

> If the frontend and backend are on the **same domain** (e.g., frontend at `yourdomain.lk`, API at `yourdomain.lk/api`), you can leave `VITE_API_URL` empty or use a reverse proxy (see Step 4 below).

### Step 2 — Build the frontend

From the monorepo root:

```bash
cd sp-planning-secretariat-portal
npm install
npm run build
```

This produces a `frontend/dist/` folder containing the compiled website files.

### Step 3 — Deploy the built files

Copy the **contents** of `frontend/dist/` to your web server's public directory.

**If using Nginx:**
```bash
# Example: copy to /var/www/sp-portal/
cp -r frontend/dist/* /var/www/sp-portal/
```

**If using Apache:**
```bash
cp -r frontend/dist/* /var/www/html/
```

### Step 4 — Configure the web server for React Router

React uses client-side routing. All URL paths must serve `index.html` — otherwise refreshing a page like `/home` returns a 404.

**Nginx configuration:**

```nginx
server {
    listen 80;
    server_name yourdomain.lk www.yourdomain.lk;
    root /var/www/sp-portal;
    index index.html;

    # Serve static files; fall back to index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API calls to the backend (optional — avoids CORS if on same domain)
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

**Apache `.htaccess` (place in the web root):**

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

---

## Part 3 — HTTPS Setup

HTTPS is required because the CMS uses `crypto.subtle` (Web Crypto API) which only works on secure origins.

**Using Certbot (Let's Encrypt — free):**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.lk -d www.yourdomain.lk
```

Certbot will modify your Nginx config to add HTTPS automatically and set up auto-renewal.

---

## Part 4 — First-Time Checklist

After deployment, complete these steps in order:

**1. Verify the backend**
```bash
curl https://api.yourdomain.lk/api/health
```
Must return `{"status":"ok"}`.

**2. Change the SMP admin password**
- Go to `https://yourdomain.lk/smp`
- Log in with `Store` / `Store@123`
- Open the sidebar and click Change Password
- Set a strong password

**3. Change the CMS password**
- Go to `https://yourdomain.lk/cms`
- Log in with `Admin` / `Admin@123`
- Navigate to System → Settings
- Change the username and password

**4. Publish the site**
- In CMS, navigate to System → Publish Site
- Click "Set Live"
- The public portal will now be visible at `/`

**5. Test the contact form**
- Submit a test message from `/contact`
- Verify the admin notification email arrives at `ADMIN_EMAIL`
- Verify the user acknowledgement email arrives at the submitted address

---

## Environment Variables — Quick Reference

### Backend (`.env`)

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | API port. Default: `5000` |
| `JWT_SECRET` | **Yes** | Secret key for JWT tokens. Must be changed. |
| `FRONTEND_URL` | **Yes** | Your frontend domain (for CORS). Comma-separated for multiple. |
| `SMTP_HOST` | Yes (email) | SMTP server hostname |
| `SMTP_PORT` | Yes (email) | SMTP port. Usually `587` |
| `SMTP_SECURE` | No | `true` for port 465, `false` for 587 |
| `SMTP_USER` | Yes (email) | Email address used to send |
| `SMTP_PASS` | Yes (email) | Email password / app password |
| `SMTP_FROM_NAME` | No | Display name. Default: `SP Planning Portal` |
| `ADMIN_EMAIL` | No | Where admin notifications go. Default: `info@splanning.gov.lk` |

### Frontend (`.env.production`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes (if separate domain) | Full URL of the backend, e.g. `https://api.yourdomain.lk` |

---

## Data Backup

All system data is stored as JSON files in `backend/src/data/`. Back this folder up regularly.

**Manual backup:**
```bash
tar -czf backup-$(date +%Y%m%d).tar.gz backend/src/data/
```

**Automated daily backup using cron:**
```bash
crontab -e
```

Add:
```
0 2 * * * tar -czf /backups/sp-data-$(date +\%Y\%m\%d).tar.gz /path/to/backend/src/data/
```

---

## Updating the Application

### To update the frontend:

1. Pull or copy the new source files
2. Rebuild: `npm run build` (from monorepo root)
3. Copy the new `frontend/dist/*` to the web server root

### To update the backend:

1. Copy new backend files to the server
2. Run `npm install --production` in the backend folder
3. Restart: `pm2 restart sp-backend`

> Never delete `backend/src/data/` — that folder contains all your stored data.

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| `/api/health` returns nothing | Backend not running | Run `pm2 status` and check `pm2 logs sp-backend` |
| Login works but SMP pages show blank | `VITE_API_URL` set incorrectly | Rebuild frontend with the correct URL |
| Contact form submits but no email arrives | SMTP config wrong | Check `pm2 logs sp-backend` for `[contact] Email send failed` |
| Refreshing any page returns 404 | Web server not configured for React Router | Add the `try_files` rule to Nginx or `.htaccess` to Apache |
| CMS login fails | Browser HTTP (not HTTPS) | `crypto.subtle` requires HTTPS — install SSL certificate |
| "Not allowed by CORS" in browser console | `FRONTEND_URL` in backend `.env` doesn't match frontend origin | Update `FRONTEND_URL` to the exact origin including `https://` |
| Data files missing on restart | `backend/src/data/` not persistent | Make sure the data directory is on persistent disk, not ephemeral storage |
