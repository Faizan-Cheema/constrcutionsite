"use client";

import { useState } from "react";
import { Mail, Phone, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { ContactContent } from "@/lib/content-types";

export function Contact({ content }: { content: ContactContent }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim() ?? "";
    const email = (formData.get("email") as string)?.trim() ?? "";
    const message = (formData.get("message") as string)?.trim() ?? "";

    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send. Please try again.");
    }
  }
  return (
    <section id="contact" className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-[5%]">
        <motion.div
          className="mb-8 text-center sm:mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 sm:mb-3 sm:h-12 sm:w-12">
            <Mail size={22} strokeWidth={1.75} className="sm:w-6 sm:h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
            {content.heading}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600 sm:mt-3 sm:text-base">
            {content.introText}
          </p>
        </motion.div>

        <motion.div
          className="mb-8 flex flex-col gap-4 rounded-xl bg-gray-50 p-4 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 sm:p-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <a
            href={`mailto:${content.email}`}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors hover:text-orange-500 active:bg-gray-100 sm:justify-start sm:py-2"
          >
            <Mail size={20} className="shrink-0 text-orange-500" />
            <span className="truncate text-center sm:text-left">{content.email}</span>
          </a>
          <a
            href={`tel:${content.phone.replace(/\s/g, "")}`}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors hover:text-orange-500 active:bg-gray-100 sm:justify-start sm:py-2"
          >
            <Phone size={20} className="shrink-0 text-orange-500" />
            {content.phone}
          </a>
        </motion.div>

        <motion.form
          className="mx-auto grid max-w-[600px] gap-4 sm:gap-5"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-semibold text-gray-800 text-sm sm:text-base">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
              className="min-h-[44px] rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-semibold text-gray-800 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              className="min-h-[44px] rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="font-semibold text-gray-800 text-sm sm:text-base">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your project..."
              required
              className="min-h-[120px] resize-y rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          {status === "success" && (
            <div className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-700">
              <CheckCircle size={20} className="shrink-0" />
              <p className="font-medium">Message sent! We&apos;ll get back to you soon.</p>
            </div>
          )}
          {status === "error" && errorMessage && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
              <AlertCircle size={20} className="shrink-0" />
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-orange-600 hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed sm:w-fit"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="shrink-0 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={18} className="shrink-0" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
