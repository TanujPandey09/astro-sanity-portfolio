import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";

const category = ["All", "integrations", "technology", "frameworks"];

export default function Blogs({ blogData }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filterWork, setFilterWork] = useState(blogData);

  const handleFilter = (item) => {
    setActiveFilter(item);
  };

  useEffect(() => {
    if (activeFilter === "All") {
      setFilterWork(blogData);
    } else {
      setFilterWork(blogData.filter((blog) => blog.Category === activeFilter));
    }
  }, [activeFilter, blogData]);

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 animate-gradient-shift"></div>
        
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Floating particles */}
        <div className="particles-container">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
          <div className="particle particle-7"></div>
          <div className="particle particle-8"></div>
        </div>
        
        {/* Animated lines */}
        <div className="lines-container">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
        
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] animate-grid-float"></div>
        
        {/* Pulsing rings */}
        <div className="rings-container">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>
        
        <div className="absolute inset-0 bg-radial-gradient"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block relative mb-4">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-purple-600 animate-gradient-x">Blogs</span>
            </h1>
            <div className="h-1.5 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 rounded-full animate-expand-line"></div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development and technology
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
          {category.map((item, index) => (
            <button
              key={index}
              onClick={() => handleFilter(item)}
              className={`filter-btn ${
                activeFilter === item
                  ? "active"
                  : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterWork.map((blogItem, index) => (
            <article
              key={blogItem.slug?.current}
              className="blog-card animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <a
                href={`/blogs/${blogItem.slug?.current}`}
                className="block h-full"
              >
                <div className="relative h-full bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-700 hover:shadow-purple-500/20 hover:border-purple-500/30 hover:-translate-y-2 group">
                  
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>

                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={blogItem?.BackgroundImage?.asset?.url}
                      alt={blogItem?.projectName}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-4 py-1.5 bg-purple-600/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold tracking-wider shadow-lg capitalize">
                      {blogItem?.Category}
                    </div>

                    {/* Floating action icon */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-purple-600/30 hover:scale-110">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-violet-400 transition-all duration-300 line-clamp-2">
                      {blogItem?.projectName}
                    </h3>

                    {/* Excerpt */}
                    <div className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      <PortableText value={blogItem.excerpt} />
                    </div>

                    {/* Read More Link */}
                    <div className="pt-4 border-t border-white/5">
                      <div className="inline-flex items-center gap-2 text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                        <span>Read Article</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filterWork.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600/20 rounded-full mb-6">
              <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No blogs found</h3>
            <p className="text-gray-400">Try selecting a different category</p>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Background Animations */
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }

        @keyframes float-particle {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
          }
          25% { 
            transform: translate(30px, -30px) rotate(90deg);
            opacity: 0.6;
          }
          50% { 
            transform: translate(-20px, -60px) rotate(180deg);
            opacity: 0.4;
          }
          75% { 
            transform: translate(40px, -40px) rotate(270deg);
            opacity: 0.5;
          }
        }

        @keyframes draw-line {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateX(100vw); opacity: 0; }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes grid-float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes expand-line {
          from { width: 0; }
          to { width: 100%; }
        }

        .animate-gradient-shift {
          background: linear-gradient(-45deg, #020617, #581c87, #1e293b, #6d28d9, #020617);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        .animate-grid-float {
          animation: grid-float 20s ease-in-out infinite;
        }

        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-expand-line {
          animation: expand-line 0.8s ease-out forwards;
        }

        /* Background Elements */
        .particles-container,
        .lines-container,
        .rings-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.3));
          border-radius: 50%;
          animation: float-particle 15s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }

        .particle-1 { width: 4px; height: 4px; left: 10%; top: 20%; animation-duration: 12s; }
        .particle-2 { width: 6px; height: 6px; left: 80%; top: 60%; animation-delay: 2s; animation-duration: 14s; }
        .particle-3 { width: 3px; height: 3px; left: 60%; top: 30%; animation-delay: 4s; animation-duration: 16s; }
        .particle-4 { width: 5px; height: 5px; left: 30%; top: 70%; animation-delay: 1s; animation-duration: 13s; }
        .particle-5 { width: 4px; height: 4px; left: 90%; top: 40%; animation-delay: 3s; animation-duration: 15s; }
        .particle-6 { width: 7px; height: 7px; left: 20%; top: 50%; animation-delay: 5s; animation-duration: 17s; }
        .particle-7 { width: 3px; height: 3px; left: 70%; top: 80%; animation-delay: 2.5s; animation-duration: 11s; }
        .particle-8 { width: 5px; height: 5px; left: 45%; top: 15%; animation-delay: 4.5s; animation-duration: 14s; }

        .line {
          position: absolute;
          width: 200%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4) 20%, rgba(168, 85, 247, 0.8) 50%, rgba(168, 85, 247, 0.4) 80%, transparent);
          animation: draw-line 12s linear infinite;
        }

        .line-1 { top: 20%; }
        .line-2 { top: 50%; animation-delay: 4s; animation-duration: 15s; }
        .line-3 { top: 75%; animation-delay: 8s; animation-duration: 18s; }

        .ring {
          position: absolute;
          border: 2px solid rgba(168, 85, 247, 0.3);
          border-radius: 50%;
          animation: pulse-ring 4s ease-out infinite;
        }

        .ring-1 { width: 100px; height: 100px; top: 30%; left: 20%; }
        .ring-2 { width: 150px; height: 150px; top: 60%; right: 25%; animation-delay: 1.5s; }
        .ring-3 { width: 80px; height: 80px; bottom: 20%; left: 50%; animation-delay: 3s; }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.1) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1.5px, transparent 1.5px);
          background-size: 50px 50px;
        }

        .bg-radial-gradient {
          background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
        }

        /* Filter Buttons */
        .filter-btn {
          padding: 10px 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
          text-transform: capitalize;
          transition: all 0.3s ease;
          cursor: pointer;
          backdrop-filter: blur(10px);
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(167, 139, 250, 0.3);
          color: white;
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-color: transparent;
          color: white;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        /* Blog Cards */
        .blog-card {
          animation: scale-in 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Text truncation */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .particle { display: none; }
          .ring { width: 60px !important; height: 60px !important; }
        }

        /* Focus states */
        a:focus-visible,
        button:focus-visible {
          outline: 2px solid rgb(167, 139, 250);
          outline-offset: 4px;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}