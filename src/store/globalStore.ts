import { useWindowSize } from "@vueuse/core";
import { defineStore } from "pinia";
import type { Ref } from "vue";
import {
	PickComponentConfigType,
	createCompotentType,
} from "@/packages/index.d";

interface State {
	windowWidth: Ref<number>;
	windowHeight: Ref<number>;
	componentList: Array<createCompotentType>;
	targetComponent: {
		selectId: string;
	};
	containerConfig: {
		width: number;
		height: number;
		backgroundColor: string;
	};
}

export const useGlobalStore = defineStore("globalStore", {
	state: (): State => {
		return {
			windowWidth: useWindowSize().width, // 窗口实时宽度
			windowHeight: useWindowSize().height, // 窗口实时高度
			componentList: [], //组件数据
			targetComponent: {
				// 目标图表(即当前选中的图表)
				selectId: "",
			},
			containerConfig: {
				//容器配置（即layout中的Content）
				width: 800,
				height: 500,
				backgroundColor: "#eee",
			},
		};
	},
	getters: {
		getWindowWidth: (state) => {
			return state.windowWidth;
		},
		getWindowHeight: (state) => {
			return state.windowHeight;
		},
		getComponentList: (state) => {
			return state.componentList;
		},
		getTargetComponent: (state) => {
			return state.targetComponent;
		},
		getContainerConfig: (state) => {
			return state.containerConfig;
		},
	},
	actions: {
		/**
		 * * 新增组件列表
		 * @param componentInstance 新增图表实例
		 */
		addComponentList(componentInstance: any) {
			this.componentList.unshift(componentInstance);
		},
		setTargetComponentSelectId(id: string) {
			this.targetComponent.selectId = id;
		},
		getComponentById(
			id: PickComponentConfigType<"id">
		): createCompotentType | null {
			let result = null;
			for (let i = 0; i < this.componentList.length; i++) {
				const item = this.componentList[i];
				if (item.componentConfig.id === id) {
					return item;
				}
			}
			return result;
		},
	},
	persist: {
		//部分持久化
		key: "globalStore", //缓存key
		storage: window.sessionStorage, //缓存方式
		// 部分持久化状态的点符号路径数组，默认持久化所有数据
		paths: ["token", "userInfo"], //持久化windowHeight 字段
	},
});
