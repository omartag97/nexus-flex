import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight">
          nexus<span className="text-blue-500">movies</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Discover and explore movies with advanced search and filtering
        </p>
        <Link href="/movies">
          <Button size="lg">Browse Movies</Button>
        </Link>
      </div>
    </main>
  );
}
