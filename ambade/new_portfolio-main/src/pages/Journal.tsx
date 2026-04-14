import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, postsQuery, urlFor } from '../lib/sanityClient';
import { blogs as fallbackBlogs } from '../data/blogs';

export default function Journal() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await client.fetch(postsQuery);
        if (data && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(fallbackBlogs);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center text-white font-headline">LOADING_SYSTEM...</div>;

  return (
    <>
      {/* Background Elements */}
      <div className="fixed inset-0 grid-bg z-0 pointer-events-none"></div>
      <div className="fixed -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed top-[40%] -right-[10%] w-[50%] h-[50%] bg-secondary-container/5 blur-[150px] rounded-full pointer-events-none"></div>

      <main className="relative min-h-screen pt-32 pb-24 px-8 overflow-hidden">
        {/* Hero Section */}
        <section className="relative z-10 mb-32">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b-4 border-primary-container pb-8">
            <h1 className="font-headline text-7xl md:text-[12rem] font-black leading-[0.85] tracking-tighter text-primary-fixed uppercase break-all">
              JOURNAL<br/>_LOG
            </h1>
            <div className="max-w-md text-right">
              <p className="font-headline text-lg font-bold text-secondary uppercase tracking-widest mb-2">V.24_INDEX</p>
              <p className="text-on-surface-variant font-medium">Technical deep-dives, architectural post-mortems, and the occasional rant on memory safety.</p>
            </div>
          </div>
        </section>

        {/* Asymmetrical Article Grid */}
        <section className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-32 gap-x-12">
          {blogs.map((blog, index) => {
            // Build slug and image URL for Sanity or fallback data
            const blogSlug = blog.slug?.current || blog.slug || blog.id?.toString();
            const imgSrc = blog.image?.asset
              ? urlFor(blog.image).width(1200).url()
              : blog.imageUrl || blog.image || '';
            const formattedDate = blog.publishedAt
              ? new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
              : blog.date || '';
            const postTags: string[] = blog.tags || [];

            // Determine layout based on index — exact same pattern as before
            let colSpan = 'md:col-span-7';
            let extraClasses = '';
            let aspect = 'aspect-[16/9]';
            let titleSize = 'text-4xl md:text-6xl';

            if (index % 4 === 1) {
              colSpan = 'md:col-span-4 md:col-start-9';
              extraClasses = 'md:pt-48';
              aspect = 'aspect-[4/5]';
              titleSize = 'text-3xl';
            } else if (index % 4 === 2) {
              colSpan = 'md:col-span-5';
              extraClasses = 'md:pt-12';
              aspect = 'aspect-square';
              titleSize = 'text-4xl';
            } else if (index % 4 === 3) {
              colSpan = 'md:col-span-6 md:col-start-7';
              aspect = '';
              titleSize = 'text-5xl';
            }

            const numStr = `0${index + 1}`.slice(-2);

            // Special text-only layout for 4th item in each group
            if (index % 4 === 3) {
              return (
                <div key={blog._id || blog.id} className={`${colSpan} ${extraClasses} flex flex-col group`}>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="font-headline text-5xl font-black text-outline-variant opacity-30">{numStr}</span>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {postTags.length > 0
                        ? postTags.map((tag: string) => (
                            <span key={tag} className="bg-surface-variant text-on-surface-variant font-label text-[10px] font-bold px-2 py-0.5 tracking-tighter uppercase">{tag}</span>
                          ))
                        : <span className="bg-surface-variant text-on-surface-variant font-label text-[10px] font-bold px-2 py-0.5 tracking-tighter">JOURNAL</span>
                      }
                    </div>
                  </div>
                  <div className="relative glass-article overflow-hidden bg-surface-container-highest p-12 flex flex-col justify-center min-h-[400px]">
                    <div className="absolute top-0 right-0 p-4">
                      <span className="material-symbols-outlined text-primary-fixed text-6xl opacity-20" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                    </div>
                    <p className="font-label text-primary-fixed text-xs mb-4 tracking-widest">PUBLISHED: {formattedDate}</p>
                    <h2 className={`${titleSize} font-headline font-black text-white leading-none uppercase tracking-tighter mb-6 group-hover:text-secondary transition-colors`}>
                      {blog.title}
                    </h2>
                    <p className="text-on-surface-variant mb-8 text-lg">
                      {blog.excerpt}
                    </p>
                    <Link to={`/journal/${blogSlug}`} className="font-headline font-bold text-white group-hover:text-primary-fixed flex items-center gap-2 transition-colors">
                      VIEW_DOCUMENTATION <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              );
            }

            // Standard image-based card layout
            return (
              <div key={blog._id || blog.id} className={`${colSpan} ${extraClasses} flex flex-col group`}>
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-headline text-5xl font-black text-outline-variant opacity-30">{numStr}</span>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {postTags.length > 0
                      ? postTags.map((tag: string) => (
                          <span key={tag} className="bg-surface-variant text-on-surface-variant font-label text-[10px] font-bold px-2 py-0.5 tracking-tighter uppercase">{tag}</span>
                        ))
                      : <span className="bg-surface-variant text-on-surface-variant font-label text-[10px] font-bold px-2 py-0.5 tracking-tighter">JOURNAL</span>
                    }
                  </div>
                </div>
                <div className="relative glass-article overflow-hidden">
                  {imgSrc ? (
                    <img
                      className={`w-full ${aspect} object-cover grayscale group-hover:grayscale-0 transition-all duration-700`}
                      src={imgSrc}
                      alt={blog.title}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    // Elegant fallback when no image is set — keeps layout intact
                    <div className={`w-full ${aspect || 'aspect-[16/9]'} bg-surface-container-high flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-6xl text-primary-fixed/20">article</span>
                    </div>
                  )}
                  <div className="glass-overlay absolute inset-0 backdrop-blur-0 transition-all duration-500 flex flex-col justify-end p-8 bg-gradient-to-t from-background via-transparent to-transparent">
                    <p className="font-label text-primary-fixed text-xs mb-2 tracking-widest">PUBLISHED: {formattedDate}</p>
                    <h2 className={`${titleSize} font-headline font-black text-white leading-none uppercase tracking-tighter mb-4 group-hover:text-primary-fixed transition-colors`}>
                      {blog.title}
                    </h2>
                    <p className="text-on-surface-variant max-w-lg mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {blog.excerpt}
                    </p>
                    <div className="flex gap-4">
                      <Link to={`/journal/${blogSlug}`} className="bg-primary-fixed text-on-primary-fixed px-6 py-2 font-headline font-bold text-xs uppercase hover:bg-secondary-container hover:text-white transition-all">READ_FULL_LOG</Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Pagination — shows real count */}
        <section className="relative z-10 mt-48 flex justify-center items-center gap-12">
          <button className="text-zinc-500 hover:text-primary-fixed transition-colors">
            <span className="material-symbols-outlined text-4xl">west</span>
          </button>
          <div className="flex items-baseline gap-4">
            <span className="font-headline text-8xl font-black text-primary-fixed">01</span>
            <span className="font-headline text-4xl font-black text-outline-variant">/</span>
            <span className="font-headline text-4xl font-black text-outline-variant">{String(Math.ceil(blogs.length / 4)).padStart(2, '0')}</span>
          </div>
          <button className="text-zinc-500 hover:text-primary-fixed transition-colors">
            <span className="material-symbols-outlined text-4xl">east</span>
          </button>
        </section>
      </main>
    </>
  );
}
