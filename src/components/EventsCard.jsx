import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

export default function EventsCard({ events }) {
  return (
    <div className="space-y-6">
      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            relative overflow-hidden
            rounded-2xl
            shadow-[0_30px_70px_rgba(0,0,0,0.25)]
            border border-white/30
          "
        >
          {/* 🌈 BLURRY ANIMATED BACKGROUND */}
          <div className="wedding-card-bg absolute inset-0" />

          {/* 🧾 CONTENT */}
          <div className="
            relative z-10
            bg-white/65 backdrop-blur-xl
            rounded-2xl p-6
          ">
            <h3 className="text-xl font-serif text-gray-800">
              {event.title}
            </h3>

            <p className="text-gray-600 mt-2">
              {event.date} • {event.startTime} – {event.endTime}
            </p>

            <p className="mt-3 text-gray-700">
              {event.location}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {event.address}
            </p>

            {/* 📅 SAVE TO CALENDAR */}
            {event.calendarUrl && (
              <a
                href={event.calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  mt-4 inline-flex items-center gap-2
                  px-4 py-2 rounded-full
                  bg-rose-500 text-white
                  text-sm font-medium
                  shadow-md
                  hover:bg-rose-600
                  transition
                "
              >
                <Calendar className="w-4 h-4" />
                Save to Calendar
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
