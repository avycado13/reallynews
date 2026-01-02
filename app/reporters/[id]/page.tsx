import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import db from "@/lib/db/drizzle";
import { reportersTable } from "@/lib/db/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface ReporterDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const reporters = await db.select().from(reportersTable);
  return reporters.map((reporter) => ({
    id: reporter.id.toString(),
  }));
}

export const metadata = {
  title: "Reporter Details",
  description: "View detailed information about a reporter",
};

export default async function ReporterDetailPage({ params }: ReporterDetailPageProps) {
  const { id } = await params;
  
  const result = await db
    .select()
    .from(reportersTable)
    .where(eq(reportersTable.id, parseInt(id, 10)));

  if (result.length === 0) {
    notFound();
  }

  const reporter = result[0];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        <Link href="/reporters" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Back to Reporters
        </Link>

        <div className="max-w-3xl">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="border-b border-gray-200 dark:border-gray-800">
              <CardTitle className="text-3xl text-black dark:text-white">{reporter.name}</CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-400">{reporter.specialty}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Years of Experience</h3>
                  <p className="text-2xl font-bold text-black dark:text-white">{reporter.yearsOfExperience}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Key Trait</h3>
                  <p className="text-lg text-black dark:text-gray-200">{reporter.keyTrait}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Notable Achievement</h3>
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{reporter.notableAchievement}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Reporting Style</h3>
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{reporter.styleDescription}</p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">Biography</h3>
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{reporter.biography}</p>
              </div>

              {reporter.createdAt && (
                <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-4">
                  Joined {new Date(reporter.createdAt).toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
