import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, projectsQuery, urlFor } from '../lib/sanityClient';
import { projects as fallbackProjects } from '../data/projects';
export default function Work() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(projectsQuery);
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center text-white font-headline">LOADING_SYSTEM...</div>;

  return (
    <>
      {/* SideNavBar (Project Index) */}
      <aside className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        <div className="mb-4 text-right transform -rotate-90 origin-right translate-y-[-40px]">
          <span className="font-headline font-bold uppercase text-[10px] tracking-widest text-lime-400">PROJECT_INDEX</span>
          <span className="font-headline font-bold uppercase text-[10px] tracking-widest text-white/30 ml-2">V.01</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-900/40 backdrop-blur-lg p-2">
          <button className="bg-lime-400 text-black p-3 scale-110 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">segment</span>
          </button>
          <button className="text-white/50 p-3 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">layers</span>
          </button>
          <button className="text-white/50 p-3 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">psychology</span>
          </button>
          <button className="text-white/50 p-3 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">insights</span>
          </button>
        </div>
      </aside>

      <main className="pt-32 pb-20">
        {/* Hero Title */}
        <div className="px-8 mb-32">
          <h1 className="font-headline text-[12vw] font-black uppercase leading-[0.8] tracking-tighter text-white opacity-90 mix-blend-difference">
            SELECTED<br/>
            <span className="text-primary-fixed">WORKS_</span>
          </h1>
          <div className="mt-8 max-w-2xl">
            <p className="font-body text-xl text-on-surface leading-relaxed border-l-4 border-secondary-container pl-8">
              An archive of technical explorations and high-precision digital artifacts. Pushing the boundaries of web architecture through aggressive aesthetic and raw functionalism.
            </p>
          </div>
        </div>

        {/* Project Grid */}
        <section className="flex flex-col gap-64 px-8 relative">
          {/* Background Decoration */}
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-surface-variant/20 hidden lg:block"></div>
          <div className="absolute top-0 right-1/4 w-[1px] h-full bg-surface-variant/20 hidden lg:block"></div>

          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const borderClass = isEven ? 'border-l-8 border-primary-fixed' : 'border-r-8 border-secondary-container text-right';
            const positionClass = isEven ? '-left-4 lg:-left-24' : '-right-4 lg:-right-24';
            const alignmentClass = isEven ? 'items-end' : 'items-start';
            const textColorClass = isEven ? 'text-primary-fixed' : 'text-secondary';
            const numStr = `00${index + 1}`.slice(-3);

            const projectSlug = project.slug?.current || project.slug || project._id;
            const imgSrc = project.image?.asset
              ? urlFor(project.image).width(900).url()
              : project.imageUrl || '';
            return (
              <article key={project._id || project.id} className={`relative flex flex-col ${alignmentClass} group`}>
                <div className="w-full lg:w-3/4 relative">
                  <Link to={`/work/${projectSlug}`} className="block aspect-[16/9] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    {imgSrc && (
                      <img
                        alt={project.title}
                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                        src={imgSrc}
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </Link>

                  {/* Glass Overlay */}
                  <div className={`absolute -bottom-16 ${positionClass} glass-panel p-12 max-w-xl shadow-2xl ${borderClass}`}>
                    <div className={`font-headline text-xs tracking-widest ${textColorClass} mb-4`}>{numStr} // {project.tags?.[0] || 'PROJECT'}</div>
                    <Link to={`/work/${projectSlug}`}>
                      <h2 className="font-headline text-5xl font-black uppercase text-white mb-6 leading-none hover:text-primary-fixed transition-colors">{project.title}</h2>
                    </Link>
                    <p className="font-body text-on-surface mb-8 leading-relaxed opacity-80">
                      {project.description}
                    </p>
                    <div className={`flex flex-wrap gap-2 ${!isEven ? 'justify-end' : ''}`}>
                      {project.tags?.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-surface-variant/50 text-white font-headline text-[10px] tracking-widest uppercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Technical Stack Bento Section */}
        <section className="mt-64 px-8">
          <h3 className="font-headline text-2xl font-black uppercase text-white mb-16 tracking-widest flex items-center gap-4">
            <span className="w-12 h-1 bg-primary-fixed"></span> CORE_CAPABILITIES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
            <div className="bg-surface-container-highest p-12 aspect-square flex flex-col justify-between group hover:bg-primary-fixed transition-colors duration-300">
              <span className="material-symbols-outlined text-4xl text-primary-fixed group-hover:text-on-primary-fixed transition-colors">terminal</span>
              <div>
                <h4 className="font-headline font-bold uppercase text-white group-hover:text-black mb-4">SYSTEMS_ARCH</h4>
                <p className="text-xs text-white/50 group-hover:text-black/70 font-label">Scaling massive distributed systems with high availability.</p>
              </div>
            </div>
            <div className="bg-surface-container-highest p-12 aspect-square flex flex-col justify-between group hover:bg-secondary-container transition-colors duration-300">
              <span className="material-symbols-outlined text-4xl text-secondary group-hover:text-white transition-colors">security</span>
              <div>
                <h4 className="font-headline font-bold uppercase text-white group-hover:text-white mb-4">SEC_OPS</h4>
                <p className="text-xs text-white/50 group-hover:text-white/70 font-label">Penetration testing and hardened infrastructure patterns.</p>
              </div>
            </div>
            <div className="bg-surface-container-highest p-12 aspect-square flex flex-col justify-between group hover:bg-surface-variant transition-colors duration-300">
              <span className="material-symbols-outlined text-4xl text-white group-hover:text-primary-fixed transition-colors">database</span>
              <div>
                <h4 className="font-headline font-bold uppercase text-white group-hover:text-white mb-4">DATA_ENGINEERING</h4>
                <p className="text-xs text-white/50 group-hover:text-white/70 font-label">Pipeline design for multi-terabyte dataset processing.</p>
              </div>
            </div>
            <div className="bg-surface-container-highest p-12 aspect-square flex flex-col justify-between group hover:bg-white transition-colors duration-300">
              <span className="material-symbols-outlined text-4xl text-white group-hover:text-black transition-colors">fluid</span>
              <div>
                <h4 className="font-headline font-bold uppercase text-white group-hover:text-black mb-4">UI_INTERACTION</h4>
                <p className="text-xs text-white/50 group-hover:text-black/70 font-label">High-fidelity interfaces with 60fps performance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-64 px-8 text-center mb-32">
          <div className="inline-block relative">
            <h2 className="font-headline text-[10vw] font-black uppercase text-white leading-none mb-12 mix-blend-overlay">READY_TO_BUILD?</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <Link to="/contact" className="group relative px-12 py-6 bg-primary-fixed text-on-primary-fixed font-headline font-black text-2xl uppercase tracking-tighter">
                START_PROJECT
                <div className="absolute inset-0 border-2 border-white translate-x-3 translate-y-3 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
