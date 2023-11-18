<script setup>
import { ref, computed, onMounted } from "vue";
import { Handle, Position } from "@vue-flow/core";

// Importing Store Pinia
import { useStore } from "../../stores/main.js";

// Importing SVG icons
import TrashIcon from "../../assets/svg/TrashIcon.svg";

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

// Renderless resizable textarea
const textarea = ref(null); // Access the textarea by his ref.

const resizeTextarea = ($event) => {
  $event.target.style.height = "auto";
  $event.target.style.height = $event.target.scrollHeight + 4 + "px";
};

onMounted(() => {
  textarea.value.style.height = textarea.value.scrollHeight + 4 + "px";
});
////////////////////////////////////////////.
</script>

<template>
  <Draggable
    class="messenger-container"
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
    data-toggle="tooltip"
    data-placement="left"
    title="Messenger Dynamic Message"
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
    <div class="input-header">Dynamic Message Generation</div>
    <textarea
      type="text"
      ref="textarea"
      v-model="localItems.description"
      placeholder="Description"
      @input="resizeTextarea"
    ></textarea>
    <!-- Handle for registering comments -->
    <Handle
      v-if="props.editor === false"
      :id="id + 'description'"
      class="handle"
      type="source"
      :position="Position.Right"
      style="top: 50%; left: 99% !important"
    />
    <!-- Handle for registering comments -->
    <!-- Adding image viewer -->

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
.input-header {
  font-weight: bold;
}
textarea {
  width: 90%;
  margin-top: 0.2rem;
  overflow: hidden;
  text-align: center;
  border-radius: 1rem;
  border: 3px rgba(113, 113, 113, 0.531) dashed;
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
  padding: 0.5rem;
  border: rgb(53, 74, 3) solid;
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
