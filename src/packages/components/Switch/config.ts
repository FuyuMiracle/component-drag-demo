import { PublicConfigClass } from "@/packages/public/publicConfig";
import { SwitchInfo } from "./index";
import cloneDeep from "lodash/cloneDeep";
import { createCompotentType } from "@/packages/index.d";

export const option = {
	attrs: {
		//组件的属性
		value: true,
		size: "default",
	},
};

export default class config implements createCompotentType {
	public componentInfo = cloneDeep(SwitchInfo);
	public componentConfig = {
		option: cloneDeep(option),
		...new PublicConfigClass(),
		title: "开关",
	};
}
