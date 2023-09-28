<template>
	<div class="level">
		<div class="header">图层</div>
		<draggable
			item-key="id"
			v-model="globalStore.componentList"
			@change="changeLayerHandle"
		>
			<template #item="{ element }">
				<div
					:class="[
						'item',
						{
							active:
								element.componentConfig.id ===
								globalStore.getTargetComponent.selectId,
						},
					]"
					@click="selectedHandle(element)"
				>
					<component
						:is="fetchComponent(element.componentInfo)"
					></component>
					<span>{{ element.componentConfig.attr.zIndex }}</span>
				</div>
			</template>
		</draggable>
	</div>
</template>
<script lang="ts" setup>
import draggable from "vuedraggable";
import { fetchComponent } from "@/packages/index";
import { useGlobalStore } from "@/store/globalStore";
import { createCompotentType } from "@/packages/index.d";
const globalStore = useGlobalStore();

//改变图层层级时触发
const changeLayerHandle = () => {
	globalStore.getComponentList.forEach((item, index) => {
		item.componentConfig.attr.zIndex =
			globalStore.getComponentList.length - index;
	});
};

//点击选中组件
const selectedHandle = (component: createCompotentType) => {
	//设置选中
	globalStore.setTargetComponentSelectId(component.componentConfig.id);
};
</script>

<style lang="scss" scoped>
.level {
	border-left: solid 1px #ddd;
	width: 120px;
	.header {
		border-bottom: solid 1px #eee;
		height: 40px;
		text-align: center;
		line-height: 40px;
	}
	.item {
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		&:hover {
			background-color: #eee;
		}
	}
	.active {
		background-color: var(--el-color-primary-light-9);
	}
}
</style>
