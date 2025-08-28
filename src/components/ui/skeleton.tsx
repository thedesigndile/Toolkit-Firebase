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
    <div className="w-full h-52">
      <div className="animated-gradient-border-container h-full">
        <div className="animated-gradient-border-content flex flex-col h-full p-6">
          <div className="flex flex-col items-center text-center flex-1 justify-center space-y-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-5 w-24" />
            <div className="space-y-2 w-full max-w-32">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Skeleton, ToolCardSkeleton }
