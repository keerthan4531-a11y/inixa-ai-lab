import React, { useState } from 'react'
import { ExternalLink, ShieldCheck, Sparkles, QrCode, Cpu } from 'lucide-react'

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

export interface EngineerProfile {
  id: string
  name: string
  handle: string
  githubUrl: string
  role: string
  clearance: string
  badgeId: string
  avatar: string
  bio: string
  responsibilities: string[]
  skills: string[]
  reposCount: number
  accentColor: string
  shadowColor: string
  mascotQuote: string
}

interface HangingIdCardProps {
  engineer: EngineerProfile
  flip?: boolean
}

/**
 * Hand-drawn hanging lanyard ID Card Badge with realistic clips,
 * metal clasp, NFC gold chip, barcode, and verified photo.
 */
export const HangingIdCard: React.FC<HangingIdCardProps> = ({ engineer }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative flex flex-col items-center select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Hanging Lanyard Strap & Clip */}
      <div className="relative flex flex-col items-center z-20">
        {/* Lanyard Fabric Loop coming from ceiling */}
        <div className="w-10 h-14 bg-gradient-to-b from-[#020612] via-[#040a18] to-[#0a1636] border-x-2 border-dashed border-white/40 flex items-center justify-center shadow-md">
          <span className="text-[7px] font-mono font-black text-[#00ff87] tracking-widest -rotate-90 whitespace-nowrap opacity-80">
            INIXA LABS
          </span>
        </div>

        {/* Metal Carabiner Swivel Clasp */}
        <div className="relative -mt-1 flex flex-col items-center">
          {/* Metal Ring */}
          <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300 shadow-[2px_2px_0_#000000] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#040a18] border border-slate-400" />
          </div>
          {/* Spring Snap Clip */}
          <div className="w-4 h-5 -mt-1.5 bg-gradient-to-b from-slate-200 to-slate-400 border border-black rounded-b-md shadow-sm" />
        </div>
      </div>

      {/* 2. The Hanging ID Card Badge */}
      <div
        className={`relative w-[280px] sm:w-[310px] rounded-[24px] bg-[#040a18] border-2 border-white p-5 transition-transform duration-300 ${
          isHovered
            ? 'rotate-0 -translate-y-1 shadow-[8px_8px_0_#00ff87]'
            : 'rotate-[-1.5deg] shadow-[6px_6px_0_#be185d]'
        }`}
        style={{
          boxShadow: isHovered
            ? `8px 8px 0 ${engineer.accentColor}`
            : `6px 6px 0 ${engineer.shadowColor}`,
        }}
      >
        {/* Lanyard Hole Punch Slot */}
        <div className="w-12 h-2.5 mx-auto -mt-2 mb-3 rounded-full bg-[#020612] border-2 border-white/60 shadow-inner" />

        {/* Top Header Row: INIXA Badge & Clearance */}
        <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b-2 border-dashed border-white/20">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: engineer.accentColor }}
            />
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-white">
              INIXA CORE ENG
            </span>
          </div>
          <span
            className="px-2 py-0.5 rounded-full text-[9px] font-mono font-black uppercase border border-white"
            style={{
              backgroundColor: `${engineer.accentColor}25`,
              color: engineer.accentColor,
            }}
          >
            {engineer.clearance}
          </span>
        </div>

        {/* Photograph Frame with Tape & Corner Stamps */}
        <div className="relative mx-auto w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-[#060e24] border-2 border-white p-1 shadow-[4px_4px_0_#020612] overflow-hidden mb-3.5">
          <img
            src={engineer.avatar}
            alt={engineer.name}
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              // Fallback to GitHub avatar if local image failed
              const target = e.target as HTMLImageElement
              if (!target.src.includes('avatars.githubusercontent.com')) {
                target.src = `https://github.com/${engineer.handle}.png`
              }
            }}
          />

          {/* Decorative Corner Tape */}
          <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-sm bg-yellow-400/90 text-[8px] font-mono font-black text-black -rotate-12 border border-black shadow-sm">
            VERIFIED
          </div>

          {/* Holographic Specular Glint */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
        </div>

        {/* Engineer Identity & Role */}
        <div className="text-center mb-3">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {engineer.name}
          </h3>
          <p
            className="text-xs font-bold font-mono tracking-wide mt-0.5"
            style={{ color: engineer.accentColor }}
          >
            {engineer.role}
          </p>

          <a
            href={engineer.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full text-xs font-mono font-black text-white bg-[#060e24] border border-white/40 hover:border-white hover:text-[#00ff87] transition-all shadow-[2px_2px_0_rgba(255,255,255,0.2)]"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>@{engineer.handle}</span>
            <ExternalLink className="w-3 h-3 text-[#00ff87]" />
          </a>
        </div>

        {/* Hardware Chip & Barcode Row */}
        <div className="flex items-center justify-between pt-2.5 border-t-2 border-dashed border-white/20">
          {/* Golden NFC Smartcard Chip */}
          <div className="w-8 h-6 rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-black p-0.5 shadow-sm flex flex-col justify-around">
            <div className="w-full h-0.5 bg-amber-800/60" />
            <div className="w-full h-0.5 bg-amber-800/60" />
            <div className="w-full h-0.5 bg-amber-800/60" />
          </div>

          {/* Barcode & Badge ID */}
          <div className="text-right">
            <div className="flex items-center gap-0.5 justify-end h-5">
              <span className="w-0.5 h-full bg-white" />
              <span className="w-1.5 h-full bg-white" />
              <span className="w-0.5 h-full bg-white" />
              <span className="w-1 h-full bg-white" />
              <span className="w-0.5 h-full bg-white" />
              <span className="w-2 h-full bg-white" />
              <span className="w-0.5 h-full bg-white" />
              <span className="w-1.5 h-full bg-white" />
              <span className="w-0.5 h-full bg-white" />
            </div>
            <span className="text-[9px] font-mono font-black text-neutral-400">
              {engineer.badgeId}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
