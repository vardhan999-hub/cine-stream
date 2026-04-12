// ─── Favorites Page ───────────────────────────────────────────────────────

import { useState, useCallback } from 'react';
import MovieCard from '../components/MovieCard';
import { getFavorites, toggleFavorite } from '../utils/localStorage';

let toastTimeout;
const showToast = (msg, setter) => {
  clearTimeout(toastTimeout);
  setter(msg);
  toastTimeout = setTimeout(() => setter(null), 2500);
};

const Favorites = () => {
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [toast, setToast]         = useState(null);

  const favIds = new Set(favorites.map((m) => m.id));

  const handleToggleFav = useCallback((movie) => {
    const { added } = toggleFavorite(movie);
    setFavorites(getFavorites());
    showToast(added ? `❤️  Added "${movie.title}"` : `🖤  Removed "${movie.title}"`, setToast);
  }, []);

  const avgRating = favorites.length
    ? (favorites.reduce((sum, m) => sum + (m.vote_average || 0), 0) / favorites.length).toFixed(1)
    : '—';

  return (
    <div className="page-wrapper">
      <div className="hero">
        <p className="hero-eyebrow">↯ COLLECTION</p>
        <h1 className="hero-title">
          MY<br />
          <em>Favorites</em>
        </h1>
      </div>

      {/* Stats */}
      {favorites.length > 0 && (
        <div className="fav-stats">
          <div className="fav-stat">
            <div className="fav-stat-number">{favorites.length}</div>
            <div className="fav-stat-label">FILMS SAVED</div>
          </div>
          <div className="fav-stat">
            <div className="fav-stat-number">{avgRating}</div>
            <div className="fav-stat-label">AVG RATING</div>
          </div>
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🤍</div>
          <p className="empty-title">NO FAVORITES YET</p>
          <p className="empty-desc">
            Tap the heart icon on any movie to save it here.
          </p>
        </div>
      ) : (
        <>
          <div className="section-header">
            <h2 className="section-title">SAVED FILMS</h2>
          </div>
          <div className="movie-grid">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFav={favIds.has(movie.id)}
                onToggleFav={handleToggleFav}
              />
            ))}
          </div>
        </>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default Favorites;
