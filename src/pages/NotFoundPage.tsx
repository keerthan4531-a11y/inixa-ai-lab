import React from 'react'
import { GlassCard } from '../components/common/GlassCard'
import { GlassButton } from '../components/common/GlassButton'
import { navigate } from '../router'
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-black text-white selection:bg-cyan-500 selection:text-black">
      {/* Background ambient light */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-30">
        <div className="w-[600px] h-[400px] bg-gradient-to-r from-red-600/20 via-pink-600/10 to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        <GlassCard glassLevel="panel" className="p-10 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto text-pink-400">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold">
              Error 404
            </span>
            <h1 className="text-3xl font-black text-white">Route Not Found</h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              The laboratory coordinates you requested do not exist in the INIXA ecosystem index.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <GlassButton
              onClick={() => navigate('/')}
              variant="primary"
              className="w-full justify-center"
              icon={<Home className="w-4 h-4" />}
            >
              Return to Labs Home
            </GlassButton>
            <GlassButton
              onClick={() => window.history.back()}
              variant="secondary"
              className="w-full justify-center"
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Go Back
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
