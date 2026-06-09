import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 md:py-32 border-t border-white/5 bg-[#050816] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">

          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-8 h-[1px] bg-[#3B82F6]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#3B82F6]">Engineering</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
              Building the Future <br />
              <span className="text-gradient">One Bit at a Time.</span>
            </h2>
            <p className="text-[#94A3B8] text-base md:text-lg max-w-md italic mx-auto lg:mx-0">
              "Building robust web applications and reliable software systems backed by modern, production-ready engineering practices."
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6">
              <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Navigation</p>
              <ul className="space-y-3 md:space-y-4">
                <li><a href="/projects" className="text-sm text-[#94A3B8] hover:text-[#3B82F6] transition-colors">Portfolio</a></li>
                <li><a href="/blogs" className="text-sm text-[#94A3B8] hover:text-[#3B82F6] transition-colors">Blog</a></li>
                <li><a href="/about" className="text-sm text-[#94A3B8] hover:text-[#3B82F6] transition-colors">About</a></li>
              </ul>
            </div>

            <div className="space-y-4 md:space-y-6">
              <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Connect</p>
              <div className="flex flex-col gap-3 md:gap-4">
                <a href="https://github.com/TanujPandey09" target="_blank" className="text-sm text-[#94A3B8] hover:text-white transition-colors flex items-center gap-2">
                  <FaGithub size={18} /> GitHub
                </a>
                <a href="https://linkedin.com/in/tanujp09" target="_blank" className="text-sm text-[#94A3B8] hover:text-white transition-colors flex items-center gap-2">
                  <FaLinkedin size={18} /> LinkedIn
                </a>
                <a href="#" className="text-sm text-[#94A3B8] hover:text-white transition-colors flex items-center gap-2">
                  <FaInstagram size={18} /> Instagram
                </a>
              </div>
            </div>

            <div class="col-span-2 md:col-span-1 space-y-4 md:space-y-6">
              <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Location</p>
              <div className="space-y-1">
                <p className="text-sm text-[#94A3B8]">tanujp09@gmail.com</p>
                <p className="text-sm text-[#94A3B8]">Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-32 pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="text-[9px] md:text-[10px] font-black text-[#94A3B8] uppercase tracking-widest text-center md:text-left">
            © {currentYear} Tanuj Pandey . All Rights Reserved
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Experience: 4+ YOE</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse shadow-[0_0_8px_#22D3EE]"></div>
              <span className="text-[8px] font-black text-[#22D3EE] uppercase tracking-[0.3em]">Available for Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none"></div>
    </footer>
  );
}
