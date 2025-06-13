<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="flex flex-col gap-1">
    <div
      class="flex items-center justify-center rounded-md border border-slate-200 bg-slate-200 px-2 py-1 text-slate-500"
    >
      <span class="text-xs text-slate-500">Tools</span>
    </div>
    <div
      class="grid grid-cols-2 gap-2 rounded-md border border-dashed border-slate-200 bg-slate-100 p-2"
    >
      <button
        class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-200"
      >
        <Icon
          icon="lucide:mouse-pointer-2"
          class="text-slate-800"
        />
      </button>
      <button
        class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-200"
      >
        <Icon
          icon="lucide:hand"
          class="text-slate-800"
        />
      </button>
      <button
        class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-200"
      >
        <Icon
          icon="lucide:pen-tool"
          class="text-slate-800"
        />
      </button>
      <button
        class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-200"
      >
        <Icon
          icon="lucide:square"
          class="text-slate-800"
        />
      </button>
      <button
        class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-200"
      >
        <Icon
          icon="lucide:circle"
          class="text-slate-800"
        />
      </button>
    </div>
  </div>
</template>
