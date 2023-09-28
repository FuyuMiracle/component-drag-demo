<template>
	<div>
		<h5>标签组件专属配置</h5>
		<el-form :model="option" label-width="80px">
			<el-form-item label="文本">
				<el-input v-model="option.text"></el-input>
			</el-form-item>
			<el-form-item label="类型">
				<el-select v-model="option.attrs.type">
					<el-option label="primary" value="primary" />
					<el-option label="success" value="success" />
					<el-option label="warning" value="warning" />
					<el-option label="danger" value="danger" />
					<el-option label="info" value="info" />
				</el-select>
			</el-form-item>
			<el-form-item label="主题">
				<el-select v-model="option.attrs.effect">
					<el-option label="dark" value="dark" />
					<el-option label="light" value="light" />
					<el-option label="plain" value="plain" />
				</el-select>
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import { PickComponentConfigType } from "../../index.d";
defineProps({
	option: {
		type: Object as PropType<PickComponentConfigType<"option">>,
		required: true,
	},
});
</script>
<style lang="scss" scoped></style>
