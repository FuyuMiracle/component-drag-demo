import { PublicConfigClass } from "@/packages/public/publicConfig";
import { TagInfo } from "./index";
import cloneDeep from "lodash/cloneDeep";
import { createCompotentType } from "@/packages/index.d";

export const option = {
	text: "标签",
	attrs: {
		//组件的属性
		type: "primary",
		effect: "plain",
	},
};

export default class config implements createCompotentType {
	public componentInfo = cloneDeep(TagInfo);
	public componentConfig = {
		option: cloneDeep(option),
		...new PublicConfigClass(),
		title: "标签",
	};
}
