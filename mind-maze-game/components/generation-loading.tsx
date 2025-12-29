"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Brain, Sparkles } from "lucide-react"

const LOADING_STAGES = [
  "Analyst receiving context...",
  "Analyzing psychological patterns...",
  "Generating themed puzzles...",
  "Calibrating difficulty levels...",
  "Finalizing assessment structure...",
]

export function GenerationLoading() {
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < LOADING_STAGES.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 1000)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2
        }
        return prev
      })
    }, 100)

    return () => {
      clearInterval(stageInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Animated Icon */}
        <motion.div
          className="flex justify-center"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <Brain className="h-24 w-24 text-purple-500" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -right-3 -top-3"
            >
              <Sparkles className="h-10 w-10 text-purple-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <div className="space-y-4 text-center">
          <motion.h2
            key={currentStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-serif text-2xl font-bold text-purple-500 md:text-3xl"
          >
            {LOADING_STAGES[currentStage]}
          </motion.h2>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <Progress value={progress} className="h-3 bg-secondary" />
          <p className="text-center text-sm text-muted-foreground">{Math.round(progress)}% Complete</p>
        </div>

        {/* Mysterious Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center text-sm text-muted-foreground italic"
        >
          The analyst is examining your context through the lens of cognitive psychology...
        </motion.p>
      </div>
    </div>
  )
}
