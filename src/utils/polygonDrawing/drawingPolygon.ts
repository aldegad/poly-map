import type { PolygonPoint } from "@/types";

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
