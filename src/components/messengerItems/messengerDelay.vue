<script setup>
import { ref, computed } from "vue";
import { Handle, Position } from "@vue-flow/core";

// Importing Store Pinia
import { useStore } from "../../stores/main.js";

// Importing SVG icons
import TrashIcon from "../../assets/svg/TrashIcon.svg";
import Clock from "../../assets/svg/Clock.svg";

// Drag and Drop Functionality
import { Draggable } from "vue3-smooth-dnd";

// Local variables and props declaration
const transparent = ref(true);
const props = defineProps({
  mid: String,
  id: String,
  editor: Boolean,
});
////////////////////////////////////////////.

// Usage of Store Pinia
const store = useStore();

// Computed Values from Store
let localStates = computed(() => {
  return store.getMessageById(props.mid);
});

let Items = computed(() => {
  return localStates.value.items;
});

let localItems = computed(() => {
  return store.getItemById(props.mid, props.id);
});
////////////////////////////////////////////.

// Elements related methods
const deleteElement = (id) => {
  localStates.value.items = Items.value.filter((element) => element.id != id);
};
////////////////////////////////////////////.
</script>

<template>
  <Draggable
    class="messenger-container"
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
    data-toggle="tooltip"
    data-placement="left"
    title="Messenger Delay"
  >
    <!-- Handle for registering comments -->
    <Handle
      v-if="props.editor === false"
      :id="id + 'comment'"
      class="handle"
      type="target"
      :position="Position.Left"
      style="top: 10%; left: -3.5% !important"
    />
    <!-- Handle for registering comments -->

    <!-- Adding image viewer -->
    <Clock />
    <!-- Adding image viewer -->

    <input
      type="text"
      class="image_source_input"
      v-model="localItems.delay_to_wait"
      placeholder="Enter Delay in millisecond"
    />

    <!-- Button Poped to request delete element -->
    <div
      class="button-container"
      :class="{ transparent: transparent }"
      style="position: absolute; top: 50%; right: -2.2rem"
      @click="deleteElement(id)"
    >
      <TrashIcon />
    </div>
    <!-- Button Poped to request delete element -->
  </Draggable>
</template>

<style scoped>
[contenteditable]:focus {
  outline: none;
}
.delay {
  width: 2rem;
  height: 2rem;
  margin-top: 0.5rem;
}
.image_source_input {
  width: 90%;
  margin-top: 0.25rem;
  overflow: hidden;
  text-align: center;
  border-radius: 1rem;
}
.handle {
  background-color: white;
  width: 1rem;
  height: 1rem;
  border: 2px solid;
  position: absolute;
  top: 5rem;
  left: -5px !important;
}

.handle:hover {
  width: 1.3rem;
  height: 1.3rem;
  transition: width, height 0.5s;
}

.messenger-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid;
  border-radius: 1rem;
  padding-bottom: 0.5rem;
  border: rgb(219, 13, 102) solid;
  margin-bottom: 1rem;
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

.button-container:hover {
  background-color: #eee;
}
</style>
