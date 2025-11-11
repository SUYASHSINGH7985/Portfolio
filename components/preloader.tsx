"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // GSAP counter animation from 0 to 100
    gsap.to({ value: 0 }, {
      value: 100,
      duration: 2.5,
      onUpdate: function () {
        setCount(Math.floor(this.targets()[0].value))
      },
      ease: "power2.inOut",
    })

    // Page reveal with GSAP after loading completes
    const timer = setTimeout(() => {
      // Animate the preloader out
      gsap.to(".preloader-overlay", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        pointerEvents: "none",
        onComplete: () => {
          setIsLoading(false)
        },
      })

      // Reveal page content with split effect
      gsap.to(".page-content", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "power2.inOut",
      })
    }, 2800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="preloader-overlay fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-background flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ["0px 0px", "100px 100px"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundImage: "linear-gradient(45deg, transparent 48%, rgba(168, 85, 247, 0.1) 49%, rgba(168, 85, 247, 0.1) 51%, transparent 52%)",
                  backgroundSize: "100px 100px",
                }}
              />
            </div>

            {/* Center container */}
            <div className="relative z-10 flex flex-col items-center gap-8">
              {/* Main animated orbs */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                {/* Outer rotating ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent border-t-purple-500 border-r-purple-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Middle rotating ring */}
                <motion.div
                  className="absolute inset-4 sm:inset-6 border-2 border-transparent border-b-blue-500 border-l-blue-500 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner pulsing orb */}
                <motion.div
                  className="absolute inset-8 sm:inset-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                      "0 0 40px rgba(168, 85, 247, 0.8)",
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Floating particles around orb */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    animate={{
                      x: Math.cos((i / 6) * Math.PI * 2) * 60,
                      y: Math.sin((i / 6) * Math.PI * 2) * 60,
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: (i / 6) * 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Counter display */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {count}%
                </div>
                <p className="text-sm sm:text-base font-light text-foreground/70 tracking-widest">
                  LOADING
                </p>
              </motion.div>
            </div>

            {/* Glowing edge effect */}
            <motion.div
              className="absolute top-0 left-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <motion.div
              className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
              animate={{
                scale: [1.2, 0.8, 1.2],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
