import { ButtonInfo } from "./components/Button/index";
import { TagInfo } from "./components/Tag/index";
import { SwitchInfo } from "./components/Switch/index";

import { PickComponentInfoType, componentInfoType } from "./index.d";

//组件数据
export const componentInfoData = [TagInfo, ButtonInfo, SwitchInfo];

//获取所有组件的index.vue文件
const indexModules: Record<string, { default: string }> = import.meta.glob(
	"./components/**/index.vue",
	{ eager: true }
);
//获取所有组件的config.vue文件
const configModules: Record<string, { default: string }> = import.meta.glob(
	"./components/**/config.vue",
	{ eager: true }
);

/**
 * 根据组件名称获取组件文件
 * @param componentName 组件名称
 */
const getComponent = (
	componentName: PickComponentInfoType<"fileMappingName">,
	type: string
) => {
	let module = indexModules;
	switch (type) {
		case "index":
			module = indexModules;
			break;
		case "config":
			module = configModules;
			break;
	}
	for (const key in module) {
		const urlSplit = key.split("/");
		if (urlSplit[urlSplit.length - 2] === componentName) {
			return module[key];
		}
	}
};

/**
 * 获取组件中的index.vue组件文件
 * @param componentInfo
 * @returns
 */
export const fetchComponent = (componentInfo: componentInfoType) => {
	const { fileMappingName } = componentInfo;
	return getComponent(fileMappingName, "index")?.default;
};

/**
 * 获取组件中的config.vue配置文件
 * @param componentInfo
 * @returns
 */
export const fetchComponentConfig = (componentInfo: componentInfoType) => {
	const { fileMappingName } = componentInfo;
	return getComponent(fileMappingName, "config")?.default;
};

/**
 * 获取组件实例信息
 * @param componentInfo
 * @returns
 */
export const createComponent = async (componentInfo: componentInfoType) => {
	const { fileMappingName } = componentInfo;
	const comp = await import(`./components/${fileMappingName}/config.ts`);
	return new comp.default(); //实例化config.ts的class类，获取组件的所有配置
};
