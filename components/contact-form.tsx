"use client"

import { useState } from "react"
import { Mail, Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Formspree endpoint - replace with your actual form ID
    // To set up: Go to https://formspree.io, create a free account, and create a new form
    // Replace YOUR_FORMSPREE_FORM_ID with your actual form ID (e.g., "xqzvkyzp")
    const formId = "YOUR_FORMSPREE_FORM_ID"
    const endpoint = `https://formspree.io/f/${formId}`

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        console.error("Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <CheckCircle className="size-8 text-emerald-400" />
            </div>
            <h2 className="text-balance font-mono text-4xl font-medium tracking-tight text-zinc-100 md:text-5xl">
              Message Sent
            </h2>
            <p className="max-w-md text-zinc-400">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 inline-flex items-center gap-2 border border-emerald-500 bg-emerald-500 px-6 py-3 text-sm font-mono font-medium text-white transition-colors hover:bg-emerald-600"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="bg-zinc-950/50 backdrop-sm">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 flex flex-col gap-3">
          <span className="text-xs font-mono font-medium uppercase tracking-widest text-emerald-400">
            Get in Touch
          </span>
          <h2 className="text-balance font-mono text-4xl font-medium tracking-tight text-zinc-100 md:text-5xl">
            Contact Me
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="text-zinc-400">
              Have a question or want to discuss a project? Fill out the form and I'll get back to you
              as soon as possible.
            </p>
            <div className="flex items-center gap-4 border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex size-12 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950">
                <Mail className="size-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Email</p>
                <a
                  href="mailto:naik.abhilash@protonmail.com"
                  className="font-mono text-sm font-medium text-zinc-100 hover:text-emerald-400"
                >
                  naik.abhilash@protonmail.com
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-mono font-medium text-zinc-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-mono font-medium text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-mono font-medium text-zinc-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="What's this about?"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-mono font-medium text-zinc-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                placeholder="Tell me more about your project or question..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 border border-emerald-500 bg-emerald-500 px-6 py-3 text-sm font-mono font-medium text-white transition-colors hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
