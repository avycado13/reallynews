import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUpIcon } from "lucide-react";
import db from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import { articlesTable, reportersTable } from "@/lib/db/schema";
import { Streamdown } from "streamdown";

const categoryColorMap: { [key: string]: string } = {
  Technology: "bg-blue-500",
  Business: "bg-green-500",
  Environment: "bg-emerald-500",
  Sports: "bg-orange-500",
  Entertainment: "bg-purple-500",
  Health: "bg-red-500",
};

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return new Date(date).toLocaleDateString();
}

function getCategoryFromTitle(title: string): string {
  const categories = Object.keys(categoryColorMap);
  for (const cat of categories) {
    if (title.toLowerCase().includes(cat.toLowerCase())) {
      return cat;
    }
  }
  return "Satire";
}

export default async function Home() {
  const articleRecords = await db
    .select({
      id: articlesTable.id,
      title: articlesTable.title,
      excerpt: articlesTable.excerpt,
      content: articlesTable.content,
      createdAt: articlesTable.createdAt,
      reporterId: articlesTable.reporterId,
      reporterName: reportersTable.name,
    })
    .from(articlesTable)
    .leftJoin(reportersTable, eq(articlesTable.reporterId, reportersTable.id))
    .orderBy(articlesTable.createdAt)
    .limit(10);

  const articles = articleRecords.map((article) => {
    const category = getCategoryFromTitle(article.title);
    return {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt || article.content.substring(0, 150) + "...",
      category,
      date: formatDate(article.createdAt!),
      image: categoryColorMap[category] || "bg-blue-500",
      author: article.reporterName || "Unknown",
    };
  });

  const featuredArticle =
    articles.length > 0
      ? articles[new Date().getDate() % articles.length]
      : null;

  const categories = [
    "Technology",
    "Business",
    "Environment",
    "Sports",
    "Entertainment",
    "Health",
  ];

  const categoryColors: { [key: string]: string } = {
    Technology: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    Business:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    Environment:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
    Sports:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    Entertainment:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    Health: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <Card className="overflow-hidden border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="md:col-span-2 p-6 flex flex-col justify-between">
                  <div>
                    <Badge
                      className={categoryColors[featuredArticle.category]}
                      variant="secondary"
                    >
                      {featuredArticle.category}
                    </Badge>
                    <h2 className="text-3xl font-bold text-black dark:text-white mt-4 mb-3">
                      {featuredArticle.title}
                    </h2>
                    <Streamdown className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                      {featuredArticle.excerpt}
                    </Streamdown>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>By {featuredArticle.author}</span>
                    <span>{featuredArticle.date}</span>
                  </div>
                </div>
                <div className={`${featuredArticle.image} h-56 md:h-auto`} />
              </div>
            </Card>
          </div>
        )}

        <Separator className="my-8 bg-gray-200 dark:bg-gray-800" />

        {/* Tabs Section */}
        <Tabs defaultValue="latest" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          {/* Latest Articles Tab */}
          <TabsContent value="latest" className="space-y-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.slice(0, 4).map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-gray-200 dark:border-gray-800"
                >
                  <div className={`${article.image} h-48 w-full`} />
                  <div className="p-5">
                    <Badge
                      className={categoryColors[article.category] + " mb-3"}
                      variant="secondary"
                    >
                      {article.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                      {article.title}
                    </h3>
                    <Streamdown className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {article.excerpt}
                    </Streamdown>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <span>{article.author}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trending Articles Tab */}
          <TabsContent value="trending" className="space-y-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.slice(0, 2).map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-gray-200 dark:border-gray-800"
                >
                  <div className={`${article.image} h-48 w-full`} />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUpIcon className="h-4 w-4 text-red-500" />
                      <Badge
                        className={categoryColors[article.category]}
                        variant="secondary"
                      >
                        {article.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                      {article.title}
                    </h3>
                    <Streamdown className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {article.excerpt}
                    </Streamdown>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <span>{article.author}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => {
                const categoryArticles = articles.filter(
                  (a) => a.category === category
                );
                return (
                  <Card
                    key={category}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-gray-200 dark:border-gray-800"
                  >
                    <div
                      className={`${categoryArticles[0]?.image} h-32 w-full`}
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {categoryArticles.slice(0, 2).map((article, idx) => (
                          <p
                            key={idx}
                            className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2"
                          >
                            {article.title}
                          </p>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-4 w-full text-blue-600 dark:text-blue-400 hover:text-blue-700"
                      >
                        View All →
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-black dark:text-white mb-4">
                About
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-black dark:hover:text-white"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black dark:hover:text-white"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black dark:hover:text-white"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black dark:text-white mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-black dark:hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black dark:hover:text-white"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black dark:text-white mb-4">
                Categories
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-black dark:hover:text-white"
                  >
                    Technology
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black dark:hover:text-white"
                  >
                    Business
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black dark:hover:text-white"
                  >
                    Science
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black dark:text-white mb-4">
                Subscribe
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Get the latest news delivered to your inbox
              </p>
              <Button size="sm" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
          <Separator className="my-6 bg-gray-200 dark:bg-gray-800" />
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2025 reallynews. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
