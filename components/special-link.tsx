"use client";
import { ArticleSelect } from "@/lib/types";
import Link from "next/link";

export async function SpecialLink({ article }: { article: ArticleSelect & { reporterName: string | null } }) {
  return (
    <Link
      href={`/reporters/${article.reporterId}`}
      className="text-blue-600 dark:text-blue-400 hover:underline"
      onClick={(e) => e.stopPropagation()}
    >
      By {article.reporterName}
    </Link>
  );
}
