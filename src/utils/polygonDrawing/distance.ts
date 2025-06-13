import type { PolygonPoint } from "@/types";

export function distance(a: PolygonPoint, b: PolygonPoint) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
