import { del, get, set } from "idb-keyval";
import { type _GettersTree, defineStore } from "pinia";
import type {
  Polygon,
  PolygonPoint,
  PolygonStoreActions,
  PolygonStoreState,
} from "@/schemas";

function toRawPolygons(polygons: Polygon[]): Polygon[] {
  return polygons.map((poly) => ({
    ...poly,
    points: poly.points.map((p) => ({ x: p.x, y: p.y })),
  }));
}

export const usePolygonStore = defineStore<
  "polygon",
  PolygonStoreState,
  _GettersTree<PolygonStoreState>,
  PolygonStoreActions
>("polygon", {
  state: () => ({
    polygons: [],
    currentPolygon: null,
    draggingPoint: null,
    draggingPointIndex: -1,
  }),
  actions: {
    async addPolygon(points: PolygonPoint[]) {
      this.polygons.push({ id: crypto.randomUUID(), points: [...points] });
      await set("polygons", toRawPolygons(this.polygons));
    },
    async removePolygon(index: number) {
      this.polygons.splice(index, 1);
      await set("polygons", toRawPolygons(this.polygons));
    },
    async clearAll() {
      this.polygons = [];
      this.clearCurrentPolygon();
      await del("polygons");
    },
    async loadPolygons() {
      const loaded = await get("polygons");
      console.log("loaded", loaded);
      if (loaded !== undefined) {
        this.polygons = loaded;
      } else {
        this.polygons = [];
      }
    },
    async clearPolygons() {
      this.polygons = [];
      this.clearCurrentPolygon();
      await del("polygons");
    },
    setCurrentPolygon(polygon: Polygon) {
      this.currentPolygon = polygon;
    },
    clearCurrentPolygon() {
      this.currentPolygon = null;
      this.clearDraggingPoint();
    },
    setPointToCurrentPolygon(point: PolygonPoint) {
      if (!this.currentPolygon) return;
      console.log("setPointToCurrentPolygon", point);
      this.currentPolygon.points.push(point);
      console.log("setPointToCurrentPolygon", this.currentPolygon.points);
    },
    setDraggingPoint(point: PolygonPoint) {
      if (!this.currentPolygon) return;
      this.draggingPoint = point;
      const idx = [...this.currentPolygon.points]
        .reverse()
        .findIndex((p) => p.x === point.x && p.y === point.y);
      this.draggingPointIndex =
        idx === -1 ? -1 : this.currentPolygon.points.length - 1 - idx;
    },
    mutateDraggingPoint(point: PolygonPoint) {
      if (!this.draggingPoint) return;
      this.draggingPoint.x = point.x;
      this.draggingPoint.y = point.y;
    },
    clearDraggingPoint() {
      this.draggingPoint = null;
      this.draggingPointIndex = -1;
    },
  },
});
