import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, projectsQuery, postsQuery, postBySlugQuery } from '../lib/sanityClient';
import { slugOf, imageOf, monthYear, yearOf, openingLine } from '../lib/content';
import { projects as fallbackProjects } from '../data/projects';
import { blogs as fallbackBlogs } from '../data/blogs';
import ContactForm from '../components/ContactForm';
import { resumeProjects } from '../data/totem';
import { localProjects, localPosts } from '../data/local';

const latestProjectQuery = `*[_type == "project"] | order(publishedAt desc)[0] {
  _id,
  title,
  slug,
  description,
  image,
  imageUrl,
  tags,
  publishedAt
}`;

/** Work from the lab that has no page of its own yet. */
const labEntries = [
  {
    kind: 'Experimental',
    title: 'Labs',
    line: 'Exploring the boundaries of spatial computing and human-computer interaction through generative shaders.',
  },
  {
    kind: 'Infrastructure',
    title: 'Core grid',
    line: 'Decentralized node management system for high-availability distributed systems.',
  },
];

export default function Home() {
  const [featuredProject, setFeaturedProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [caseOpening, setCaseOpening] = useState('');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await client.fetch(latestProjectQuery);
        if (data) {
          setFeaturedProject(data);
        } else {
          setFeaturedProject(fallbackProjects[0]);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        setFeaturedProject(fallbackProjects[0]);
      }
    };
    const fetchIndex = async () => {
      try {
        const [projectData, postData] = await Promise.all([client.fetch(projectsQuery), client.fetch(postsQuery)]);
        setProjects(projectData?.length ? projectData : fallbackProjects);
        setPosts(postData?.length ? postData : fallbackBlogs);
      } catch (error) {
        console.error('Sanity fetch error:', error);
        setProjects(fallbackProjects);
        setPosts(fallbackBlogs);
      }
    };
    fetchFeatured();
    fetchIndex();
  }, []);

  // The write-up of the featured project, when the journal has one: its picture and first paragraph open the case.
  const casePost = featuredProject ? posts.find((p) => p.excerpt && p.excerpt === featuredProject.description) : undefined;
  const casePostSlug = casePost ? slugOf(casePost) : '';

  useEffect(() => {
    if (!casePostSlug) return;
    client
      .fetch(postBySlugQuery, { slug: casePostSlug })
      .then((data: any) => setCaseOpening(openingLine(data?.body, data?.title || '')))
      .catch(() => setCaseOpening(''));
  }, [casePostSlug]);

  if (!featuredProject) {
    return <div className="state" role="status">Loading…</div>;
  }

  const featuredSlug = slugOf(featuredProject);
  const featuredImage = imageOf(featuredProject, 1600);
  const featuredDate = monthYear(featuredProject);
  const projectLines = new Set(projects.map((p) => p.description).filter(Boolean));
  const caseImage = (casePost && imageOf(casePost, 1600)) || featuredImage;

  return (
    <>
      {/* Hero: the index of work and writing */}
      <section className="hero-index" aria-labelledby="home-title">
        <div className="container">
          <div className="grid12 hero-index__head">
            <h1 id="home-title">Aditya Ambade</h1>
            <div className="hero-index__aside">
              <p className="lead">AI engineer building production LLM systems and the backends around them.</p>
              <a className="btn" href="#contact">Start a project</a>
            </div>
          </div>

          <ul className="index" aria-label="Work and writing">
            {[...localProjects, ...projects].map((project, i) => {
              const cover = i === 0 ? imageOf(project, 1000) : '';
              if (cover) {
                return (
                  <li key={project._id || project.id} className="index__row index__row--lead">
                    <div className="index__lead-text">
                      <h2 className="index__title">
                        <Link to={`/work/${slugOf(project)}`}>{project.title}</Link>
                      </h2>
                      <p className="index__line">{project.description}</p>
                      <p className="index__meta">Project{yearOf(project) ? `, ${yearOf(project)}` : ''}</p>
                    </div>
                    <div className="index__cover photo" data-kind="product">
                      <img src={cover} alt="" width={1000} height={625} fetchPriority="high" referrerPolicy="no-referrer" />
                    </div>
                  </li>
                );
              }
              return (
                <li key={project._id || project.id} className="index__row">
                  <h2 className="index__title">
                    <Link to={`/work/${slugOf(project)}`}>{project.title}</Link>
                  </h2>
                  <p className="index__line">{project.description}</p>
                  <p className="index__meta">Project{yearOf(project) ? `, ${yearOf(project)}` : ''}</p>
                </li>
              );
            })}
            {resumeProjects.map((entry) => (
              <li key={entry.title} className="index__row">
                <h2 className="index__title">
                  {entry.href ? <a href={entry.href}>{entry.title}</a> : entry.title}
                </h2>
                <p className="index__line">{entry.line}</p>
                <p className="index__meta">{entry.kind}</p>
              </li>
            ))}
            {[...localPosts, ...posts].map((post) => (
              <li key={post._id || post.id} className="index__row">
                <h2 className="index__title">
                  <Link to={`/journal/${slugOf(post)}`}>{post.title}</Link>
                </h2>
                <p className="index__line">{projectLines.has(post.excerpt) ? '' : post.excerpt}</p>
                <p className="index__meta">Journal{yearOf(post) ? `, ${yearOf(post)}` : ''}</p>
              </li>
            ))}
            {labEntries.map((entry) => (
              <li key={entry.title} className="index__row">
                <h2 className="index__title">{entry.title}</h2>
                <p className="index__line">{entry.line}</p>
                <p className="index__meta">{entry.kind}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* One project, opened */}
      <section className="section" aria-labelledby="case-title">
        <div className="container grid12 case">
          <figure className="case__figure">
            <Link to={`/work/${featuredSlug}`} className="photo photo--43" tabIndex={-1} aria-hidden="true">
              {caseImage && (
                <img src={caseImage} alt="" width={1600} height={1200} loading="lazy" referrerPolicy="no-referrer" />
              )}
            </Link>
            <figcaption className="caption">
              {casePost ? `From the write-up, “${casePost.title}”` : `The most recent project${featuredDate ? `, ${featuredDate}` : ''}`}
            </figcaption>
          </figure>
          <div className="case__body">
            <h2 id="case-title">{casePost ? casePost.title : featuredProject.title}</h2>
            {casePost ? caseOpening && <p>{caseOpening}</p> : <p>{featuredProject.description}</p>}
            {featuredProject.tags?.length > 0 && <p className="meta">{featuredProject.tags.join(', ')}</p>}
            {casePost && <Link className="btn btn--quiet" to={`/journal/${casePostSlug}`}>Read the post</Link>}
            <Link className={casePost ? 'link' : 'btn btn--quiet'} to={`/work/${featuredSlug}`}>Read the {featuredProject.title} case study</Link>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="section--s statement" aria-labelledby="statement-title">
        <div className="container">
          <div className="opens">
            <h2 id="statement-title">Uncompromising performance.</h2>
            <p className="standfirst">
              I build tools for the future. A high-frequency trading platform or a generative art marketplace, the goal is the same: absolute technical superiority.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section band--well" aria-labelledby="contact-title">
        <div className="container grid12 contact">
          <div className="contact__facts">
            <h2 id="contact-title">Initiate contact</h2>
            <dl className="facts">
              <div>
                <dt>Elsewhere</dt>
                <dd>
                  <ul>
                    <li><a className="link" href="https://github.com/aadi-novice">GitHub</a></li>
                    <li><a className="link" href="https://www.linkedin.com/in/ambadeaditya">LinkedIn</a></li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
          <div className="contact__form">
            <ContactForm submitLabel="Send the message" />
          </div>
        </div>
      </section>
    </>
  );
}
