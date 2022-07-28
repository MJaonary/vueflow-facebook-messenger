<script setup>
import { ref, computed, watch } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

const { applyNodeChanges } = useVueFlow();

// Computed Values from Store.
let localStates = computed(() => {
  return store.getMessageById(props.id);
});
////////////////////////////////////////////.

// Elements related methods.
const deleteElement = (event, id) => {
  applyNodeChanges([{ type: "remove", id }]);
  event.stopPropagation();
  store.layers.messages = store.layers.messages.filter((element) => {
    return element.id != id;
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
    style="position: relative;"
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
    <div
      class="button-container"
      :class="{ transparent: transparent }"
      style="position: absolute; top: -1.7rem; right: 35%"
      @click="($event) => deleteElement($event, id)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-trash3"
        viewBox="0 0 16 16"
      >
        <path
          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
        />
      </svg>
    </div>
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
