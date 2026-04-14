export default function Contact() {
  return (
    <>
      <main className="relative pt-32 pb-24 px-8 min-h-screen">
        {/* Background Decorative Elements */}
        <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-surface-tint opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-[-5%] left-[-5%] w-[30vw] h-[30vw] bg-secondary-container opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[1400px] mx-auto">
          {/* Hero Title */}
          <div className="mb-20">
            <h1 className="text-[clamp(4rem,15vw,12rem)] leading-[0.85] font-headline font-black italic tracking-tighter text-white uppercase break-all">
              LET'S<br/>BUILD
            </h1>
            <div className="h-4 w-48 bg-primary-fixed mt-8"></div>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Section */}
            <div className="lg:col-span-8 glass-container p-8 md:p-16 relative">
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary-fixed"></div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary-fixed"></div>
              
              <form className="space-y-12">
                <div className="group relative">
                  <label className="block font-headline font-bold text-xs tracking-widest text-primary-fixed mb-4 uppercase">Project_Initiator</label>
                  <input 
                    className="w-full bg-surface-container-highest border-b-8 border-r-8 border-primary-fixed/20 focus:border-primary-fixed focus:ring-0 text-3xl md:text-5xl font-headline font-bold p-6 transition-all placeholder:text-surface-variant outline-none" 
                    placeholder="YOUR NAME" 
                    type="text"
                  />
                </div>
                <div className="group relative">
                  <label className="block font-headline font-bold text-xs tracking-widest text-primary-fixed mb-4 uppercase">Return_Address</label>
                  <input 
                    className="w-full bg-surface-container-highest border-b-8 border-r-8 border-primary-fixed/20 focus:border-primary-fixed focus:ring-0 text-3xl md:text-5xl font-headline font-bold p-6 transition-all placeholder:text-surface-variant outline-none" 
                    placeholder="EMAIL@DOMAIN.COM" 
                    type="email"
                  />
                </div>
                <div className="group relative">
                  <label className="block font-headline font-bold text-xs tracking-widest text-primary-fixed mb-4 uppercase">Transmission_Details</label>
                  <textarea 
                    className="w-full bg-surface-container-highest border-b-8 border-r-8 border-primary-fixed/20 focus:border-primary-fixed focus:ring-0 text-2xl md:text-4xl font-headline font-bold p-6 transition-all placeholder:text-surface-variant outline-none resize-none" 
                    placeholder="TELL ME EVERYTHING..." 
                    rows={4}
                  ></textarea>
                </div>
                <div className="pt-8 flex flex-col md:flex-row items-center gap-8">
                  <button 
                    className="w-full md:w-auto bg-secondary-container text-white font-headline font-black text-2xl md:text-4xl px-12 py-8 transition-transform hover:-translate-x-2 hover:-translate-y-2 active:scale-95 shadow-[8px_8px_0px_#5b005b] uppercase" 
                    type="button"
                  >
                    Send_Protocol
                  </button>
                  <span className="font-headline font-bold text-xs tracking-[0.3em] text-surface-variant uppercase md:max-w-[200px]">By clicking, you initiate a direct line to Me.</span>
                </div>
              </form>
            </div>
            
            {/* Info Sidebar */}
            <div className="lg:col-span-4 space-y-16">
              <div className="space-y-4">
                <h3 className="font-headline font-black text-2xl text-primary-fixed uppercase tracking-tighter">Availability</h3>
                <p className="text-on-surface-variant font-body leading-relaxed text-lg">
                  Currently screening high-impact projects for Q3-Q4. I specialize in turning architectural concepts into brutalist digital realities.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-headline font-black text-2xl text-primary-fixed uppercase tracking-tighter">HQ</h3>
                <p className="text-on-surface-variant font-body leading-relaxed text-lg">
                  OPERATING REMOTELY FROM<br/>BERLIN, GERMANY [CET]
                </p>
              </div>
              <div className="pt-12 border-l-4 border-secondary-container pl-8">
                <h3 className="font-headline font-black text-sm text-secondary tracking-widest uppercase mb-8">External_Nodes</h3>
                <div className="flex flex-col gap-6">
                  <a href="#" className="group flex items-center justify-between text-2xl font-headline font-bold hover:text-primary-fixed transition-colors">
                    GITHUB
                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </a>
                  <a href="#" className="group flex items-center justify-between text-2xl font-headline font-bold hover:text-primary-fixed transition-colors">
                    READ.CV
                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </a>
                  <a href="#" className="group flex items-center justify-between text-2xl font-headline font-bold hover:text-primary-fixed transition-colors">
                    ARE.NA
                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </a>
                  <a href="#" className="group flex items-center justify-between text-2xl font-headline font-bold hover:text-primary-fixed transition-colors">
                    X / TWITTER
                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
