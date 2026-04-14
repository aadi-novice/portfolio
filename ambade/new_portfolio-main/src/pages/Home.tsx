import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';
import { projects } from '../data/projects';

const latestProjectQuery = `*[_type == "project"] | order(publishedAt desc)[0] {
  _id,
  title,
  slug,
  description,
  image,
  imageUrl,
  tags
}`;

export default function Home() {
  const [featuredProject, setFeaturedProject] = useState<any>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await client.fetch(latestProjectQuery);
        if (data) {
          setFeaturedProject(data);
        } else {
          setFeaturedProject(projects[0]);
        }
      } catch (error) {
        console.error('Sanity fetch error:', error);
        setFeaturedProject(projects[0]);
      }
    };
    fetchFeatured();
  }, []);

  if (!featuredProject) {
    return <div className="min-h-screen bg-surface flex items-center justify-center text-white font-headline">LOADING_SYSTEM...</div>;
  }

  return (
    <>
      {/* Global Background Elements */}
      <div className="fixed inset-0 z-[-2] bg-surface"></div>
      <div className="fixed inset-0 z-[-1] bg-grain pointer-events-none"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] glow-sphere pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] glow-sphere pointer-events-none" style={{ background: 'radial-gradient(circle, #fe00fe 0%, #c7f300 100%)' }}></div>

      {/* SideNavBar (Project Index) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        <div className="hidden md:flex flex-col items-end mb-4">
          <span className="font-headline font-bold uppercase text-[10px] tracking-widest text-lime-400">PROJECT_INDEX</span>
          <span className="font-headline font-bold uppercase text-[10px] tracking-widest text-white/40">V.01</span>
        </div>
        <div className="bg-lime-400 text-black p-3 scale-110 flex items-center justify-center group cursor-pointer">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>segment</span>
        </div>
        <div className="text-white/50 p-3 hover:text-white flex items-center justify-center hover:bg-zinc-800 transition-all cursor-pointer group">
          <span className="material-symbols-outlined text-[20px]">layers</span>
        </div>
        <div className="text-white/50 p-3 hover:text-white flex items-center justify-center hover:bg-zinc-800 transition-all cursor-pointer group">
          <span className="material-symbols-outlined text-[20px]">psychology</span>
        </div>
        <div className="text-white/50 p-3 hover:text-white flex items-center justify-center hover:bg-zinc-800 transition-all cursor-pointer group">
          <span className="material-symbols-outlined text-[20px]">insights</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-32 px-8 overflow-hidden">
        <div className="w-full">
          <div className="flex flex-col">
            <span className="font-headline font-black text-primary-fixed text-xs tracking-[0.5em] mb-4">ENGINEERING REVOLUTION // 2026</span>
            <h1 className="font-headline font-black text-[15vw] leading-[0.8] tracking-tighter uppercase break-all">
              Aditya.<br/>
              <span className="hero-text-mask block">ambade</span>
            </h1>
          </div>
          <div className="mt-12 max-w-2xl border-l-4 border-primary-fixed pl-8">
            <p className="text-xl font-body text-on-surface/80 leading-relaxed italic">
              Architecting high-performance digital environments. Where brutalist structures collide with ethereal neon aesthetics. 
            </p>
            <div className="mt-8 flex gap-4">
              <span className="px-3 py-1 bg-surface-variant font-label text-[10px] tracking-widest uppercase">Backend</span>
              <span className="px-3 py-1 bg-surface-variant font-label text-[10px] tracking-widest uppercase">AI/ML</span>
              <span className="px-3 py-1 bg-surface-variant font-label text-[10px] tracking-widest uppercase">Web3 Engine</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content: Asymmetrical Project Grid */}
      <main className="relative px-8 py-32 space-y-32">
        {/* Project Section 01 */}
        <section className="grid grid-cols-12 gap-8 items-end">
          {/* Asymmetrical Project 1 */}
          <div className="col-span-12 md:col-span-7 group relative">
            <Link
              to={`/work/${featuredProject.slug?.current || featuredProject.slug || featuredProject._id || featuredProject.id}`}
              className="block glass-card aspect-[16/10] overflow-hidden relative border border-white/5 group-hover:border-primary-fixed/30 transition-all"
            >
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 scale-105 group-hover:scale-100"
                src={
                  featuredProject.image?.asset
                    ? urlFor(featuredProject.image).width(1200).url()
                    : featuredProject.imageUrl || featuredProject.image || ''
                }
                alt={featuredProject.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 to-transparent p-12 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-label text-primary-fixed text-xs tracking-widest uppercase mb-2 block">01 / {featuredProject.tags?.[0] || 'PROJECT'}</span>
                    <h3 className="font-headline text-5xl font-black uppercase italic tracking-tighter">{featuredProject.title}</h3>
                  </div>
                  <span className="material-symbols-outlined text-4xl text-primary-fixed transform group-hover:translate-x-2 transition-transform">arrow_outward</span>
                </div>
              </div>
            </Link>
            {/* Float Label Overlap */}
            <div className="absolute -top-6 -right-6 md:right-12 z-10 bg-secondary-container text-on-secondary-container px-6 py-4 font-headline font-black text-xl italic shadow-2xl">
              Recent one !!
            </div>
          </div>
          
          {/* Asymmetrical Sub-Info */}
          <div className="col-span-12 md:col-span-4 md:col-start-9 space-y-6">
            <h4 className="font-headline font-bold text-2xl text-secondary-fixed-dim">TECHNICAL_STACK</h4>
            <p className="text-on-surface/60 font-body leading-relaxed">
              {featuredProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {featuredProject.tags?.map((tag: string) => (
                <span key={tag} className="bg-surface-container-highest px-3 py-1 font-label text-[10px] uppercase">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Project Section 02: Bento Variation */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 glass-card p-12 border border-white/5 flex flex-col justify-between min-h-[400px]">
            <h4 className="font-headline font-black text-7xl text-white/10 uppercase break-all">LABS</h4>
            <div>
              <span className="font-label text-lime-400 text-xs tracking-widest uppercase mb-4 block">EXPERIMENTAL</span>
              <p className="text-on-surface/80 font-body">Exploring the boundaries of spatial computing and human-computer interaction through generative shaders.</p>
            </div>
          </div>
          <div className="md:col-span-2 group relative glass-card aspect-[16/9] md:aspect-auto overflow-hidden border border-white/5">
            <img 
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC89qB1ib8NtDisWWuF4uDhdNWRuCblOtm5gDeUeO1XJRYuWuYHPLYO7t4JzEfmWpxChny_8_G1ECiBFPfsGkjq9vmeisxIXdXf9YI3r3v9pVsX6LrNmS-TSWiGHnC4FNDo1uq2nE-lxa559HZekFhkW_WaI7JKNmS-aF9-_gPlj1GuKJgseUoUeTjOzASlUWGXkqBt3jivQvgM1onFOWeIk7ygQbV4ea0TzYCreCG7wKUhvAf6-HqSl6N4jW_gRCLioWVX3zBrYPo"
              alt="Lab"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 p-12 flex flex-col justify-between">
              <span className="font-label text-primary-fixed text-xs tracking-widest uppercase">02 / INFRASTRUCTURE</span>
              <div className="max-w-md">
                <h3 className="font-headline text-5xl font-black uppercase tracking-tighter mb-4">CORE_GRID</h3>
                <p className="text-white/70 italic">Decentralized node management system for high-availability distributed systems.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Achievement (Text Overlap) */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-secondary-container/5 backdrop-blur-3xl -rotate-1 scale-110"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="text-[12rem] font-headline font-black text-white/5 leading-none select-none">
              99.9%
            </div>
            <div className="max-w-xl">
              <h2 className="font-headline font-black text-4xl text-primary uppercase mb-6 tracking-tighter">UNCOMPROMISING PERFORMANCE.</h2>
              <p className="text-xl text-on-surface/80 leading-relaxed font-body">
                I build tools for the future. Whether it's a high-frequency trading platform or a generative art marketplace, the goal is always the same: <span className="text-primary-fixed">Absolute technical superiority.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Form/Contact Section */}
        <section className="max-w-4xl mx-auto py-32">
          <div className="mb-16">
            <h2 className="font-headline font-black text-6xl uppercase tracking-tighter italic">INITIATE_CONTACT</h2>
            <div className="h-1 w-24 bg-primary-fixed mt-4"></div>
          </div>
          <form className="space-y-12">
            <div className="group">
              <label className="font-headline font-bold uppercase text-xs tracking-[0.3em] text-white/40 group-focus-within:text-secondary-fixed transition-colors">IDENTIFIER_NAME</label>
              <input className="w-full bg-surface-container-highest border-none text-3xl md:text-5xl font-headline font-bold uppercase placeholder:text-white/10 focus:ring-0 px-0 py-4 border-b-4 border-transparent focus:border-secondary transition-all" placeholder="WHO ARE YOU?" type="text"/>
            </div>
            <div className="group">
              <label className="font-headline font-bold uppercase text-xs tracking-[0.3em] text-white/40 group-focus-within:text-secondary-fixed transition-colors">ENCRYPTION_EMAIL</label>
              <input className="w-full bg-surface-container-highest border-none text-3xl md:text-5xl font-headline font-bold uppercase placeholder:text-white/10 focus:ring-0 px-0 py-4 border-b-4 border-transparent focus:border-secondary transition-all" placeholder="WHERE DO WE SYNC?" type="email"/>
            </div>
            <div className="group">
              <label className="font-headline font-bold uppercase text-xs tracking-[0.3em] text-white/40 group-focus-within:text-secondary-fixed transition-colors">MESSAGE_PAYLOAD</label>
              <textarea className="w-full bg-surface-container-highest border-none text-3xl md:text-5xl font-headline font-bold uppercase placeholder:text-white/10 focus:ring-0 px-0 py-4 border-b-4 border-transparent focus:border-secondary transition-all resize-none" placeholder="YOUR_INTENT..." rows={3}></textarea>
            </div>
            <button className="w-full bg-primary-fixed text-on-primary-fixed font-headline font-black text-2xl py-8 uppercase tracking-widest hover:bg-secondary-container hover:text-white transition-all transform active:translate-x-[-8px] active:translate-y-[-8px] shadow-[8px_8px_0px_#500050]">
              TRANSMIT_SIGNAL
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
