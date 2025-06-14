<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Tool } from "@/schemas/tools";

const tools: Tool[] = [
  {
    name: "Pointer",
    icon: "lucide:mouse-pointer-2",
  },
  {
    name: "Hand",
    icon: "lucide:hand",
  },
  {
    name: "Pen Tool",
    icon: "lucide:pen-tool",
  },
  {
    name: "Square",
    icon: "lucide:square",
  },
  {
    name: "Circle",
    icon: "lucide:circle",
  },
];
</script>

<template>
  <div class="flex flex-col gap-1">
    <div
      class="flex items-center justify-center rounded-md border border-slate-200 bg-slate-200 px-2 py-1 text-slate-500"
    >
      <span class="text-xs text-slate-500">Tools</span>
    </div>
    <div
      class="grid grid-cols-3 gap-2 rounded-md border border-dashed border-slate-200 bg-slate-100 p-2"
    >
      <button
        v-for="tool in tools"
        :key="tool.icon"
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-slate-200 hover:bg-slate-300"
      >
        <Icon
          :icon="tool.icon"
          class="text-slate-800"
        />
      </button>
    </div>
  </div>
</template>
