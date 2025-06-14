<script setup lang="ts">
import Popover from "../common/Popover.vue";
import { ref } from "vue";
import type {
  RenamePopoverEmits,
  RenamePopoverProps,
} from "@/schemas/components";

const props = defineProps<RenamePopoverProps>();
const emits = defineEmits<RenamePopoverEmits>();

const input = ref("");

const handleRename = () => {
  emits("update:value", input.value);
  emits("update:visible", false);
};
</script>

<template>
  <Popover
    :visible="props.visible"
    :event="props.event"
    @update:visible="emits('update:visible', false)"
  >
    <div class="flex flex-col gap-1">
      <input
        :placeholder="props.placeholder"
        v-model="input"
        class="w-40"
      />
      <button @click="handleRename">rename</button>
    </div>
  </Popover>
</template>
