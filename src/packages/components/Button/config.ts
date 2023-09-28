import { PublicConfigClass } from "@/packages/public/publicConfig";
import { ButtonInfo } from "./index";
import cloneDeep from "lodash/cloneDeep";
import { createCompotentType } from "@/packages/index.d";

export const option = {
	text: "按钮",
	attrs: {
		//组件的属性
		type: "primary",
		plain: true,
	},
};

export default class config implements createCompotentType {
	public componentInfo = cloneDeep(ButtonInfo);
	public componentConfig = {
		option: cloneDeep(option),
		...new PublicConfigClass(),
		title: "按钮",
	};
}
