import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/assets/styles/main.css";
import App from "./App.vue";
import { registerPreventContextMenu } from "./app/prevetContext";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
registerPreventContextMenu();

app.mount("#app");
