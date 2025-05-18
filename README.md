# 🌐 Linkhub

Linkhub is a simple, dynamic link-sharing platform built with **Next.js** and **MongoDB**. Users can create personal handles (like `yourname`) and share custom links with a profile picture and bio – think of it like a minimal **Linktree** clone, but with your own flavor.


## 🚀 Features

- Create unique, sharable handles
- Add profile picture, bio, and multiple links
- MongoDB-powered backend for persistent storage
- Serverless API routes using Next.js
- Clean, responsive UI with TailwindCSS

---

## 🧱 Tech Stack

- **Frontend**: Next.js (App Router), React, TailwindCSS
- **Backend**: Next.js API routes
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Recommended)

---

## 📦 Installation

```bash
git clone https://github.com/gunjanghate/Linkhub.git
cd Linkhub
npm install
🔐 Setup Environment Variables
Create a .env.local file in the root:

env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
Replace your_mongodb_connection_string with your actual MongoDB URI (from MongoDB Atlas).

🛠️ Development
bash
Copy
Edit
npm run dev
Your app will be running at: http://localhost:3000

🧪 Folder Structure
bash
Copy
Edit
/app
  ├─ /api            # API routes (handle creation, MongoDB access)
  ├─ /[handle]       # Dynamic route for displaying user profile
  ├─ /page.tsx       # Main landing page
/lib
  └─ mongodb.js      # MongoDB connection helper
/public
  └─ preview.png     # App preview image

📤 Deployment
This project is ready to deploy on Vercel. Just push your repo and set the MONGODB_URI in the environment settings.
