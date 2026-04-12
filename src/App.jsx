import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import ScrollToTop from './components/ScrollToTop';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-inner">
      <NavLink to="/" className="logo">
        CINE<span>·</span>STREAM
      </NavLink>
      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          Discover
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          ❤ Favorites
        </NavLink>
      </div>
    </div>
  </nav>
);

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
    <ScrollToTop />
  </BrowserRouter>
);

export default App;
