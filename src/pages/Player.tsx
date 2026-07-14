import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipBack, SkipForward, ArrowLeft
} from 'lucide-react'
import Header from '@/components/Header'
import Hls from 'hls.js'

export default function Player() {
  const { id } = useParams<{ id: string }>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [quality, setQuality] = useState('auto')
  const [subtitles, setSubtitles] = useState('Português')

  // Mock video URL - substituir por URL real
  const videoUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // HLS Setup
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(videoUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoUrl
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {})
      })
    }
  }, [videoUrl])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }

    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)
    return () => {
      container?.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeout)
    }
  }, [isPlaying])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video) {
      setCurrentTime(video.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (video) {
      setDuration(video.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (video) {
      const time = parseFloat(e.target.value)
      video.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    const newVolume = parseFloat(e.target.value)
    if (video) {
      video.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const changePlaybackSpeed = () => {
    const speeds = [0.5, 1, 1.5, 2]
    const currentIndex = speeds.indexOf(playbackSpeed)
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length]
    setPlaybackSpeed(nextSpeed)
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed
    }
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (video) {
      video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-lukusso-black">
      <Header />

      <div
        ref={containerRef}
        className="relative w-full h-screen bg-black group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Controls Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
            <Link to="/home" className="flex items-center gap-2 text-white hover:text-lukusso-gold transition-colors">
              <ArrowLeft size={24} />
              <span style={{ fontFamily: 'Manrope, sans-serif' }}>Voltar</span>
            </Link>

            <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              A Reproduzir
            </h2>
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-lukusso-gold/90 hover:bg-lukusso-gold flex items-center justify-center transition-all hover:scale-110"
            >
              {isPlaying ? (
                <Pause size={40} className="text-lukusso-black" fill="currentColor" />
              ) : (
                <Play size={40} className="text-lukusso-black ml-1" fill="currentColor" />
              )}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-white text-sm w-12">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-lukusso-gold"
              />
              <span className="text-white text-sm w-12">{formatTime(duration)}</span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause */}
                <button onClick={togglePlay} className="text-white hover:text-lukusso-gold transition-colors">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>

                {/* Skip */}
                <button onClick={() => skip(-10)} className="text-white hover:text-lukusso-gold transition-colors">
                  <SkipBack size={24} />
                </button>
                <button onClick={() => skip(10)} className="text-white hover:text-lukusso-gold transition-colors">
                  <SkipForward size={24} />
                </button>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <button onClick={toggleMute} className="text-white hover:text-lukusso-gold transition-colors">
                    {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-lukusso-gold"
                  />
                </div>

                {/* Playback Speed */}
                <button
                  onClick={changePlaybackSpeed}
                  className="text-white hover:text-lukusso-gold transition-colors text-sm font-semibold px-2 py-1 border border-white/30 rounded"
                >
                  {playbackSpeed}x
                </button>
              </div>

              <div className="flex items-center gap-4">
                {/* Quality */}
                <button className="text-white hover:text-lukusso-gold transition-colors text-sm">
                  {quality}
                </button>

                {/* Subtitles */}
                <button className="text-white hover:text-lukusso-gold transition-colors text-sm">
                  {subtitles}
                </button>

                {/* Fullscreen */}
                <button onClick={toggleFullscreen} className="text-white hover:text-lukusso-gold transition-colors">
                  {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}