<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import Button from "primevue/button";
import ContextMenu from "primevue/contextmenu";
import InputText from "primevue/inputtext";
import type { MenuItem } from "primevue/menuitem";
import Popover from "primevue/popover";
import { useCanvasStore } from "@/stores/canvasStore";
import type { CanvasState } from "@/types";
import { storeActions } from "@/utils/stores/storeActions";

const contextMenu = ref<InstanceType<typeof ContextMenu>>();
const parentEvent = ref<MouseEvent | null>(null);
const canvas = ref<CanvasState | null>(null);
const index = ref<number | null>(null);
const renamePopover = ref<InstanceType<typeof Popover>>();
const renamePopoverData = ref<{ placeholder: string; input: string }>({
  placeholder: "",
  input: "",
});

const c = useCanvasStore();
const { renameCanvas } = storeActions(c);

const menu = ref<MenuItem[]>([
  {
    label: "rename",
    icon: "lucide:file-pen-line",
    command: () => {
      handleRename();
    },
  },
]);

const handleRename = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  if (index.value !== null && parentEvent.value !== null) {
    renamePopoverData.value.placeholder = canvas.value?.name ?? "";
    console.log(parentEvent.value);
    renamePopover.value?.toggle(parentEvent.value, parentEvent.value.target);
  }
};

const handleRenameSave = () => {
  if (canvas.value?.id !== undefined && renamePopoverData.value.input !== "") {
    renameCanvas(canvas.value.id, renamePopoverData.value.input);
    renamePopover.value?.hide();
  }
};

defineExpose({
  show: (event: MouseEvent, _canvas: CanvasState, _index: number) => {
    parentEvent.value = event;
    index.value = _index;
    canvas.value = _canvas;
    contextMenu.value?.show(event);
  },
});
</script>

<template>
  <div>
    <ContextMenu
      ref="contextMenu"
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
    <Popover
      ref="renamePopover"
      placement="right"
    >
      <div class="flex flex-col gap-2">
        <InputText
          :placeholder="renamePopoverData.placeholder"
          v-model="renamePopoverData.input"
          class="!border-slate-300 !px-2 !py-1 !text-sm focus:!border-slate-300"
        />
        <Button
          label="Save"
          class="!px-2 !py-1 !text-sm"
          @click="handleRenameSave"
        />
      </div>
    </Popover>
  </div>
</template>
