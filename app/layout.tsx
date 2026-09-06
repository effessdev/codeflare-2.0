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
      {/* Body doesn't overflow (fix fixed bg layout issues in mobile phones with browser bars that change) */}
      <body
        className="bg-background text-foreground"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Inner scrollable container */}
        <main className="safe-area-padding h-full overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
