import { motion } from 'framer-motion';

export default function LoadingShimmer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* SkillHub Logo with Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-cyan-600 mb-2">
            SkillHub
          </h1>
          <p className="text-slate-600 text-sm">Loading your experience...</p>
        </motion.div>

        {/* Shimmer Animation */}
        <div className="relative w-64 h-2 bg-slate-200 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-teal-500 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Pulsing Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-teal-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Rotating Ring */}
        <motion.div
          className="mt-8 mx-auto w-16 h-16 border-4 border-teal-200 border-t-teal-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
