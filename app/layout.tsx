import {
  Geist,
  Geist_Mono,
  EB_Garamond,
  Playfair_Display,
} from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
})

const ebGaramond = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" })

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"

      className={cn(
        "antialiased",
        fontSans.variable,
        fontMono.variable,
        "font-serif",
        ebGaramond.variable,
        playfairDisplayHeading.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}
