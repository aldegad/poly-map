import { ref } from "vue";
import type PolyDrawer from "@/components/PolyDrawer.vue";

type PolyDrawerInstance = InstanceType<typeof PolyDrawer>;

export const usePolygonDrawer = () => {
  const drawerRef = ref<PolyDrawerInstance | null>(null);

  const clearDrawing = () => {
    // drawerRef.value?.clear();
  };

  return {
    drawerRef,
    clearDrawing,
  };
};
