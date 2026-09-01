import type React from "react"
import type { Metadata } from "next"
import { VT323 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PreloaderWrapper from "@/components/preloader-wrapper"

const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt323" })

export const metadata: Metadata = {
  title: "Suyash Singh - Developer",
  description:
    "Portfolio of Suyash Singh, a developer specializing in web technologies. Explore my projects, skills, and experience.",
  icons: {
    icon: "/LOGO.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${vt323.variable} ${vt323.className}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <PreloaderWrapper>
            <div className="page-content min-h-screen">
              {children}
            </div>
          </PreloaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
