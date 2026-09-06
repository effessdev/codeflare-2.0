import {
  Geist,
  Geist_Mono,
  EB_Garamond,
  Playfair_Display,
} from "next/font/google"

import backgroundImage from "./assets/luminas-art-waterfall.jpg"
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
      <body
        className="min-h-screen bg-background text-foreground"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {children}
      </body>
    </html>
  )
}
