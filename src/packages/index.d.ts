//组件映射配置类型
export type componentInfoType = {
	fileMappingName: string; //组件文件映射名称，对应"@/packages/commponets/"目录下的文件夹名称
};

//组件公共配置 类型
export interface PublicConfigType {
	id: string;
	attr: {
		x: number;
		y: number;
		w: number;
		h: number;
		zIndex: number;
	};
}

//创建组件配置类型
export interface createCompotentType {
	componentInfo: componentInfoType;
	componentConfig: {
		option: any;
		[propName: string]: any;
	} & PublicConfigType;
}

// 获取组件实例类的某个key对应value类型的方法
export type PickCreateComponentType<T extends keyof createCompotentType> = Pick<
	createCompotentType,
	T
>[T];

// 获取组件实例类中componentConfig的某个key对应value类型的方法
export type PickComponentConfigType<
	T extends keyof PickCreateComponentType<"componentConfig">
> = Pick<PickCreateComponentType<"componentConfig">, T>[T];

// 获取组件实例类中componentInfo的某个key对应value类型的方法
export type PickComponentInfoType<
	T extends keyof PickCreateComponentType<"componentInfo">
> = Pick<PickCreateComponentType<"componentInfo">, T>[T];
