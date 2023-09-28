<template>
	<el-switch v-bind="option.attrs" />
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import { PickComponentConfigType } from "@/packages/index.d";
import config from "./config";
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
