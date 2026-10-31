import React, { useState, useEffect } from "react";
import { Sparkles, Terminal, Cpu, Play, Download, RefreshCw, Send, CheckCircle, Shield } from "lucide-react";
import confetti from "canvas-confetti";

const EXPERIMENTS = [
  {
    title: "Audiophile DSP Engine",
    prompt: "Optimize a 64-bit floating point audio equalizer curve for Beat Box Ultra.",
    model: "INIXA-AudioDSP-v4",
    output: `// INIXA 64-Bit Floating Point DSP Matrix
public final class InixaAudioDsp {
    private static final float SAMPLE_RATE = 48000.0f;
    private static final float Q_FACTOR = 1.4142f; // Butterworth alignment

    public static void applyParametricFilter(float[] buffer, float gainDb, float centerFreq) {
        float omega = 2.0f * (float)Math.PI * centerFreq / SAMPLE_RATE;
        float alpha = (float)Math.sin(omega) / (2.0f * Q_FACTOR);
        float A = (float)Math.pow(10.0, gainDb / 40.0);
        // Direct Form II transposed biquad structure executed on NEON SIMD
    }
}
// Latency: 1.8ms | Dynamic Range: 144dB | Zero Clipped Samples`,
  },
  {
    title: "Multimodal Vision Reasoning",
    prompt: "Analyze user interface layout screenshot and detect ColorOS liquid glass compliance.",
    model: "INIXA-Vision-1.0",
    output: `[INIXA Vision Perception Engine]:
• Surface Blur: 48px Gaussian with 18% Alpha Frosting verified.
• Contrast Ratio: 14.8:1 exceeds WCAG AAA accessibility thresholds.
• Corner Curvature: Continuous squircle (n=4.2 superellipse).
• Frame Pacing: 120Hz display refresh synchronization achieved with 0 dropped frames.
Status: Certified Flagship Liquid Glass Standard.`,
  },
  {
    title: "Zero-Telemetry Proxy Tunnel",
    prompt: "Audit local proxy bridge for leakage of device identifiers or geolocation telemetry.",
    model: "INIXA-Sentinel-Sec",
    output: `[Sentinel Privacy Audit Report]:
✓ Localhost Binding: 127.0.0.1:8080 (No external interface exposure)
✓ Identity Redaction: Android ID, IMEI, and MAC addresses replaced with ephemeral HMAC hashes.
✓ DNS Routing: Enforced TLS 1.3 over Cloudflare DoH with ECH (Encrypted Client Hello).
✓ Telemetry Packets Transmitted: 0 bytes. Absolute zero-knowledge tunnel verified.`,
  },
];

export default function InixaAiPlaypen({ inixaAiApp }) {
  const [selectedExp, setSelectedExp] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  const currentExp = EXPERIMENTS[selectedExp];

  // Streaming text typewriter effect
  useEffect(() => {
    let index = 0;
    const fullText = currentExp.output;
    setDisplayedText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      index += 3;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [selectedExp]);

  const handleDownloadAi = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#06b6d4", "#3b82f6", "#a855f7"],
    });
    if (inixaAiApp?.apks && inixaAiApp.apks[0]) {
      window.location.href = inixaAiApp.apks[0].downloadUrl;
    }
  };

  return (
    <section id="ai-playground" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-gradient-to-br from-cyan-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Neural Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Test the Power of{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              INIXA AI
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Experience our flagship AI proxy and multimodal companion engine in real time.
            Simulate generative intelligence, local privacy audits, and DSP synthesizer pipelines.
          </p>
        </div>

        {/* Experiment Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Preset Experiment Selector */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Select Neural Experiment
            </h3>

            {EXPERIMENTS.map((exp, idx) => {
              const isSelected = idx === selectedExp;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedExp(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.2)]"
                      : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-white">{exp.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-cyan-300">
                      {exp.model}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2">{exp.prompt}</p>
                </button>
              );
            })}

            {/* Mobile App CTA Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/15 p-6 shadow-2xl relative overflow-hidden mt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-cyan-500/30">
                  ✦
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">INIXA AI APK v1.0.0</h4>
                  <p className="text-[11px] text-cyan-300 font-mono">Ultra-light 3.93 MB</p>
                </div>
              </div>
              <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
                Install our official AI companion on your Android phone to run multimodal chat and proxy servers on-device.
              </p>
              <button
                onClick={handleDownloadAi}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Get INIXA AI APK (3.93 MB)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Terminal & Output */}
          <div className="lg:col-span-8 rounded-3xl bg-neutral-950 border border-white/15 shadow-2xl overflow-hidden flex flex-col">
            {/* Terminal Window Header */}
            <div className="p-4 px-6 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>inixa-ai-core :: {currentExp.model}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className={`absolute inline-flex h-full w-full rounded-full bg-cyan-400 ${isTyping ? "animate-ping opacity-75" : "opacity-0"}`}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] font-mono text-cyan-300">
                  {isTyping ? "STREAMING TOKENS" : "READY"}
                </span>
              </div>
            </div>

            {/* Prompt Box */}
            <div className="p-5 border-b border-white/10 bg-white/[0.02]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                Input Prompt Directive:
              </span>
              <p className="text-sm font-medium text-white italic">"{currentExp.prompt}"</p>
            </div>

            {/* Terminal Output Body */}
            <div className="p-6 bg-black/60 min-h-[300px] flex-1 font-mono text-xs text-cyan-100/90 leading-relaxed overflow-x-auto whitespace-pre-wrap select-text">
              {displayedText}
              {isTyping && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />}
            </div>

            {/* Terminal Footer */}
            <div className="p-3 px-6 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Encrypted Local Pipeline • Zero Server Logging</span>
              <button
                onClick={() => {
                  setSelectedExp((prev) => (prev + 1) % EXPERIMENTS.length);
                }}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Next Experiment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
