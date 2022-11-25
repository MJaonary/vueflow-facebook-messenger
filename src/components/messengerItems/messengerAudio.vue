<script setup>
import { ref, computed } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";

// Simple Id Generator for basic Usage.
import getId from "../../utils/radomId";

// Icons
import TrashIcon from "../../assets/svg/TrashIcon.svg";
import NextAudio from "../../assets/svg/NextAudio.svg";

// Drag and Drop Functionality
import { Draggable } from "vue3-smooth-dnd";

// Usage of Store Pinia
import { useStore } from "../../stores/main.js";
const store = useStore();

// Computed Values from Store.
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

// Elements related methods.
const deleteElement = (id) => {
  localStates.value.items = Items.value.filter((element) => element.id != id);
};
////////////////////////////////////////////.

// Local Variables and props related things.
const transparent = ref(true);
const props = defineProps({
  mid: String,
  id: String,
});

// Default image value :
const default_image_src_value =
  "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
////////////////////////////////////////////.
</script>

<template>
  <Draggable
    class="messenger-container"
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
    data-toggle="tooltip"
    data-placement="left"
    title="Messenger Audio"
  >
    <!-- Handle for registering comments -->
    <Handle
      :id="id + 'comment'"
      class="handle"
      type="input"
      :position="Position.Left"
      style="top: 10%; left: -3.5% !important"
    />
    <!-- Handle for registering comments -->

    <!-- Adding image viewer -->
    <NextAudio />
    <input
      type="text"
      v-model="localItems.title"
      placeholder="Enter Audio Title"
    />
    <!-- Adding image viewer -->

    <input
      type="text"
      v-model="localItems.link"
      placeholder="Audio URL or Attachement ID"
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
.bi-skip-end-circle {
  width: 2rem;
  height: 2rem;
  margin-top: 0.4rem;
}
input {
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
  border: rgb(219, 212, 13) solid;
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
