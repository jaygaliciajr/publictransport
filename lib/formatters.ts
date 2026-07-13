export function formatPoints(points: number) {
  return new Intl.NumberFormat("en-PH").format(points);
}

export function formatKg(value: number) {
  return `${value.toFixed(1)}kg`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function progressPercent(current: number, min: number, max: number) {
  if (max <= min) return 100;
  return Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100));
}
