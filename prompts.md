# Prompts.md — Cine-Stream Development Notes

**Project:** Cine-Stream — Movie Discovery Application
**Week:** 8
**Intern:** Tadigadapa Harshavardhan

---

## Overview

This document explains how AI was used as a **learning reference** during the development of the Cine-Stream project.

The primary focus of the project was implementing:

* Custom Hooks
* Infinite Scroll
* Debouncing
* Performance Optimization in React

AI was used only to understand concepts and explore approaches.
All implementation, debugging, and decision-making were done independently.

---

## Prompt 1 — Project Structure

**Prompt Used:**
How should I organize a React project with hooks, pages, and utilities?

**What I Implemented:**

* Designed the folder structure based on best practices:

  * `components/` → MovieCard, MovieGrid, SearchBar, Loader, ScrollToTop
  * `pages/` → Home, Favorites
  * `hooks/` → All custom hooks
  * `utils/` → API logic and localStorage helpers
* Kept `App.jsx` minimal (routing + navbar only)
* Chose Vite instead of CRA for faster development

---

## Prompt 2 — Connecting to the TMDB API

**Prompt Used:**
How do I fetch data from an external API in React and keep my API key secure?

**What I Implemented:**

* Created `utils/api.js` for all API interactions
* Used `.env` with `VITE_` prefix to secure API keys
* Implemented:

  * `fetchPopularMovies()`
  * `searchMovies()`
* Added clear error handling for missing API key
* Handled failed responses using `res.ok`

---

## Prompt 3 — Search Bar with Debouncing

**Prompt Used:**
What is debouncing and how can I prevent excessive API calls while typing?

**What I Implemented:**

* Built `useDebounce.js` using `setTimeout` and cleanup
* Waits 500ms after user stops typing
* Ensures only one API call per search
* Integrated into `Home.jsx` using `rawQuery → debouncedQuery`

---

## Prompt 4 — Infinite Scroll

**Prompt Used:**
How can I load more data using IntersectionObserver?

**What I Implemented:**

* Created `useInfiniteScroll.js` from scratch
* Used a sentinel element at the bottom of the list
* Triggered loading when it enters viewport
* Added `rootMargin: '200px'` for preloading
* Cleaned up observer to prevent memory leaks

---

## Prompt 5 — Managing Data with useMovies

**Prompt Used:**
How do I handle paginated data and avoid stale results?

**What I Implemented:**

* Built `useMovies.js` as the central data hook
* Handled:

  * Initial load
  * New search (reset state)
  * Pagination (append results)
* Solved race condition using `useRef`
* Implemented `AbortController` to cancel old requests
* Fixed duplicate movie issue using `Map` deduplication

---

## Prompt 6 — MovieCard Component

**Prompt Used:**
How do I display posters with fallback support?

**What I Implemented:**

* Built `MovieCard.jsx` with:

  * Poster
  * Rating badge
  * Favorite button
  * Hover overlay
* Used `loading="lazy"` for performance
* Handled missing posters with inline SVG fallback
* Used `onError` to replace broken images
* Used optional chaining for safe data access

---

## Prompt 7 — Favorites with localStorage

**Prompt Used:**
How do I manage persistent state using localStorage?

**What I Implemented:**

* Created helper functions in `localStorage.js`
* Implemented toggle logic for favorites
* Used a `Set` for O(1) lookups
* Synced across tabs using `storage` event
* Displayed:

  * Total saved movies
  * Average rating

---

## Prompt 8 — AI Mood Matcher

**Prompt Used:**
How can I integrate AI to recommend movies based on mood?

**What I Implemented:**

* Integrated Groq API (LLaMA 3.3 model)
* Flow:

  * User input → AI suggests title → TMDB search → display result
* Designed prompt to return only movie titles
* Handled:

  * Missing API key
  * API errors
  * Empty responses
* Added “AI MATCH” badge for identified results

---

## Prompt 9 — Routing and Navigation

**Prompt Used:**
How do I implement routing in React?

**What I Implemented:**

* Used React Router v6
* Routes:

  * `/` → Home
  * `/favorites` → Favorites
* Used `NavLink` for active state styling
* Built Scroll-to-Top button:

  * Appears after scroll
  * Uses smooth scrolling
  * Optimized with passive listeners

---

## Prompt 10 — UI Styling and Deployment

**Prompt Used:**
How do I build a dark UI and deploy a React app?

**What I Implemented:**

* Designed dark theme using CSS variables
* Selected fonts:

  * Bebas Neue (headings)
  * DM Sans (body)
* Added hover animations:

  * Card lift
  * Poster zoom
  * Overlay fade
* Built responsive grid using `auto-fill + minmax`
* Deployed via GitHub → Vercel
* Managed environment variables securely in Vercel

---

## Additional Work Done Independently

* Debugged race condition issues
* Implemented AbortController pattern
* Fixed duplicate API results
* Updated Groq model after deprecation
* Added throttle guard for infinite scroll
* Configured `.gitignore` for security
* Tested responsiveness across devices

---

## Final Reflection

AI was used strictly as a **learning tool**.
All core implementation and debugging were done independently.

Key learnings:

* Custom hooks improved separation of logic and UI
* Debouncing and infinite scroll showed real-world performance impact
* Debugging race conditions was a major learning milestone
* Deployment and environment management added practical experience

This is the most complete project I have built so far, combining:

* Real APIs
* AI integration
* Performance optimization
* Production deployment

---
