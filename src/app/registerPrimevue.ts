import type { App } from "vue";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import Aura from "@primeuix/themes/aura";

export default function registerPrimevue(app: App) {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  });
  app.directive("tooltip", Tooltip);
}
