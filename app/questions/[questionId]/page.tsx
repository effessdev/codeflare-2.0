"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { questionBank } from "@/lib/quiz-data"

const STORAGE_KEY = "mythosmatch-answers"

export default function QuestionPage() {
  const params = useParams<{ questionId?: string }>()
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isReady, setIsReady] = useState(false)

  const rawIndex = Number(params.questionId ?? "0")
  const questionIndex = Number.isNaN(rawIndex) ? -1 : rawIndex - 1
  const question = questionBank[questionIndex]

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setAnswers(JSON.parse(saved) as Record<string, string>)
      }
    } catch {
      // Ignore storage errors and continue with empty answers.
    }

    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isReady) {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
  }, [answers, isReady])

  if (!question) {
    return (
      <main className="flex min-h-svh items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-border bg-white/5 p-8 text-center shadow-sm backdrop-blur-lg">
          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
            MythosMatch
          </p>
          <h1 className="mt-4 text-3xl font-semibold">
            This question does not exist.
          </h1>
          <Button asChild className="mt-6">
            <Link href="/">Return home</Link>
          </Button>
        </div>
      </main>
    )
  }

  const currentSelection = answers[String(question.id)]

  const handleSelect = (optionId: string) => {
    const nextAnswers = { ...answers, [String(question.id)]: optionId }
    setAnswers(nextAnswers)

    if (questionIndex + 1 < questionBank.length) {
      router.push(`/questions/${String(questionIndex + 2).padStart(2, "0")}`)
      return
    }

    router.push("/result")
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
          <Link href="/" className="transition hover:text-foreground">
            Home
          </Link>
          <span>
            Question {question.id} / {questionBank.length}
          </span>
        </div>

        <div className="rounded-[2rem] border border-border bg-white/5 p-6 shadow-sm backdrop-blur-lg sm:p-8">
          <p className="text-xs font-medium tracking-[0.28em] text-muted-foreground uppercase">
            Personality quiz
          </p>
          <h1 className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
            {question.prompt}
          </h1>

          <div className="mt-8 grid gap-3">
            {question.options.map((option) => {
              const isSelected = currentSelection === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.id)}
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
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
