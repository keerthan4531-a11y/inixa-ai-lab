import React, { useState, useRef, useEffect } from 'react'
import { X, Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react'

interface AboutLaunchVideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AboutLaunchVideoModal: React.FC<AboutLaunchVideoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(40)

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true)
      setProgress(0)
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {
          // Fallback if browser blocks autoplay
          setIsPlaying(false)
        })
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [isOpen])

  // Handle ESC key to skip/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const cur = videoRef.current.currentTime
    const dur = videoRef.current.duration || 40
    setCurrentTime(cur)
    setDuration(dur)
    setProgress((cur / dur) * 100)
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in p-4 sm:p-6">
      {/* Living Sketchbook Doodle Border Container */}
      <div className="relative w-full max-w-5xl bg-[#040a18] border-[3px] border-white rounded-3xl shadow-[10px_10px_0_#be185d] overflow-hidden flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#071329] border-b-2 border-white/20 z-20">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff87]"></span>
            </span>
            <span className="font-extrabold text-sm sm:text-base tracking-wide text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00ff87]" />
              INIXA LABS — Official Ecosystem Launch Film (40s)
            </span>
          </div>

          {/* Quick Skip Button */}
          <button
            onClick={onClose}
            className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#be185d] hover:bg-[#ec4899] text-white font-black text-xs sm:text-sm border-2 border-white shadow-[3px_3px_0_#000] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            title="Skip video and read about page (Esc)"
          >
            <span>Skip Video</span>
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src="/media/brag.mp4"
            poster="/media/brag.jpg"
            playsInline
            autoPlay
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          />

          {/* Unmute Prompt Banner if muted */}
          {isMuted && (
            <button
              onClick={toggleMute}
              className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/80 hover:bg-black/95 text-[#00ff87] border border-[#00ff87]/60 shadow-[0_0_20px_rgba(0,255,135,0.3)] backdrop-blur-md text-xs font-bold transition-all cursor-pointer animate-pulse"
            >
              <VolumeX className="w-4 h-4" />
              <span>Click to Unmute Sound 🔊</span>
            </button>
          )}

          {/* Big Center Play Overlay when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs z-10 cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-[#00ff87] text-black flex items-center justify-center border-4 border-white shadow-[6px_6px_0_#be185d] hover:scale-110 active:scale-95 transition-all">
                <Play className="w-9 h-9 fill-black translate-x-1" />
              </div>
            </button>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="px-5 py-3 bg-[#071329] border-t-2 border-white/20 flex flex-col gap-2">
          {/* Progress Timeline */}
          <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer"
               onClick={(e) => {
                 if (!videoRef.current) return
                 const rect = e.currentTarget.getBoundingClientRect()
                 const pos = (e.clientX - rect.left) / rect.width
                 videoRef.current.currentTime = pos * (videoRef.current.duration || 40)
               }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#00ff87] via-[#38d3d6] to-[#ec4899] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-white/70 font-mono">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMute}
                className="hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span>
                {Math.floor(currentTime)}s / {Math.floor(duration)}s
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0
                    videoRef.current.play()
                    setIsPlaying(true)
                  }
                }}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                title="Replay from start"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>

              <button
                onClick={onClose}
                className="text-[#00ff87] hover:underline font-bold font-sans cursor-pointer"
              >
                Skip to About Page →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
