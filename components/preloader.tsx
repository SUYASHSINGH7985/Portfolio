"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [enterClicked, setEnterClicked] = useState(false)

  useEffect(() => {
    const enterTimer = setTimeout(() => setEnterClicked(true), 1800)
    const completeTimer = setTimeout(() => {
      setIsLoading(false)
      onComplete?.()
    }, 2600)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              backgroundColor: "#000000",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              gap: "2rem",
              cursor: "default",
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Expanding White Line Overlay */}
            {enterClicked && (
              <motion.div
                style={{
                  position: "fixed",
                  inset: 0,
                  backgroundColor: "#FFFFFF",
                  zIndex: 60,
                }}
                initial={{ scaleY: 0, transformOrigin: "center" }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            )}

            {/* Progress Bar Container */}
            <motion.div
              style={{
                width: "fit-content",
                maxWidth: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.2rem",
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Identity label */}
              <motion.p
                style={{
                  color: "#F5F5F5",
                  fontSize: "clamp(1.4rem, 4vw, 2rem)",
                  fontWeight: "500",
                  fontFamily: "var(--font-vt323), monospace",
                  letterSpacing: "0.08em",
                  margin: 0,
                  marginBottom: "-1rem",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  maxWidth: "90%",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Suyash Singh — Developer
              </motion.p>

              {/* Filling Progress Line - Static container, filling inside */}
              <motion.div
                style={{
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#333333",
                  borderRadius: "1px",
                  overflow: "hidden",
                  position: "relative",
                  marginLeft: "2rem",
                }}
                initial={{ opacity: 0, scaleX: 0, transformOrigin: "left" }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    backgroundColor: "#FFFFFF",
                  width: "100%",
                    borderRadius: "1px",
                  }}
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.8, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
