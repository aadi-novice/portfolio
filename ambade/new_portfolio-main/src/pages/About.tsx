import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      {/* SideNavBar (Navigation through page sections) */}
      <aside className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        <div className="group relative flex items-center justify-end">
          <span className="absolute right-16 opacity-0 group-hover:opacity-100 transition-opacity font-headline font-bold uppercase text-[10px] tracking-widest text-primary-fixed">OVERVIEW</span>
          <div className="bg-lime-400 text-black p-3 scale-110 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">segment</span>
          </div>
        </div>
        <div className="group relative flex items-center justify-end">
          <span className="absolute right-16 opacity-0 group-hover:opacity-100 transition-opacity font-headline font-bold uppercase text-[10px] tracking-widest text-white/50">STACK</span>
          <div className="text-white/50 p-3 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">layers</span>
          </div>
        </div>
        <div className="group relative flex items-center justify-end">
          <span className="absolute right-16 opacity-0 group-hover:opacity-100 transition-opacity font-headline font-bold uppercase text-[10px] tracking-widest text-white/50">CHALLENGES</span>
          <div className="text-white/50 p-3 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">psychology</span>
          </div>
        </div>
        <div className="group relative flex items-center justify-end">
          <span className="absolute right-16 opacity-0 group-hover:opacity-100 transition-opacity font-headline font-bold uppercase text-[10px] tracking-widest text-white/50">RESULTS</span>
          <div className="text-white/50 p-3 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">insights</span>
          </div>
        </div>
      </aside>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex flex-col justify-end px-8 pb-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-full opacity-30 grayscale mix-blend-screen pointer-events-none">
            <img 
              alt="Retro computer tech" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwqEN71vu5rjqw1VvhZlAqXiXBpaS2ZN_8AOr7FOVQZh3tyObdLbbBMpH8PU7QGAoORjxS2M8fRRrSuOFh2pQO-wt6Wa_t_no4rnk3wZ2BjYAHZoxRbjnm-ZPeQnTka1h637J62bqjs0cpe7pa066DY_oV933lZUZW4U55_qnHLOFMj38vqJxQ1k67Hn9US2rzYh0tNxLBSQ_eJ8p1K0CGOyU3QOOqx8TQDxkasObe3on9d47N3Ja-jVIW4oxurb7OoQKOJeMoRO4"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full"></div>
          
          <h1 className="font-headline font-black editorial-text-bleed text-[22vw] uppercase text-primary leading-none z-10 select-none">
            ABOUT
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 z-20">
            <div className="md:col-start-7 md:col-span-6 glass-panel p-8 md:p-12 border-l-4 border-primary-fixed">
              <p className="font-headline text-3xl md:text-4xl font-bold uppercase mb-6 text-primary-fixed">
                Architect of high-performance digital monoliths.
              </p>
              <p className="font-body text-lg text-on-surface leading-relaxed max-w-xl">
                I specialize in bridging the gap between brutalist visual identity and seamless technical execution. My work focuses on building scalable infrastructures that don't just function—they command attention.
              </p>
            </div>
          </div>
        </section>

        {/* The Narrative Section */}
        <section className="px-8 py-32 bg-surface-container-lowest grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 relative">
            <div className="aspect-[3/4] bg-surface-container overflow-hidden">
              <img 
                alt="Developer Portrait" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700" 
                src="https://i.postimg.cc/Y9zfYHF1/me.jpg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary-container/20 backdrop-blur-md p-4 flex flex-col justify-end">
              <span className="font-headline font-black text-6xl text-secondary">01</span>
              <span className="font-label font-bold text-[10px] tracking-widest uppercase">The Origin</span>
            </div>
          </div>
          
          <div className="md:col-span-7 flex flex-col gap-12">
            <h2 className="font-headline font-black text-6xl md:text-8xl uppercase leading-none text-white outline-text">
              THE_STORY
            </h2>
            <div className="space-y-8 max-w-2xl">
              <p className="text-xl leading-relaxed text-on-surface/80">
                Based in the nexus of code and creativity, I began my journey in the low-level trenches of systems architecture before migrating to the visual frontier of the web. 
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="block font-headline font-bold text-primary-fixed mb-2 uppercase text-xs tracking-widest">Philosophy</span>
                  <p className="text-sm text-on-surface">Precision is the only luxury. I believe in code that is as clean as the aesthetic is aggressive.</p>
                </div>
                <div>
                  <span className="block font-headline font-bold text-secondary mb-2 uppercase text-xs tracking-widest">Mission</span>
                  <p className="text-sm text-on-surface">To eliminate the "template" web. Every project is a unique cryptographic signature.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Bento Grid */}
        <section className="px-8 py-32 bg-surface">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter">TECH_STACK</h2>
            <div className="h-1 bg-primary-fixed w-1/3 mb-4 hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Main Tech */}
            <div className="md:col-span-2 md:row-span-2 bg-surface-container-highest p-10 flex flex-col justify-between group hover:bg-primary-fixed transition-colors duration-500">
              <span className="material-symbols-outlined text-6xl text-primary-fixed group-hover:text-black transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
              <div>
                <h3 className="font-headline font-bold text-4xl mb-4 group-hover:text-black">ENGINEERING</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-surface-variant text-[10px] font-bold font-label uppercase group-hover:bg-black group-hover:text-primary-fixed transition-colors">Rust</span>
                  <span className="px-3 py-1 bg-surface-variant text-[10px] font-bold font-label uppercase group-hover:bg-black group-hover:text-primary-fixed transition-colors">TypeScript</span>
                  <span className="px-3 py-1 bg-surface-variant text-[10px] font-bold font-label uppercase group-hover:bg-black group-hover:text-primary-fixed transition-colors">Go</span>
                  <span className="px-3 py-1 bg-surface-variant text-[10px] font-bold font-label uppercase group-hover:bg-black group-hover:text-primary-fixed transition-colors">Next.js</span>
                </div>
              </div>
            </div>
            
            {/* Abstract Visual */}
            <div className="md:col-span-2 h-64 bg-zinc-900 overflow-hidden relative group">
              <img 
                alt="Abstract texture" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgBG83_bpSJxaG8zUiDfGpV2bOwQ4IQgNVHn202jthaifsdpQHYYo-7CwhWnAhZXy1Jg_bEuiLEUid7cEt7S9Zd0vFmNxAzFuJrdRewa663sSMtCqaqojEMENRGDHCww9NV2zsjE07ZSwUD4_3gaSWjB0f6NF0r5Gh2iFasqIhiULNsrVB5K5Vu1aZq5RHuMc_LVek41lt6DIbcCN9lvcVabUK2YOAPd_Iqa_NrwTKAOvHrlhl2s7hsPSpF9KFxj4e12pmEvE_AKM"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-headline font-black text-6xl text-white mix-blend-difference uppercase">VISUALS</span>
              </div>
            </div>
            
            {/* Design */}
            <div className="bg-surface-container-high p-8 flex flex-col gap-8 group hover:bg-secondary-container transition-colors duration-500">
              <span className="material-symbols-outlined text-4xl text-secondary group-hover:text-black transition-colors">polyline</span>
              <h4 className="font-headline font-bold text-xl group-hover:text-black">UI/UX_DESIGN</h4>
              <ul className="font-label text-[10px] space-y-2 opacity-60 group-hover:text-black group-hover:opacity-100 uppercase font-bold">
                <li>Figma Master</li>
                <li>Brutalist Layouts</li>
                <li>Motion Graphics</li>
              </ul>
            </div>
            
            {/* Infrastructure */}
            <div className="bg-surface-container-high p-8 flex flex-col gap-8 group hover:bg-surface-bright transition-colors">
              <span className="material-symbols-outlined text-4xl text-white/40">dns</span>
              <h4 className="font-headline font-bold text-xl">INFRASTRUCTURE</h4>
              <ul className="font-label text-[10px] space-y-2 opacity-60 uppercase font-bold">
                <li>AWS / GCP</li>
                <li>Docker / K8s</li>
                <li>CI/CD Pipelines</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tools & Arsenal */}
        <section className="px-8 py-32 bg-surface-container-lowest overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="font-headline font-black text-6xl md:text-9xl text-white/5 uppercase editorial-text-bleed mb-[-0.5em] select-none">ARSENAL</h2>
              <h2 className="font-headline font-black text-5xl md:text-7xl text-primary uppercase relative z-10 mb-12">THE_TOOLS</h2>
              <p className="font-body text-on-surface/70 text-lg mb-8 max-w-md">
                Every masterpiece requires the right instrument. My daily workflow is optimized for speed, reliability, and cryptographic security.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b-4 border-surface-variant group hover:border-primary-fixed transition-colors">
                  <span className="font-headline font-bold uppercase">Editor</span>
                  <span className="font-label text-primary-fixed">Neovim [Configured]</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b-4 border-surface-variant group hover:border-primary-fixed transition-colors">
                  <span className="font-headline font-bold uppercase">OS</span>
                  <span className="font-label text-primary-fixed">Arch Linux / MacOS</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b-4 border-surface-variant group hover:border-primary-fixed transition-colors">
                  <span className="font-headline font-bold uppercase">Hardware</span>
                  <span className="font-label text-primary-fixed">M3 Max / HHKB Hybrid</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-full h-full border-4 border-primary-fixed/20 z-0"></div>
              <div className="relative z-10 bg-surface-container h-[500px] overflow-hidden">
                <img 
                  alt="Code on screen" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBr_VORo7JKGyhQOeqUvhmPoDwKc0sFOijQB1ZjST9KFwxEwqgH_4-iPL64VMITqH-B2sDl3l31loTYNPftjCISjfWXaXk15M-qGkJBU4-3qRMMWWQHiXBIjiKAkXZmxEitJEv90bafDLOVXYH81JDbc4M3sIXOWR7AFteYDHJ6HCx4vcNCBkSIEVqlk5FKocG2r0aTQwNxvd9_QXAClErKFpOHAPFa73eUc6sv01CLBKlffFOu8RoL8_VuV91mmEIZqaduwWCpts"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA / Contact Split */}
        <section className="min-h-screen flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-primary-fixed p-12 md:p-24 flex flex-col justify-center items-start group">
            <h3 className="font-headline font-black text-6xl md:text-8xl text-black uppercase mb-8 leading-none">WANT_TO_COLLAB?</h3>
            <p className="text-black/80 text-xl mb-12 max-w-sm font-medium">Currently accepting high-impact projects for Q3-Q4 2024.</p>
            <Link to="/contact" className="bg-black text-white px-10 py-5 font-headline font-black uppercase text-xl hover:translate-x-4 transition-transform inline-flex items-center gap-4">
              START_A_PROJECT
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          
          <div className="w-full md:w-1/2 bg-secondary-container p-12 md:p-24 flex flex-col justify-center items-start">
            <h3 className="font-headline font-black text-6xl md:text-8xl text-black uppercase mb-8 leading-none">SAY_HELLO.</h3>
            <div className="flex flex-col gap-6 w-full">
              <a href="mailto:aditya@ambade.me" className="font-headline text-3xl font-bold text-black border-b-2 border-black/20 pb-2 hover:border-black transition-colors">aditya@ambade.me</a>
              <div className="flex gap-8 mt-4">
                
                <a href="https://github.com/aadi-novice" className="font-headline font-bold text-black uppercase hover:underline">GitHub</a>
                <a href="https://www.linkedin.com/in/ambadeaditya" className="font-headline font-bold text-black uppercase hover:underline">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
