import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Preloader from "@/components/preloader"
import SmoothScroll from "@/components/smooth-scroll"

const inter = Inter({ subsets: ["latin"] })
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" })

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
      <body className={`${inter.className} ${robotoMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Preloader />
          <SmoothScroll>
            <div className="page-content" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
              {children}
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
