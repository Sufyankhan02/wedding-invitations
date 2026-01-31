import { useConfig } from "@/hooks/useConfig";
import {
  Clock,
  MapPin,
  CalendarCheck,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { formatEventDate } from "@/lib/formatEventDate";

export default function Location() {
  const config = useConfig();

  return (
    <section id="location" className="min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 relative z-10">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <span className="inline-block text-rose-500 font-medium">
            Event Location
          </span>

          <h2 className="text-4xl md:text-5xl font-serif text-gray-800">
            Location
          </h2>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-[1px] w-12 bg-rose-200" />
            <MapPin className="w-5 h-5 text-rose-400" />
            <div className="h-[1px] w-12 bg-rose-200" />
          </div>
        </motion.div>

        {/* ================= CONTENT ================= */}
        <div className="max-w-6xl mx-auto grid md:grid-row-2 gap-10 items-center">

          {/* ================= MAP ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-8 border-white"
          >
            <iframe
              src={config.maps_embed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>

          {/* ================= VENUE CARD ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* 🌸 ANIMATED BLURRY COLORS (YAHI ADD HUA HAI) */}
            <div className="wedding-card-bg absolute inset-0 rounded-2xl" />

            {/* CARD CONTENT */}
            <div className="relative bg-white/75 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/40">
              <h3 className="text-2xl font-serif text-gray-800 mb-6">
                {config.location}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-rose-500 mt-1" />
                  <p className="text-gray-700">{config.address}</p>
                </div>

                <div className="flex items-center gap-4">
                  <CalendarCheck className="w-5 h-5 text-rose-500" />
                  <p className="text-gray-700">
                    {formatEventDate(config.date)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-rose-500" />
                  <p className="text-gray-700">{config.time}</p>
                </div>

                {/* VIEW MAP BUTTON */}
                <motion.a
                  href={config.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 w-full flex items-center justify-center gap-2
                    bg-white text-gray-700 px-4 py-2 rounded-lg
                    border border-gray-200 hover:bg-gray-50 transition text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-semibold">View Map</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
