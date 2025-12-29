"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LandingPage } from "@/components/landing-page"
import { TailoredChoice } from "@/components/tailored-choice"
import { ArchetypeSelection } from "@/components/archetype-selection"
import { TailoredInput } from "@/components/tailored-input"
import { GenerationLoading } from "@/components/generation-loading"
import { QuizInterface } from "@/components/quiz-interface"
import { LoadingScreen } from "@/components/loading-screen"
import { ResultsDashboard } from "@/components/results-dashboard"
import { QUIZ_DATA, PRESET_THEMES, type Question } from "@/lib/quiz-data"

export type GameState =
  | "landing"
  | "tailored-choice"
  | "archetype-selection"
  | "tailored-input"
  | "generation-loading"
  | "quiz"
  | "loading"
  | "results"

export interface UserAnswer {
  questionId: number
  booleanAnswer?: boolean
  numberAnswer?: number
  multipleChoiceAnswer?: string
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("landing")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(QUIZ_DATA)
  const [userTheme, setUserTheme] = useState<string>("")

  const handleStartStandardQuiz = () => {
    setActiveQuestions(QUIZ_DATA)
    setGameState("quiz")
    setCurrentQuestionIndex(0)
    setUserAnswers([])
  }

  const handleStartTailoredQuiz = () => {
    setGameState("tailored-choice")
  }

  const handleSelectPreset = () => {
    setGameState("archetype-selection")
  }

  const handleSelectCustom = () => {
    setGameState("tailored-input")
  }

  const handleSelectArchetype = (themeId: string) => {
    const selectedTheme = PRESET_THEMES.find((theme) => theme.id === themeId)
    if (selectedTheme) {
      setActiveQuestions(selectedTheme.questions)
      setGameState("quiz")
      setCurrentQuestionIndex(0)
      setUserAnswers([])
    }
  }

  const handleThemeSubmit = (theme: string) => {
    setUserTheme(theme)
    setGameState("generation-loading")
    // Simulate AI generation time
    setTimeout(() => {
      // For now, use finance mock data - in production this would be AI-generated
      const financeTheme = PRESET_THEMES.find((t) => t.id === "finance")
      setActiveQuestions(financeTheme?.questions || QUIZ_DATA)
      setGameState("quiz")
      setCurrentQuestionIndex(0)
      setUserAnswers([])
    }, 5000)
  }

  const handleAnswerSubmit = (answer: UserAnswer) => {
    const newAnswers = [...userAnswers, answer]
    setUserAnswers(newAnswers)

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Quiz complete - show loading
      setGameState("loading")
      // Simulate AI processing
      setTimeout(() => {
        setGameState("results")
      }, 3000)
    }
  }

  const handleRetakeQuiz = () => {
    setGameState("landing")
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setUserTheme("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <AnimatePresence mode="wait">
        {gameState === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onStartStandard={handleStartStandardQuiz} onStartTailored={handleStartTailoredQuiz} />
          </motion.div>
        )}

        {gameState === "tailored-choice" && (
          <motion.div
            key="tailored-choice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TailoredChoice onSelectPreset={handleSelectPreset} onSelectCustom={handleSelectCustom} />
          </motion.div>
        )}

        {gameState === "archetype-selection" && (
          <motion.div
            key="archetype-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArchetypeSelection onSelectArchetype={handleSelectArchetype} />
          </motion.div>
        )}

        {gameState === "tailored-input" && (
          <motion.div
            key="tailored-input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TailoredInput onSubmit={handleThemeSubmit} />
          </motion.div>
        )}

        {gameState === "generation-loading" && (
          <motion.div
            key="generation-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GenerationLoading />
          </motion.div>
        )}

        {gameState === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuizInterface
              questions={activeQuestions}
              currentIndex={currentQuestionIndex}
              onSubmit={handleAnswerSubmit}
            />
          </motion.div>
        )}

        {gameState === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen />
          </motion.div>
        )}

        {gameState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsDashboard userAnswers={userAnswers} questions={activeQuestions} onRetake={handleRetakeQuiz} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
