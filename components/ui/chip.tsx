import { cn } from "@/lib/utils";

export function Chip({
  label,
  tone = "default"
}: {
  label: string;
  tone?: "default" | "warm" | "danger" | "success";
}) {
  const tones = {
    default: "bg-sand text-ink",
    warm: "bg-blush/35 text-ink",
    danger: "bg-[#f5d7d0] text-[#8f372c]",
    success: "bg-sage/25 text-moss"
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-medium tracking-[0.02em]",
        tones[tone]
      )}
    >
      {label}
    </span>
  );
}
