<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import { useCanvasStore } from "@/stores/canvasStore";
import type { CanvasState } from "@/types";
import { mapsTooltip } from "@/utils/maps";
import { freezedStoreRefs } from "@/utils/stores/freezedStoreRefs";
import { storeActions } from "@/utils/stores/storeActions";
import MapsContextMenu from "./MapsContextMenu.vue";

const c = useCanvasStore();
const { canvases } = freezedStoreRefs(c);
const { addCanvas, loadCanvases, removeCanvas } = storeActions(c);

const contextMenu = ref<InstanceType<typeof MapsContextMenu>>();
const handleAddMap = () => {
  addCanvas({
    name: "new-canvas-" + crypto.randomUUID(),
    blob: null,
    imageSrc: "",
    canvasWidth: 100,
    canvasHeight: 100,
    imageWidth: 100,
    imageHeight: 100,
  });
};

const handleRemoveMap = (event: MouseEvent, id: string) => {
  event.stopPropagation();
  removeCanvas(id);
};

const handleRightClick = (
  event: MouseEvent,
  canvas: CanvasState,
  index: number,
) => {
  contextMenu.value?.show(event, canvas, index);
};

onMounted(() => {
  loadCanvases();
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <div
      class="flex items-center justify-center rounded-md border border-slate-200 bg-slate-200 px-2 py-1 text-slate-500"
    >
      <span class="text-xs text-slate-500">Maps</span>
    </div>
    <div
      v-for="(canvas, index) of canvases"
      :key="canvas.id"
      @contextmenu="handleRightClick($event, canvas, index)"
      aria-haspopup="true"
      v-tooltip.right="mapsTooltip(canvas)"
      class="group relative flex min-h-8 cursor-pointer items-center justify-between gap-2 rounded-md border border-dashed border-slate-200 bg-slate-100 py-1 pr-1 pl-2 hover:bg-slate-200"
    >
      <span
        class="w-0 flex-1 overflow-hidden text-xs text-ellipsis whitespace-nowrap text-slate-500"
      >
        {{ canvas.name }}
      </span>
      <button
        class="hidden cursor-pointer flex-col items-center justify-center rounded-md border border-slate-100 bg-slate-200 px-0.5 py-0.5 group-hover:flex hover:bg-slate-300"
        @contextmenu.prevent
        @contextmenu.stop
        @click="handleRemoveMap($event, canvas.id)"
      >
        <Icon
          icon="lucide:x"
          class="h-4 w-4 text-slate-500"
        />
      </button>
    </div>
    <button
      class="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-200 bg-slate-100 px-2 py-1 hover:bg-slate-200"
      @click="handleAddMap"
    >
      <Icon
        icon="lucide:plus"
        class="text-slate-500"
      />
    </button>
  </div>
  <MapsContextMenu ref="contextMenu" />
</template>
