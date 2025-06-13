import type { Polygon, PolygonPoint } from "@/types";

export function isPointInPolygon(
  point: PolygonPoint,
  polygon: Polygon,
): boolean {
  let crossCount = 0;
  for (
    let i = 0, j = polygon.points.length - 1;
    i < polygon.points.length;
    j = i++
  ) {
    const x1 = polygon.points[i].x,
      y1 = polygon.points[i].y;
    const x2 = polygon.points[j].x,
      y2 = polygon.points[j].y;

    // 선분이 수직선이면 m 계산 못하니까 별도 처리
    let crossPointY: number | null = null;

    if (x1 === x2) {
      // x가 같으면 같은 직선의 방정식임
      if (point.x === x1) {
        crossPointY = Math.min(y1, y2);
      }
      // x가 다르면? 영원히 만날일 없음. null 임
    } else {
      const m = (y2 - y1) / (x2 - x1);
      const b = y1 - m * x1;
      crossPointY = m * point.x + b;
    }

    if (
      crossPointY !== null &&
      isBetween(polygon.points[i], polygon.points[j], {
        x: point.x,
        y: crossPointY,
      }) &&
      crossPointY > point.y
    ) {
      crossCount++;
    }
  }
  return crossCount % 2 === 1;
}

export function isPointInPolygons(
  point: PolygonPoint,
  polygons: readonly Polygon[],
): { isIn: boolean; polygonIndex: number; polygon?: Polygon } {
  const polygon = polygons.find((polygon) => isPointInPolygon(point, polygon));
  return polygon
    ? { isIn: true, polygonIndex: polygons.indexOf(polygon), polygon }
    : { isIn: false, polygonIndex: -1 };
}

const isBetween = (p1: PolygonPoint, p2: PolygonPoint, p: PolygonPoint) => {
  const xInRange = p.x >= Math.min(p1.x, p2.x) && p.x <= Math.max(p1.x, p2.x);
  const yInRange = p.y >= Math.min(p1.y, p2.y) && p.y <= Math.max(p1.y, p2.y);

  return xInRange && yInRange;
};
