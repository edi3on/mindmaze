"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Sparkles } from "lucide-react"

interface TailoredChoiceProps {
  onSelectPreset: () => void
  onSelectCustom: () => void
}

export function TailoredChoice({ onSelectPreset, onSelectCustom }: TailoredChoiceProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 font-serif text-4xl font-bold text-balance md:text-5xl">The Contextual Analysis</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Choose your path to a personalized psychological assessment
          </p>
        </motion.div>

        {/* Two Options */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Option A: Preset Themes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card
              onClick={onSelectPreset}
              className="group h-full cursor-pointer border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
                <div className="mb-6 rounded-full bg-purple-500/20 p-6 transition-transform group-hover:scale-110">
                  <Brain className="h-12 w-12 text-purple-400" />
                </div>
                <h3 className="mb-3 font-serif text-2xl font-bold">Select an Archetype</h3>
                <p className="mb-4 text-muted-foreground">
                  Choose from pre-designed scenarios across Finance, Relationships, Education, Tech, or Sports
                </p>
                <div className="mt-auto">
                  <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-300">
                    Instant Start
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Option B: Custom Input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card
              onClick={onSelectCustom}
              className="group h-full cursor-pointer border-2 border-purple-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
                <div className="mb-6 rounded-full bg-indigo-500/20 p-6 transition-transform group-hover:scale-110">
                  <Sparkles className="h-12 w-12 text-indigo-400" />
                </div>
                <h3 className="mb-3 font-serif text-2xl font-bold">Consult the Analyst</h3>
                <p className="mb-4 text-muted-foreground">
                  Describe your unique context and let the AI generate puzzles tailored to your specific scenario
                </p>
                <div className="mt-auto">
                  <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-300">
                    AI Generated
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
