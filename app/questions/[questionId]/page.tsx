"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import { questionBank } from "@/lib/quiz-data"

const STORAGE_KEY = "mythosmatch-answers"

export default function QuestionPage() {
  const params = useParams<{ questionId?: string }>()
  const router = useRouter()
  const [isExiting, setIsExiting] = useState(false)

  // Read initial state safely on first render
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {}
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      return saved ? (JSON.parse(saved) as Record<string, string>) : {}
    } catch {
      return {}
    }
  })

  const rawIndex = Number(params.questionId ?? "0")
  const questionIndex = Number.isNaN(rawIndex) ? -1 : rawIndex - 1
  const question = questionBank[questionIndex]

  if (!question) {
    return (
      <main className="flex min-h-svh items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md rounded-3xl border border-border bg-white/5 p-8 text-center shadow-sm"
        >
          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
            MythosMatch
          </p>
          <h1 className="mt-4 text-3xl font-semibold">
            This question does not exist.
          </h1>
          <Button asChild className="mt-6">
            <Link href="/">Return home</Link>
          </Button>
        </motion.div>
      </main>
    )
  }

  const currentSelection = answers[String(question.id)]

  const handleBack = () => {
    if (isExiting) return

    if (questionIndex > 0) {
      setIsExiting(true)

      setTimeout(() => {
        router.push(`/questions/${String(questionIndex).padStart(2, "0")}`)
      }, 400)
    } else {
      router.push("/")
    }
  }

  const handleSelect = (optionId: string) => {
    if (isExiting) return

    const nextAnswers = { ...answers, [String(question.id)]: optionId }

    setAnswers(nextAnswers)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAnswers))
    } catch {
      // Handle storage quota exceeded if necessary
    }

    // Trigger the exit animation first
    setIsExiting(true)

    // Wait for the exit animation duration before navigating
    setTimeout(() => {
      if (questionIndex + 1 < questionBank.length) {
        router.push(`/questions/${String(questionIndex + 2).padStart(2, "0")}`)
      } else {
        router.push("/result")
      }
    }, 400) // Matches exit transition duration
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
        animate={
          isExiting
            ? { opacity: 0, y: -16, filter: "blur(10px)" }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        transition={{
          duration: isExiting ? 0.4 : 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full max-w-2xl"
      >
        <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            {questionIndex > 0 ? (
              <button
                className="transition hover:text-foreground"
                onClick={handleBack}
              >
                Back
              </button>
            ) : (
              <Link href="/" className="transition hover:text-foreground">
                Home
              </Link>
            )}
          </div>
          <span>
            Question {question.id} / {questionBank.length}
          </span>
        </div>

        <div className="rounded-[2rem] border border-border bg-white/5 p-6 shadow-sm sm:p-8">
          <p className="text-xs font-medium tracking-[0.28em] text-muted-foreground uppercase">
            Personality quiz
          </p>
          <h1 className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
            {question.prompt}
          </h1>

          <div className="mt-8 grid gap-3">
            {question.options.map((option, idx) => {
              const isSelected = currentSelection === option.id

              return (
                <motion.button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.id)}
                  initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                  animate={
                    isExiting
                      ? { opacity: 0, y: -8, filter: "blur(6px)" }
                      : { opacity: 1, y: 0, filter: "blur(0px)" }
                  }
                  transition={{
                    duration: isExiting ? 0.3 : 0.45,
                    delay: isExiting ? idx * 0.04 : 0.15 + 0.08 * idx,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={isExiting ? undefined : { scale: 1.01 }}
                  whileTap={isExiting ? undefined : { scale: 0.995 }}
                  className={[
                    "flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all",
                    isSelected
                      ? "border-primary bg-white/10 text-foreground"
                      : "border-border bg-white/5 hover:border-primary/40 hover:bg-muted/30",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 text-muted-foreground",
                    ].join(" ")}
                  >
                    {isSelected ? "✓" : ""}
                  </span>
                  <span className="text-base">{option.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>
    </main>
  )
}
