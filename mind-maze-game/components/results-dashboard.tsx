"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Brain, Lightbulb, TrendingUp, RefreshCw } from "lucide-react"
import type { Question } from "@/lib/quiz-data"
import type { UserAnswer } from "@/app/page"

interface ResultsDashboardProps {
  userAnswers: UserAnswer[]
  questions: Question[]
  onRetake: () => void
}

export function ResultsDashboard({ userAnswers, questions, onRetake }: ResultsDashboardProps) {
  // Analyze which biases the user fell for
  const biasesDetected = questions.map((q, index) => {
    const userAnswer = userAnswers[index]
    let fellForBias = false

    if (q.type === "hybrid" && userAnswer.numberAnswer !== undefined) {
      // Check if answer is close to anchor value
      const anchor = q.anchorValue || 0
      const userGuess = userAnswer.numberAnswer
      const actualHeight = 380 // Hyperion tree height

      // If user's guess is closer to anchor than to actual, they fell for it
      const distanceToAnchor = Math.abs(userGuess - anchor)
      const distanceToActual = Math.abs(userGuess - actualHeight)

      fellForBias = distanceToAnchor < distanceToActual
    } else if (q.type === "multiple-choice") {
      // Check if they got it wrong
      fellForBias = userAnswer.multipleChoiceAnswer !== q.correctAnswer
    }

    return { question: q, fellForBias }
  })

  const totalBiases = biasesDetected.filter((b) => b.fellForBias).length
  const score = Math.round(((questions.length - totalBiases) / questions.length) * 100)

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Brain className="h-16 w-16 text-primary" />
          </div>
          <h1 className="mb-2 font-serif text-4xl font-bold md:text-5xl">Your Cognitive Profile</h1>
          <p className="text-lg text-muted-foreground">Analysis Complete</p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8 border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card shadow-xl">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="mb-2 text-6xl font-bold text-primary">{score}%</div>
                <p className="text-lg text-muted-foreground">Rational Thinking Score</p>
                <p className="mt-4 text-sm">
                  You fell for <strong>{totalBiases}</strong> out of <strong>{questions.length}</strong> cognitive
                  biases
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Biases Detected */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="font-serif text-2xl font-bold md:text-3xl">Detailed Analysis</h2>

          {biasesDetected.map((item, index) => (
            <motion.div
              key={item.question.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card
                className={`${
                  item.fellForBias ? "border-destructive/50 bg-destructive/5" : "border-primary/30 bg-primary/5"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="font-serif text-xl">{item.question.bias}</CardTitle>
                    <Badge variant={item.fellForBias ? "destructive" : "default"} className="shrink-0">
                      {item.fellForBias ? "Detected" : "Avoided"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Analysis */}
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      What Happened
                    </div>
                    <p className="leading-relaxed text-muted-foreground">{item.question.biasExplanation}</p>
                  </div>

                  {/* Real World Application */}
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Real World Impact
                    </div>
                    <p className="leading-relaxed text-muted-foreground">{item.question.realWorldApplication}</p>
                  </div>

                  {/* Improvement */}
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      How to Improve
                    </div>
                    <p className="leading-relaxed text-muted-foreground">{item.question.improvement}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Retake Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <Button onClick={onRetake} size="lg" variant="outline" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Retake Assessment
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
