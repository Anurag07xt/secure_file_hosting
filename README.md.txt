# Secure File Hosting

A simple secure file hosting web application (Node.js + Express backend, MySQL database, vanilla HTML/CSS/JS frontend).

## Features
- User register & login (JWT authentication)
- File upload (PDF & MP4), public/private
- List user's files (My Files)
- Public downloads page
- Download and delete (owner-only)
- File metadata saved in MySQL

## Folder structure
secure-file-hosting/
├─ backend/
│ ├─ index.js
│ ├─ models/
│ ├─ routes/
│ ├─ middleware/
│ ├─ package.json
│ └─ .env.example
├─ frontend/
│ ├─ index.html
│ ├─ login.html
│ ├─ register.html
│ ├─ upload.html
│ ├─ myfiles.html
│ ├─ downloads.html
│ └─ style.css
├─ uploads/ # runtime - ignored in git
└─ README.md

## Prerequisites
- Node.js (LTS) and npm
- MySQL Server
- Git
- (Optional) VSCode + Live Server

## Backend setup
1. Open terminal in backend folder:
```bash
cd /path/to/secure-file-hosting/backend
