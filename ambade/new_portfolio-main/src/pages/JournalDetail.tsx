import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, postBySlugQuery } from '../lib/sanityClient';
import { imageOf, monthYear } from '../lib/content';
import PortableTextRenderer from '../components/PortableTextRenderer';
import { blogs as fallbackBlogs } from '../data/blogs';
import { findLocalPost } from '../data/local';

export default function JournalDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      const localPost = findLocalPost(slug);
      if (localPost) {
        setBlog(localPost);
        setLoading(false);
        return;
      }
      try {
        const data = await client.fetch(postBySlugQuery, { slug });
        if (data) {
          setBlog(data);
        } else {
          const local = fallbackBlogs.find(b => b.id.toString() === slug);
          setBlog(local || fallbackBlogs[0]);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        const local = fallbackBlogs.find(b => b.id.toString() === slug);
        setBlog(local || fallbackBlogs[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const coverImageUrl = blog ? imageOf(blog, 1600) : '';
  const formattedDate = blog ? monthYear(blog) : '';

  if (loading) return <div className="state" role="status">Loading…</div>;
  if (!blog) return <div className="state" role="alert">That post could not be found.</div>;

  return (
    <>
      <header className="page-head">
        <div className="container">
          <h1 style={{ maxWidth: '22ch' }}>{blog.title}</h1>
          {(blog.author || formattedDate) && (
            <p className="meta" style={{ marginTop: 'var(--space-lg)' }}>
              {blog.author && <span>{blog.author}</span>}
              {blog.author && formattedDate && ', '}
              {formattedDate && <time dateTime={blog.publishedAt || undefined}>{formattedDate}</time>}
              {blog.tags?.length > 0 && <span>, {blog.tags.join(', ')}</span>}
            </p>
          )}
          {blog.excerpt && <p className="lead">{blog.excerpt}</p>}
        </div>
      </header>

      {coverImageUrl && (
        <div className="container">
          <figure className="photo photo--wide" style={{ maxHeight: '70svh' }}>
            <img src={coverImageUrl} alt="" width={1600} height={900} fetchPriority="high" referrerPolicy="no-referrer" />
          </figure>
        </div>
      )}

      <article className="section--s">
        <div className="container">
          {blog.body && blog.body.length > 0 ? (
            <PortableTextRenderer value={blog.body} title={blog.title} />
          ) : (
            <div className="prose">
              <p>This post has not been published yet.</p>
            </div>
          )}
          <div className="back">
          <Link to="/journal">All posts</Link>
          <Link className="link" to="/contact">Start a project</Link>
          </div>
        </div>
      </article>

    </>
  );
}
