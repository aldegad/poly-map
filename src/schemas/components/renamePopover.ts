import type { CanvasState } from "../stores";
import type { PopoverEmits, PopoverProps } from "./common";

export interface RenamePopoverProps extends PopoverProps {
  placeholder: string;
  canvas: CanvasState | null;
  canvasIndex: number;
  value: string;
}

export interface RenamePopoverEmits extends PopoverEmits {
  "update:value": [value: string];
}

export const defaultRenamePopoverProps = (): RenamePopoverProps => ({
  visible: false,
  event: null,
  placeholder: "",
  value: "",
  canvas: null,
  canvasIndex: -1,
});
