import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-10 md:py-14 border-t border-border-subtle bg-canvas overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">

          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left">
            <a href="/" aria-label="Tanuj Pandey - Home" className="inline-flex items-center group mb-2">
              <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center border border-white/10 bg-[#0F233E]/40 group-hover:border-accent-primary/60 group-hover:bg-[#0F233E]/80 transition-all duration-300 overflow-hidden shadow-xl shadow-black/50">
                <img src="/favicon.svg" alt="Tanuj Pandey Logo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="48" height="48" />
              </div>
            </a>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-8 h-[1px] bg-accent-primary"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-primary">Engineering</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-text-primary uppercase tracking-tighter leading-none">
              Building the Future <br />
              <span className="text-gradient">One Bit at a Time.</span>
            </h2>
            <p className="text-text-muted text-base md:text-lg max-w-md italic mx-auto lg:mx-0">
              "Building robust web applications and reliable software systems backed by modern, production-ready engineering practices."
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6">
              <p className="text-[10px] font-black text-text-primary uppercase tracking-[0.4em]">Navigation</p>
              <ul className="space-y-3 md:space-y-4">
                <li><a href="/projects" className="text-sm text-text-muted hover:text-accent-primary transition-colors">Portfolio</a></li>
                <li><a href="/templates" className="text-sm text-text-muted hover:text-accent-primary transition-colors">Templates</a></li>
                <li><a href="/blogs" className="text-sm text-text-muted hover:text-accent-primary transition-colors">Blog</a></li>
                <li><a href="/about" className="text-sm text-text-muted hover:text-accent-primary transition-colors">About</a></li>
              </ul>
            </div>

            <div className="space-y-4 md:space-y-6">
              <p className="text-[10px] font-black text-text-primary uppercase tracking-[0.4em]">Connect</p>
              <div className="flex flex-col gap-3 md:gap-4">
                <a href="https://github.com/TanujPandey09" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-text-primary transition-colors flex items-center gap-2">
                  <FaGithub size={18} /> GitHub
                </a>
                <a href="https://linkedin.com/in/tanujdev" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-text-primary transition-colors flex items-center gap-2">
                  <FaLinkedin size={18} /> LinkedIn
                </a>
                <a href="mailto:tanujp09@gmail.com" className="text-sm text-text-muted hover:text-text-primary transition-colors flex items-center gap-2">
                  <FaEnvelope size={18} /> Email
                </a>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-4 md:space-y-6">
              <p className="text-[10px] font-black text-text-primary uppercase tracking-[0.4em]">Location</p>
              <div className="space-y-1">
                <p className="text-sm text-text-muted">tanujp09@gmail.com</p>
                <p className="text-sm text-text-muted">Pauri Garhwal, Uttarakhand, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-32 pt-8 md:pt-12 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="text-[11px] font-black text-text-dim uppercase tracking-widest text-center md:text-left">
            © {currentYear} Tanuj Pandey . All Rights Reserved
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em]">Experience: 4+ YOE</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-status-live animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[11px] font-black text-status-live uppercase tracking-[0.3em]">Available for Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
    </footer>
  );
}
