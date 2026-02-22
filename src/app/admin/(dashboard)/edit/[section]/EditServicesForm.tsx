"use client";

import { useState } from "react";
import { updateSectionContent } from "@/app/admin/actions";
import type { ServicesContent, ServiceItem } from "@/lib/content-types";
import { Save, Loader2 } from "lucide-react";

export function EditServicesForm({ initial }: { initial: ServicesContent }) {
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const result = await updateSectionContent("services", content);
    setStatus(result.error ? "error" : "saved");
    if (!result.error) setTimeout(() => setStatus("idle"), 2000);
  }

  function updateItem(i: number, field: keyof ServiceItem, value: string) {
    const items = [...content.items];
    items[i] = { ...items[i], [field]: value };
    setContent({ ...content, items });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Services Section</h2>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Heading</label>
        <input
          type="text"
          value={content.heading}
          onChange={(e) => setContent({ ...content, heading: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Subheading</label>
        <input
          type="text"
          value={content.subheading}
          onChange={(e) => setContent({ ...content, subheading: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      {content.items.map((item, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-3 font-medium text-gray-700">Service {i + 1}</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={item.title}
              onChange={(e) => updateItem(i, "title", e.target.value)}
              placeholder="Title"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
            <textarea
              value={item.description}
              onChange={(e) => updateItem(i, "description", e.target.value)}
              placeholder="Description"
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
        </div>
      ))}
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
