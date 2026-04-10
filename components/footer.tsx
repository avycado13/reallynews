import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface FooterProps {
  tags: { id: string | number; name: string; createdAt?: Date }[];
}

export function Footer({ tags }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-black dark:text-white mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/reporters"
                  className="hover:text-black dark:hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-black dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-black dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-black dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-black dark:hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-black dark:text-white mb-4">tags</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {tags.map((tag) => (
                <li key={tag.id}>{tag.name}</li>
              ))}
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
          © 2026 reallynews. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
