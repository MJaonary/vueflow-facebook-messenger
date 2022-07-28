<script setup>
import { ref, computed, watch } from "vue";

import { Handle, Position, useVueFlow } from "@braks/vue-flow";

// Vue resizable, the main component used for resizing nodes
import VueResizable from "vue-resizable";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

const { applyNodeChanges } = useVueFlow();

// Computed Values from Store.
let localStates = computed(() => {
  return store.getMessageById(props.id);
});
////////////////////////////////////////////.

// Resize method specific to VueResizable
const resize = (event) => {
  localStates.value.width = event.width + "px";
  localStates.value.height = event.height + "px";
};
////////////////////////////////////////////.

// Value Update related methods all wrapped here
const updateValues = (e) => {
  localStates.value.label = e.target.innerText;
};

const changeColor = (event) => {
  localStates.value.color = event.target.value;
};
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
// Default image value :
const default_image_src_value =
  "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
////////////////////////////////////////////.
</script>

<template>
  <div
    :id="id"
    style="
      position: relative;
      border-radius: 1rem;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    "
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
    :style="{ border: selectedColor ? '3px red solid' : '3px transparent solid' }"
  >
    <div
      class="button-container"
      :class="{ transparent: transparent }"
      style="margin-bottom: 0.5rem"
      @click="(event) => deleteElement(event, id)"
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
    <div class="label" contenteditable="true" @input="updateValues">
      {{ localStates.label }}
    </div>
    <vue-resizable
      class="resizable-content"
      :width="localStates.width"
      :height="localStates.height"
      :active="['b', 'r', 'rb']"
      @resize:end="resize($event)"
      :style="{ border: `3px ${localStates.color} solid` }"
    >
      <iframe :src="localStates.src" :title="id + 'iframeView'"></iframe>
      <input
        class="iframe_source_input"
        type="text"
        v-model="localStates.src"
        placeholder="Enter Document Source here"
      />
    </vue-resizable>
    <input
      type="color"
      :value="localStates.color"
      class="container-color"
      @input="changeColor"
      :style="{ backgroundColor: `${localStates.color}` }"
    />
    <Handle
      :id="id + 'left'"
      class="handle"
      type="input"
      :position="Position.Left"
      style="top: 50%; left: -1.5%"
    />
    <Handle
      :id="id + 'right'"
      class="handle"
      type="input"
      :position="Position.Right"
      style="top: 50%; right: -1.5%"
    />
    <Handle
      :id="id + 'bottom'"
      class="handle"
      type="input"
      :position="Position.Bottom"
      style="top: 100.5%"
    />
  </div>
</template>

<style scoped>
iframe {
  width: 100%;
  height: 100%;
}
.iframe_source_input {
  width: 90%;
  overflow: hidden;
  text-align: center;
  border-radius: 1rem;
}

iframe {
  width: 100%;
  height: 85%;
}
.container-color {
  position: absolute;
  bottom: 5px;
  right: 5px;
  border: none;
  width: 1rem;
  height: 1rem;
  border: none;
  border-radius: 1rem;
}
.button-container {
  position: absolute;
  background-color: white;
  width: 2rem;
  padding: 0;
  margin: 0;
  border-radius: 1rem;
  color: rgba(255, 0, 0, 0.877);
  cursor: pointer;
  opacity: 100%;
  transition: opacity 0.5s;
  right: -2rem;
  top: 0%;
}

.transparent {
  opacity: 0%;
}

.button-container:hover {
  background-color: #eee;
}

.label {
  position: absolute;
  left: 50%;
  font-size: 1rem;
  transform: translate(-50%, -125%);
  border: 2px dashed;
  padding: 5px 1em 0px 1em;
  border-radius: 1rem;
  clear: left;
  display: inline-block;
  width: 100%;
  -webkit-appearance: textarea;
}

.handle {
  background-color: white;
  width: 1rem;
  height: 1rem;
  border: 2px solid;
  position: absolute;
  top: 5.1rem;
}

.handle:hover {
  width: 1.3rem;
  height: 1.3rem;
  transition: width, height 0.5s;
}

.resizable-content {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 25em;
  height: 14em;
}
</style>
