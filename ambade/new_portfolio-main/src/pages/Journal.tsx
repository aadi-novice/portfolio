import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, postsQuery, postBySlugQuery } from '../lib/sanityClient';
import { slugOf, imageOf, fullDate, openingLine } from '../lib/content';
import { blogs as fallbackBlogs } from '../data/blogs';
import { localPosts } from '../data/local';

export default function Journal() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadOpening, setLeadOpening] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await client.fetch(postsQuery);
        if (data && data.length > 0) {
          setBlogs([...localPosts, ...data]);
        } else {
          setBlogs([...localPosts, ...fallbackBlogs]);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        setBlogs([...localPosts, ...fallbackBlogs]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const leadSlugForFetch = blogs[0] ? slugOf(blogs[0]) : '';
  useEffect(() => {
    if (!leadSlugForFetch || !blogs[0]?._id) return;
    if (blogs[0].body) {
      setLeadOpening(openingLine(blogs[0].body, blogs[0].title || ''));
      return;
    }
    client
      .fetch(postBySlugQuery, { slug: leadSlugForFetch })
      .then((data: any) => setLeadOpening(openingLine(data?.body, data?.title || '')))
      .catch(() => setLeadOpening(''));
  }, [leadSlugForFetch]);

  if (loading) return <div className="state" role="status">Loading…</div>;

  const [lead, ...rest] = blogs;
  const leadSlug = lead ? slugOf(lead) : '';
  const leadImage = lead ? imageOf(lead, 1400) : '';

  return (
    <>
      <header className="page-head">
        <div className="container">
          <h1>Journal</h1>
          <p className="lead">Technical deep-dives, architectural post-mortems, and the occasional rant on memory safety.</p>
        </div>
      </header>

      <section className="section--s" aria-label="Posts">
        <div className="container">
          {lead && (
            <article className="grid12 journal-lead">
              <figure className="journal-lead__figure">
                <Link to={`/journal/${leadSlug}`} className="photo photo--43" tabIndex={-1} aria-hidden="true">
                  {leadImage && (
                    <img src={leadImage} alt="" width={1400} height={1050} referrerPolicy="no-referrer" />
                  )}
                </Link>
              </figure>
              <div className="journal-lead__body">
                {fullDate(lead) && <time className="meta" dateTime={lead.publishedAt || undefined}>{fullDate(lead)}</time>}
                <h2>
                  <Link to={`/journal/${leadSlug}`}>{lead.title}</Link>
                </h2>
                {(leadOpening || lead.excerpt) && <p>{leadOpening || lead.excerpt}</p>}
                {lead.tags?.length > 0 && <p className="meta">{lead.tags.join(', ')}</p>}
                <Link className="btn btn--quiet" to={`/journal/${leadSlug}`}>Read the post</Link>
              </div>
            </article>
          )}

          {rest.length > 0 && (
            <ul className="index" aria-label="Earlier posts">
              {rest.map((blog) => (
                <li key={blog._id || blog.id} className="index__row">
                  <h2 className="index__title">
                    <Link to={`/journal/${slugOf(blog)}`}>{blog.title}</Link>
                  </h2>
                  <p className="index__line">{blog.excerpt}</p>
                  <p className="index__meta">{fullDate(blog) || (blog.tags?.length ? blog.tags.join(', ') : 'Journal')}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
