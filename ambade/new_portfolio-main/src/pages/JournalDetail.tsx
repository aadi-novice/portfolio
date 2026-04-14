import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, postBySlugQuery, urlFor } from '../lib/sanityClient';
import PortableTextRenderer from '../components/PortableTextRenderer';
import { blogs as fallbackBlogs } from '../data/blogs';

export default function JournalDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
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

  const coverImageUrl = blog?.image?.asset
    ? urlFor(blog.image).width(1400).url()
    : blog?.imageUrl || blog?.image;

  const formattedDate = blog?.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
    : blog?.date || '';

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center text-white font-headline">LOADING_SYSTEM...</div>;
  if (!blog) return <div className="min-h-screen bg-surface flex items-center justify-center text-error font-headline text-2xl">LOG_NOT_FOUND</div>;

  return (
    <>
      <main className="relative min-h-screen pt-32 pb-24 px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 grid-bg z-0 pointer-events-none"></div>
        <div className="fixed -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* ARTICLE_HEADER */}
        <header className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-16">
          <div className="absolute inset-0 z-0">
            {coverImageUrl && (
              <img
                alt={blog.title}
                className="w-full h-full object-cover"
                src={coverImageUrl}
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm"></div>
          </div>

          <div className="relative z-10 max-w-6xl px-8 w-full">
            <div className="mb-6 flex gap-4 flex-wrap">
              {blog.tags?.map((tag: string) => (
                <span key={tag} className="bg-primary-fixed text-on-primary-fixed px-3 py-1 font-label text-xs font-bold uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-black uppercase leading-[0.85] tracking-tighter text-white mb-8">
              {blog.title?.split(' ').slice(0, 3).join(' ')}<br/>
              <span className="text-primary-fixed-dim">{blog.title?.split(' ').slice(3).join(' ')}</span>
            </h1>
            <div className="flex items-center gap-6">
              {blog.author && <span className="font-label text-sm text-white/60 uppercase tracking-widest">{blog.author}</span>}
              {formattedDate && <span className="font-label text-sm text-secondary uppercase tracking-widest">— {formattedDate}</span>}
            </div>
            {blog.excerpt && (
              <p className="font-label text-xl text-white/60 max-w-2xl border-l-4 border-secondary pl-6 mt-4">
                {blog.excerpt}
              </p>
            )}
          </div>
        </header>

        {/* CONTENT — Portable Text Blocks */}
        <article className="max-w-4xl mx-auto pb-24 relative z-10">
          {blog.body && blog.body.length > 0 ? (
            <PortableTextRenderer value={blog.body} />
          ) : (
            <div className="text-white/40 font-headline text-xl border border-white/10 p-12 text-center">
              <p>NO_CONTENT_YET</p>
              <p className="text-sm mt-2 font-body text-white/30">Add blocks via the CMS at /studio to populate this article.</p>
            </div>
          )}
        </article>

        {/* NEXT_POST Transition */}
        <section className="w-full bg-primary-fixed py-24 px-8 overflow-hidden group cursor-pointer transition-colors hover:bg-secondary-container relative z-10">
          <Link to="/journal" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 block">
            <div className="flex-1">
              <span className="text-on-primary-fixed font-label font-bold uppercase tracking-[0.4em] mb-4 block group-hover:text-white transition-colors">← BACK_TO_JOURNAL</span>
              <h2 className="text-6xl md:text-[80px] font-headline font-black leading-[0.8] tracking-tighter text-on-primary-fixed group-hover:text-white transition-colors">ALL<br/>POSTS.</h2>
            </div>
            <div className="relative">
              <div className="w-32 h-32 md:w-48 md:h-48 border-[12px] md:border-[24px] border-on-primary-fixed flex items-center justify-center group-hover:border-white transition-colors group-hover:rotate-45 duration-500">
                <span className="material-symbols-outlined text-5xl md:text-7xl text-on-primary-fixed group-hover:text-white transition-colors">arrow_back</span>
              </div>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
