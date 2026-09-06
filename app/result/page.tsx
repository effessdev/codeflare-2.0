"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { gods, questionBank, type God } from "@/lib/quiz-data"

const STORAGE_KEY = "mythosmatch-answers"

function calculateResult(answers: Record<string, string>) {
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

export default function ResultPage() {
  const router = useRouter()

  // Initialize state lazily on initial render
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

  // Handle redirection as a side effect without setting state
  useEffect(() => {
    if (!result) {
      router.push("/")
    }
  }, [result, router])

  const handleRetake = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    router.push("/questions/01")
  }

  if (!result) {
    return (
      <main className="flex min-h-svh items-center justify-center p-6">
        <div className="rounded-3xl border border-border bg-white/5 p-8 text-center shadow-sm">
          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
            MythosMatch
          </p>
          <h1 className="mt-4 text-3xl font-semibold">
            Calculating your divine match…
          </h1>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-[2rem] border border-border bg-white/5 p-6 shadow-sm sm:p-8">
        <p className="text-xs font-medium tracking-[0.28em] text-muted-foreground uppercase">
          Your divine match
        </p>
        <h1 className="mt-4 text-4xl font-semibold">{result.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{result.culture}</p>

        <div className="mt-8 space-y-6">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Powers
            </p>
            <p className="mt-2 text-base leading-relaxed">
              {result.powers.join(" • ")}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Personality
            </p>
            <p className="mt-2 text-base leading-relaxed text-foreground/90">
              {result.description}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={handleRetake} size="lg">
            Retake the quiz
          </Button>
        </div>
      </div>
    </main>
  )
}
