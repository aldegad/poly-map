export interface CanvasStoreState {
  id: string; // uuid
  canvases: CanvasState[];
  currentCanvas: CanvasState | null;
}

export interface CanvasState {
  id: string; // uuid
  name: string;
  blob: Blob | null;
  imageSrc: string;
  canvasWidth: number;
  canvasHeight: number;
  imageWidth: number;
  imageHeight: number;
}

export interface CanvasStoreActions {
  addCanvas(canvas: Omit<CanvasState, "id">): Promise<void>;
  removeCanvas(id: string): Promise<void>;
  clearAll(): Promise<void>;
  loadCanvases(): Promise<void>;
  clearCanvases(): Promise<void>;
  setCurrentCanvas(canvas: CanvasState): void;
  clearCurrentCanvas(): void;
  renameCanvasByIndex(index: number, name: string): Promise<void>;
}

export type CanvasStore = CanvasStoreState & CanvasStoreActions;
