import db from "./db/drizzle";
import { tagsTable } from "./db/schema";

const tags = [
  "politics",
  "technology",
  "business",
  "health",
  "sports",
  "entertainment",
  "science",
  "world",
  "opinion",
  "investigation",
];

async function seedTags() {
  try {
    console.log("🌱 Starting tag seeding...");

    for (const tagName of tags) {
      try {
         await db
          .insert(tagsTable)
          .values({
            name: tagName,
          })
          .returning();

        console.log(`✓ Created tag: ${tagName}`);
      } catch (error) {
        // Tag might already exist (unique constraint)
        console.log(`Tag already exists: ${tagName}`);
        console.log(error)
      }
    }

    console.log("✨ Tag seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding tags:", error);
    process.exit(1);
  }
}

seedTags();
