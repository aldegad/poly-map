<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import {
  type MapsMoreMenuProps,
  defaultMapsMoreMenu,
} from "@/schemas/components";
import type { CanvasState } from "@/schemas/stores/canvasStore";
import { useCanvasStore } from "@/stores/canvasStore";
import { freezedStoreRefs } from "@/utils/stores/freezedStoreRefs";
import { storeActions } from "@/utils/stores/storeActions";
import MapsMoreMenu from "./MapsMoreMenu.vue";

const c = useCanvasStore();
const { canvases } = freezedStoreRefs(c);
const { addCanvas, loadCanvases } = storeActions(c);

const moreMenu = ref<MapsMoreMenuProps>(defaultMapsMoreMenu());
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

const handleMoreClick = (
  event: MouseEvent,
  canvas: CanvasState,
  index: number,
) => {
  moreMenu.value = {
    visible: true,
    event,
    canvas,
    canvasIndex: index,
  };
};

const handleCloseMoreMenu = () => {
  moreMenu.value = defaultMapsMoreMenu();
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
      aria-haspopup="true"
      class="group relative flex min-h-8 cursor-pointer items-center justify-between gap-2 rounded-md border border-dashed border-slate-200 bg-slate-100 py-1 pr-1 pl-2 hover:bg-slate-200"
    >
      <span
        class="w-0 flex-1 overflow-hidden text-xs text-ellipsis whitespace-nowrap text-slate-500"
      >
        {{ canvas.name }}
      </span>
      <button
        class="hidden h-5 w-5 cursor-pointer flex-col items-center justify-center rounded-md border border-slate-100 bg-slate-200 p-0 group-hover:flex hover:bg-slate-300"
        :class="{
          '!flex': moreMenu.visible && moreMenu.canvasIndex === index,
        }"
        @click="handleMoreClick($event, canvas, index)"
      >
        <Icon
          icon="lucide:ellipsis-vertical"
          class="h-3.5 w-3.5 text-slate-500"
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
  <MapsMoreMenu
    v-bind="moreMenu"
    @update:visible="handleCloseMoreMenu"
  />
</template>
