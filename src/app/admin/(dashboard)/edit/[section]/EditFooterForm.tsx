"use client";

import { useState } from "react";
import { updateSectionContent } from "@/app/admin/actions";
import type { FooterContent, SocialLink } from "@/lib/content-types";
import { Save, Loader2 } from "lucide-react";

export function EditFooterForm({ initial }: { initial: FooterContent }) {
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const result = await updateSectionContent("footer", content);
    setStatus(result.error ? "error" : "saved");
    if (!result.error) setTimeout(() => setStatus("idle"), 2000);
  }

  function updateSocial(i: number, field: keyof SocialLink, value: string) {
    const socialLinks = [...content.socialLinks];
    socialLinks[i] = { ...socialLinks[i], [field]: value };
    setContent({ ...content, socialLinks });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Footer Section</h2>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Copyright Text</label>
        <input
          type="text"
          value={content.copyright}
          onChange={(e) => setContent({ ...content, copyright: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Social Links</label>
        {content.socialLinks.map((link, i) => (
          <div key={i} className="mb-3 flex gap-2">
            <input
              type="text"
              value={link.platform}
              onChange={(e) => updateSocial(i, "platform", e.target.value)}
              placeholder="Platform (e.g. Facebook)"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
            />
            <input
              type="url"
              value={link.url}
              onChange={(e) => updateSocial(i, "url", e.target.value)}
              placeholder="URL"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
        ))}
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
