import { createClient } from "@/lib/supabase/server";
import type { SiteContentMap } from "./content-types";

export async function getSiteContent<T extends keyof SiteContentMap>(
  section: T
): Promise<SiteContentMap[T] | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("section", section)
    .single();
  if (error || !data) return null;
  return data.data as SiteContentMap[T];
}

export async function getAllSiteContent(): Promise<Partial<SiteContentMap>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_content").select("section, data");
  if (error || !data) return {};
  const result = {} as Partial<SiteContentMap>;
  for (const row of data) {
    (result as Record<string, unknown>)[row.section] = row.data;
  }
  return result;
}
