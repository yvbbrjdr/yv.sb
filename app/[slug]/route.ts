import { NextResponse } from "next/server";

import { createSupabaseServiceRoleClient } from "@/lib/supabase";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const supabase = createSupabaseServiceRoleClient();

  const { data, error } = await supabase
    .from("short_urls")
    .select("url")
    .eq("slug", slug);

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  if (data.length === 0) {
    return new NextResponse("Short URL not found", { status: 404 });
  }

  return NextResponse.redirect(new URL(data[0].url), 302);
}
