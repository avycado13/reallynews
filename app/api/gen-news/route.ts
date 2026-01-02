import { generateAllArticles } from "@/lib/articles-workflow";
import { NextRequest, NextResponse } from "next/server";
import { start } from "workflow/api";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  await start(generateAllArticles);
  return NextResponse.json({ status: "Articles generation started" });
}
