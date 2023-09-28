import { getUUID } from "@/utils/index";
import { PublicConfigType } from "../index.d";

// 图表初始配置(px)
export const componentInitConfig = {
	x: 0,
	y: 0,
	w: 100,
	h: 100,
};

//单实例类
export class PublicConfigClass implements PublicConfigType {
	//唯一标识
	public id = getUUID();
	// 基本信息
	public attr = { ...componentInitConfig, zIndex: -1 };
}
