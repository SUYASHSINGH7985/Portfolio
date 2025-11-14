import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Preloader from "@/components/preloader"
import SmoothScroll from "@/components/smooth-scroll"

const inter = Inter({ subsets: ["latin"] })
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" })
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Suyash Singh - Developer",
  description:
    "Portfolio of Suyash Singh, a developer specializing in web technologies. Explore my projects, skills, and experience.",
    
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${robotoMono.variable} ${playfairDisplay.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Preloader />
          <SmoothScroll>
            <div className="page-content">
              {children}
            </div>
          </SmoothScroll>
          {/* Header placed outside SmoothScroll to ensure fixed positioning works */}
          <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999, pointerEvents: 'none' }}>
            {/* Header will be rendered from page.tsx and injected here via portal */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
