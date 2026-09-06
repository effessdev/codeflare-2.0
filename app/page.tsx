import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-[2rem] border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <p className="text-xs font-medium tracking-[0.32em] text-muted-foreground uppercase">
          MythosMatch
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Which mythological god are you?
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Answer seven quick questions and discover your divine personality
          match.
        </p>

        <Button asChild size="lg" className="mt-8">
          <Link href="/questions/01">Start the quiz</Link>
        </Button>
      </div>
    </main>
  )
}
