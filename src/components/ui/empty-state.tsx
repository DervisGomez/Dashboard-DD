import { Inbox } from "lucide-react";

import { Surface } from "@/components/ui/surface";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <Surface
      className="
        flex flex-col items-center justify-center
        border-dashed px-8 py-14 text-center
      "
    >
      <div
        className="
          mb-4 flex h-11 w-11 items-center justify-center
          rounded-full bg-zinc-100 text-zinc-400
          ring-1 ring-zinc-950/[0.04]
        "
      >
        <Inbox size={20} strokeWidth={1.75} />
      </div>

      <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
        {title}
      </h3>

      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-500">
        {description}
      </p>
    </Surface>
  );
}
