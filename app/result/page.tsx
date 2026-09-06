"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence, type Variants } from "motion/react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { gods, questionBank, type God } from "@/lib/quiz-data"

const STORAGE_KEY = "mythosmatch-answers"

function calculateResult(answers: Record<string, string>): God {
  const scoreMap: Record<string, number> = Object.fromEntries(
    gods.map((god) => [god.id, 0])
  )

  for (const question of questionBank) {
    const selectedOptionId = answers[String(question.id)]
    const selectedOption = question.options.find(
      (option) => option.id === selectedOptionId
    )

    if (!selectedOption) {
      continue
    }

    for (const [godId, points] of Object.entries(selectedOption.weights)) {
      scoreMap[godId] = (scoreMap[godId] ?? 0) + points
    }
  }

  return gods.reduce(
    (bestMatch, god) =>
      (scoreMap[god.id] ?? 0) > (scoreMap[bestMatch.id] ?? 0) ? god : bestMatch,
    gods[0]
  )
}

// Explicitly type variants using the `Variants` type from motion/react
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: "easeIn" },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export default function ResultPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isExiting, setIsExiting] = useState<boolean>(false)

  const [result] = useState<God | null>(() => {
    if (typeof window === "undefined") return null
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (!saved) return null
      const parsed = JSON.parse(saved) as Record<string, string>
      return calculateResult(parsed)
    } catch {
      return null
    }
  })

  const remainingGods = result ? gods.filter((god) => god.id !== result.id) : []

  useEffect(() => {
    if (!result) {
      router.push("/")
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [result, router])

  const handleRetake = (): void => {
    window.localStorage.removeItem(STORAGE_KEY)
    setIsExiting(true)
  }

  const handleExitComplete = (): void => {
    if (isExiting) {
      router.push("/questions/01")
    }
  }

  if (!result) {
    return null
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6 text-center">
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-white/5 p-8 text-center shadow-sm"
          >
            <Spinner className="h-8 w-8 text-primary" />
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                MythosMatch
              </p>
              <h1 className="mt-2 text-xl font-semibold">
                Consulting the pantheon & aligning the stars
              </h1>
            </div>
          </motion.div>
        ) : !isExiting ? (
          <motion.div
            key="result"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex w-full max-w-2xl flex-col items-center justify-center rounded-[2rem] border border-border bg-white/5 p-6 text-center shadow-sm sm:p-8"
          >
            <motion.p
              variants={itemVariants}
              className="text-xs font-medium tracking-[0.28em] text-muted-foreground uppercase"
            >
              Your divine match
            </motion.p>
            <div className="mt-6 flex w-full flex-col items-center justify-center gap-6">
              <motion.div
                variants={itemVariants}
                className="flex justify-center"
              >
                <div className="relative h-52 w-40 overflow-hidden rounded-[1.5rem] border border-white/20 bg-black/20 shadow-lg ring-1 ring-white/10">
                  <Image
                    src={result.image}
                    alt={result.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 180px"
                  />
                </div>
              </motion.div>

              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl font-semibold"
                >
                  {result.name}
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-muted-foreground"
                >
                  {result.culture}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col items-center justify-center"
                >
                  <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    Powers
                  </p>
                  <p className="mt-2 text-base leading-relaxed">
                    {result.powers.join(" • ")}
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col items-center justify-center"
                >
                  <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    Personality
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/90">
                    {result.description}
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col items-center justify-center"
            >
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Other gods in the pantheon
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {remainingGods.map((god) => (
                  <div
                    key={god.id}
                    className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20 bg-black/20 shadow-sm"
                    aria-label="Other deity"
                    title="Other deity"
                  >
                    <Image
                      src={god.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex justify-center"
            >
              <Button onClick={handleRetake} size="lg">
                Retake the quiz
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  )
}
