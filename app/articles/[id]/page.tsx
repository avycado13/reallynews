import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import db from "@/lib/db/drizzle";
import { articlesTable, reportersTable } from "@/lib/db/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface ArticleDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const articles = await db.select({ id: articlesTable.id }).from(articlesTable);
  return articles.map((article) => ({
    id: article.id.toString(),
  }));
}

export const metadata = {
  title: "Article",
  description: "Read the full article",
};

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { id } = await params;

  const result = await db
    .select({
      id: articlesTable.id,
      title: articlesTable.title,
      excerpt: articlesTable.excerpt,
      content: articlesTable.content,
      imageUrl: articlesTable.imageUrl,
      createdAt: articlesTable.createdAt,
      reporterId: articlesTable.reporterId,
      reporterName: reportersTable.name,
      reporterSpecialty: reportersTable.specialty,
    })
    .from(articlesTable)
    .leftJoin(reportersTable, eq(articlesTable.reporterId, reportersTable.id))
    .where(eq(articlesTable.id, parseInt(id, 10)));

  if (result.length === 0) {
    notFound();
  }

  const article = result[0];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        <Link href="/articles" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Back to Articles
        </Link>

        <div className="max-w-3xl">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="border-b border-gray-200 dark:border-gray-800">
              <CardTitle className="text-4xl mb-4 text-black dark:text-white">{article.title}</CardTitle>
              <CardDescription>
                <div className="space-y-2">
                  {article.reporterName && (
                    <div>
                      <Link
                        href={`/reporters/${article.reporterId}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                      >
                        {article.reporterName}
                      </Link>
                      {article.reporterSpecialty && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{article.reporterSpecialty}</p>
                      )}
                    </div>
                  )}
                  {article.createdAt && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {article.imageUrl && (
                <div className="mb-6">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
              )}

              {article.excerpt && (
                <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg border-l-4 border-gray-400 dark:border-gray-600">
                  <p className="text-lg italic text-gray-700 dark:text-gray-300">{article.excerpt}</p>
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none">
                {article.content.split("\n").map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
