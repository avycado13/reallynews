import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white">404</CardTitle>
          <CardDescription>Page Not Found</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex gap-3 pt-2">
            <Link href="/" className="flex-1">
              <Button className="w-full">Go Home</Button>
            </Link>
            <Link href="/articles" className="flex-1">
              <Button variant="outline" className="w-full">
                Browse Articles
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
