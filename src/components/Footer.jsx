import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 md:py-32 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">

          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-8 h-[1px] bg-[#599692]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#599692]">Architecture</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
              Building the Future <br />
              <span className="text-gradient">One Bit at a Time.</span>
            </h2>
            <p className="text-[#626c7d] text-base md:text-lg max-w-md italic mx-auto lg:mx-0">
              "Synthesizing complex engineering with immersive design to architect resilient digital ecosystems."
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6">
              <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Protocols</p>
              <ul className="space-y-3 md:space-y-4">
                <li><a href="/projects" className="text-sm text-[#626c7d] hover:text-[#599692] transition-colors">Archive</a></li>
                <li><a href="/blogs" className="text-sm text-[#626c7d] hover:text-[#599692] transition-colors">Journal</a></li>
                <li><a href="/about" className="text-sm text-[#626c7d] hover:text-[#599692] transition-colors">Identity</a></li>
              </ul>
            </div>

            <div className="space-y-4 md:space-y-6">
              <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Frequency</p>
              <div className="flex flex-col gap-3 md:gap-4">
                <a href="https://github.com/TanujPandey09" target="_blank" className="text-sm text-[#626c7d] hover:text-white transition-colors flex items-center gap-2">
                  <FaGithub size={18} /> GitHub
                </a>
                <a href="https://linkedin.com/in/tanujp09" target="_blank" className="text-sm text-[#626c7d] hover:text-white transition-colors flex items-center gap-2">
                  <FaLinkedin size={18} /> LinkedIn
                </a>
                <a href="#" className="text-sm text-[#626c7d] hover:text-white transition-colors flex items-center gap-2">
                  <FaInstagram size={18} /> Instagram
                </a>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-4 md:space-y-6">
              <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Transmission</p>
              <div className="space-y-1">
                <p className="text-sm text-[#626c7d]">tanujp09@gmail.com</p>
                <p className="text-sm text-[#626c7d]">Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-32 pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="text-[9px] md:text-[10px] font-black text-[#626c7d] uppercase tracking-widest text-center md:text-left">
            © {currentYear} Tanuj Pandey . All Systems Operational
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Latency: 12ms</span>
            <span className="text-[8px] font-black text-[#599692] uppercase tracking-[0.3em]">Status: encrypted</span>
          </div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#599692]/5 rounded-full blur-[120px] pointer-events-none"></div>
    </footer>
  );
}
