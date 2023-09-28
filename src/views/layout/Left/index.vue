<template>
	<div class="left">
		<div
			class="item-box"
			v-for="item in componentInfoData"
			@dragstart="onDragstart($event, item)"
		>
			<component :is="fetchComponent(item)" draggable="true"></component>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { componentInfoData, fetchComponent } from "@/packages/index";

//拖拽开始
const onDragstart = (e: DragEvent, item: any) => {
	const data = {
		componentConfig: JSON.stringify({
			w: (<HTMLInputElement>e.target).offsetWidth, //组件的宽度
			h: (<HTMLInputElement>e.target).offsetHeight, //组件的高度
		}),
		componentInfoData: JSON.stringify(item), //组件信息
	};

	//将配置项绑定到拖拽属性上
	e!.dataTransfer!.setData("dragData", JSON.stringify(data));
};
</script>
<style lang="scss" scoped>
.left {
	border-right: solid 1px #ddd;
	width: 300px;
	padding: 20px;
	display: grid;
	grid-template-columns: 90px 90px 90px;
	grid-template-rows: 50px 50px 50px;
	gap: 10px;
	.item-box {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f5f5f5;
	}
}
</style>
