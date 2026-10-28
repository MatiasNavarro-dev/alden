import { avatarColor, getInitials } from "@/lib/ui";

export function OperatorAvatar({
  id,
  name,
  size = "md",
  online,
}: {
  id: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  online?: boolean;
}) {
  const sizes = {
    sm: "h-10 w-10 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-16 w-16 text-lg",
  };

  return (
    <div className="relative shrink-0">
      <div
        className={`flex items-center justify-center rounded-full font-bold text-white ${sizes[size]}`}
        style={{ backgroundColor: avatarColor(id) }}
      >
        {getInitials(name)}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
      )}
    </div>
  );
}
