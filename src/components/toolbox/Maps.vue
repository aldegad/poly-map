<script setup lang="ts">
import { Icon } from "@iconify/vue";

const handleAddMap = () => {
  console.log("add map");
};
</script>

<template>
  <div class="flex flex-col gap-1">
    <div
      class="flex items-center justify-center rounded-md border border-slate-200 bg-slate-200 px-2 py-1 text-slate-500"
    >
      <span class="text-xs text-slate-500">Maps</span>
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
