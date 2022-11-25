<script setup>
import { ref, computed, watch } from "vue";

import { Handle, Position } from "@braks/vue-flow";

// Icons
import sunIcon from "../assets/svg/sunIcon.svg";

// Vue resizable, the main component used for resizing nodes
import VueResizable from "vue-resizable";

// custom Top Menu import
import topMenu from "./topMenu.vue";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

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
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      background-color: white;
    "
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
  >
    <div class="label">
      <input type="text" v-model="localStates.label" />
      <!-- Delete Button and color controls Menu -->
      <sunIcon
        style="
          position: absolute;
          left: -10%;
          top: -110%;
          transform: scale(3);
          border-radius: 50%;
        "
        :style="{
          fill: localStates.color,
        }"
      />
      <topMenu
        :eid="props.id"
        :transparent="transparent"
        style="
          position: absolute;
          left: 99%;
          top: 2%;
          transform: translate(-100%, 0%);
          z-index: 1;
        "
      ></topMenu>
      <!-- Delete Button and color controls Menu -->
    </div>

    <vue-resizable
      class="resizable"
      :width="localStates.width"
      :height="localStates.height"
      :active="['b', 'r', 'rb']"
      @resize:end="resize($event)"
    >
      <div style="width: 100%; height: 100%">
        <img :src="localStates.src || default_image_src_value" />
        <input
          class="image_source_input"
          type="text"
          v-model="localStates.src"
          placeholder="Enter Image Source here"
        />
      </div>
    </vue-resizable>

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
      style="top: calc(100% + 1.7rem)"
    />
  </div>
</template>

<style scoped>
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
.image_source_input {
  width: calc(100% + 2px);
  transform: translate(-1px);
  height: 1.75rem;
  overflow: hidden;
  text-align: center;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

img {
  width: 100%;
  height: 100%;
  padding: 5px;
}

.label {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -100%);
  padding: 5px 1em 0px 1em;
  clear: left;
  display: inline-block;
  width: 100%;
  border: 2px solid;
  border-bottom: transparent;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: white;
  padding: 0;
}

.label input {
  width: calc(100% - 1rem);
  margin: 0.2rem;
  padding: 0;
  outline: transparent;
  border: transparent;
  text-align: center;
  cursor: move;
}

.resizable {
  border: 1px black solid;
}
</style>
