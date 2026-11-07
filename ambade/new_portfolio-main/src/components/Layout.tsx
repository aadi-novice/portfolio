import { Link, NavLink, Outlet } from 'react-router-dom';

const navLinks = [
  { to: '/work', label: 'Work' },
  { to: '/journal', label: 'Journal' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="container site-header__bar">
          <Link to="/" className="wordmark" aria-label="Aadi.dev, home">
            Aadi.dev
          </Link>
          <nav className="site-nav" aria-label="Primary">
            <ul>
              {navLinks.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/about' || item.to === '/contact'} className="nav-link">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn--quiet btn--small">
              Hire me
            </Link>
          </nav>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p className="standfirst">
            Say hello at <a className="link" href="mailto:aditya@ambade.me">aditya@ambade.me</a>
          </p>
          <div className="site-footer__base">
            <ul>
              <li><a className="link" href="https://github.com/aadi-novice">GitHub</a></li>
              <li><a className="link" href="https://www.are.na/aditya-ambade/channels">Are.na</a></li>
              <li><a className="link" href="mailto:aditya@ambade.me">Email</a></li>
            </ul>
            <p className="meta">©2026 cherenkov Digital</p>
          </div>
        </div>
      </footer>
    </>
  );
}
