<script setup>
const props = defineProps({
	type: String,
	title: String,
	subtitle: String,
	logoColor: String,
	logoComponent: Object,
});

const {
	type,
	title,
	subtitle,
	logoColor,
	logoComponent
} = props;

const onDragStart = ($event) => {
	if ($event.dataTransfer) {
		$event.dataTransfer.setData("application/vueflow", type);
		$event.dataTransfer.effectAllowed = "move";
	}
};
</script>

<template>
	<div class="element-dragable vue-flow__node-output m-1" :draggable="true" @dragstart="onDragStart">
		<div class="d-flex align-items-center">
			<div class="Logo" :style="{ backgroundColor: logoColor }">
				<component :is="logoComponent" />
			</div>
			<div style="width: 100%">
				<div class="text-header">{{ title }}</div>
				<div>{{ subtitle }}</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.element-dragable {
	width: 14rem;
	border-radius: 1rem;
	border: 3px rgb(58, 140, 199) solid;
	cursor: pointer;
}

.element-dragable:hover {
	border-color: green;
}

.element-dragable:active {
	border-color: red;
}

.Logo {
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	border: 3px white solid;
	border-radius: 50%;
	width: 2.5rem;
	height: 2.25rem;
	padding: 3px;
}

.text-header {
	font-size: x-small;
	color: #7e8c9e;
	height: 8px;
	margin-bottom: 4px;
}
</style>
