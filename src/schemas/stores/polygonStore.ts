export interface PolygonPoint {
  x: number;
  y: number;
}

export interface Polygon {
  id: string; // uuid
  points: PolygonPoint[];
}

export interface PolygonStoreState {
  polygons: Polygon[];
  currentPolygon: Polygon | null;
  draggingPoint: PolygonPoint | null;
  draggingPointIndex: number;
}

export interface PolygonStoreActions {
  addPolygon(points: PolygonPoint[]): Promise<void>;
  removePolygon(index: number): Promise<void>;
  clearAll(): Promise<void>;
  loadPolygons(): Promise<void>;
  clearPolygons(): Promise<void>;
  setCurrentPolygon(polygon: Polygon): void;
  clearCurrentPolygon(): void;
  setPointToCurrentPolygon(point: PolygonPoint): void;
  setDraggingPoint(point: PolygonPoint): void;
  mutateDraggingPoint(point: PolygonPoint): void;
  clearDraggingPoint(): void;
}

export type PolygonStore = PolygonStoreState & PolygonStoreActions;
