import db from "@/lib/db/drizzle";
import { articlesTable, reportersTable } from "@/lib/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { SpecialLink } from "@/components/special-link";

export const metadata = {
  title: "Articles",
  description: "Read the latest satirical news articles from Really News",
};

export default async function ArticlesPage() {
  const articles = await db
    .select({
      id: articlesTable.id,
      title: articlesTable.title,
      excerpt: articlesTable.excerpt,
      content: articlesTable.content,
      imageUrl: articlesTable.imageUrl,
      createdAt: articlesTable.createdAt,
      reporterName: reportersTable.name,
      reporterId: articlesTable.reporterId,
    })
    .from(articlesTable)
    .leftJoin(reportersTable, (t) => eq(reportersTable.id, t.reporterId));

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
            Articles
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Read our latest satirical news coverage
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No articles found yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-gray-200 dark:border-gray-800">
                  <div className="md:flex">
                    {article.imageUrl && (
                      <div className="md:w-48 md:h-48 flex-shrink-0">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardHeader>
                        <CardTitle className="text-2xl text-black dark:text-white">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                          {article.reporterName && (
                            <SpecialLink article={article} />
                          )}
                          {article.createdAt && (
                            <span className="block mt-1">
                              {new Date(article.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                          {article.excerpt || article.content}
                        </p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
