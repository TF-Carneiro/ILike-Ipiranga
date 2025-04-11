import { Skeleton } from "@/components/ui/skeleton"

export function CalendarioSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="grid grid-cols-[100px_repeat(4,1fr)] gap-2">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />

        {Array.from({ length: 10 }).map((_, i) => (
          <>
            <Skeleton key={`hora-skeleton-${i}`} className="h-10" />
            <Skeleton key={`slot-skeleton-${i}-1`} className="h-16" />
            <Skeleton key={`slot-skeleton-${i}-2`} className="h-16" />
            <Skeleton key={`slot-skeleton-${i}-3`} className="h-16" />
            <Skeleton key={`slot-skeleton-${i}-4`} className="h-16" />
          </>
        ))}
      </div>
    </div>
  )
}
