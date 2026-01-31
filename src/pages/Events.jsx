import EventCards from '@/components/EventsCard'
import { useConfig } from '@/hooks/useConfig'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Events() {
  const config = useConfig()

  return (
    <section id="event" className="relative px-4 py-16 scroll-mt-24">
      {/* AYAH TOP */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <p className="font-arabic text-2xl text-red-600 mb-2">
          وَجَعَلَ بَيْنَكُم مَوَدَّةً وَرَحْمَةً
        </p>
        <p className="text-sm italic text-gray-500">
          “And He placed between you affection and mercy”
        </p>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="flex justify-center gap-2 mt-4"
        >
          <span className="w-2 h-2 bg-red-400 rounded-full" />
          <span className="w-2 h-2 bg-red-600 rounded-full" />
          <span className="w-2 h-2 bg-red-400 rounded-full" />
        </motion.div>
      </motion.div>

      {/* HEADER */}
      <div className="text-center mb-10">
        <span className="text-red-500 font-medium">Save The Date</span>
        <h2 className="text-4xl font-serif mt-2">Wedding Ceremony</h2>

        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-[1px] w-10 bg-red-300" />
          <Heart className="text-red-500 w-4 h-4" fill="currentColor" />
          <div className="h-[1px] w-10 bg-red-300" />
        </div>
      </div>

      {/* EVENT CARD */}
      <EventCards events={config.agenda} />
    </section>
  )
}
