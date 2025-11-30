import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2400')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-6xl font-extrabold drop-shadow-xl"
        >
          Velocity Drive
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-200 text-xl mt-4 max-w-2xl drop-shadow-lg"
        >
          Premium Car Rentals • Luxury on Demand • Drive the Legend
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-semibold shadow-2xl backdrop-blur-lg"
        >
          Explore Cars
        </motion.button>
      </div>
    </div>
  );
}