import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

console.log("[init] Initializing Hack Club AI client...");
console.log("[init] Using baseUrl: https://ai.hackclub.com/proxy/v1");

export const hackclub = createOpenRouter({
  apiKey: process.env.HACK_CLUB_AI_API_KEY,
  baseUrl: "https://ai.hackclub.com/proxy/v1",
});

console.log("[init] Hack Club AI client initialized");

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

async function searchWeb(
  query: string
): Promise<{ web: { results: SearchResult[] } }> {
  console.log("[searchWeb] Starting search with query:", query);
  const startTime = Date.now();

  try {
    const url = `https://search.hackclub.com/res/v1/web/search?q=${encodeURIComponent(
      query
    )}&count=5`;
    console.log("[searchWeb] Making request to:", url);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.HACK_CLUB_SEARCH_API_KEY}`,
      },
    });

    console.log("[searchWeb] Response status:", res.status);

    const data = await res.json();
    const duration = Date.now() - startTime;
    const resultCount = data.web?.results?.length || 0;

    console.log(
      `[searchWeb] Successfully fetched ${resultCount} results in ${duration}ms`
    );
    console.log(
      "[searchWeb] Results:",
      JSON.stringify(data.web?.results || [], null, 2)
    );

    return data;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[searchWeb] Error after ${duration}ms:`, error);
    throw error;
  }
}

async function askWithSearch(question: string) {
  console.log("[askWithSearch] Starting with question:", question);
  const startTime = Date.now();

  try {
    // 1. Search the web
    console.log("[askWithSearch] Step 1: Searching the web...");
    const searchResults = await searchWeb(question);

    // 2. Format results for the prompt
    console.log("[askWithSearch] Step 2: Formatting search results...");
    const context = searchResults.web?.results
      ?.map((r: SearchResult) => `[${r.title}](${r.url})\n${r.description}`)
      .join("\n\n");

    console.log(
      "[askWithSearch] Formatted context length:",
      context?.length || 0,
      "characters"
    );

    // 3. Ask the AI with search context
    console.log("[askWithSearch] Step 3: Calling AI model (qwen/qwen3-32b)...");
    const aiStartTime = Date.now();

    const { text } = await generateText({
      model: hackclub("qwen/qwen3-32b"),
      system: `You are a helpful assistant. Use the following web search results to answer questions accurately. Cite sources using markdown links.

Web search results:
${context}`,
      prompt: question,
    });

    const aiDuration = Date.now() - aiStartTime;
    console.log(`[askWithSearch] AI response received in ${aiDuration}ms`);
    console.log("[askWithSearch] Response length:", text.length, "characters");
    console.log(
      "[askWithSearch] Response preview:",
      text.substring(0, 200) + "..."
    );

    const totalDuration = Date.now() - startTime;
    console.log(`[askWithSearch] Completed successfully in ${totalDuration}ms`);

    return text;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[askWithSearch] Error after ${duration}ms:`, error);
    throw error;
  }
}
