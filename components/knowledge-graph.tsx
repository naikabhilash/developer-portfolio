"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Node {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  originalVx: number
  originalVy: number
}

// Configuration - adjust these to customize the animation
const CONFIG = {
  nodeCount: 120, // Number of particles (reduced from 250 for performance)
  connectionDistance: 150, // Max distance for connections
  mouseInteractionDistance: 200, // Distance for mouse interaction
  mouseRepelForce: 0.7, // Force of mouse repulsion
  nodeSpeed: 0.3, // Base speed of particles
  nodeSize: 2.5, // Size of particles
  connectionOpacity: 0.15, // Max opacity of connections
  nodeOpacity: 0.4, // Opacity of particles
  color: { r: 16, g: 185, b: 129 }, // Emerald-500 (RGB)
}

export function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Performance optimization: use device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    // Initialize nodes
    const initializeNodes = () => {
      const nodes: Node[] = []
      const padding = 100

      for (let i = 0; i < CONFIG.nodeCount; i++) {
        const vx = (Math.random() - 0.5) * CONFIG.nodeSpeed
        const vy = (Math.random() - 0.5) * CONFIG.nodeSpeed
        nodes.push({
          id: `node-${i}`,
          x: padding + Math.random() * (window.innerWidth - padding * 2),
          y: padding + Math.random() * (window.innerHeight - padding * 2),
          vx,
          vy,
          originalVx: vx,
          originalVy: vy,
        })
      }

      nodesRef.current = nodes
    }

    initializeNodes()

    // Animation loop with performance optimization
    let animationFrameId: number
    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    const animate = (timestamp: number) => {
      // Throttle to target FPS for better performance
      const elapsed = timestamp - lastTime
      if (elapsed < frameInterval) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }
      lastTime = timestamp - (elapsed % frameInterval)

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const { x: mouseX, y: mouseY } = mouseRef.current

      // Update and draw nodes
      nodesRef.current.forEach((node, index) => {
        // Mouse interaction - gentle repulsion
        const dx = node.x - mouseX
        const dy = node.y - mouseY
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy)

        if (distanceToMouse < CONFIG.mouseInteractionDistance) {
          const force = (CONFIG.mouseInteractionDistance - distanceToMouse) / CONFIG.mouseInteractionDistance
          const angle = Math.atan2(dy, dx)
          node.vx += Math.cos(angle) * force * CONFIG.mouseRepelForce
          node.vy += Math.sin(angle) * force * CONFIG.mouseRepelForce
        }

        // Gradually return to original speed
        node.vx += (node.originalVx - node.vx) * 0.02
        node.vy += (node.originalVy - node.vy) * 0.02

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 50 || node.x > window.innerWidth - 50) node.vx *= -1
        if (node.y < 50 || node.y > window.innerHeight - 50) node.vy *= -1

        // Draw connections to mouse
        if (distanceToMouse < CONFIG.mouseInteractionDistance) {
          const opacity = (1 - distanceToMouse / CONFIG.mouseInteractionDistance) * CONFIG.connectionOpacity * 1.5
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(mouseX, mouseY)
          ctx.strokeStyle = `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${opacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Draw connections between nodes
        nodesRef.current.forEach((otherNode, otherIndex) => {
          if (index >= otherIndex) return

          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < CONFIG.connectionDistance) {
            const opacity = (1 - distance / CONFIG.connectionDistance) * CONFIG.connectionOpacity
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, CONFIG.nodeSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${CONFIG.nodeOpacity})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}
