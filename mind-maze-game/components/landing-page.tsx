"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Sparkles, BookOpen, Wand2 } from "lucide-react"

interface LandingPageProps {
  onStartStandard: () => void
  onStartTailored: () => void
}

export function LandingPage({ onStartStandard, onStartTailored }: LandingPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-5xl text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <Brain className="h-20 w-20 text-primary" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -right-2 -top-2"
            >
              <Sparkles className="h-8 w-8 text-primary/60" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 font-serif text-5xl font-bold leading-tight tracking-tight text-balance md:text-6xl lg:text-7xl"
        >
          How Biased Are You?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12 text-lg text-muted-foreground text-balance md:text-xl"
        >
          Enter the Mind Maze. A psychological journey through your cognitive biases, inspired by Daniel Kahneman&apos;s
          groundbreaking research. Can you trust your own thinking?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8 grid gap-6 md:grid-cols-2"
        >
          {/* Standard Assessment Card */}
          <Card className="group relative overflow-hidden border-primary/30 bg-card/95 shadow-xl backdrop-blur-sm transition-all hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20">
            <CardHeader>
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="font-serif text-2xl">The Standard Protocol</CardTitle>
              <CardDescription className="text-base">
                Take the classic 5-question assessment testing common cognitive biases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-left text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Time-tested psychological puzzles
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Based on Kahneman&apos;s research
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Detailed bias analysis
                </li>
              </ul>
              <Button
                onClick={onStartStandard}
                className="w-full bg-primary py-6 text-base font-semibold shadow-lg transition-all hover:shadow-primary/50"
              >
                Begin Standard Assessment
              </Button>
            </CardContent>
          </Card>

          {/* AI-Tailored Assessment Card */}
          <Card className="group relative overflow-hidden border-purple-500/30 bg-card/95 shadow-xl backdrop-blur-sm transition-all hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/20">
            <CardHeader>
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-purple-500/10 p-4">
                  <Wand2 className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              <CardTitle className="font-serif text-2xl">The Contextual Analysis</CardTitle>
              <CardDescription className="text-base">
                Provide a theme or scenario, and the AI will generate unique psychological puzzles tailored to your
                input
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-left text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  AI-generated custom questions
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Personalized to your context
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Unique every time
                </li>
              </ul>
              <Button
                onClick={onStartTailored}
                className="w-full bg-purple-600 py-6 text-base font-semibold shadow-lg transition-all hover:bg-purple-700 hover:shadow-purple-500/50"
              >
                Begin Tailored Assessment
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Warning text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm text-muted-foreground italic"
        >
          Warning: You may discover uncomfortable truths about your thinking
        </motion.p>
      </div>
    </div>
  )
}
