import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, projectBySlugQuery, urlFor } from '../lib/sanityClient';
import PortableTextRenderer from '../components/PortableTextRenderer';
import { projects as fallbackProjects } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      try {
        const data = await client.fetch(projectBySlugQuery, { slug });
        if (data) {
          setProject(data);
        } else {
          // Fallback to local data
          const local = fallbackProjects.find(p => p.id.toString() === slug || p.title.toLowerCase().replace(/\s+/g, '-') === slug);
          setProject(local || fallbackProjects[0]);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        const local = fallbackProjects.find(p => p.id.toString() === slug);
        setProject(local || fallbackProjects[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  const heroImageUrl = project?.image?.asset
    ? urlFor(project.image).width(600).url()
    : project?.imageUrl || project?.image;

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center text-white font-headline">LOADING_SYSTEM...</div>;
  if (!project) return <div className="min-h-screen bg-surface flex items-center justify-center text-error font-headline text-2xl">PROJECT_NOT_FOUND</div>;

  return (
    <>
      {/* SideNavBar */}
      <aside className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        <div className="bg-zinc-900/40 backdrop-blur-lg flex flex-col items-center py-4">
          <div className="mb-6 rotate-90">
            <span className="font-headline font-bold uppercase text-[10px] tracking-widest text-lime-400 whitespace-nowrap">PROJECT_INDEX V.01</span>
          </div>
          <a href="#overview" className="bg-lime-400 text-black p-3 scale-110 flex items-center justify-center transition-all duration-300">
            <span className="material-symbols-outlined">segment</span>
          </a>
          <a href="#content" className="text-white/50 p-3 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center">
            <span className="material-symbols-outlined">article</span>
          </a>
        </div>
      </aside>

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section id="overview" className="px-8 mb-32">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="flex-1">
              <h1 className="font-headline text-[10vw] md:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter text-white mb-8">
                {project.title?.split(' ')[0]}<br/>
                <span className="text-primary-container">{project.title?.split(' ').slice(1).join(' ')}</span>
              </h1>
              <div className="max-w-2xl">
                <p className="text-xl md:text-2xl font-light text-on-surface leading-relaxed border-l-4 border-secondary-container pl-6 mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  {project.tags?.slice(0, 4).map((tag: string) => (
                    <span key={tag} className="font-label text-xs uppercase tracking-[0.2em] bg-surface-variant px-3 py-1">{tag}</span>
                  ))}
                </div>
                {(project.githubUrl || project.demoUrl) && (
                  <div className="flex gap-6 mt-8">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="font-headline font-bold uppercase text-sm text-white border-b-2 border-primary-fixed hover:text-primary-fixed transition-colors">
                        View_Source ↗
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="font-headline font-bold uppercase text-sm text-white border-b-2 border-secondary hover:text-secondary transition-colors">
                        Live_Demo ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            {heroImageUrl && (
              <div className="hidden md:block w-1/3 aspect-[3/4] bg-surface-container-highest relative overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale contrast-125"
                  src={heroImageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 glass-panel flex items-center justify-center opacity-40"></div>
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Block Content */}
        <section id="content" className="px-8 mb-32 max-w-6xl mx-auto">
          {project.body && project.body.length > 0 ? (
            <PortableTextRenderer value={project.body} />
          ) : (
            <div className="text-white/40 font-headline text-xl border border-white/10 p-12 text-center">
              <p>NO_CONTENT_YET</p>
              <p className="text-sm mt-2 font-body text-white/30">Add blocks via the CMS at /studio to populate this project page.</p>
            </div>
          )}
        </section>

        {/* Footer CTA */}
        <section className="px-8 flex flex-col md:flex-row justify-between items-center gap-12 border-t-8 border-white/5 pt-24">
          <Link to="/work" className="group cursor-pointer">
            <p className="font-label text-xs text-white/50 tracking-widest uppercase mb-4">← BACK_TO_WORK</p>
            <h3 className="font-headline text-4xl font-black uppercase group-hover:text-secondary-container transition-colors">ALL_PROJECTS</h3>
          </Link>
        </section>
      </main>
    </>
  );
}
