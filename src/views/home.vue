<template>
	<div class="home">
		<Left></Left>
		<Content></Content>
		<Right></Right>
	</div>
</template>
<script lang="ts" setup>
import Left from "./layout/Left/index.vue";
import Content from "./layout/Content/index.vue";
import Right from "./layout/Right/index.vue";
</script>
<style lang="scss" scoped>
.home {
	display: flex;
	width: 100vw;
	height: 100vh;
}
</style>
