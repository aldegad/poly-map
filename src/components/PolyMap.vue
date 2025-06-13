<script setup lang="ts">
import Header from "./Header.vue";
import Layers from "./Layers.vue";
import PolyCanvas from "./PolyCanvas.vue";
import Toolbox from "./toolbox/Toolbox.vue";
</script>

<template>
  <div class="flex h-full w-full flex-col bg-slate-100">
    <Header />
    <div class="flex flex-1">
      <Toolbox />
      <PolyCanvas class="flex-1" />
      <Layers />
    </div>
  </div>
</template>
