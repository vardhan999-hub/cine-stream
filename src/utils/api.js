const BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
export const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';

const getKey = () => import.meta.env.VITE_TMDB_API_KEY;

const apiFetch = async (endpoint, params = {}, signal) => {
  const apiKey = getKey();
  if (!apiKey || apiKey === 'your_tmdb_api_key_here') {
    throw new Error('TMDB_API_KEY_MISSING: Add VITE_TMDB_API_KEY in .env');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('language', 'en-US');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
};

export const fetchPopularMovies = (page = 1, signal) =>
  apiFetch('/movie/popular', { page }, signal);

export const searchMovies = (query, page = 1, signal) =>
  apiFetch('/search/movie', { query, page, include_adult: false }, signal);

export const fetchMovieDetails = (id) =>
  apiFetch(`/movie/${id}`);

export const fetchMoviesByGenre = (genreId, page = 1) =>
  apiFetch('/discover/movie', { with_genres: genreId, page, sort_by: 'popularity.desc' });
