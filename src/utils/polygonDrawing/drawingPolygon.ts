import type { PolygonPoint } from "@/schemas/stores/polygonStore";

export function drawingPolygonStart(
  setCurrentPolygon: (points: PolygonPoint[]) => void,
  setDraggingPoint: (point: PolygonPoint) => void,
  setDraggingPointIndex: (index: number) => void,
  newPoint: PolygonPoint,
) {
  setCurrentPolygon([newPoint]);
  setDraggingPoint(newPoint);
  setDraggingPointIndex(0);
}
