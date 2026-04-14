import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Journal from './pages/Journal';
import JournalDetail from './pages/JournalDetail';
import Admin from './pages/Admin';
import StudioPage from './pages/StudioPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Sanity Studio — full-screen, no Layout wrapper */}
        <Route path="/studio/*" element={<StudioPage />} />

        {/* Portfolio */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<ProjectDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="journal" element={<Journal />} />
          <Route path="journal/:slug" element={<JournalDetail />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}
