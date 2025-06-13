<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import Button from "primevue/button";
import ContextMenu from "primevue/contextmenu";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import type { MenuItem } from "primevue/menuitem";
import { useCanvasStore } from "@/stores/canvasStore";
import type { CanvasState } from "@/types";
import { freezedStoreRefs } from "@/utils/stores/freezedStoreRefs";
import { storeActions } from "@/utils/stores/storeActions";

const cm = ref<InstanceType<typeof ContextMenu>>();
const menu = ref<MenuItem[]>([
  {
    label: "rename",
    icon: "lucide:file-pen-line",
    command: () => {
      handleRename();
    },
  },
]);

const c = useCanvasStore();
const rightClickIndex = ref<number | null>(null);
const renamingInput = ref<string>("");
const visible = ref(false);
const { canvases } = freezedStoreRefs(c);
const { addCanvas, loadCanvases, removeCanvas, renameCanvasByIndex } =
  storeActions(c);
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

const handleRightClick = (event: MouseEvent, index: number) => {
  rightClickIndex.value = index;
  cm.value?.show(event);
};

const handleRename = () => {
  if (rightClickIndex.value !== null) {
    visible.value = true;
    renamingInput.value = canvases.value[rightClickIndex.value].name;
    // renameCanvasByIndex(rightClickIndex.value, "new-name");
  }
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
      @contextmenu="handleRightClick($event, index)"
      aria-haspopup="true"
      v-tooltip.right="{
        value: canvas.name,
        showDelay: 1000,
        hideDelay: 300,
        pt: {
          arrow: {
            style: {
              borderRightColor: 'var(--p-slate-300)',
              marginLeft: 'var(--spacing)',
            },
          },
          text: 'text-xs text-slate-500 p-2 !bg-slate-300 ml-1',
        },
      }"
      class="group flex min-h-8 cursor-pointer items-center justify-between gap-2 rounded-md border border-dashed border-slate-200 bg-slate-100 py-1 pr-1 pl-2 hover:bg-slate-200"
    >
      <span
        class="w-0 flex-1 overflow-hidden text-xs text-ellipsis whitespace-nowrap text-slate-500"
      >
        {{ canvas.name }}
      </span>
      <button
        class="hidden cursor-pointer flex-col items-center justify-center rounded-md border border-slate-100 bg-slate-200 px-0.5 py-0.5 group-hover:flex hover:bg-slate-300"
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
  <ContextMenu
    ref="cm"
    :model="menu"
    class="!min-w-30"
  >
    <template #item="{ item }">
      <div class="flex w-auto cursor-pointer items-center gap-2 p-1">
        <Icon
          :icon="String(item.icon)"
          class="h-4 w-4 text-slate-500"
        />
        <label class="flex items-center text-xs text-slate-500">
          {{ item.label }}
        </label>
      </div>
    </template>
  </ContextMenu>
  <Dialog
    v-model:visible="visible"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 mb-8 block">
      Update your information.
    </span>
    <div class="mb-4 flex items-center gap-4">
      <label
        for="username"
        class="w-24 font-semibold"
      >
        Username
      </label>
      <InputText
        id="username"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="mb-8 flex items-center gap-4">
      <label
        for="email"
        class="w-24 font-semibold"
      >
        Email
      </label>
      <InputText
        id="email"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="visible = false"
      ></Button>
      <Button
        type="button"
        label="Save"
        @click="visible = false"
      ></Button>
    </div>
  </Dialog>
</template>
