"use client"

import { motion } from "framer-motion"
import { Brain } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Pulsing Brain Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="mb-8 flex justify-center"
        >
          <Brain className="h-24 w-24 text-primary" />
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="mb-4 font-serif text-3xl font-bold md:text-4xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          Analyzing Neural Patterns...
        </motion.h2>

        {/* Scrambling Text Effect */}
        <div className="space-y-2 text-muted-foreground">
          {[
            "Decoding cognitive signatures",
            "Mapping bias networks",
            "Processing heuristic data",
            "Generating susceptibility profile",
          ].map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.3,
                duration: 0.5,
              }}
              className="animate-text-scramble"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-3 w-3 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
