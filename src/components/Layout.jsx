import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, PauseCircle, PlayCircle } from 'lucide-react'
import { useConfig } from '@/hooks/useConfig'
import BottomBar from '@/components/BottomBar'

const Layout = ({ children }) => {
  const config = useConfig()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio(
      config?.audio?.src || '/audio/fulfilling-humming.mp3'
    )
    audioRef.current.loop = true

    const tryPlay = async () => {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      } catch {
        document.addEventListener(
          'click',
          async () => {
            await audioRef.current.play()
            setIsPlaying(true)
          },
          { once: true }
        )
      }
    }

    tryPlay()
    return () => audioRef.current?.pause()
  }, [config])

  const toggleMusic = async () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      await audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="relative h-screen w-full flex justify-center overflow-hidden">

      {/* 🌸 BACKGROUND */}
      <div className="wedding-bg absolute inset-0 -z-10" />

      {/* 📱 SCROLLABLE CARD ONLY */}
      <motion.div
        className="
          w-full max-w-[430px] h-full
          bg-white/70 backdrop-blur-2xl
          relative overflow-y-auto
          border border-white/40
          shadow-2xl
          rounded-2xl
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* 🎵 MUSIC BUTTON */}
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 bg-white/80 p-3 rounded-full shadow-lg"
        >
          {isPlaying ? (
            <PauseCircle className="w-6 h-6 text-rose-500" />
          ) : (
            <PlayCircle className="w-6 h-6 text-rose-500" />
          )}
        </button>

        {/* CONTENT */}
        <main className="relative w-full pb-[140px]">
          {children}
        </main>

        {/* TOAST */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span className="text-sm">
                  {config?.audio?.title || 'Background Music'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ✅ BOTTOM BAR — SCROLL KE BAHAR */}
      <BottomBar />

    </div>
  )
}

export default Layout
