import React, { useState } from 'react'
import { GlassCard } from '../components/common/GlassCard'
import { GlassButton } from '../components/common/GlassButton'
import {
  Mail,
  Send,
  CheckCircle,
  Code2,
  MessageSquare,
  Sparkles,
  Bug,
  ShieldAlert,
} from 'lucide-react'

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Feedback', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 bg-black text-white selection:bg-cyan-500 selection:text-black">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-25">
        <div className="w-[800px] h-[500px] bg-gradient-to-r from-blue-600/20 via-cyan-600/15 to-transparent blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Developer Dispatch & Laboratory Support</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Connect With <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              INIXA Engineers
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto">
            Submit bug telemetry, propose feature architectures, or discuss enterprise integrations directly with our core engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Channels */}
          <div className="md:col-span-5 space-y-4">
            <GlassCard glassLevel="card" className="p-6 space-y-3">
              <div className="flex items-center gap-3 text-cyan-400">
                <Bug className="w-5 h-5" />
                <h3 className="font-bold text-white text-sm">Issue Tracker & Bug Reports</h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Found a crash or audio glitch on a specific Android build? Include device model, SoC (Snapdragon/Dimensity/Tensor), and logcat snippet.
              </p>
              <div className="pt-2 text-xs font-mono text-cyan-300">
                inixa.labs@gmail.com
              </div>
            </GlassCard>

            <GlassCard glassLevel="card" className="p-6 space-y-3">
              <div className="flex items-center gap-3 text-purple-400">
                <Code2 className="w-5 h-5" />
                <h3 className="font-bold text-white text-sm">Open Source Repositories</h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Explore source code for BeatBox Ultra, Wikipedia Client, Seal downstream engines, and WebGL modules.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white transition-colors pt-2"
              >
                <span>github.com/inixa-labs</span>
              </a>
            </GlassCard>

            <GlassCard glassLevel="card" className="p-6 space-y-3">
              <div className="flex items-center gap-3 text-emerald-400">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-bold text-white text-sm">Security & Vulnerability Disclosure</h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                For responsible vulnerability disclosure, report directly with PGP encrypted communication.
              </p>
            </GlassCard>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            <GlassCard glassLevel="panel" className="p-8">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Transmission Received</h3>
                  <p className="text-sm text-neutral-400 max-w-sm mx-auto">
                    Thank you. Your message has been queued for the INIXA Labs engineering desk.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-cyan-400 hover:underline pt-4 block mx-auto"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/50"
                    >
                      <option value="Bug Report">Hardware Bug / Crash Report</option>
                      <option value="Feature Request">Architecture / Feature Request</option>
                      <option value="Partnership">Laboratory Partnership</option>
                      <option value="Feedback">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the issue, device model, or inquiry in detail..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50"
                    />
                  </div>

                  <GlassButton
                    type="submit"
                    variant="primary"
                    className="w-full !py-3.5 justify-center shadow-lg shadow-cyan-500/20"
                    icon={<Send className="w-4 h-4" />}
                  >
                    Dispatch Transmission
                  </GlassButton>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
