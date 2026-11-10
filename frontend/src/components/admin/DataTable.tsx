"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EmptyState } from "./EmptyState";
import { Loader } from "./Loader";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

function alignClass(align?: Column<unknown>["align"]) {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}

function defaultCell<T>(row: T, key: string): ReactNode {
  const value = (row as unknown as Record<string, unknown>)[key];
  if (typeof value === "string" || typeof value === "number") return value;
  return null;
}

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  loading = false,
  emptyTitle = "Nothing here yet",
  emptyDescription,
  emptyIcon,
  className
}: {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: LucideIcon;
  className?: string;
}) {
  if (loading) return <Loader label="Loading records…" />;
  if (!rows.length) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-2xl border border-ink/10 bg-paper",
        className
      )}
    >
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 bg-paper-soft/70">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink/50",
                  alignClass(column.align),
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={getRowKey(row)}
              className="border-b border-ink/5 transition-colors last:border-0 hover:bg-paper-soft/50"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "px-4 py-3 align-middle text-ink/80",
                    alignClass(column.align),
                    column.className
                  )}
                >
                  {column.render ? column.render(row) : defaultCell(row, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
