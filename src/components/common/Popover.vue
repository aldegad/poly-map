<script setup lang="ts">
import { computed } from "vue";
import type { PopoverEmits, PopoverProps } from "@/schemas/components";
import { extractCoords } from "@/utils/extractCoords";

const props = defineProps<PopoverProps>();
const emits = defineEmits<PopoverEmits>();

const position = computed(() => {
  if (!props.event) return { x: 0, y: 0 };
  return extractCoords(props.event);
});

const handleClose = () => {
  emits("update:visible", false);
};
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="props.visible"
        class="fixed top-0 left-0 z-100 h-full w-full"
      >
        <div
          class="fixed top-0 left-0 z-1 h-full w-full"
          @click="handleClose"
        />
        <div
          class="fixed z-2 rounded-md border border-slate-200 bg-slate-50 p-1 shadow-md shadow-slate-100"
          :style="{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }"
        >
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>
