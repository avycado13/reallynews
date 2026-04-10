import db from "./db/drizzle";
import {
  articlesTable,
  tagsTable,
  articleTagsTable,
} from "./db/schema";
import { eq } from "drizzle-orm";

// Define tag mapping: article title keywords to tags
const tagMapping: Record<string, string[]> = {
  politics: [
    "election",
    "government",
    "congress",
    "senate",
    "parliament",
    "policy",
    "administration",
  ],
  technology: [
    "ai",
    "software",
    "tech",
    "algorithm",
    "digital",
    "cyber",
    "innovation",
    "startup",
  ],
  business: [
    "market",
    "economy",
    "company",
    "corporate",
    "finance",
    "trade",
    "investment",
    "earnings",
  ],
  health: [
    "health",
    "medical",
    "disease",
    "vaccine",
    "hospital",
    "drug",
    "pandemic",
    "wellness",
  ],
  sports: [
    "sports",
    "game",
    "team",
    "coach",
    "player",
    "championship",
    "league",
    "match",
  ],
  entertainment: [
    "movie",
    "music",
    "actor",
    "celebrity",
    "film",
    "award",
    "show",
    "entertainment",
  ],
  science: [
    "research",
    "scientist",
    "discovery",
    "study",
    "physics",
    "biology",
    "chemistry",
    "space",
  ],
  world: ["international", "global", "country", "nation", "foreign", "abroad"],
  opinion: ["opinion", "editorial", "commentary", "analysis", "perspective"],
  investigation: [
    "investigation",
    "report",
    "expose",
    "probe",
    "inquiry",
    "uncovered",
  ],
};

async function tagArticles() {
  try {
    console.log("🏷️  Starting article tagging...");

    // Get all articles
    const articles = await db.select().from(articlesTable);
    console.log(`Found ${articles.length} articles to tag`);

    // Get all tags
    const allTags = await db.select().from(tagsTable);
    const tagsByName = new Map(allTags.map((tag) => [tag.name, tag.id]));

    let taggedCount = 0;

    for (const article of articles) {
      const titleLower = article.title.toLowerCase();
      const contentLower = article.content.toLowerCase();
      const searchText = `${titleLower} ${contentLower}`;

      const matchedTags = new Set<number>();

      // Find matching tags based on keywords
      for (const [tagName, keywords] of Object.entries(tagMapping)) {
        const tagId = tagsByName.get(tagName);
        if (!tagId) continue;

        for (const keyword of keywords) {
          if (searchText.includes(keyword.toLowerCase())) {
            matchedTags.add(tagId);
            break;
          }
        }
      }

      // Insert article-tag relationships
      for (const tagId of matchedTags) {
        try {
          await db
            .insert(articleTagsTable)
            .values({
              articleId: article.id,
              tagId: tagId,
            })
            .returning();
          taggedCount++;
        } catch (error) {
          // Relationship might already exist
        }
      }

      console.log(
        `✓ Article "${article.title.slice(0, 40)}..." tagged with ${matchedTags.size} tag(s)`
      );
    }

    console.log(`✨ Tagging completed! Added ${taggedCount} tag relationships`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error tagging articles:", error);
    process.exit(1);
  }
}

tagArticles();
