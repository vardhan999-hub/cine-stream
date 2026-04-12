# 🎬 Cine·Stream — Movie Discovery App

A Netflix-lite movie discovery application built with React + Vite, powered by the TMDB API. Covers all three difficulty levels: Core App, Performance Mastery, and AI Mood Matcher.

---

## ✨ Features

### Level 1 — Core Application
- **Popular Movies Grid** — Fetches TMDB's trending movies on load
- **Search Bar** — Live search against TMDB's search endpoint
- **Beautiful Cards** — Poster, title, release year, star rating, and overview on hover

### Level 2 — Performance Mastery
- **Debouncing** — Search waits 500ms after the user stops typing before firing an API call (saves ~20× API calls per search session)
- **Infinite Scroll** — Uses `IntersectionObserver` to detect when you reach the bottom and auto-loads the next page — no pagination buttons
- **Favorites** — Heart icon on each card saves/removes movies to `localStorage`. Persists across page refreshes. Dedicated `/favorites` route with stats.

### Level 3 — Advanced
- **Lazy Loading** — All `<img>` tags use native `loading="lazy"` so poster images only download when they scroll into view
- **AI Mood Matcher** — Type a mood description, the app calls the Anthropic Claude API to suggest a movie title, then silently searches TMDB and highlights the result with an **AI MATCH** badge

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```

Open `.env` and fill in your keys:

```env
# Required — get free key at https://www.themoviedb.org/settings/api
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Optional — needed only for AI Mood Matcher feature
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 3. Start the dev server
```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## 🗂️ Project Structure

```
cine-stream/
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx        # Individual movie card with poster, rating, fav button
│   │   ├── MovieGrid.jsx        # Responsive grid + infinite scroll sentinel
│   │   ├── SearchBar.jsx        # Controlled search input with clear button
│   │   └── Loader.jsx           # Spinner — full-page and inline variants
│   │
│   ├── pages/
│   │   ├── Home.jsx             # Main page: search + mood matcher + movie grid
│   │   └── Favorites.jsx        # Saved movies with stats panel
│   │
│   ├── hooks/
│   │   ├── useDebounce.js       # Delays a value by N ms after last change
│   │   ├── useInfiniteScroll.js # IntersectionObserver → triggers loadMore callback
│   │   └── useMovies.js         # Fetching, pagination, race-condition guard
│   │
│   ├── utils/
│   │   ├── api.js               # TMDB fetch wrappers (popular, search, details)
│   │   └── localStorage.js      # Favorites: get, save, remove, toggle, isFav
│   │
│   ├── App.jsx                  # BrowserRouter + Navbar + Routes
│   ├── main.jsx                 # React DOM entry point
│   └── index.css                # Global styles — cinematic dark theme
│
├── .env.example                 # Environment variable template
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧠 Key Concepts Explained

### `useDebounce` — How it works
```
User types: "i", "in", "inc", "ince", "incep", "incept", "incepti", "inception"
                                                                         ↑
                                                Only ONE API call fires here
                                          (500ms after the last keystroke)
```
Without debouncing, 8 API calls would fire. With it: just 1.

### `useInfiniteScroll` — How it works
An invisible `<div>` (the "sentinel") sits at the bottom of the movie grid. The `IntersectionObserver` watches it. The moment it enters the viewport (with a 200px pre-trigger margin), `loadMore()` is called — fetching and appending the next page seamlessly.

### `useMovies` — Race condition guard
When a user types fast and triggers multiple fetches, older responses can arrive after newer ones, corrupting state. `useMovies` tracks the **active query** in a `ref` and discards responses that don't match the latest query.

### Lazy Loading
Every `<img>` in `MovieCard.jsx` has `loading="lazy"`. On a page with 100 movies, only the ~20 visible posters download on load. The rest download as you scroll — dramatically reducing initial bandwidth.

---

## 🔑 Getting API Keys

### TMDB (Required)
1. Create a free account at [themoviedb.org](https://www.themoviedb.org)
2. Go to **Settings → API**
3. Request an API key (approved instantly for personal use)
4. Copy the **API Key (v3 auth)** into your `.env`

### Anthropic (Optional — for Mood Matcher)
1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Go to **API Keys** and create a new key
3. Add it to `.env` as `VITE_ANTHROPIC_API_KEY`

> **Note:** The Mood Matcher gracefully degrades — if no Anthropic key is present, it shows a helpful message rather than crashing.

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Vite | Build tool & dev server |
| TMDB API | Movie data |
| Anthropic API | AI Mood Matcher |
| IntersectionObserver | Infinite scroll (no library needed) |
| localStorage | Favorites persistence |
