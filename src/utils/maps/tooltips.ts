import type { CanvasState } from "@/schemas/stores/canvasStore";

export const mapsTooltip = (canvas: CanvasState) => {
  return {
    value: canvas.name,
    showDelay: 1000,
    hideDelay: 300,
    pt: {
      arrow: {
        style: {
          borderRightColor: "var(--p-slate-300)",
          marginLeft: "var(--spacing)",
        },
      },
      text: "text-xs text-slate-500 p-2 !bg-slate-300 ml-1",
    },
  };
};
