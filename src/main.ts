import { createApp } from "vue";

import App from "./App.vue";
import "@/styles/global.scss";
import { setupStore } from "./store";

const app = createApp(App);
setupStore(app);

app.mount("#app");
