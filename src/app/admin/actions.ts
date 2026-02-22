"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { SiteContentMap } from "@/lib/content-types";
import { v2 as cloudinary } from "cloudinary";

type SectionKey = keyof SiteContentMap;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function updateSectionContent<T extends SectionKey>(
  section: T,
  data: SiteContentMap[T]
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ section, data, updated_at: new Date().toISOString() }, { onConflict: "section" });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/admin/edit/${section}`);
  return { success: true };
}

export async function uploadPortfolioImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file provided" };

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return { error: "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env.local" };
  }

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      dataUri,
      { folder: "portfolio", resource_type: "image" },
      (err, result) => {
        if (err) {
          resolve({ error: err.message });
          return;
        }
        if (result?.secure_url) {
          resolve({ url: result.secure_url });
        } else {
          resolve({ error: "Upload failed" });
        }
      }
    );
  });
}
