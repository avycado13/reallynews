import db from "@/lib/db/drizzle";
import { tagsTable } from "@/lib/db/schema";
import { Footer } from "@/components/footer";

export default async function PrivacyPolicy() {
  const tags = await db.select().from(tagsTable);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <div className="px-4 py-12 sm:px-6 lg:px-8 flex-1">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Privacy Matters™</h2>
          <p className="text-gray-700">
            We take your privacy very seriously. Like, we&apos;ve got it laminated
            on our office wall. Seriously. It&apos;s right next to the motivational
            poster of a cat hanging from a branch.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What We Collect</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Your data:</strong> All of it. Just kidding. Mostly just
              what&apos;s necessary to not crash our servers.
            </li>
            <li>
              <strong>Your IP address:</strong> So we know you&apos;re real and not
              a sentient potato.
            </li>
            <li>
              <strong>Cookies:</strong> The digital kind, not the delicious kind
              (we wish we had the delicious kind).
            </li>
            <li>
              <strong>Your reading habits:</strong> For science. And also so we
              can judge your taste in articles.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What We Do With Your Data</h2>
          <p className="text-gray-700">
            We use your data to improve your experience, fix bugs, and occasionally
            to make fun of people who search for weird things (internally, we promise).
          </p>
          <p className="text-gray-700">
            We will <strong>never</strong> sell your data to the highest bidder.
            We&apos;re not that kind of company. We&apos;d rather keep it and just
            feel guilty about it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Rights</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Right to know what we know about you</li>
            <li>Right to ask us to delete your data (we&apos;ll cry a little)</li>
            <li>Right to opt-out of being judged for your reading choices</li>
            <li>Right to ask why we didn&apos;t respond to your email (it was spam)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Security</h2>
          <p className="text-gray-700">
            We use industry-standard encryption and security practices. Our servers
            are protected by our aggressive golden retriever, Mr. Fluffington. He
            barks at anyone who looks suspicious (which is everyone).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
          <p className="text-gray-700">
            We reserve the right to change this policy whenever we feel like it.
            We&apos;ll try to email you, but no promises. Check back here
            occasionally, or just assume everything is fine (it probably is).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-gray-700">
            Have privacy concerns? Send us an email at privacy@reallynews.com and
            prepare to wait 6-8 weeks for a response (we&apos;re busy reading your
            data).
          </p>
          <p className="text-sm italic text-gray-500">
            Just kidding. We care about privacy. This whole page is a joke. Please
            don&apos;t sue us.
          </p>
        </section>
        </div>
        </div>
        <Footer tags={tags} />
        </div>
        );
        }
