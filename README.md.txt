# Secure File Hosting

# Secure File Hosting App

This is a simple web application to **register, login, upload, view, delete, and logout files**. The backend is built with Node.js, Express, Sequelize (MySQL), and the frontend is HTML/JS. Uploaded files can be public or private.  

---

## **System Requirements**

- Node.js (v18+ recommended)  
- npm (comes with Node.js)  
- MySQL database  
- Git (optional, for cloning the project)  
- Browser (Chrome/Edge/Firefox)  

---

## **Setup Instructions**

### **1. Clone the repository (optional)**

```bash
git clone https://github.com/Anurag07xt/secure_file_hosting.git
cd secure_file_hosting


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

##Install backend dependencies

Go to the backend folder:

cd backend
npm install

##Create a .env file inside backend:
touch .env
Add the following:

ini
Copy code
PORT=4000
DB_NAME=your_database_name
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
JWT_SECRET=your_secret_key


##Start the backend
The server will run on http://localhost:4000.
Make sure no other service is using port 4000.


##Open the frontend

Go to frontend folder.

Open login.html in your browser (or use VS Code Live Server).

## How to use the app
Step 1 — Register

Open register.html in your browser.

Enter username, email, and password.

Submit → you will be redirected to login page.

Step 2 — Login

Open login.html.

Enter your email and password.

Submit → you will be redirected to dashboard.html.

Your token is stored in localStorage automatically.

Step 3 — Upload File

In the dashboard, select a file using Choose File.

Choose privacy: Public or Private.

Click Upload.

File will appear under My Files table.

Supported file types: PDF, MP4, JPEG. Max size: 20 MB.

Step 4 — View Files

Public Files table shows all public files uploaded by users.

My Files table shows files you uploaded.

Click Download to download a file.

Step 5 — Delete File

In My Files table, click Delete next to the file.

Confirm deletion → file is removed from your table and server.

Step 6 — Logout

Click the Logout button at the bottom of the dashboard.

You will be redirected to the login page.

Token in localStorage is cleared.


