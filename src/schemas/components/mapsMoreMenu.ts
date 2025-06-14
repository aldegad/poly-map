import type { CanvasState } from "../stores/canvasStore";
import type { PopoverEmits, PopoverProps } from "./common";

export interface MapsMoreMenuProps extends PopoverProps {
  canvas: CanvasState | null;
  canvasIndex: number;
}
export interface MapsMoreMenuEmits extends PopoverEmits {}

export const defaultMapsMoreMenu = (): MapsMoreMenuProps => ({
  visible: false,
  event: null,
  canvas: null,
  canvasIndex: -1,
});
