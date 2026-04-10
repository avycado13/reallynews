import db from "@/lib/db/drizzle";
import { tagsTable } from "@/lib/db/schema";
import { Footer } from "@/components/footer";

export default async function Contact() {
  const tags = await db.select().from(tagsTable);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <div className="px-4 py-12 sm:px-6 lg:px-8 flex-1">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-black dark:text-white">Contact</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get in touch with us
          </p>
        </div>

        <section className="space-y-6 bg-gray-50 dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            We Don't Have a Contact Method
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Sorry, but we currently don't have a contact method available. We're a satire news organization, and we're still figuring out how to handle inquiries without being overwhelmed.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            If you have feedback, suggestions, or just want to tell us about a hilarious news story, we appreciate the thought, but you'll need to find another way to reach us.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Maybe check back later. Or don't. We're not your boss.
          </p>
        </section>
      </div>
      </div>
      <Footer tags={tags} />
    </div>
  );
}
