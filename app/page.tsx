"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl rounded-[2rem] border border-border bg-white/5 p-8 text-center shadow-sm backdrop-blur-lg sm:p-12"
      >
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0 }}
          className="text-xs font-medium tracking-[0.32em] text-muted-foreground uppercase"
        >
          MythosMatch
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0 }}
          className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Which mythological god are you?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0 }}
          className="mt-4 text-base leading-relaxed text-muted-foreground"
        >
          Answer seven quick questions and discover your divine personality
          match.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            delay: 4, // Gives the user time to read the text before appearing
            ease: "easeOut",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            asChild
            size="lg"
            className="mt-8 transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
          >
            <Link href="/questions/01">Start the quiz</Link>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  )
}
