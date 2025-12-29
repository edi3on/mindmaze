"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Heart, BookOpen, Rocket, Trophy } from "lucide-react"

interface ArchetypeSelectionProps {
  onSelectArchetype: (themeId: string) => void
}

const iconMap = {
  graph: TrendingUp,
  heart: Heart,
  book: BookOpen,
  rocket: Rocket,
  trophy: Trophy,
}

const ARCHETYPES = [
  {
    id: "finance",
    name: "Finance/High Stakes",
    icon: "graph" as const,
    description: "Navigate investment decisions and market psychology",
    gradient: "from-emerald-500/20 to-teal-500/20",
    hoverGradient: "hover:from-emerald-500/30 hover:to-teal-500/30",
    iconColor: "text-emerald-400",
  },
  {
    id: "relationships",
    name: "Relationships/Dating",
    icon: "heart" as const,
    description: "Explore the psychology of attraction and commitment",
    gradient: "from-rose-500/20 to-pink-500/20",
    hoverGradient: "hover:from-rose-500/30 hover:to-pink-500/30",
    iconColor: "text-rose-400",
  },
  {
    id: "education",
    name: "Education/Academia",
    icon: "book" as const,
    description: "Test your reasoning in academic and learning contexts",
    gradient: "from-blue-500/20 to-indigo-500/20",
    hoverGradient: "hover:from-blue-500/30 hover:to-indigo-500/30",
    iconColor: "text-blue-400",
  },
  {
    id: "tech",
    name: "Tech Startups",
    icon: "rocket" as const,
    description: "Navigate decision-making in fast-paced innovation",
    gradient: "from-violet-500/20 to-purple-500/20",
    hoverGradient: "hover:from-violet-500/30 hover:to-purple-500/30",
    iconColor: "text-violet-400",
  },
  {
    id: "sports",
    name: "Athlete/Sports",
    icon: "trophy" as const,
    description: "Examine decision-making under competitive pressure",
    gradient: "from-amber-500/20 to-orange-500/20",
    hoverGradient: "hover:from-amber-500/30 hover:to-orange-500/30",
    iconColor: "text-amber-400",
  },
]

export function ArchetypeSelection({ onSelectArchetype }: ArchetypeSelectionProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 font-serif text-4xl font-bold text-balance md:text-5xl">Select an Archetype</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Choose a domain to test your cognitive biases in context
          </p>
        </motion.div>

        {/* Archetype Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARCHETYPES.map((archetype, index) => {
            const IconComponent = iconMap[archetype.icon]
            return (
              <motion.div
                key={archetype.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  onClick={() => onSelectArchetype(archetype.id)}
                  className={`group cursor-pointer border-2 border-purple-500/30 bg-gradient-to-br ${archetype.gradient} transition-all duration-300 ${archetype.hoverGradient} hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/25`}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className={`rounded-xl bg-background/50 p-3 transition-transform group-hover:scale-110`}>
                        <IconComponent className={`h-8 w-8 ${archetype.iconColor}`} />
                      </div>
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-bold">{archetype.name}</h3>
                    <p className="text-sm text-muted-foreground">{archetype.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
