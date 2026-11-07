import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, projectsQuery } from '../lib/sanityClient';
import { slugOf, imageOf, monthYear } from '../lib/content';
import { projects as fallbackProjects } from '../data/projects';
import { totem, resumeProjects } from '../data/totem';

const capabilities = [
  { title: 'Systems architecture', line: 'Scaling massive distributed systems with high availability.' },
  { title: 'Security operations', line: 'Penetration testing and hardened infrastructure patterns.' },
  { title: 'Data engineering', line: 'Pipeline design for multi-terabyte dataset processing.' },
  { title: 'UI interaction', line: 'High-fidelity interfaces with 60fps performance.' },
];

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

  if (loading) return <div className="state" role="status">Loading…</div>;

  return (
    <>
      <header className="page-head">
        <div className="container">
          <h1>Selected work</h1>
          <p className="lead">An archive of technical explorations and high-precision digital artifacts.</p>
        </div>
      </header>

      {/* The projects, each opened beside its cover */}
      <section className="section--s" aria-label="Projects">
        <div className="container entries">
          {[totem, ...projects].map((project, index) => {
            const projectSlug = slugOf(project);
            const imgSrc = imageOf(project, 1400);
            const date = monthYear(project);
            return (
              <article key={project._id || project.id} className="grid12 entry">
                <figure className="entry__figure">
                  <Link to={`/work/${projectSlug}`} className="photo photo--43" tabIndex={-1} aria-hidden="true">
                    {imgSrc && (
                      <img
                        src={imgSrc}
                        alt=""
                        width={1400}
                        height={1050}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </Link>
                </figure>
                <div className="entry__body">
                  <h2>
                    <Link to={`/work/${projectSlug}`}>{project.title}</Link>
                  </h2>
                  <p>{project.description}</p>
                  {project.tags?.length > 0 && <p className="meta">{project.tags.join(', ')}</p>}
                  {date && <p className="meta">{date}</p>}
                  <Link className="link" to={`/work/${projectSlug}`}>Read the case study</Link>
                  {project.demoUrl && (
                    <a className="link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Visit {project.demoUrl.replace(/^https?:\/\//, '')}</a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* More from the resume */}
      <section className="section--s" aria-labelledby="more-title">
        <div className="container">
          <div className="head-block">
            <h2 id="more-title">More projects</h2>
          </div>
          <ul className="rows">
            {resumeProjects.map((item) => (
              <li key={item.title}>
                <h3>{item.href ? <a className="link" href={item.href}>{item.title}</a> : item.title}</h3>
                <p>{item.line} {item.detail !== item.line ? item.detail : ''}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What the work is built from */}
      <section className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <div className="head-block">
            <h2 id="capabilities-title">Core capabilities</h2>
          </div>
          <ul className="rows">
            {capabilities.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close */}
      <section className="section--s band--ink" aria-labelledby="build-title">
        <div className="container close-band">
          <h2 id="build-title">Ready to build?</h2>
          <div>
            <Link to="/contact" className="btn">Start a project</Link>
          </div>
        </div>
      </section>
    </>
  );
}
