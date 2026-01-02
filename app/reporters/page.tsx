import { eq } from "drizzle-orm";
import db from "@/lib/db/drizzle";
import { reportersTable } from "@/lib/db/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Reporters",
  description: "Meet our team of satirical news reporters",
};

export default async function ReportersPage() {
  const reporters = await db.select().from(reportersTable);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">Our Reporters</h1>
          <p className="text-gray-600 dark:text-gray-400">Meet the satirical journalists behind Really News</p>
        </div>

        {reporters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No reporters found. Generate some to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reporters.map((reporter) => (
              <Link key={reporter.id} href={`/reporters/${reporter.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-black dark:text-white">{reporter.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400">{reporter.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Experience</p>
                        <p className="text-sm text-black dark:text-gray-200">{reporter.yearsOfExperience} years</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Key Trait</p>
                        <p className="text-sm text-black dark:text-gray-200">{reporter.keyTrait}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Notable Achievement</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{reporter.notableAchievement}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
