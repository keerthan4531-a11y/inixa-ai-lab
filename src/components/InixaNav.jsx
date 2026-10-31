import React, { useState, useEffect } from "react";
import { Search, Download, Sparkles, Layers, Menu, X, ArrowUpRight, Cpu } from "lucide-react";

export default function InixaNav({ onOpenSearch, onNavigate, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "overview", label: "Overview" },
    { id: "experiments", label: "Labs & Apps" },
    { id: "showcase-3d", label: "3D Showcase" },
    { id: "beatbox-flagship", label: "Beat Box Ultra" },
    { id: "ai-playground", label: "INIXA AI Lab" },
    { id: "apk-hub", label: "APK Downloads" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-cyan-950/90 via-purple-950/90 to-blue-950/90 border-b border-cyan-500/20 backdrop-blur-md px-4 py-1.5 text-center text-xs text-cyan-200/90 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="font-semibold tracking-wide text-white">INIXA LABS v2.4</span>
        <span className="text-cyan-400/60 hidden sm:inline">•</span>
        <span className="hidden sm:inline">8 Flagship Mobile Apps & 13 Verified APK Releases are now live.</span>
        <button
          onClick={() => onNavigate("apk-hub")}
          className="ml-2 inline-flex items-center gap-1 text-cyan-300 hover:text-white underline text-[11px] font-medium"
        >
          Download APKs <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300 ${
          scrolled
            ? "mt-2 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            : "mt-0 bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate("overview")}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                <span className="font-black text-lg bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
                  IX
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                  INIXA
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-md">
                  LABS
                </span>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-neutral-400 font-mono">
                AI & Mobile Frontiers
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/[0.08] backdrop-blur-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white text-xs transition-all duration-200"
              title="Search products (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white/10 rounded font-mono text-neutral-400">
                ⌘K
              </kbd>
            </button>

            {/* Direct APK Hub CTA Button */}
            <button
              onClick={() => onNavigate("apk-hub")}
              className="relative group overflow-hidden px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              <span>Get APKs</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                13
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl bg-neutral-950/95 border border-white/10 backdrop-blur-2xl space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-200 hover:bg-white/10 hover:text-cyan-300 transition-all flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
