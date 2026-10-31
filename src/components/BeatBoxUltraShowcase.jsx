import React, { useState, useEffect } from "react";
import { Download, Sparkles, Play, Pause, Music, Volume2, Shield, Eye, Flame, Disc3 } from "lucide-react";
import confetti from "canvas-confetti";

const SAMPLE_LYRICS = [
  { time: "0:12", text: "Dil se re, dil se re...", active: false },
  { time: "0:18", text: "Bandhan toote na, naina roothhe na", active: false },
  { time: "0:24", text: "320kbps Studio Master Soundstage", active: true },
  { time: "0:30", text: "Liquid Glass Reflection over Dynamic Canvas", active: false },
  { time: "0:36", text: "Synchronized to the millisecond", active: false },
];

export default function BeatBoxUltraShowcase({ product, onSelectProduct }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeLyricIndex, setActiveLyricIndex] = useState(2);
  const [selectedShotIndex, setSelectedShotIndex] = useState(0);

  const ultraShots = product?.screenshots || [];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveLyricIndex((prev) => (prev + 1) % SAMPLE_LYRICS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#f59e0b", "#ef4444", "#06b6d4", "#a855f7"],
    });
    if (product?.apks && product.apks[0]) {
      window.location.href = product.apks[0].downloadUrl;
    }
  };

  return (
    <section id="beatbox-flagship" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black">
      {/* Dynamic warm aura background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-r from-amber-600/10 via-rose-600/15 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>Liquid Glass Flagship Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Beat Box Ultra —{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Liquid Music
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Our premier flagship mobile music player. Engineered with ColorOS-inspired liquid glass aesthetics,
            uncompressed 320kbps audio, synchronized Indian lyrics, and Spotify Canvas looping visuals.
          </p>
        </div>

        {/* Interactive Feature Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Column: Interactive Lyrics Visualizer */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-amber-500/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                    ♫
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Live Synchronized Lyrics</h4>
                    <p className="text-xs text-neutral-400 font-mono">320kbps Master FLAC Stream</p>
                  </div>
                </div>

                {/* Animated Equalizer Waveform */}
                <div className="flex items-end gap-1 h-6">
                  {[40, 80, 55, 100, 65, 90, 45, 75].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-gradient-to-t from-amber-500 to-rose-500 rounded-full transition-all duration-300"
                      style={{
                        height: isPlaying ? `${(h * (0.6 + Math.random() * 0.4)).toFixed(0)}%` : "20%",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Lyrics Stream */}
              <div className="py-6 space-y-4">
                {SAMPLE_LYRICS.map((line, idx) => {
                  const isActive = idx === activeLyricIndex;
                  return (
                    <div
                      key={idx}
                      className={`transition-all duration-500 flex items-center gap-4 ${
                        isActive
                          ? "text-white text-lg sm:text-xl font-bold translate-x-2 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                          : "text-neutral-500 text-sm font-medium opacity-40"
                      }`}
                    >
                      <span className="font-mono text-xs opacity-60 w-10">{line.time}</span>
                      <span>{line.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Player Controls Bar */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-black font-bold hover:scale-105 transition-transform"
                    title={isPlaying ? "Pause Visualizer" : "Play Visualizer"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <span className="text-xs font-mono text-neutral-300">
                    {isPlaying ? "Syncing live word-by-word..." : "Paused"}
                  </span>
                </div>

                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 border border-white/10 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download Ultra APK</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: High-Res Screenshot Stage */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-neutral-950 border border-white/15 shadow-2xl group">
              {ultraShots[selectedShotIndex] && (
                <img
                  src={ultraShots[selectedShotIndex].src}
                  alt={ultraShots[selectedShotIndex].title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-6 z-10">
                <h4 className="text-lg font-bold text-white">
                  {ultraShots[selectedShotIndex]?.title || "Now Playing Canvas"}
                </h4>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                  {ultraShots[selectedShotIndex]?.caption || "Liquid glass UI responding dynamically to cover art."}
                </p>
              </div>
            </div>

            {/* Thumbnail carousel */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {ultraShots.map((shot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedShotIndex(idx)}
                  className={`w-20 sm:w-24 aspect-[9/16] rounded-xl overflow-hidden shrink-0 border transition-all ${
                    idx === selectedShotIndex
                      ? "border-amber-400 ring-2 ring-amber-400/40 scale-95"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={shot.src} alt={shot.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all">
            <span className="text-2xl font-black text-amber-400 mb-2 block">320kbps</span>
            <h4 className="text-sm font-bold text-white mb-1">Direct Master Stream</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Native JioSaavn audio streaming without dynamic transcoding or bit-depth truncation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all">
            <span className="text-2xl font-black text-rose-400 mb-2 block">Canvas</span>
            <h4 className="text-sm font-bold text-white mb-1">Spotify Video Loops</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Seamless looping video visualizers rendered edge-to-edge behind translucent glass controls.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all">
            <span className="text-2xl font-black text-cyan-400 mb-2 block">120Hz</span>
            <h4 className="text-sm font-bold text-white mb-1">Fluid ColorOS Glass</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              GPU-accelerated blur shaders giving frosted glass diffusion without dropping frame rates.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all">
            <span className="text-2xl font-black text-purple-400 mb-2 block">Offline</span>
            <h4 className="text-sm font-bold text-white mb-1">Local Playlist Vault</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Download high-res albums and tracks to play with zero cellular connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
