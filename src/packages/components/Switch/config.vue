<template>
	<div>
		<h5>开关组件专属配置</h5>
		<el-form :model="option" label-width="80px">
			<el-form-item label="开关">
				<el-switch v-model="option.attrs.value"></el-switch>
			</el-form-item>
			<el-form-item label="是否禁用">
				<el-switch v-model="option.attrs.disabled"></el-switch>
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import { PickComponentConfigType } from "@/packages/index.d";
defineProps({
	option: {
		type: Object as PropType<PickComponentConfigType<"option">>,
		required: true,
	},
});
</script>
<style lang="scss" scoped></style>
