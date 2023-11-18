<script setup>
import { ref, computed, watch } from "vue";
import { Handle, Position, useVueFlow } from '@vue-flow/core';

// Importing Store Pinia
import { useStore } from "../stores/main.js";

// Custom Top Menu import
import topMenu from "./topMenu.vue";

// Local variables and props declaration
const transparent = ref(true);
let selectedColor = ref(false);
const props = defineProps({
  id: String,
  selected: Boolean,
});
////////////////////////////////////////////.

// Usage of Store Pinia
const store = useStore();

// Computed values from Store
let localStates = computed(() => {
  return store.getMessageById(props.id);
});
////////////////////////////////////////////.

// Value update related methods are defined here
const updateValues = (event) => {
  switch (event.target.id) {
    case props.id + "text":
      localStates.value.text = event.target.innerText;
      break;
  }
};
////////////////////////////////////////////.

// Watching Selected Manual event
watch(
  () => props.selected,
  (isSelected) => (selectedColor.value = isSelected)
);
////////////////////////////////////////////.
</script>

<template>
  <div @mouseenter="transparent = false" @mouseleave="transparent = true"
    style="position: relative; background-color: white; border-radius: 1.5rem">
    <Handle :id="id + 'left'" class="handle" type="target" :position="Position.Left"
      style="top: 50%; left: -7% !important" />
    <div class="quick-reply" contenteditable="true" :id="id + 'text'" @input="updateValues"
      :style="{ borderColor: selectedColor ? 'red' : '' }">
      {{ localStates.text }}
    </div>

    <!-- Button Poped to request delete element -->
    <topMenu class="top-menu" :eid="props.id" :transparent="transparent"></topMenu>
    <!-- Button Poped to request delete element -->

    <Handle :id="id + 'right'" class="handle" type="source" :position="Position.Right"
      style="top: 50%; left: 93% !important" />
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: none;
}

.top-menu {
  position: absolute;
  left: 0%;
  top: 0%;
  transform: translate(50%, -115%);
  z-index: 1;
}

.handle {
  background-color: white;
  width: 1rem;
  height: 1rem;
  border: 2px solid;
  position: absolute;
  z-index: 1;
}

.quick-reply {
  border: 3px rgb(10, 129, 193) dashed;
  border-radius: 1rem;
  padding: 1rem;
}
</style>
