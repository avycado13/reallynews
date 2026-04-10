import db from "@/lib/db/drizzle";
import { tagsTable } from "@/lib/db/schema";
import { Footer } from "@/components/footer";

export default async function TermsOfService() {
  const tags = await db.select().from(tagsTable);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <div className="px-4 py-12 sm:px-6 lg:px-8 flex-1">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Welcome to Really News</h2>
          <p className="text-gray-700">
            By using this website, you agree to these terms. If you don&apos;t agree,
            please leave now. We won&apos;t be offended. Well, maybe a little.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Use License</h2>
          <p className="text-gray-700">
            Permission is granted to temporarily download one copy of the materials
            (information or software) on Really News for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a transfer
            of title, and under this license you may not:
          </p>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>Modify or copy the materials</li>
            <li>
              Use the materials for any commercial purpose or for any public
              display (commercial or non-commercial)
            </li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or other proprietary notations</li>
            <li>
              Transfer the materials to another person or &quot;mirror&quot; the materials
              on any other server (unless we&apos;re having a really good day)
            </li>
            <li>Use a bot to scrape our content (honestly, it&apos;s annoying)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Disclaimer</h2>
          <p className="text-gray-700">
            The materials on Really News are provided on an &apos;as is&apos; basis. Really
            News makes no warranties, expressed or implied, and hereby disclaims
            and negates all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a particular
            purpose, or non-infringement of intellectual property or other
            violation of rights.
          </p>
          <p className="text-gray-700">
            We do our best, but the internet is chaotic. We&apos;re like that friend
            who tries really hard but sometimes forgets to send the group text.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Limitations</h2>
          <p className="text-gray-700">
            In no event shall Really News or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the materials on Really News, even if Really News or
            an authorized representative has been notified orally or in writing of
            the possibility of such damage.
          </p>
          <p className="text-gray-700">
            Basically, don&apos;t blame us if something goes wrong. We&apos;re doing our best.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Accuracy of Materials</h2>
          <p className="text-gray-700">
            The materials appearing on Really News could include technical,
            typographical, or photographic errors. Really News does not warrant that
            any of the materials on Really News are accurate, complete, or current.
            Really News may make changes to the materials contained on its website
            at any time without notice.
          </p>
          <p className="text-gray-700">
            We read the news and try to cover it accurately, but sometimes we
            misquote things. Or our keyboard autocorrects to something weird. It
            happens.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Links</h2>
          <p className="text-gray-700">
            Really News has not reviewed all of the sites linked to its website and
            is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by Really News of the
            site. Use of any such linked website is at the user&apos;s own risk.
          </p>
          <p className="text-gray-700">
            We linked it, but we don&apos;t necessarily endorse the author&apos;s other
            opinions about conspiracy theories or their hot takes on movies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Modifications</h2>
          <p className="text-gray-700">
            Really News may revise these terms of service for its website at any
            time without notice. By using this website, you are agreeing to be
            bound by the then current version of these terms of service.
          </p>
          <p className="text-gray-700">
            We&apos;ll probably update this page eventually. Maybe we&apos;ll tell you.
            Maybe we won&apos;t. It&apos;s the fun of the internet.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Governing Law</h2>
          <p className="text-gray-700">
            These terms and conditions are governed by and construed in accordance
            with the laws of the jurisdiction where Really News operates, and you
            irrevocably submit to the exclusive jurisdiction of the courts in that
            location.
          </p>
          <p className="text-gray-700">
            In other words: don&apos;t sue us. But if you do, we&apos;ll see you in court
            (and we&apos;re bringing our lawyer&apos;s dog).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Prohibited Behavior</h2>
          <p className="text-gray-700">You agree that you will not:</p>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>Post spoilers without warning (okay, this one&apos;s just for fun)</li>
            <li>Be mean to our customer service team (they&apos;re trying their best)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms of Service, please contact
            us at legal@reallynews.com. We&apos;ll get back to you in 6-8 weeks (or
            never, whichever comes first).
          </p>
          <p className="text-sm italic text-gray-500">
            We&apos;re just kidding. We care about our users and take these terms
            seriously. Mostly. Well, some of us do.
          </p>
        </section>
        </div>
        </div>
        <Footer tags={tags} />
        </div>
        );
        }
