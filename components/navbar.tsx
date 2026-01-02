'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/">
              <h1 className="text-3xl font-bold text-black dark:text-white cursor-pointer hover:opacity-80 transition-opacity">
                really<span className="text-blue-600">news</span>
              </h1>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your trusted source for breaking news
            </p>
          </div>

          {/* Navigation Links & Subscribe */}
          <div className="flex gap-4 items-center">
            <Link href="/articles">
              <Button
                variant={isActive("/articles") ? "default" : "ghost"}
                size="sm"
                className="hidden sm:inline-flex"
              >
                Articles
              </Button>
            </Link>
            <Link href="/reporters">
              <Button
                variant={isActive("/reporters") ? "default" : "ghost"}
                size="sm"
                className="hidden sm:inline-flex"
              >
                Reporters
              </Button>
            </Link>
            <Button size="sm" className="hidden sm:inline-flex">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search articles..."
            className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
          />
        </div>
      </div>
    </header>
  );
}
