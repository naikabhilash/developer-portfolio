# Component Addition Guidelines

This document provides fundamentals and step-by-step instructions for adding new components or sub-components (like case studies, experience, certifications, etc.) to the portfolio codebase.

## Architecture Overview

The portfolio follows a modular component architecture:
- **Main Page**: `app/page.tsx` - Orchestrates all sections
- **Components**: Located in `components/` directory
- **Styling**: Tailwind CSS with zinc-950 dark theme and emerald accent colors
- **Icons**: Lucide React icon library

## Color Palette Standards

Maintain consistency with the established design system:

- **Background**: `bg-zinc-950` (primary), `bg-zinc-900` (cards/sections)
- **Borders**: `border-zinc-800` (section dividers), `border-zinc-700` (element borders)
- **Text**: `text-zinc-100` (headings), `text-zinc-300` (body), `text-zinc-400` (muted)
- **Accent**: `text-emerald-400` (labels/highlights), `bg-emerald-500` (active states/buttons)
- **Typography**: `font-mono` for headings/labels, `font-sans` for body text

## Adding a New Section Component

### Step 1: Create the Component File

Create a new file in `components/` directory following the naming convention:
- Use kebab-case: `new-section.tsx`
- Export a named function: `export function NewSection()`

Example structure:
```tsx
"use client"

import { IconName } from "lucide-react"

export function NewSection() {
  return (
    <section id="new-section" className="border-b border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Section content */}
      </div>
    </section>
  )
}
```

### Step 2: Add Section Header Pattern

Follow the consistent header pattern used across all sections:

```tsx
<div className="mb-16 flex flex-col gap-3">
  <span className="text-xs font-mono font-medium uppercase tracking-widest text-emerald-400">
    Section Label
  </span>
  <h2 className="text-balance font-mono text-4xl font-medium tracking-tight text-zinc-100 md:text-5xl">
    Section Title
  </h2>
</div>
```

### Step 3: Import and Add to Main Page

In `app/page.tsx`:
1. Import the component at the top
2. Add it to the main content area in desired order

```tsx
import { NewSection } from "@/components/new-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <NewSection /> {/* Add here */}
        <StackMatrix />
        <CaseStudies />
        <Timeline />
      </main>
      <Footer />
    </div>
  )
}
```

### Step 4: Update Navigation (Optional)

If the section should be accessible via navigation, add it to `components/navbar.tsx`:

```tsx
const links = [
  { label: "Architecture", href: "#pillars" },
  { label: "New Section", href: "#new-section" }, // Add here
  { label: "Case Studies", href: "#case-studies" },
  // ...
]
```

## Adding Sub-Components (Cards, Items, etc.)

### Card Pattern

For grid-based content (like case studies, pillars):

```tsx
<div className="grid gap-px overflow-hidden border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <div
      key={item.id}
      className="group flex flex-col gap-4 bg-zinc-900/50 p-8 transition-colors hover:bg-zinc-900"
    >
      {/* Card content */}
    </div>
  ))}
</div>
```

### Item Pattern

For list-based content (like timeline, stack items):

```tsx
<div className="flex items-center gap-3 bg-zinc-900 px-4 py-4 transition-colors hover:bg-zinc-800">
  <span className="size-1.5 rounded-none bg-emerald-400" />
  <span className="text-sm font-mono font-medium text-zinc-300">{item.label}</span>
</div>
```

## Interactive Components

### State Management

For components with interactivity (like tabs, filters):

```tsx
"use client"

import { useState } from "react"

export function InteractiveComponent() {
  const [active, setActive] = useState("default")

  return (
    <div>
      {/* Interactive controls */}
      <button
        onClick={() => setActive("value")}
        className={`inline-flex items-center gap-2 border px-4 py-2 text-sm font-mono font-medium transition-colors ${
          active === "value"
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100"
        }`}
      >
        Button Label
      </button>
    </div>
  )
}
```

## Icon Usage

Import icons from `lucide-react`:

```tsx
import { IconName, AnotherIcon } from "lucide-react"

// Use in components
<IconName className="size-4 text-zinc-300" />
<AnotherIcon className="size-5 text-emerald-400" />
```

