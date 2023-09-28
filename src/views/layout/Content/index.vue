<template>
	<div class="content">
		<div
			id="container"
			@drop="dropHandle"
			@dragover="dragoverHandle"
			@dragenter="dragoverHandle"
			@mousedown="cancelSelectedHandle"
		>
			<div
				v-for="item in globalStore.getComponentList"
				:key="item.componentConfig.id"
				@click="selectedHandle($event, item)"
				@mousedown="mouseDownHandle($event, item)"
			>
				<component
					class="component"
					:is="fetchComponent(item.componentInfo)"
					:option="item.componentConfig.option"
					:style="{
						...useComponentStyle(item.componentConfig.attr),
					}"
				></component>
				<div
					class="selected-modal"
					:style="{ ...useSelectedComponentModelStyle }"
				></div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { createComponent, fetchComponent } from "@/packages/index";
import { useGlobalStore } from "@/store/globalStore";
import {
	PickComponentConfigType,
	createCompotentType,
} from "@/packages/index.d";
import { throttle } from "lodash";
import { computed } from "vue";
const globalStore = useGlobalStore();

//识别拖拽进来的组件
const dropHandle = async (e: DragEvent) => {
	e.preventDefault();
	console.log("拖拽到编辑区域", e);
	try {
		//获取拖曳数据
		const dragDataString = e!.dataTransfer!.getData("dragData");
		if (!dragDataString) {
			return;
		}
		const drapData = JSON.parse(dragDataString);
		const componentConfig = JSON.parse(drapData.componentConfig);
		const componentInfoData = JSON.parse(drapData.componentInfoData);

		//获取组件配置数据
		const newComponent: createCompotentType = await createComponent(
			componentInfoData
		);
		//设置组件位置
		newComponent.componentConfig.attr.x = e.offsetX - componentConfig.w / 2;
		newComponent.componentConfig.attr.y = e.offsetY - componentConfig.h / 2;
		//设置组件宽高
		newComponent.componentConfig.attr.w = componentConfig.w;
		newComponent.componentConfig.attr.h = componentConfig.h;

		console.log("newComponent", newComponent);

		//把组件添加至pinia，才能渲染出来
		globalStore.addComponentList(newComponent);

		//设置组件层级
		newComponent.componentConfig.attr.zIndex =
			globalStore.getComponentList.length;
		//设置选中
		globalStore.setTargetComponentSelectId(newComponent.componentConfig.id);
	} catch (e) {
		alert("组件正在研发中，敬请期待...");
	}
};

const dragoverHandle = (e: DragEvent) => {
	e.preventDefault();
	e.stopPropagation();
	if (e.dataTransfer) e.dataTransfer.dropEffect = "copy"; //设置目标元素的鼠标效果
};

//点击取消选中
const cancelSelectedHandle = () => {
	//设置取消选中
	globalStore.setTargetComponentSelectId("");
};

//设置组件样式
const useComponentStyle = (attr: PickComponentConfigType<"attr">) => {
	const componentStyle = {
		zIndex: attr.zIndex,
		left: `${attr.x}px`,
		top: `${attr.y}px`,
		width: `${attr.w}px`,
		height: `${attr.h}px`,
	};
	return componentStyle;
};

//设置选中的组件遮罩层
const useSelectedComponentModelStyle = computed(() => {
	const component = globalStore.getComponentById(
		globalStore.getTargetComponent.selectId
	);

	if (component) {
		const { zIndex, x, y, w, h } = component.componentConfig.attr;
		return {
			zIndex: zIndex + 1,
			left: `${x}px`,
			top: `${y}px`,
			width: `${w}px`,
			height: `${h}px`,
		};
	}
	return {};
});

//封装组件的鼠标事件
const useMouseHandle = () => {
	//鼠标点击事件-点击组件时触发
	const selectedHandle = (e: MouseEvent, component: createCompotentType) => {
		e.preventDefault();
		e.stopPropagation();
		//设置选中
		globalStore.setTargetComponentSelectId(component.componentConfig.id);
	};

	//鼠标按下事件-(在组件按下鼠标时触发) 包含组件移动事件
	const mouseDownHandle = (e: MouseEvent, component: createCompotentType) => {
		e.preventDefault();
		e.stopPropagation();
		//设置选中
		globalStore.setTargetComponentSelectId(component.componentConfig.id);
		// console.log("鼠标按下事件", component);

		//记录初始在屏幕上的位置
		const startX = e.screenX;
		const startY = e.screenY;

		//记录初始在容器上的位置
		const startAttrX = component.componentConfig.attr.x;
		const startAttrY = component.componentConfig.attr.y;

		//移动-计算偏移量
		const mousemove = throttle((moveEvent: MouseEvent) => {
			//计算偏移量
			const offsetX = moveEvent.screenX - startX;
			const offsetY = moveEvent.screenY - startY;
			// console.log("偏移量", offsetX, offsetY);

			//最终的位置=初始在容器上的位置+偏移量
			let x = startAttrX + offsetX;
			let y = startAttrY + offsetY;

			//容器范围
			const containerArea = {
				left: 0, //最左边
				right:
					globalStore.getContainerConfig.width -
					component.componentConfig.attr.w, //最右边，容器宽度 - 组件宽度
				top: 0, //最上边
				bottom:
					globalStore.getContainerConfig.height -
					component.componentConfig.attr.h, //最下边，容器高度-组件高度
			};
			//确保组件的位置不能超出容器
			x =
				x > containerArea.right
					? containerArea.right
					: x < containerArea.left
					? containerArea.left
					: x;
			y =
				y > containerArea.bottom
					? containerArea.bottom
					: y < containerArea.top
					? containerArea.top
					: y;
			component.componentConfig.attr.x = x;
			component.componentConfig.attr.y = y;
		}, 20);

		const mouseup = () => {
			//移除监听，确保事件只在组件上生效
			document.removeEventListener("mousemove", mousemove);
			document.removeEventListener("mouseup", mouseup);
		};

		document.addEventListener("mousemove", mousemove);
		document.addEventListener("mouseup", mouseup);
	};

	return {
		selectedHandle,
		mouseDownHandle,
	};
};
const { selectedHandle, mouseDownHandle } = useMouseHandle();
</script>
<style lang="scss" scoped>
.content {
	flex: 1;
	padding: 30px;
	display: flex;
	justify-content: center;
	align-items: center;

	#container {
		background-color: v-bind(
			"globalStore.getContainerConfig.backgroundColor"
		);
		width: v-bind("globalStore.getContainerConfig.width + 'px'");
		height: v-bind("globalStore.getContainerConfig.height + 'px'");
		position: relative;

		.component {
			position: absolute;
			overflow: hidden;
			cursor: move;
		}
		.selected-modal {
			position: absolute;
			background-color: rgba($color: #409eff, $alpha: 0.1);
			cursor: move;
		}
	}
}
</style>
