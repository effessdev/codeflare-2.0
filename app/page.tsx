"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  const router = useRouter()
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsExiting(true)

    setTimeout(() => {
      router.push("/questions/01")
    }, 600)
  }

  const exitAnimation = {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0, y: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(12px)",
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl rounded-[2rem] border border-border bg-white/5 p-8 text-center shadow-sm sm:p-12"
          >
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={exitAnimation}
              transition={{ duration: 1, delay: 0 }}
              className="text-xs font-medium tracking-[0.32em] text-muted-foreground uppercase"
            >
              MythosMatch
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={exitAnimation}
              transition={{ duration: 1, delay: 0 }}
              className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              Which mythological god are you?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={exitAnimation}
              transition={{ duration: 1, delay: 0 }}
              className="mt-4 text-base leading-relaxed text-muted-foreground"
            >
              Answer seven quick questions and discover your divine personality
              match.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                scale: 0.8,
                filter: "blur(6px)",
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: "easeOut",
              }}
              whileHover={!isExiting ? { scale: 1.05 } : undefined}
              whileTap={!isExiting ? { scale: 0.98 } : undefined}
            >
              <Button
                asChild
                size="lg"
                className="mt-8 transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
              >
                <a href="/questions/01" onClick={handleStart}>
                  Start the quiz
                </a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="absolute bottom-4 text-sm text-muted-foreground">
        Created by{" "}
        <Link
          href="https://github.com/effessdev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          EffessDev
        </Link>
      </p>
    </main>
  )
}
