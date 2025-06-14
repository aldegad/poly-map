<script setup lang="ts">
import Popover from "../common/Popover.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import type {
  MapsMoreMenuEmits,
  MapsMoreMenuProps,
} from "@/schemas/components";
import { defaultRenamePopoverProps } from "@/schemas/components";
import type { ContextMenu } from "@/schemas/contextMenu";
import { useCanvasStore } from "@/stores/canvasStore";
import { storeActions } from "@/utils/stores";
import RenamePopover from "./RenamePopover.vue";

const props = defineProps<MapsMoreMenuProps>();
const emits = defineEmits<MapsMoreMenuEmits>();

const c = useCanvasStore();
const { renameCanvas, removeCanvas } = storeActions(c);

const renamePopoverData = ref(defaultRenamePopoverProps());

const menu = ref<ContextMenu[]>([
  {
    label: "rename",
    icon: "lucide:file-pen-line",
    onClick: () => {
      handleRename();
      emits("update:visible", false);
    },
  },
  {
    label: "delete",
    icon: "lucide:trash-2",
    onClick: () => {
      handleDelete();
      emits("update:visible", false);
    },
  },
]);

const handleClose = () => {
  emits("update:visible", false);
};

const handleRename = () => {
  if (!props.canvas) return;
  renamePopoverData.value = {
    visible: true,
    event: props.event,
    placeholder: props.canvas.name,
    value: "",
    canvas: props.canvas,
    canvasIndex: props.canvasIndex,
  };
};

const handleDelete = () => {
  if (!props.canvas) return;
  removeCanvas(props.canvas.id);
  emits("update:visible", false);
};

const handleUpdateCanvasName = (value: string) => {
  if (!renamePopoverData.value.canvas) return;
  renameCanvas(renamePopoverData.value.canvas.id, value);
};

const handleCloseRenamePopover = () => {
  renamePopoverData.value = defaultRenamePopoverProps();
};
</script>

<template>
  <Popover
    :visible="props.visible"
    :event="props.event"
    @update:visible="handleClose"
  >
    <div class="flex flex-col gap-1">
      <div
        v-for="item in menu"
        :key="item.label"
        class="flex flex-col gap-1"
      >
        <button
          class="flex h-6 items-center gap-2 border-0 bg-transparent p-2 hover:bg-slate-200"
          @click="item.onClick"
        >
          <Icon
            :icon="String(item.icon)"
            class="h-4 w-4 text-slate-500"
          />
          <label class="flex items-center text-xs text-slate-500">
            {{ item.label }}
          </label>
        </button>
      </div>
    </div>
  </Popover>
  <RenamePopover
    v-bind="renamePopoverData"
    @update:visible="handleCloseRenamePopover"
    @update:value="handleUpdateCanvasName"
  />
</template>
