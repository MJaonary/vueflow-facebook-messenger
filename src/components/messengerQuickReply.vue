<script setup>
import { ref, computed, watch } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";

// custom Top Menu import
import topMenu from "./topMenu.vue";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

const { applyEdgeChanges, applyNodeChanges, toObject } = useVueFlow();

// Computed Values from Store.
let localStates = computed(() => {
  return store.getMessageById(props.id);
});
////////////////////////////////////////////.

// Elements related methods.
const deleteElement = (event, id) => {
  event.stopPropagation();

  let connectedEdges = toObject().edges.filter((edge) =>
    [edge.target, edge.source].some((item) => item === id)
  );
  const changeEdgesObjectArray = connectedEdges.map((item) => ({
    type: "remove",
    id: item.id,
  }));

  applyNodeChanges([{ type: "remove", id }]);
  applyEdgeChanges(changeEdgesObjectArray);

  store.layers.messages = store.layers.messages.filter((element) => {
    return element.id !== id;
  });
};
////////////////////////////////////////////.

// Value Update related methods all wrapped here
const updateValues = (event) => {
  switch (event.target.id) {
    case props.id + "text":
      localStates.value.text = event.target.innerText;
      break;
  }
};
////////////////////////////////////////////.

// Watching Selected Manual event.
watch(
  () => props.selected,
  (isSelected) => (selectedColor.value = isSelected)
);
////////////////////////////////////////////.

// Local Variables and props related things.
const transparent = ref(true);
let selectedColor = ref(false);
const props = defineProps({
  id: String,
  selected: Boolean,
});
////////////////////////////////////////////.
</script>

<template>
  <div
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
    style="position: relative; background-color: white; border-radius: 1.5rem"
  >
    <Handle
      :id="id + 'left'"
      class="handle"
      type="output"
      :position="Position.Left"
      style="top: 50%; left: -7% !important"
    />
    <div
      class="quick-reply"
      contenteditable="true"
      :id="id + 'text'"
      @input="updateValues"
      :style="{ borderColor: selectedColor ? 'red' : '' }"
    >
      {{ localStates.text }}
    </div>

    <!-- Button Poped to request delete element -->
    <topMenu
      :eid="props.id"
      :transparent="transparent"
      style="
        position: absolute;
        left: 0%;
        top: 0%;
        transform: translate(50%, -105%);
        z-index: 1;
      "
    ></topMenu>
    <!-- Button Poped to request delete element -->

    <Handle
      :id="id + 'right'"
      class="handle"
      type="output"
      :position="Position.Right"
      style="top: 50%; left: 98% !important"
    />
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: none;
}
.quick-reply {
  border: 3px rgb(10, 129, 193) dashed;
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 4rem;
}

.handle {
  background-color: white;
  width: 1rem;
  height: 1rem;
  border: 2px solid;
  position: absolute;
  z-index: 1;
}

.button-container {
  background-color: white;
  width: 2rem;
  padding: 0;
  margin: 0;
  border-radius: 1rem;
  color: rgba(255, 0, 0, 0.877);
  cursor: pointer;
  opacity: 100%;
  transition: opacity 0.5s;
}

.transparent {
  opacity: 0%;
}
</style>
