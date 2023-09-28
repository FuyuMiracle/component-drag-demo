import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; //持久化插件
import { App } from "vue";

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate); //使用插件持久化存储状态

export function setupStore(app: App<Element>) {
	app.use(pinia);
}

export default pinia;
