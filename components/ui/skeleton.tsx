import { cn } from "@/lib/utils";

function Skeleton({
 className,
 ...props
}: React.HTMLAttributes<HTMLDivElement>) {
 return (
  <div
   className={cn("animate-pulse rounded-md bg-muted", className)} // Pastikan ada bg-muted atau bg-gray-200
   {...props}
  />
 );
}

export { Skeleton };
