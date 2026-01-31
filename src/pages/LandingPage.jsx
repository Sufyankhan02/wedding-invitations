import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

const LandingPage = ({ onOpenInvitation }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* 🌙 Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-amber-50 to-yellow-50" />

      {/* 🖋 Calligraphy Background Overlay */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-10 animate-pulse"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/arabesque-calligraphy.png')",
        }}
      />

      {/* Soft Glow Effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="w-full max-w-md"
        >
          {/* Glass Card */}
          <div className="backdrop-blur-md bg-white/75 p-8 sm:p-10 rounded-3xl border border-amber-300/60 shadow-2xl text-center">

            {/* Bismillah */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-emerald-700 text-lg mb-4"
            >
              ﷽ <br />
              Bismillahir Rahmanir Rahim
            </motion.p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-amber-300" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="h-px w-16 bg-amber-300" />
            </div>

            {/* Date & Time */}
            <div className="flex flex-col gap-4 mb-6 items-center">
              <div className="inline-flex flex-col items-center space-y-1 bg-white/90 px-6 py-3 rounded-xl shadow">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <p className="text-gray-700 font-medium">
                  Monday, 25 May 2026
                </p>
              </div>

              <div className="inline-flex flex-col items-center space-y-1 bg-white/90 px-6 py-3 rounded-xl shadow">
                <Clock className="w-5 h-5 text-emerald-600" />
                <p className="text-gray-700 font-medium">
                  10:30 AM
                </p>
              </div>
            </div>

            {/* Names */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 mb-6"
            >
              <h1 className="text-4xl sm:text-5xl font-serif text-gray-800 tracking-wide">
                Rehan
                <span className="text-emerald-600 mx-3">&</span>
                Sobiya
              </h1>
              <p className="text-sm text-gray-600 italic">
                With the blessings of Allah (SWT)
              </p>
            </motion.div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenInvitation}
              className="relative w-full bg-emerald-600 text-white px-8 py-3 rounded-xl font-medium shadow-xl hover:bg-emerald-700 transition-all duration-200"
            >
              <span className="flex items-center justify-center gap-2">
                Open Invitation
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
