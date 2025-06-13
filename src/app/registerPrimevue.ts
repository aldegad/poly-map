import type { App } from "vue";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{slate.50}",
      100: "{slate.100}",
      200: "{slate.200}",
      300: "{slate.300}",
      400: "{slate.400}",
      500: "{slate.400}",
      600: "{slate.600}",
      700: "{slate.700}",
      800: "{slate.800}",
      900: "{slate.900}",
      950: "{slate.950}",
    },
  },
});

export default function registerPrimevue(app: App) {
  app.use(PrimeVue, {
    theme: {
      preset,
    },
  });
  app.directive("tooltip", Tooltip);
}
