"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState, useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import { questionBank } from "@/lib/quiz-data"

const STORAGE_KEY = "mythosmatch-answers"

// Helper functions for useSyncExternalStore
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) ?? "{}"
}

function getServerSnapshot() {
  return "{}"
}

export default function QuestionPage() {
  const params = useParams<{ questionId?: string }>()
  const router = useRouter()
  const [isExiting, setIsExiting] = useState(false)

  // Reads localStorage on the client without cascading render warnings or hydration errors
  const savedAnswersRaw = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const answers: Record<string, string> = (() => {
    try {
      return JSON.parse(savedAnswersRaw) as Record<string, string>
    } catch {
      return {}
    }
  })()

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

    setIsExiting(true)

    setTimeout(() => {
      if (questionIndex > 0) {
        router.push(`/questions/${String(questionIndex).padStart(2, "0")}`)
      } else {
        router.push("/")
      }
    }, 400)
  }

  const handleSelect = (optionId: string) => {
    if (isExiting) return

    const nextAnswers = { ...answers, [String(question.id)]: optionId }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAnswers))
      // Dispatch custom event to update component state immediately via useSyncExternalStore
      window.dispatchEvent(new Event("storage"))
    } catch {
      // Handle storage quota exceeded if necessary
    }

    setIsExiting(true)

    setTimeout(() => {
      if (questionIndex + 1 < questionBank.length) {
        router.push(`/questions/${String(questionIndex + 2).padStart(2, "0")}`)
      } else {
        router.push("/result")
      }
    }, 400)
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
            <button
              type="button"
              className="transition hover:text-foreground"
              onClick={handleBack}
            >
              {questionIndex > 0 ? "Back" : "Home"}
            </button>
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
