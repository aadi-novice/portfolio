import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, projectBySlugQuery } from '../lib/sanityClient';
import { imageOf, monthYear } from '../lib/content';
import PortableTextRenderer from '../components/PortableTextRenderer';
import { projects as fallbackProjects } from '../data/projects';
import { totem } from '../data/totem';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      if (slug === 'totem') {
        setProject(totem);
        setLoading(false);
        return;
      }
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

  const heroImageUrl = project ? project.phoneImageUrl || imageOf(project, 1200) : '';

  if (loading) return <div className="state" role="status">Loading…</div>;
  if (!project) return <div className="state" role="alert">That project could not be found.</div>;

  const date = monthYear(project);

  return (
    <>
      <section id="overview" className="page-head">
        <div className="container grid12 detail-head">
          <div className="detail-head__text">
            <h1>{project.title}</h1>
            <p className="lead">{project.description}</p>
            {(project.tags?.length > 0 || date) && (
              <p className="meta">
                {[date, project.tags?.slice(0, 4).join(', ')].filter(Boolean).join(', ')}
              </p>
            )}
            {(project.githubUrl || project.demoUrl) && (
              <div className="detail-links">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn">
                    View the source
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={project.githubUrl ? 'btn btn--quiet' : 'btn'}>
                    {project.earlyAccessUrl ? 'Visit gettotem.app' : 'Open the live demo'}
                  </a>
                )}
                {project.earlyAccessUrl && (
                  <a href={project.earlyAccessUrl} target="_blank" rel="noopener noreferrer" className="btn btn--quiet">
                    Get early access
                  </a>
                )}
              </div>
            )}
          </div>
          {heroImageUrl && (
            <figure className="detail-head__figure">
              <div className="photo photo--45">
                <img src={heroImageUrl} alt="" width={1200} height={1500} fetchPriority="high" referrerPolicy="no-referrer" />
              </div>
            </figure>
          )}
        </div>
      </section>

      <section id="content" className="section--s">
        <div className="container">
          <div className="opens">
            {project.body && project.body.length > 0 ? (
              <PortableTextRenderer value={project.body} title={project.title} />
            ) : (
              <div className="prose">
                <p>The write-up for this project has not been published yet.</p>
              </div>
            )}
          </div>
          <div className="back">
          <Link to="/work">All projects</Link>
          <Link className="link" to="/contact">Start a project</Link>
          </div>
        </div>
      </section>

    </>
  );
}
