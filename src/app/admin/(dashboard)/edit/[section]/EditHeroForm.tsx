"use client";

import { useState } from "react";
import { updateSectionContent } from "@/app/admin/actions";
import type { HeroContent } from "@/lib/content-types";
import { Save, Loader2 } from "lucide-react";

export function EditHeroForm({ initial }: { initial: HeroContent }) {
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const result = await updateSectionContent("hero", content);
    setStatus(result.error ? "error" : "saved");
    if (!result.error) setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Hero Section</h2>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Title Line 1</label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => setContent({ ...content, title: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Title Line 2</label>
        <input
          type="text"
          value={content.titleLine2}
          onChange={(e) => setContent({ ...content, titleLine2: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Subtitle</label>
        <textarea
          value={content.subtitle}
          onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">CTA Button Text</label>
        <input
          type="text"
          value={content.ctaText}
          onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={status === "saving"}
        className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
      >
        {status === "saving" ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Save size={18} />
        )}
        {status === "saving" ? "Saving..." : status === "saved" ? "Saved!" : "Save"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">Failed to save. Try again.</p>}
    </form>
  );
}
