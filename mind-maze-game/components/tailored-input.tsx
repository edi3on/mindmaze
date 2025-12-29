"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Sparkles } from "lucide-react"

interface TailoredInputProps {
  onSubmit: (theme: string) => void
}

export function TailoredInput({ onSubmit }: TailoredInputProps) {
  const [theme, setTheme] = useState("")

  const handleSubmit = () => {
    if (theme.trim()) {
      onSubmit(theme.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-purple-500/10 p-4">
              <Sparkles className="h-12 w-12 text-purple-500" />
            </div>
          </div>
          <h2 className="mb-3 font-serif text-4xl font-bold text-balance md:text-5xl">Speak to the Analyst</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Provide a theme, scenario, or context. The AI will generate psychological puzzles tailored to your world.
          </p>
        </motion.div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="border-purple-500/30 bg-card/95 shadow-2xl backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Context Examples */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Examples:</span>
                  {["Finance", "Healthcare", "Technology Startups", "Dating & Relationships"].map((example) => (
                    <Button
                      key={example}
                      variant="outline"
                      size="sm"
                      onClick={() => setTheme(example)}
                      className="text-xs"
                    >
                      {example}
                    </Button>
                  ))}
                </div>

                {/* Textarea styled like a chat message */}
                <div className="relative">
                  <Textarea
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Theme: Investment banking decisions&#10;&#10;or&#10;&#10;Scenario: I'm a doctor making treatment decisions under time pressure..."
                    className="min-h-[200px] resize-none bg-secondary/50 text-base leading-relaxed"
                  />
                  {theme && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-4 right-4"
                    >
                      <div className="rounded-lg bg-primary/10 px-3 py-1 text-xs text-primary">
                        {theme.length} characters
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={!theme.trim()}
                  className="group w-full bg-purple-600 py-6 text-lg font-semibold shadow-lg transition-all hover:bg-purple-700 hover:shadow-purple-500/50"
                  size="lg"
                >
                  <span className="flex items-center gap-2">
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    Send to Analyst
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-center text-sm text-muted-foreground italic"
        >
          The AI will analyze your context and generate 3 unique cognitive bias tests
        </motion.p>
      </div>
    </div>
  )
}
