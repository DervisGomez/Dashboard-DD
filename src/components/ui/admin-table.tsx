import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { ui } from "@/lib/ui-tokens";

export function AdminTable({
  children,
  className,
  minWidth = "720px",
}: {
  children: ReactNode;
  className?: string;
  minWidth?: string;
}) {
  return (
    <div className={cn(ui.surface, "overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-left"
          style={{ minWidth }}
        >
          {children}
        </table>
      </div>
    </div>
  );
}

export function AdminTableHead({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <thead className="sticky top-0 z-[1] border-b border-zinc-200/60 bg-zinc-50/90 backdrop-blur-md">
      {children}
    </thead>
  );
}

export function AdminTableHeadRow({
  children,
}: {
  children: ReactNode;
}) {
  return <tr>{children}</tr>;
}

export function AdminTableHeadCell({
  children,
  className,
  align = "left",
}: {
  children?: ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <th
      scope="col"
      className={cn(
        `
          h-10 px-4 text-[11px] font-medium tracking-wide
          text-zinc-500
          first:pl-5 last:pr-5
        `,
        align === "right" && "text-right",
        align === "center" && "text-center",
        className
      )}
    >
      {children}
    </th>
  );
}

export function AdminTableBody({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <tbody className="divide-y divide-zinc-100">{children}</tbody>
  );
}

export function AdminTableRow({
  children,
  className,
  onClick,
  onKeyDown,
  role,
  tabIndex,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTableRowElement>) => void;
  role?: string;
  tabIndex?: number;
}) {
  return (
    <tr
      className={cn(
        `
          group relative
          transition-colors duration-200 ease-out
          hover:bg-zinc-50/80
        `,
        ui.transition,
        className
      )}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
    >
      {children}
    </tr>
  );
}

export function AdminTableCell({
  children,
  className,
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <td
      className={cn(
        `
          h-[52px] px-4 align-middle text-sm text-zinc-700
          first:pl-5 last:pr-5
        `,
        align === "right" && "text-right",
        align === "center" && "text-center",
        className
      )}
    >
      {children}
    </td>
  );
}
