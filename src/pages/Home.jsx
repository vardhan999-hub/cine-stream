import { useState, useCallback, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import Loader from '../components/Loader';
import useDebounce from '../hooks/useDebounce';
import useMovies from '../hooks/useMovies';
import { toggleFavorite, getFavorites } from '../utils/localStorage';
import { searchMovies } from '../utils/api';

let toastTimeout;
const showToast = (msg, setter) => {
  clearTimeout(toastTimeout);
  setter(msg);
  toastTimeout = setTimeout(() => setter(null), 2500);
};


const getMoodMovieFromGroq = async (moodText) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    throw new Error('GROQ_KEY_MISSING');
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile', 
      max_tokens: 20,
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: 'You are a movie expert. When given a mood or feeling, respond with ONLY a single movie title — no explanation, no punctuation, just the title.',
        },
        {
          role: 'user',
          content: moodText,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Groq error: ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
};



const Home = () => {
  const [rawQuery, setRawQuery] = useState('');
  const [toast, setToast]       = useState(null);
  const [favIds, setFavIds]     = useState(() => new Set(getFavorites().map((m) => m.id)));


  const [moodText, setMoodText]       = useState('');
  const [moodLoading, setMoodLoading] = useState(false);
  const [moodResult, setMoodResult]   = useState(null);
  const [moodMatchId, setMoodMatchId] = useState(null);
  const [moodError, setMoodError]     = useState(null);

  
  const debouncedQuery = useDebounce(rawQuery, 500);

  
  const { movies, loading, loadingMore, error, hasMore, loadMore } =
    useMovies(debouncedQuery);

  
  useEffect(() => {
    const sync = () => setFavIds(new Set(getFavorites().map((m) => m.id)));
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const handleToggleFav = useCallback((movie) => {
    const { added } = toggleFavorite(movie);
    setFavIds(new Set(getFavorites().map((m) => m.id)));
    showToast(added ? `❤️  Added "${movie.title}"` : `🖤  Removed "${movie.title}"`, setToast);
  }, []);

  
  const handleMoodMatch = async () => {
    if (!moodText.trim()) return;
    setMoodLoading(true);
    setMoodResult(null);
    setMoodError(null);
    setMoodMatchId(null);

    try {
      const suggestedTitle = await getMoodMovieFromGroq(moodText);
      if (!suggestedTitle) throw new Error('No title returned');

      // Silently search TMDB for the suggested title
      const tmdbData = await searchMovies(suggestedTitle, 1);
      const movie = tmdbData.results?.[0];

      setMoodResult({ title: suggestedTitle, movie });
      if (movie) setMoodMatchId(movie.id);
    } catch (err) {
      if (err.message === 'GROQ_KEY_MISSING') {
        setMoodError('Add your VITE_GROQ_API_KEY to .env to enable Mood Matcher.');
      } else {
        setMoodError(`Could not get a suggestion: ${err.message}`);
      }
    } finally {
      setMoodLoading(false);
    }
  };

  const sectionTitle = debouncedQuery
    ? `Results for "${debouncedQuery}"`
    : 'POPULAR MOVIES';

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="hero">
        <p className="hero-eyebrow">↯ DISCOVER</p>
        <h1 className="hero-title">
          YOUR NEXT<br />
          <em>Obsession</em>
        </h1>
        <p className="hero-sub">
          Millions of movies. Zero excuses. Start exploring.
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar value={rawQuery} onChange={setRawQuery} />

      {/* AI Mood Matcher — Level 3 (powered by Groq) */}
      <div className="mood-section">
        <div className="mood-label">
          <span className="mood-badge">AI POWERED</span>
        </div>
        <h2 className="mood-title">Mood Matcher</h2>
        <p className="mood-desc">
          Describe how you're feeling and we'll find the perfect movie for you.
        </p>
        <div className="mood-row">
          <input
            type="text"
            className="mood-input"
            placeholder="e.g. I'm feeling sad but want something uplifting…"
            value={moodText}
            onChange={(e) => setMoodText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !moodLoading && handleMoodMatch()}
          />
          <button
            className="mood-btn"
            onClick={handleMoodMatch}
            disabled={moodLoading || !moodText.trim()}
          >
            {moodLoading ? <Loader inline /> : '✦ Match'}
          </button>
        </div>

        {moodResult && (
          <div className="mood-result">
            {moodResult.movie ? (
              <>
                Based on your mood, we recommend: <strong>{moodResult.title}</strong>
                {moodResult.movie.overview && (
                  <> — {moodResult.movie.overview?.slice(0, 120)}…</>
                )}
              </>
            ) : (
              <>
                AI suggested <strong>{moodResult.title}</strong>, but we couldn't find it in our database.
              </>
            )}
          </div>
        )}

        {moodError && (
          <div className="mood-result mood-result--error">
            {moodError}
          </div>
        )}
      </div>

      {/* Section header */}
      <div className="section-header">
        <h2 className="section-title">{sectionTitle}</h2>
        {!loading && movies.length > 0 && (
          <span className="section-count">{movies.length} loaded</span>
        )}
      </div>

      {/* API key error */}
      {error && (
        <div className="error-banner">
          {error.includes('TMDB_API_KEY_MISSING')
            ? '🔑 Please add your VITE_TMDB_API_KEY to the .env file to load movies.'
            : `Error: ${error}`}
        </div>
      )}

      {/* Movie Grid */}
      <MovieGrid
        movies={movies}
        loading={loading}
        loadingMore={loadingMore}
        hasMore={hasMore}
        onLoadMore={loadMore}
        favIds={favIds}
        onToggleFav={handleToggleFav}
        moodMatchId={moodMatchId}
      />

      {/* Toast notification */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default Home;
