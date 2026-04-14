import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-zinc-950/40 backdrop-blur-xl shadow-[0_0_60px_rgba(209,255,0,0.1)]">
        <Link to="/" className="text-2xl font-black italic tracking-tighter text-white font-headline uppercase">
          Aadi.DEV
        </Link>
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <Link 
            to="/work" 
            className={`font-headline uppercase tracking-tighter font-bold text-sm transition-colors ${location.pathname.startsWith('/work') ? 'text-lime-400 border-b-4 border-lime-400 pb-1' : 'text-white/70 hover:text-white'}`}
          >
            WORK
          </Link>
          <Link 
            to="/journal" 
            className={`font-headline uppercase tracking-tighter font-bold text-sm transition-colors ${location.pathname.startsWith('/journal') ? 'text-lime-400 border-b-4 border-lime-400 pb-1' : 'text-white/70 hover:text-white'}`}
          >
            JOURNAL
          </Link>
          <Link 
            to="/about" 
            className={`font-headline uppercase tracking-tighter font-bold text-sm transition-colors ${location.pathname === '/about' ? 'text-lime-400 border-b-4 border-lime-400 pb-1' : 'text-white/70 hover:text-white'}`}
          >
            ABOUT
          </Link>
          <Link 
            to="/contact" 
            className={`font-headline uppercase tracking-tighter font-bold text-sm transition-colors ${location.pathname === '/contact' ? 'text-lime-400 border-b-4 border-lime-400 pb-1' : 'text-white/70 hover:text-white'}`}
          >
            CONTACT
          </Link>
        </div>
        <Link 
          to="/contact"
          className="bg-primary-fixed text-on-primary-fixed font-headline font-bold text-sm uppercase px-6 py-2 rounded-none hover:bg-lime-400 hover:text-black transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"
        >
          HIRE_ME
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-zinc-950 border-t-4 border-lime-400 relative z-10">
        <div className="text-xl font-black text-white font-headline">AADI.DEV</div>
        <div className="flex gap-8 flex-wrap justify-center">
          <a href="https://github.com/aadi-novice" className="font-headline font-medium text-xs tracking-[0.2em] text-zinc-500 hover:text-lime-400 transition-colors uppercase">GITHUB</a>
          <a href="#" className="font-headline font-medium text-xs tracking-[0.2em] text-zinc-500 hover:text-lime-400 transition-colors uppercase">READ.CV</a>
          <a href="https://www.are.na/aditya-ambade/channels" className="font-headline font-medium text-xs tracking-[0.2em] text-zinc-500 hover:text-lime-400 transition-colors uppercase">ARE.NA</a>
          <a href="mailto:aditya@ambade.me" className="font-headline font-medium text-xs tracking-[0.2em] text-zinc-500 hover:text-lime-400 transition-colors uppercase">EMAIL</a>
        </div>
        <div className="font-headline font-medium text-xs tracking-[0.2em] text-zinc-500 uppercase">
          ©2026 cherenkov Digital
        </div>
      </footer>
    </div>
  );
}
