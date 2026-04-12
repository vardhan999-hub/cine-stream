# 🎬 Cine-Stream

A modern, production-ready **movie discovery application** built with React, focused on performance optimization, seamless UX, and AI-powered recommendations.

🔗 **Live Demo:** [View Project](https://cine-stream-navy.vercel.app/)
📂 **GitHub Repository:** [Source Code](https://github.com/vardhan999-hub/cine-stream)

---

## 📌 Overview

Cine-Stream demonstrates how to build a **scalable, high-performance movie browsing experience** using modern React practices.

Instead of traditional pagination, movies load dynamically as the user scrolls, creating a smooth, uninterrupted experience similar to real-world streaming platforms.

---

## 💡 Why This Project?

Fetching a few items is easy — but handling thousands efficiently requires optimization.

This project focuses on:

* Loading data **only when needed** (Infinite Scroll)
* Preventing excessive API calls (Debouncing)
* Structuring logic cleanly using custom hooks

---

## ✨ Features

* 🎥 Browse popular movies on load
* 🔍 Search movies with **debounced input**
* ♾️ Infinite scroll (no pagination buttons)
* ❤️ Save favorites with **localStorage persistence**
* 🤖 AI Mood Matcher — get movie suggestions from natural language input
* 🖼️ Lazy-loaded movie posters for performance
* 🎭 Fallback poster for missing images
* 📱 Fully responsive layout using CSS Grid
* 🔝 Scroll-to-top button
* 🌙 Cinematic dark theme

---

## 🛠 Tech Stack

| Technology      | Purpose                           |
| --------------- | --------------------------------- |
| React 18        | UI development                    |
| Vite            | Fast build tool                   |
| React Router v6 | Client-side routing               |
| TMDB API        | Movie data and search             |
| Groq API        | AI Mood Matcher (LLaMA 3.3 model) |
| CSS Variables   | Theming and design system         |
| localStorage    | Favorites persistence             |

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── MovieCard.jsx
│   ├── MovieGrid.jsx
│   ├── SearchBar.jsx
│   ├── Loader.jsx
│   └── ScrollToTop.jsx
│
├── pages/
│   ├── Home.jsx
│   └── Favorites.jsx
│
├── hooks/
│   ├── useDebounce.js
│   ├── useInfiniteScroll.js
│   └── useMovies.js
│
├── utils/
│   ├── api.js
│   └── localStorage.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/vardhan999-hub/cine-stream.git
cd cine-stream
npm install
cp .env.example .env
npm run dev
```

Open: http://localhost:5173

---

## 🔑 Environment Variables

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_GROQ_API_KEY=your_groq_api_key_here
```

---

## ⚙️ How It Works

### 🔹 Debounced Search

Waits 500ms after typing stops before making API calls, reducing unnecessary requests.

### 🔹 Infinite Scroll

Uses `IntersectionObserver` to load more movies automatically as the user scrolls.

### 🔹 Race Condition Handling

Prevents outdated results using:

* `useRef` (tracks active query)
* `AbortController` (cancels stale requests)

### 🔹 AI Mood Matcher

User input → AI suggests a movie → TMDB search → result displayed with highlight.

### 🔹 Favorites

Stored in localStorage with instant UI updates and persistence.

---

## 🎯 Key Highlights

* Custom hooks for reusable logic
* Optimized API usage (debounce + infinite scroll)
* Race condition handling
* Deduplication using Map
* Lazy loading for images
* Secure environment variable usage

---

## 🔢 Edge Cases Handled

| Scenario              | Solution                             |
| --------------------- | ------------------------------------ |
| Missing API key       | Clear UI error                       |
| Missing poster        | Fallback image                       |
| Duplicate movies      | Deduplicated using Map               |
| Fast typing           | AbortController cancels old requests |
| Rapid scroll triggers | Throttle guard                       |
| No results            | Styled empty state                   |

---

## 🙌 Acknowledgment

This project was built as part of an internship.
AI was used only for conceptual guidance. All implementation, debugging, and improvements were done independently.

---

## 📬 Contact

**Tadigadapa Harshavardhan**
🔗 https://github.com/vardhan999-hub

---
