"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import type { Question } from "@/lib/quiz-data"
import type { UserAnswer } from "@/app/page"

interface QuizInterfaceProps {
  questions: Question[]
  currentIndex: number
  onSubmit: (answer: UserAnswer) => void
}

export function QuizInterface({ questions, currentIndex, onSubmit }: QuizInterfaceProps) {
  const [booleanAnswer, setBooleanAnswer] = useState<boolean | null>(null)
  const [numberAnswer, setNumberAnswer] = useState<string>("")
  const [multipleChoiceAnswer, setMultipleChoiceAnswer] = useState<string>("")

  const question = questions[currentIndex]
  const totalQuestions = questions.length
  const progress = ((currentIndex + 1) / totalQuestions) * 100

  const handleSubmit = () => {
    if (question.type === "hybrid") {
      if (booleanAnswer !== null && numberAnswer) {
        onSubmit({
          questionId: question.id,
          booleanAnswer,
          numberAnswer: Number.parseFloat(numberAnswer),
        })
        // Reset
        setBooleanAnswer(null)
        setNumberAnswer("")
      }
    } else if (question.type === "multiple-choice") {
      if (multipleChoiceAnswer) {
        onSubmit({
          questionId: question.id,
          multipleChoiceAnswer,
        })
        // Reset
        setMultipleChoiceAnswer("")
      }
    }
  }

  const canSubmit =
    question.type === "hybrid" ? booleanAnswer !== null && numberAnswer !== "" : multipleChoiceAnswer !== ""

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-primary/20 bg-card/95 shadow-xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-serif text-2xl leading-relaxed text-balance md:text-3xl">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hybrid Type: Boolean + Number Input */}
              {question.type === "hybrid" && (
                <>
                  <div className="space-y-4">
                    <Label className="text-base">First, is it taller or shorter?</Label>
                    <div className="flex gap-4">
                      <Button
                        variant={booleanAnswer === true ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setBooleanAnswer(true)}
                      >
                        Taller
                      </Button>
                      <Button
                        variant={booleanAnswer === false ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setBooleanAnswer(false)}
                      >
                        Shorter
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="estimate" className="text-base">
                      Your estimate (in feet):
                    </Label>
                    <Input
                      id="estimate"
                      type="number"
                      placeholder="Enter your guess..."
                      value={numberAnswer}
                      onChange={(e) => setNumberAnswer(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                </>
              )}

              {/* Multiple Choice */}
              {question.type === "multiple-choice" && (
                <RadioGroup value={multipleChoiceAnswer} onValueChange={setMultipleChoiceAnswer} className="space-y-3">
                  {question.options?.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 rounded-lg border border-border bg-secondary/20 p-4 transition-colors hover:bg-secondary/40"
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base leading-relaxed">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full bg-primary py-6 text-lg font-semibold"
                size="lg"
              >
                {currentIndex === totalQuestions - 1 ? "Finish" : "Next Question"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
