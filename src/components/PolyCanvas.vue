<script setup lang="ts">
/* import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { usePolygonDrawer } from "@/composables/usePolygonDrawer";
import { useCanvasStore } from "@/stores/canvasStore";
import { getImageFileInfo } from "@/utils/getImageFileInfo";
import Input from "./Input.vue";
import PolyDrawer from "./PolyDrawer.vue";

const canvasStore = useCanvasStore();
const { name, imageSrc, canvasWidth, canvasHeight } = storeToRefs(canvasStore);
const { clearDrawing, drawerRef } = usePolygonDrawer();

const resizing = ref<"none" | "horizontal" | "vertical">("none");
const startX = ref(0);
const startY = ref(0);
const startWidth = ref(0);
const startHeight = ref(0);

const handleImageChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    clearDrawing();
    const { name, blob, width, height } = await getImageFileInfo(file);
    await canvasStore.saveCanvas({
      name,
      blob,
      canvasWidth: width,
      canvasHeight: height,
      imageWidth: width,
      imageHeight: height,
    });
  }
  (event.target as HTMLInputElement).value = "";
};

const handleClear = () => {
  canvasStore.clearCanvas();
  clearDrawing();
};

function handleResizeHStart(e: MouseEvent) {
  resizing.value = "horizontal";
  startX.value = e.clientX;
  startWidth.value = canvasWidth.value;
  window.addEventListener("mousemove", handleResizeHMove);
  window.addEventListener("mouseup", handleResizeHEnd);
}

function handleResizeHMove(e: MouseEvent) {
  if (resizing.value !== "horizontal") return;
  const diff = e.clientX - startX.value;
  canvasWidth.value = Math.max(100, startWidth.value + diff);
}

function handleResizeHEnd() {
  resizing.value = "none";
  window.removeEventListener("mousemove", handleResizeHMove);
  window.removeEventListener("mouseup", handleResizeHEnd);
}

function handleResizeVStart(e: MouseEvent) {
  resizing.value = "vertical";
  startY.value = e.clientY;
  startHeight.value = canvasHeight.value;
  window.addEventListener("mousemove", handleResizeVMove);
  window.addEventListener("mouseup", handleResizeVEnd);
}

function handleResizeVMove(e: MouseEvent) {
  if (resizing.value !== "vertical") return;
  const diff = e.clientY - startY.value;
  canvasHeight.value = Math.max(100, startHeight.value + diff);
}

function handleResizeVEnd() {
  resizing.value = "none";
  window.removeEventListener("mousemove", handleResizeVMove);
  window.removeEventListener("mouseup", handleResizeVEnd);
}

onMounted(async () => {
  await canvasStore.loadCanvas();
}); */
</script>

<template>
  <div></div>
  <!-- <div class="flex flex-col items-center justify-center gap-2">
    <div class="flex w-full items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <button
          class="bg-primary-500 relative h-10 overflow-hidden rounded-md px-3 text-white"
        >
          도면 업로드
          <input
            type="file"
            class="absolute top-0 left-0 h-full w-full opacity-0"
            @change="handleImageChange"
          />
        </button>
        <p class="text-slate-800">{{ name }}</p>
      </div>
      <button
        class="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-white p-0 text-black"
        @click="handleClear"
      >
        <Icon
          icon="lucide:x"
          class="h-5 w-5 text-slate-500"
        />
      </button>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-1 flex-row">
        <PolyDrawer
          ref="drawerRef"
          :imageSrc="imageSrc"
          :canvasWidth="canvasWidth"
          :canvasHeight="canvasHeight"
        />
        <div
          class="flex w-4 flex-1 cursor-ew-resize items-center justify-center bg-slate-300"
          @mousedown="handleResizeHStart"
        >
          <Icon
            icon="lucide:equal"
            class="h-4 w-4 rotate-90 text-slate-50"
          />
        </div>
      </div>
      <div class="flex h-4 w-full">
        <div
          class="flex flex-1 cursor-ns-resize items-center justify-center bg-slate-300"
          @mousedown="handleResizeVStart"
        >
          <Icon
            icon="lucide:equal"
            class="h-4 w-4 text-slate-50"
          />
        </div>
        <div
          class="flex h-4 w-4 items-center justify-center border-t border-l border-dotted border-slate-200 bg-slate-300"
        >
          <Icon
            icon="lucide:equal"
            class="h-4 w-4 rotate-135 text-slate-50"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center gap-2">
      <label>width * height</label>
      <div class="flex gap-2">
        <Input
          class="w-20"
          type="number"
          v-model="canvasWidth"
        />
        <span>x</span>
        <Input
          class="w-20"
          type="number"
          v-model="canvasHeight"
        />
      </div>
    </div>
  </div> -->
</template>
