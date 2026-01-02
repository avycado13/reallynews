import { generateText, Output } from "ai";
import { hackclub } from "./ai";
import { ArticleInsertSchema, ArticleSelect, ReporterSelect } from "./types";
import { put } from "@vercel/blob";
import z from "zod";

export async function generateArticlesForReporter(
  reporter: ReporterSelect
): Promise<Array<{ title: string; content: string }>> {
  const startTime = Date.now();
  const articleCount = Math.floor(Math.random() * 3) + 2; // Generate between 2 to 4 articles

  try {
    const { output } = await generateText({
      model: hackclub("qwen/qwen3-32b"),
      system: `You are a creative article generator for a satirical news organization. Based on the reporter's persona, generate humorous and exaggerated article titles and content that align with their specialty and style.
`,
      output: Output.array({
        element: ArticleInsertSchema.omit({
          reporterId: true,
          imageUrl: true,
          createdAt: true,
        }),
      }),
      prompt: `Generate ${articleCount} unique article titles and content for the following reporter persona:

Reporter Name: ${reporter.name}
Specialty/Beat: ${reporter.specialty}
Years of Experience: ${reporter.yearsOfExperience}
Key Trait: ${reporter.keyTrait}
Notable Achievement: ${reporter.notableAchievement}
Style Description: ${reporter.styleDescription}
Biography: ${reporter.biography}

Ensure the articles are humorous, exaggerated, and suitable for a satirical news organization.`,
    });

    return output;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `[generateArticlesForReporter] Error after ${duration}ms:`,
      error
    );
    throw error;
  }
}

export async function generateImageForArticle(
  article: ArticleSelect
): Promise<string | undefined> {
  const startTime = Date.now();
  try {
    const promptResult = await generateText({
      model: hackclub("google/gemini-3-pro"),
      system: `You are an AI that generates detailed image descriptions for articles to be used in image generation models.
`,

      prompt: `Generate an image description for the following article:

Title: ${article.title}
Content: ${article.content}

The description should be vivid and specific, suitable for generating an image that represents the article's theme and tone.`,
    });
    const result = await generateText({
      model: hackclub("google/gemini-3-pro-image-preview"),
      system: `You are an AI that generates detailed images for articles in a satirical news organization.
`,

      prompt: promptResult.text,
    });

    for (const file of result.files) {
      if (file.mediaType.startsWith("image/")) {
        const blob = await put(
          article.reporterId.toString() + article.id.toString(),
          Buffer.from(file.uint8Array),
          {
            access: "public",
            addRandomSuffix: true,
          }
        );
        return blob.url;
      }
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `[generateImageForArticle] Error after ${duration}ms:`,
      error
    );
    throw error;
  }
}

export async function moderateArticle(article: {
  title: string;
  content: string;
}) {
  try {
    const { output } = await generateText({
      model: hackclub("qwen/qwen3-32b"),
      system: `You are an AI that moderates articles for a satirical news organization. Determine if the article is appropriate for publication based on its content and tone.`,
      output: Output.object({
        schema: z.object({
          isAppropriate: z.boolean(),
          appropriateScore: z.number().min(0).max(1),
          offensivenessScore: z.number().min(0).max(1),
        }),
      }),
      prompt: `Moderate the following article:

Title: ${article.title}
Content: ${article.content}

Respond with whether the article is appropriate for publication in a satirical fictional news organization, along with an appropriateness score (0 to 1) and an offensiveness score (0 to 1).`,
    });
    return output;
  } catch (error) {
    console.error("Error moderating article:", error);
    return;
  }
}

export async function generateExcerpt(article: {
  title: string;
  content: string;
}) {
  try {
    // Assuming generateExcerptForArticle is a function that generates an excerpt
    const excerpt = await generateText({
      model: hackclub("qwen/qwen3-32b"),
      system: `You are an AI that generates concise and engaging excerpts for articles in a satirical news organization.`,
      prompt: `Generate a concise and engaging excerpt for the following article:

Title: ${article.title}
Content: ${article.content}

The excerpt should capture the essence of the article in a humorous and appealing way.`,
    });
    return excerpt.text;
  } catch (error) {
    console.error("Error generating excerpt:", error);
    throw error;
  }
}
