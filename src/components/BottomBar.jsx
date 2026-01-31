// src/components/BottomBar.jsx
import { Home, CalendarHeart, MapPin, MessageCircleHeart } from 'lucide-react'
import { motion } from 'framer-motion'

const items = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: CalendarHeart, label: 'Event', href: '#event' },
  { icon: MapPin, label: 'Location', href: '#location' },
  { icon: MessageCircleHeart, label: 'Prayers', href: '#wishes' },
]

export default function BottomBar() {
  return (
    <div
      className="
        fixed
        bottom-[calc(env(safe-area-inset-bottom)+16px)]
        left-1/2
        -translate-x-1/2
        z-[9999]
        pointer-events-auto
      "
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="
          bg-white/90 backdrop-blur-md
          border border-gray-200/70
          shadow-2xl
          rounded-2xl
          px-5 py-3
        "
      >
        <div className="flex gap-6">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="
                flex flex-col items-center
                text-gray-700
                hover:text-rose-500
                transition-colors
              "
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-medium">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
