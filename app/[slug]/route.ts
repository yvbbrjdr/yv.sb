import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  return NextResponse.redirect(new URL("/", request.url), 302);
}
