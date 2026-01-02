import { eq } from "drizzle-orm";
import db from "./db/drizzle";
import { articlesTable, reportersTable } from "./db/schema";
import {
  generateArticlesForReporter,
  generateExcerpt,
  generateImageForArticle,
  moderateArticle,
} from "./gen-articles";
import { ReporterSelect } from "./types";

async function getAllReporters(): Promise<ReporterSelect[]> {
  "use step";
  try {
    const reporters = await db.select().from(reportersTable);
    return reporters;
  } catch (error) {
    console.error("Error fetching reporters:", error);
    return [];
  }
}

export async function generateSaveArticles(reporter: ReporterSelect) {
  "use step";
  try {
    const articles = await generateArticlesForReporter(reporter);
    console.log(
      `Generated ${articles.length} articles for reporter ${reporter.name}`
    );
    for (const article of articles) {
      console.log(`Article Title: ${article.title}`);
      const moderateArticleResult = await moderateArticle(article);
      if (!moderateArticleResult?.isAppropriate) {
        console.log(
          `Article "${article.title}" deemed inappropriate for publication. Skipping save.`
        );
        continue;
      }
      const excerpt = await generateExcerpt(article);
      const dbArticle = await db.insert(articlesTable).values({
          title: article.title,
          content: article.content,
          reporterId: reporter.id,
          excerpt,
        }).returning();
        const imageUrl = await generateImageForArticle(dbArticle[0]);
        const updatedArticle = await db.update(articlesTable)
          .set({ imageUrl })
          .where(eq(articlesTable.id, dbArticle[0].id))
          .returning();
        console.log(
          `Saved article "${updatedArticle[0].title}" with ID ${updatedArticle[0].id} and image URL: ${updatedArticle[0].imageUrl}`
        );
    }
  } catch (error) {
    console.error("Error generating and saving articles:", error);
  }
}



export async function generateAllArticles() {
  "use workflow";
  const reporters = await getAllReporters();
  console.log(`Fetched ${reporters.length} reporters from the database.`);
  for (const reporter of reporters) {
    console.log(`Generating article for reporter: ${reporter.name}`);
    await generateSaveArticles(reporter);
  }
}
