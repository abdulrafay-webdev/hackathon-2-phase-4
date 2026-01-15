import clsx from "clsx";

interface StatusBadgeProps {
  status: "pending" | "completed";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
        status === "completed"
          ? "bg-green-500/20 text-green-300 border border-green-500/30"
          : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
      )}
    >
      {status}
    </span>
  );
}
