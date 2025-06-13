import { del, get, set } from "idb-keyval";
import { defineStore } from "pinia";

interface CanvasStore {
  name: string;
  blob: Blob | null;
  imageSrc: string;
  canvasWidth: number;
  canvasHeight: number;
  imageWidth: number;
  imageHeight: number;
}

export const useCanvasStore = defineStore("canvas", {
  state: (): CanvasStore => ({
    name: "",
    blob: null,
    imageSrc: "",
    canvasWidth: 640,
    canvasHeight: 640,
    imageWidth: 0,
    imageHeight: 0,
  }),
  actions: {
    async saveCanvas({
      name,
      blob,
      canvasWidth,
      canvasHeight,
      imageWidth,
      imageHeight,
    }: {
      name: string;
      blob: Blob;
      canvasWidth: number;
      canvasHeight: number;
      imageWidth: number;
      imageHeight: number;
    }) {
      this.name = name;
      this.blob = blob;
      this.imageSrc = URL.createObjectURL(blob);
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.imageWidth = imageWidth;
      this.imageHeight = imageHeight;
      await set("tempCanvas", {
        name,
        blob,
        canvasWidth,
        canvasHeight,
        imageWidth,
        imageHeight,
      });
    },
    async loadCanvas() {
      const tempCanvas = await get("tempCanvas");
      if (tempCanvas) {
        this.name = tempCanvas.name;
        this.blob = tempCanvas.blob;
        this.imageSrc = URL.createObjectURL(tempCanvas.blob);
        this.canvasWidth = tempCanvas.canvasWidth;
        this.canvasHeight = tempCanvas.canvasHeight;
        this.imageWidth = tempCanvas.imageWidth;
        this.imageHeight = tempCanvas.imageHeight;
      }
    },
    async clearCanvas() {
      this.name = "";
      this.blob = null;
      this.imageSrc = "";
      this.canvasWidth = 640;
      this.canvasHeight = 640;
      this.imageWidth = 0;
      this.imageHeight = 0;
      await del("tempCanvas");
    },
  },
});
