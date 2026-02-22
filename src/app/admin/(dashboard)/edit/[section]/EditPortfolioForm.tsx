"use client";

import { useState, useRef } from "react";
import { updateSectionContent, uploadPortfolioImage } from "@/app/admin/actions";
import type { PortfolioContent, PortfolioItem } from "@/lib/content-types";
import { Save, Loader2, Upload, Link as LinkIcon, Plus, Trash2 } from "lucide-react";

export function EditPortfolioForm({ initial }: { initial: PortfolioContent }) {
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const result = await updateSectionContent("portfolio", content);
    setStatus(result.error ? "error" : "saved");
    if (!result.error) setTimeout(() => setStatus("idle"), 2000);
  }

  function updateItem(i: number, field: keyof PortfolioItem, value: string) {
    const items = [...content.items];
    items[i] = { ...items[i], [field]: value };
    setContent({ ...content, items });
  }

  function addItem() {
    setContent({
      ...content,
      items: [...content.items, { src: "", alt: "", link: "" }],
    });
  }

  function removeItem(i: number) {
    const items = content.items.filter((_, idx) => idx !== i);
    setContent({ ...content, items });
  }

  async function handleFileChange(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      setUploadError("Please select an image file (JPEG, PNG, WebP, etc.)");
      return;
    }
    setUploadError(null);
    setUploadingIndex(i);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadPortfolioImage(formData);
    setUploadingIndex(null);
    if (result.url) {
      updateItem(i, "src", result.url);
    } else {
      setUploadError(result.error ?? "Upload failed");
    }
    e.target.value = "";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Portfolio Section</h2>
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
      {uploadError && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{uploadError}</div>
      )}
      {content.items.map((item, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium text-gray-700">Image {i + 1}</h3>
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50"
              title="Remove this item"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                ref={(el) => { fileInputRefs.current[i] = el; }}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(i, e)}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRefs.current[i]?.click()}
                disabled={uploadingIndex === i}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
              >
                {uploadingIndex === i ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                {uploadingIndex === i ? "Uploading..." : "Upload to Cloudinary"}
              </button>
              <input
                type="text"
                value={item.src}
                onChange={(e) => updateItem(i, "src", e.target.value)}
                placeholder="Or paste image URL"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>
            <input
              type="text"
              value={item.alt}
              onChange={(e) => updateItem(i, "alt", e.target.value)}
              placeholder="Alt text / caption"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
            <div className="flex items-center gap-2">
              <LinkIcon size={16} className="shrink-0 text-gray-500" />
              <input
                type="url"
                value={item.link ?? ""}
                onChange={(e) => updateItem(i, "link", e.target.value)}
                placeholder="Redirect link (optional) — e.g. project page, social profile"
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>
            {item.src && (
              <div className="mt-2 h-20 w-32 overflow-hidden rounded border">
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
              </div>
            )}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-4 text-gray-600 transition-colors hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
      >
        <Plus size={20} />
        Add portfolio item
      </button>
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
