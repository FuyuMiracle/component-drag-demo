<template>
	<!-- 图层 -->
	<Layer></Layer>

	<div class="right">
		<div v-if="componentForm">
			<h3>组件配置</h3>
			<!-- 公共部分 -->
			<h5>公共配置</h5>
			<el-form :model="componentForm">
				<el-form-item label="名称">
					<el-input v-model="componentForm.title" />
				</el-form-item>
				<el-form-item label="尺寸">
					<el-col :span="12">
						<span>宽度</span>
						<el-input-number
							v-model="componentForm.attr.w"
							:min="0"
						/>
					</el-col>
					<el-col :span="12">
						<span>高度</span>
						<el-input-number
							v-model="componentForm.attr.h"
							:min="0"
						/>
					</el-col>
				</el-form-item>
				<el-form-item label="位置">
					<el-col :span="12">
						<span>上边</span>
						<el-input-number
							v-model="componentForm.attr.x"
							:min="0"
							:max="containerForm.width - componentForm.attr.w"
						/>
					</el-col>
					<el-col :span="12">
						<span>左边</span>
						<el-input-number
							v-model="componentForm.attr.y"
							:min="0"
							:max="containerForm.height - componentForm.attr.h"
						/>
					</el-col>
				</el-form-item>
			</el-form>
			<!-- 组件的专属配置 -->
			<component
				v-if="currComponentData"
				:is="fetchComponentConfig(currComponentData.componentInfo)"
				:option="currComponentData.componentConfig.option"
			></component>
		</div>

		<div v-else-if="containerForm">
			<h3>容器配置</h3>
			<el-form :model="containerForm">
				<el-form-item label="宽度">
					<el-input-number v-model="containerForm.width" :min="0" />
				</el-form-item>
				<el-form-item label="高度">
					<el-input-number v-model="containerForm.height" :min="0" />
				</el-form-item>
				<el-form-item label="背景颜色">
					<el-color-picker v-model="containerForm.backgroundColor" />
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script lang="ts" setup>
import Layer from "./Layer.vue";
import { useGlobalStore } from "@/store/globalStore";
import { computed } from "vue";
import { fetchComponentConfig } from "@/packages/index";
const globalStore = useGlobalStore();

//获取当前组件的数据
const currComponentData = computed(() => {
	return globalStore.getComponentById(
		globalStore.getTargetComponent.selectId
	);
});

//组件配置表单
const componentForm = computed(() => {
	return currComponentData.value?.componentConfig || null;
});

//容器配置表单
const containerForm = computed(() => {
	return globalStore.getContainerConfig;
});
</script>
<style lang="scss" scoped>
.right {
	width: 400px;
	border-left: solid 1px #ddd;
	padding: 20px;
}
</style>
