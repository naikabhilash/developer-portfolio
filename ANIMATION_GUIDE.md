# Knowledge Graph Background Animation - Customization Guide

## Overview

The portfolio features a high-performance, interactive HTML5 Canvas particle network animation that provides a data science/ML aesthetic similar to modern tech consulting sites.

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: HTML5 Canvas with requestAnimationFrame
- **Motion Library**: Framer Motion (for fade-in effect)

## File Location

`components/knowledge-graph.tsx` - The animation component is already integrated into the main layout at `app/page.tsx`.

## Features Implemented

### Visual Effects
- **Floating Nodes**: 50 particles that slowly drift across the screen
- **Dynamic Connections**: Lines appear between nodes when they come within 150px of each other
- **Mouse Interaction**: Nodes gently repel from cursor and connect to it with lines
- **Smooth Fade-in**: 1.5s fade-in animation on page load

### Performance Optimizations
- **FPS Throttling**: Capped at 60 FPS to prevent battery drain
- **Device Pixel Ratio**: Sharp rendering on high-DPI displays
- **Efficient Rendering**: Uses requestAnimationFrame for smooth animation
- **Resize Handling**: Dynamically adjusts to window size changes

### Layout
- **Fixed Positioning**: `position: fixed` with `inset-0` to cover entire viewport
- **Z-Index**: Behind all content (no z-index needed due to DOM order)
- **Pointer Events**: `pointer-events-none` to not interfere with interactions

## Customization Options

All customization is done through the `CONFIG` object at the top of `components/knowledge-graph.tsx`:

```typescript
const CONFIG = {
  nodeCount: 50, // Number of particles
  connectionDistance: 150, // Max distance for connections
  mouseInteractionDistance: 200, // Distance for mouse interaction
  mouseRepelForce: 0.5, // Force of mouse repulsion
  nodeSpeed: 0.3, // Base speed of particles
  nodeSize: 2.5, // Size of particles
  connectionOpacity: 0.15, // Max opacity of connections
  nodeOpacity: 0.4, // Opacity of particles
  color: { r: 16, g: 185, b: 129 }, // Emerald-500 (RGB)
}
```

### Adjusting Particle Density

**More particles (busier look)**:
```typescript
nodeCount: 80
```

**Fewer particles (minimalist look)**:
```typescript
nodeCount: 30
```

### Adjusting Connection Distance

**More connections (denser network)**:
```typescript
connectionDistance: 200
```

**Fewer connections (sparser network)**:
```typescript
connectionDistance: 100
```

### Adjusting Mouse Interaction

**Stronger repulsion (more dramatic effect)**:
```typescript
mouseRepelForce: 1.0
mouseInteractionDistance: 250
```

**Weaker repulsion (subtle effect)**:
```typescript
mouseRepelForce: 0.2
mouseInteractionDistance: 150
```

### Adjusting Particle Speed

**Faster movement (more dynamic)**:
```typescript
nodeSpeed: 0.6
```

**Slower movement (calmer)**:
```typescript
nodeSpeed: 0.15
```

### Adjusting Particle Size

**Larger particles (more visible)**:
```typescript
nodeSize: 4
```

**Smaller particles (subtle)**:
```typescript
nodeSize: 1.5
```

### Adjusting Opacity

**More visible connections**:
```typescript
connectionOpacity: 0.25
nodeOpacity: 0.6
```

**More subtle connections**:
```typescript
connectionOpacity: 0.1
nodeOpacity: 0.3
```

### Changing Colors

The animation uses RGB color format. Here are some preset options:

**Emererald (current)**:
```typescript
color: { r: 16, g: 185, b: 129 }
```

**Cyan**:
```typescript
color: { r: 34, g: 211, b: 238 }
```

**Amber**:
```typescript
color: { r: 245, g: 158, b: 11 }
```

**Purple**:
```typescript
color: { r: 168, g: 85, b: 247 }
```

**Monochrome (white)**:
```typescript
color: { r: 255, g: 255, b: 255 }
```

**Monochrome (gray)**:
```typescript
color: { r: 156, g: 163, b: 175 }
```

To convert hex to RGB:
- Emerald-500 (#10b981) → { r: 16, g: 185, b: 129 }
- Cyan-400 (#22d3ee) → { r: 34, g: 211, b: 238 }
- Amber-500 (#f59e0b) → { r: 245, g: 158, b: 11 }

## Integration

The animation is already integrated into `app/page.tsx`:

```tsx
import { KnowledgeGraph } from "@/components/knowledge-graph"

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <KnowledgeGraph /> {/* Background animation */}
      <Navbar />
      <main>
        {/* Content sections */}
      </main>
      <Footer />
    </div>
  )
}
```

## Performance Notes

- The animation is optimized to run at 60 FPS
- Uses efficient canvas rendering (not DOM manipulation)
- Throttles frame rate to prevent battery drain
- Handles window resize events dynamically
- No memory leaks (properly cleans up event listeners)

## Browser Compatibility

Works in all modern browsers that support:
- HTML5 Canvas
- requestAnimationFrame
- ES6+ JavaScript

## Troubleshooting

**Animation not visible**: Ensure the component is imported and placed before other content in the DOM.

**Performance issues**: Reduce `nodeCount` or `connectionDistance` in the CONFIG object.

**Colors not matching**: Verify RGB values are correct (0-255 range).

**Mouse interaction not working**: Check that `pointer-events-none` is set on the canvas element to not block interactions.

## Advanced Customization

For more advanced changes, you can modify:

1. **Node behavior**: Edit the velocity calculation in the `animate` function
2. **Connection logic**: Modify the distance calculation and opacity formula
3. **Mouse effect**: Change the repulsion force calculation or add attraction instead
4. **Visual style**: Add gradients, glow effects, or different node shapes

## File Structure

```
components/
  knowledge-graph.tsx    # Animation component
app/
  page.tsx               # Main layout (imports and places KnowledgeGraph)
```

## Support

For questions or issues, refer to the inline comments in `components/knowledge-graph.tsx` for detailed implementation details.
