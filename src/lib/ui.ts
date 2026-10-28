const AVATAR_COLORS = [
  "#3730A3",
  "#2563EB",
  "#0D9488",
  "#DB2777",
  "#7C3AED",
  "#EA580C",
];

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function avatarColor(id: string): string {
  let hash = 0;
  for (const c of id) hash = (hash + c.charCodeAt(0)) % 997;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export function firstName(name: string): string {
  return name.split(" ")[0] ?? name;
}