Common icon sizes:
- `size-4` (16px) - Small icons, inline with text
- `size-5` (20px) - Medium icons, card headers
- `size-6` (24px) - Large icons, featured elements

## Data Structure Patterns

### Array of Objects

For consistent data structures:

```tsx
const items = [
  {
    id: "unique-id",
    title: "Item Title",
    description: "Item description",
    icon: IconName,
    // Additional fields as needed
  },
  // ...
]
```

### Conditional Rendering

For dynamic content display:

```tsx
{items.map((item) => (
  <div key={item.id}>
    {item.featured && <FeaturedBadge />}
    <h3>{item.title}</h3>
  </div>
))}
```

## Responsive Design Patterns

### Container Widths

- `max-w-6xl` - Standard section width (used throughout)
- `max-w-4xl` - Narrower sections
- `max-w-2xl` - Centered content

### Grid Breakpoints

```tsx
<div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

### Typography Scaling

```tsx
<h2 className="text-balance font-mono text-4xl font-medium tracking-tight text-zinc-100 md:text-5xl">
  Responsive heading
</h2>
```

## Common Utility Classes

### Spacing
- `py-24` - Standard section padding
- `px-6` - Standard horizontal padding
- `gap-3` - Small gaps
- `gap-16` - Large gaps

### Borders
- `border-b border-zinc-800` - Section dividers
- `border border-zinc-700` - Element borders
- `border border-white/10` - Glassmorphism borders

### Backgrounds
- `bg-zinc-950` - Main background
- `bg-zinc-900` - Card backgrounds
- `bg-zinc-900/50` - Semi-transparent cards
- `bg-white/10` - Glassmorphism backgrounds

## Testing Your Changes

1. **Build Check**: Run `npm run build` to ensure no TypeScript errors
2. **Dev Server**: Run `npm run dev` to preview changes locally
3. **Responsive Test**: Check at different viewport sizes
4. **Color Contrast**: Verify text readability against backgrounds

## Best Practices

1. **Consistency**: Follow existing patterns for similar components
2. **Accessibility**: Use semantic HTML, proper heading hierarchy
3. **Performance**: Use `"use client"` only when needed (state/effects)
4. **TypeScript**: Define proper types for data structures
5. **Tailwind**: Prefer utility classes over custom CSS
6. **Icons**: Use Lucide React for consistent icon style

## Example: Adding a Certifications Section

```tsx
// components/certifications.tsx
"use client"

import { Award } from "lucide-react"

const certifications = [
  {
    id: "fabric",
    title: "Microsoft Fabric Analytics Engineer",
    issuer: "Microsoft",
    year: "2024",
  },
  // Add more certifications
]

export function Certifications() {
  return (
    <section id="certifications" className="border-b border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 flex flex-col gap-3">
          <span className="text-xs font-mono font-medium uppercase tracking-widest text-emerald-400">
            Credentials
          </span>
          <h2 className="text-balance font-mono text-4xl font-medium tracking-tight text-zinc-100 md:text-5xl">
            Certifications
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center gap-4 bg-zinc-900/50 p-6 transition-colors hover:bg-zinc-900"
            >
              <div className="flex size-12 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950">
                <Award className="size-5 text-emerald-400" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-mono text-lg font-medium text-zinc-100">
                  {cert.title}
                </h3>
                <p className="text-sm text-zinc-400">
                  {cert.issuer} • {cert.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Then add to `app/page.tsx` and update navigation as needed.

## Deployment Notes

The project is configured for GitHub Pages deployment with static export. When adding new components:
- Ensure no server-side features are used (API routes, dynamic routes with params)
- Static export is configured in `next.config.mjs`
- Build will fail if using incompatible features

## Support

For questions or issues, refer to existing components as examples:
- `components/hero.tsx` - Simple section with content
- `components/pillars.tsx` - Grid-based card layout
- `components/case-studies.tsx` - Cards with metrics/tags
- `components/timeline.tsx` - List-based layout with timeline
- `components/stack-matrix.tsx` - Interactive tabbed component
