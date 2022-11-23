<script setup>
import { ref, computed, watch } from "vue";

import { Handle, Position, useVueFlow } from "@braks/vue-flow";

// Vue resizable, the main component used for resizing nodes
import VueResizable from "vue-resizable";

// Icons
import TrashIcon from "../assets/svg/TrashIcon.svg";

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
      <TrashIcon />
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
