import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, Sparkles, Smartphone, Eye, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

export default function InixaPhone3D({ products, onSelectProduct }) {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const phoneRef = useRef(null);

  const activeApp = products[activeAppIndex] || products[0];
  const currentShots = activeApp.screenshots || [];
  const currentShot = currentShots[activeShotIndex] || currentShots[0];

  // Mouse tilt effect
  const handleMouseMove = (e) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12; // tilt degrees
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  // Change app resets shot index
  const selectApp = (idx) => {
    setActiveAppIndex(idx);
    setActiveShotIndex(0);
  };

  const nextShot = () => {
    setActiveShotIndex((prev) => (prev + 1) % currentShots.length);
  };

  const prevShot = () => {
    setActiveShotIndex((prev) => (prev - 1 + currentShots.length) % currentShots.length);
  };

  const triggerDownload = (apk) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#06b6d4", "#3b82f6", "#a855f7", "#f59e0b"],
    });
    window.location.href = apk.downloadUrl;
  };

  return (
    <section id="showcase-3d" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-600/15 via-purple-600/15 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive 3D Hardware Display</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Experience Our Apps in{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Realistic 3D
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Move your cursor over the device to inspect our real software running in a simulated flagship smartphone.
            Switch between all 8 applications and examine actual screenshots in high resolution.
          </p>
        </div>

        {/* App Switcher Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {products.map((app, idx) => {
            const isSelected = idx === activeAppIndex;
            return (
              <button
                key={app.id}
                onClick={() => selectApp(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                  isSelected
                    ? "bg-white/15 text-white border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105"
                    : "bg-white/[0.04] text-neutral-400 border-white/5 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <span>{app.iconGlyph}</span>
                <span>{app.name}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: app.color }}
                />
              </button>
            );
          })}
        </div>

        {/* 3D Phone + Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: App Specifications & Highlights */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-2xl opacity-20 transition-all duration-500 group-hover:opacity-40"
                style={{ backgroundColor: activeApp.color }}
              />

              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: `${activeApp.color}33`, borderColor: activeApp.color }}
                >
                  {activeApp.badge}
                </span>
                <span className="text-xs font-mono text-neutral-400">{activeApp.version}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span>{activeApp.name}</span>
              </h3>
              <p className="text-sm font-medium text-cyan-300 mb-3">{activeApp.tagline}</p>
              <p className="text-xs text-neutral-300 leading-relaxed mb-6">{activeApp.shortDesc}</p>

              {/* Highlights */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Key Capabilities
                </h4>
                {activeApp.highlights.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => onSelectProduct(activeApp)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>Inspect Details</span>
                </button>

                {activeApp.apks && activeApp.apks[0] && (
                  <button
                    onClick={() => triggerDownload(activeApp.apks[0])}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download APK ({activeApp.apks[0].size})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <span className="text-[10px] uppercase font-mono text-neutral-400">Screenshots</span>
                <p className="text-lg font-bold text-white mt-0.5">{currentShots.length} Captured</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <span className="text-[10px] uppercase font-mono text-neutral-400">Architecture</span>
                <p className="text-lg font-bold text-cyan-300 mt-0.5">
                  {activeApp.apks[0]?.arch.split(" ")[0] || "Universal"}
                </p>
              </div>
            </div>
          </div>

          {/* Center Column: 3D Interactive Phone */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div
              ref={phoneRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out perspective-[1200px]"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Phone Device Chassis */}
              <div
                className="relative w-[290px] sm:w-[330px] h-[590px] sm:h-[670px] rounded-[52px] p-3 sm:p-3.5 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black border-[3px] border-neutral-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(6,182,212,0.2)]"
                style={{
                  boxShadow: `0 30px 80px rgba(0,0,0,0.9), 0 0 50px ${activeApp.color}33`,
                }}
              >
                {/* Simulated Glass Reflection / Glare */}
                <div
                  className="absolute inset-0 rounded-[48px] pointer-events-none z-30 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)`,
                  }}
                />

                {/* Inner Screen Bezel */}
                <div className="relative w-full h-full bg-black rounded-[42px] overflow-hidden flex flex-col justify-between border border-neutral-800">
                  {/* Status Bar + Dynamic Island */}
                  <div className="absolute top-0 left-0 right-0 h-10 px-6 flex items-center justify-between text-white/80 text-[11px] font-mono z-20 pointer-events-none">
                    <span>9:41</span>
                    {/* Punch-hole camera */}
                    <div className="w-4 h-4 bg-black rounded-full border border-neutral-800 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span>5G</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Screenshot Display */}
                  <div className="relative flex-1 w-full h-full bg-neutral-950 overflow-hidden">
                    {currentShot ? (
                      <img
                        key={currentShot.src}
                        src={currentShot.src}
                        alt={currentShot.title || activeApp.name}
                        className="w-full h-full object-cover object-top transition-all duration-500 transform hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                        No Screenshot Available
                      </div>
                    )}

                    {/* Bottom gradient overlay for title legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4 z-10">
                      <p className="text-white font-bold text-xs truncate">
                        {currentShot?.title || "Screen Preview"}
                      </p>
                      <p className="text-neutral-400 text-[10px] line-clamp-2">
                        {currentShot?.caption || activeApp.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Android gesture home bar */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-20 pointer-events-none" />
                </div>
              </div>

              {/* Shot carousel navigation arrows under phone */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prevShot}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-transform active:scale-95"
                  title="Previous Screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-neutral-400">
                  {activeShotIndex + 1} / {currentShots.length}
                </span>
                <button
                  onClick={nextShot}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-transform active:scale-95"
                  title="Next Screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Screenshot Thumbnails Grid */}
          <div className="lg:col-span-3 space-y-4 order-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              All Screenshots ({currentShots.length})
            </h4>
            <div className="grid grid-cols-2 gap-2.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
              {currentShots.map((shot, idx) => {
                const isSelected = idx === activeShotIndex;
                return (
                  <button
                    key={shot.src}
                    onClick={() => setActiveShotIndex(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[9/16] border transition-all duration-200 group text-left ${
                      isSelected
                        ? "border-cyan-400 ring-2 ring-cyan-400/30 scale-95"
                        : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={shot.src}
                      alt={shot.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                    <span className="absolute bottom-1 left-1 right-1 text-[9px] font-semibold text-white truncate px-1 bg-black/70 rounded">
                      {shot.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
