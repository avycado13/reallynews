import { generateAllArticles } from "@/lib/articles-workflow";
import { NextResponse } from "next/server";
import { start } from "workflow/api";

export async function GET() {
  await start(generateAllArticles);
  return NextResponse.json({ status: "Articles generation started" });
}
