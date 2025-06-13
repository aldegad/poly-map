import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "@/assets/styles/main.css";
import App from "./App.vue";
import registerPrimevue from "./app/registerPrimevue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
registerPrimevue(app);

app.mount("#app");
