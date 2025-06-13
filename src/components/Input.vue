<script setup lang="ts">
const model = defineModel<string | number>();
const props = defineProps<{
  type: "number" | "text";
}>();
</script>

<template>
  <div>
    <input
      :type="props.type"
      class="h-10 w-full rounded-md border border-gray-200 text-center"
      :value="model"
      @input="
        model =
          props.type === 'number'
            ? Number(($event.target as HTMLInputElement).value)
            : ($event.target as HTMLInputElement).value
      "
    />
  </div>
</template>
