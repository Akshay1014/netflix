# 🎬 Netflix GPT

A full-stack, responsive Netflix-style streaming application built with **React**, **Vite**, and **Tailwind CSS**. It combines real-time movie data from **TMDB** with AI-driven natural language search powered by **Google Gemini** and secure authentication via **Firebase**.

---

## ✨ Key Features

- 🎭 **Netflix-Style UI**: Dark-themed, responsive streaming layout powered by Tailwind CSS.
- 🔐 **Firebase Auth & Firestore**: Secure email/password authentication and cloud-synced user watchlists.
- 🤖 **Gemini AI Movie Search**: Natural-language search where users enter moods or scenarios (e.g., *"feel-good Bollywood movies for a rainy night"*) to get curated movie recommendations rendered as movie cards.
- 📡 **Live TMDB Data**: Real-time movie metadata, high-resolution posters, category feeds, genre filters, and dynamic YouTube trailers.
- ⚡ **Redux State Management**: Centralized state management with Redux Toolkit and modular custom React hooks.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, React Router
- **State**: Redux Toolkit (`@reduxjs/toolkit`), React Redux
- **Backend & Auth**: Firebase (Authentication, Cloud Firestore)
- **APIs**: Google Gemini AI API (`@google/generative-ai`), TMDB REST API

---

## 🚀 Quick Start

### 1. Environment Setup
Create a `.env` file in the root directory:

```env
VITE_TMDB_KEY=your_tmdb_api_key
VITE_GEMINI_KEY=your_gemini_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 2. Run Locally
```bash
npm install
npm run dev
```

---

## 🛡️ License

Educational & portfolio project. Movie data and media assets belong to TMDB and their respective owners.


