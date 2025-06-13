import type { PolygonPoint } from "@/types";

export function movePointTogether(
  points: PolygonPoint[],
  idx: number,
  newX: number,
  newY: number,
) {
  if (
    points.length > 2 &&
    Math.abs(points[0].x - points[points.length - 1].x) < 1e-6 &&
    Math.abs(points[0].y - points[points.length - 1].y) < 1e-6
  ) {
    if (idx === 0) {
      points[0].x = newX;
      points[0].y = newY;
      points[points.length - 1].x = newX;
      points[points.length - 1].y = newY;
      return;
    }
    if (idx === points.length - 1) {
      points[0].x = newX;
      points[0].y = newY;
      points[points.length - 1].x = newX;
      points[points.length - 1].y = newY;
      return;
    }
  }
  points[idx].x = newX;
  points[idx].y = newY;
}
