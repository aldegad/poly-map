import { del, get, set } from "idb-keyval";
import { toRaw } from "vue";
import { type _GettersTree, defineStore } from "pinia";
import type { CanvasStoreActions, CanvasStoreState } from "@/types";

export const useCanvasStore = defineStore<
  "canvas",
  CanvasStoreState,
  _GettersTree<CanvasStoreState>,
  CanvasStoreActions
>("canvas", {
  state: () => ({
    id: crypto.randomUUID(),
    canvases: [],
    currentCanvas: null,
  }),
  actions: {
    async addCanvas(canvas) {
      this.canvases.push({ ...canvas, id: crypto.randomUUID() });
      await set("canvases", toRaw(this.canvases));
    },
    async removeCanvas(id) {
      const idx = this.canvases.findIndex((c) => c.id === id);
      if (idx !== -1) {
        this.canvases.splice(idx, 1);
      }
      await set("canvases", toRaw(this.canvases));
    },
    async clearAll() {
      this.clearCanvases();
    },
    async loadCanvases() {
      const loaded = await get("canvases");
      if (loaded !== undefined) {
        this.canvases = loaded;
      } else {
        this.canvases = [];
      }
    },
    async clearCanvases() {
      this.canvases = [];
      this.currentCanvas = null;
      await del("canvases");
    },
    setCurrentCanvas(canvas) {
      this.currentCanvas = canvas;
    },
    clearCurrentCanvas() {
      this.currentCanvas = null;
    },
    async renameCanvas(id, name) {
      const canvas = this.canvases.find((c) => c.id === id);
      if (canvas) {
        canvas.name = name;
      }
      await set("canvases", toRaw(this.canvases));
    },
  },
});
