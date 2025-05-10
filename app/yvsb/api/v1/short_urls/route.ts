import { NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";

import { createSupabaseServiceRoleClient } from "@/lib/supabase";
import { isValidUrl, isValidSlug, generateSlug } from "@/lib/utils";

async function checkSlug(slug: string, supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("short_urls")
    .select()
    .eq("slug", slug);

  if (error) {
    throw new Error("Error fetching slug");
  }

  return data.length === 0;
}

export async function POST(req: Request) {
  let { url, slug }: { url: string; slug: string } = await req.json();

  if (!isValidUrl(url)) {
    return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
  }

  if (!isValidSlug(slug)) {
    return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
  }

  const supabase = createSupabaseServiceRoleClient();

  try {
    if (slug === "") {
      do {
        slug = generateSlug();
      } while (!(await checkSlug(slug, supabase)));
    }

    if (!(await checkSlug(slug, supabase))) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("short_urls").insert({
      url,
      slug,
    });

    if (error) {
      throw new Error("Error creating short URL");
    }

    return NextResponse.json(
      { message: "Short URL created successfully", data: { slug } },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
