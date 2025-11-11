"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"

interface SmokeEffectProps {
  isActive: boolean
  isDark: boolean
}

export function SmokeEffect({ isActive, isDark }: SmokeEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const particleCount = 35
    
    // Clear previous particles
    gsap.killTweensOf(container.children)
    container.innerHTML = ""

    // Create a timeline for coordinated animation
    const tl = gsap.timeline()

    // Create smoke particles
    Array.from({ length: particleCount }).forEach((_, index) => {
      const particle = document.createElement("div")
      particle.className = "smoke-particle"
      
      // Random position - spread across viewport
      const startX = Math.random() * window.innerWidth - window.innerWidth / 2
      const startY = Math.random() * window.innerHeight - window.innerHeight / 2
      
      particle.style.position = "fixed"
      particle.style.left = `${window.innerWidth / 2 + startX}px`
      particle.style.top = `${window.innerHeight / 2 + startY}px`
      particle.style.pointerEvents = "none"
      particle.style.borderRadius = "50%"
      particle.style.zIndex = "9999"
      
      // Set particle size
      const size = Math.random() * 120 + 60
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      
      // Set color based on theme transition direction
      if (isDark) {
        // Transitioning to dark: dark smoke particles
        const opacity = Math.random() * 0.6 + 0.4
        particle.style.background = `radial-gradient(circle, rgba(10, 10, 10, ${opacity}) 0%, rgba(10, 10, 10, ${opacity * 0.5}) 40%, rgba(10, 10, 10, 0) 70%)`
      } else {
        // Transitioning to light: white smoke particles
        const opacity = Math.random() * 0.6 + 0.4
        particle.style.background = `radial-gradient(circle, rgba(255, 255, 255, ${opacity}) 0%, rgba(255, 255, 255, ${opacity * 0.5}) 40%, rgba(255, 255, 255, 0) 70%)`
      }
      
      // Higher blur for softer smoke effect
      particle.style.filter = "blur(30px)"
      
      container.appendChild(particle)

      // Calculate end position (spreads outward)
      const angle = (index / particleCount) * Math.PI * 2
      const distance = Math.random() * 400 + 300
      const endX = Math.cos(angle) * distance
      const endY = Math.sin(angle) * distance + (isDark ? -100 : 100)

      // Stagger animation start for wave effect
      const delay = (index / particleCount) * 0.15
      
      tl.to(
        particle,
        {
          duration: Math.random() * 0.8 + 0.6,
          x: endX,
          y: endY,
          opacity: 0,
          scale: Math.random() * 2.5 + 1.5,
          rotation: Math.random() * 720 - 360,
          ease: "power2.inOut",
          onComplete: () => {
            particle.remove()
          },
        },
        delay
      )
    })

    return () => {
      // Cleanup
      tl.kill()
    }
  }, [isActive, isDark])

  return (
    <div
      ref={containerRef}
      className="smoke-effect-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  )
}
