<script setup lang="ts">
import BluePrints from "./BluePrints.vue";
import Maps from "./Maps.vue";
import Tools from "./Tools.vue";
</script>

<template>
  <div class="flex h-full bg-slate-50 p-2">
    <div class="flex flex-col gap-2">
      <Tools />
      <BluePrints />
      <Maps />
    </div>
  </div>
</template>
