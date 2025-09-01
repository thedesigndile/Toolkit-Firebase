import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function ToolCardSkeleton() {
  return (
    <div className="w-full h-full">
        <div className="flex flex-col h-full p-6 border rounded-2xl items-center justify-center text-center space-y-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-5 w-24" />
            <div className="space-y-2 w-full max-w-32">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    </div>
  )
}

export { Skeleton, ToolCardSkeleton }
