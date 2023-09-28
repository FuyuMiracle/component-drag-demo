<template>
	<el-tag v-bind="option.attrs">{{ option.text }}</el-tag>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import config from "./config";
import { PickComponentConfigType } from "../../index.d";
defineProps({
	option: {
		type: Object as PropType<PickComponentConfigType<"option">>,
		default: () => {
			return new config().componentConfig.option;
		},
	},
});
</script>
<style lang="scss" scoped></style>
