<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted } from "vue";
import { useCanvasStore } from "@/stores/canvasStore";
import { freezedStoreRefs } from "@/utils/stores/freezedStoreRefs";
import { storeActions } from "@/utils/stores/storeActions";

const c = useCanvasStore();
const { canvases } = freezedStoreRefs(c);
const { addCanvas, clearCanvases, removeCanvas } = storeActions(c);
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

onMounted(() => {
  clearCanvases();
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
      v-for="canvas of canvases"
      :key="canvas.id"
      class="flex items-center justify-between gap-2 rounded-md border border-dashed border-slate-200 bg-slate-100 py-1 pr-1 pl-2 hover:bg-slate-200"
    >
      <span
        class="w-0 flex-1 overflow-hidden text-xs text-ellipsis whitespace-nowrap text-slate-500"
      >
        {{ canvas.name }}
      </span>
      <button
        class="flex cursor-pointer flex-col items-center justify-center rounded-md border border-slate-200 bg-slate-200 px-1 py-1 hover:bg-slate-300"
        @click="handleRemoveMap($event, canvas.id)"
      >
        <Icon
          icon="lucide:x"
          class="text-slate-500"
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
</template>
