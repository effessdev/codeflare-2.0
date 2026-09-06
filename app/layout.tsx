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

export const metadata = {
  title: "MythosMatch",
  description:
    "Discover your divine match with MythosMatch, the ultimate quiz that aligns your personality with the gods of mythology. Uncover which deity resonates with your traits and powers.",
  openGraph: {
    title: "MythosMatch",
    description:
      "Discover your divine match with MythosMatch, the ultimate quiz that aligns your personality with the gods of mythology. Uncover which deity resonates with your traits and powers.",
    url: "https://codeflare-2-0.vercel.app",
  },
}

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
      <body className="min-h-screen bg-background text-foreground">
        {/* Fixed background div */}
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 min-h-dvh"
          style={{
            backgroundImage: `url(${backgroundImage.src})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
