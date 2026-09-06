export const peso = (n) =>
  "₱" + Math.abs(n).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
}
