import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	plugins: [
		vue(),
		AutoImport({
			imports: ["vue", "pinia", "vue-router", "@vueuse/core"], //自动导入
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			dirs: ["src/components"], //按需引入自定义组件
			resolvers: [ElementPlusResolver()], //按需引入ElementPlus组件
		}),
	],
	server: {
		port: 9393, //端口号
		host: true,
		open: false, //是否自动启动
		proxy: {
			"/api": {
				target: "127.0.0.1",
				changeOrigin: true, //是否跨域
				rewrite: (p) => p.replace(/^\/api/, "api"), //重写路径
			},
		},
	},
});
