"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Node {
  id: string
  x: number
  y: number
  vx: number
  vy: number
}

export function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize nodes
    const initializeNodes = () => {
      const nodes: Node[] = []
      const nodeCount = 40
      const padding = 100

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          id: `node-${i}`,
          x: padding + Math.random() * (canvas.width - padding * 2),
          y: padding + Math.random() * (canvas.height - padding * 2),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        })
      }

      nodesRef.current = nodes
    }

    initializeNodes()

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodesRef.current.forEach((node, index) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 50 || node.x > canvas.width - 50) node.vx *= -1
        if (node.y < 50 || node.y > canvas.height - 50) node.vy *= -1

        // Draw connections
        nodesRef.current.forEach((otherNode, otherIndex) => {
          if (index >= otherIndex) return

          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.15
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})` // emerald-500
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(16, 185, 129, 0.4)" // emerald-500
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}
