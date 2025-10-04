import { Skeleton } from "@/shared/components/ui/Skeleton";

export default function MovieCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      <Skeleton className="h-64 w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
