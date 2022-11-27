<script setup>
import { ref, computed, watch } from "vue";
import { Handle, Position } from '@vue-flow/core'

import messageRendererVue from "./messageRenderer.vue";

// custom Top Menu import
import topMenu from "./topMenu.vue";

// Icons
import Messenger from "../assets/svg/Messenger.svg";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

// Computed Values from Store.
let localStates = computed(() => {
  return store.getMessageById(props.id);
});

let messageToEdit = computed(() => {
  return store.messageToEdit;
});
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
// Default id is passed from the component.
const props = defineProps({
  id: String,
  selected: Boolean,
});
////////////////////////////////////////////.
</script>

<template>
  <Handle
    :id="id + 'left'"
    class="handle handle-left"
    type="input"
    :position="Position.Left"
    style="right: 0"
  />
  <Handle
    :id="id + 'right'"
    class="handle handle-right"
    type="input"
    :position="Position.Right"
    style="right: 0"
  />
  <Handle
    :id="id + 'bottom'"
    class="handle handle-left"
    type="input"
    :position="Position.Bottom"
    style="top: 100%; left: 50% !important"
  />

  <div
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
    class="d-flex flex-column align-items-center"
    style="background-color: white"
  >
    <div class="label">
      <input type="text" v-model="localStates.label" />
      <!-- Delete Button and color controls Menu -->
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

    <div class="main-container" :class="{ 'on-edit': messageToEdit == id }">
      <div class="starting-step">
        <div class="d-flex align-items-center">
          <div style="width: 2rem; height: 2rem">
            <Messenger />
          </div>
          <div class="p-2 starting-step-header d-flex flex-column">
            <div style="font-size: x-small; color: #7e8c9e; height: 8px">
              Facebook
            </div>
            <div>Send Message</div>
          </div>
        </div>
      </div>
      <div class="content">
        <messageRendererVue :id="id" :key="id"></messageRendererVue>
      </div>
    </div>
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: none;
}
[contenteditable] {
  cursor: text;
}
.content {
  background-color: #fff;
  padding: 0.5rem 1rem 0.5rem 1rem;
  width: 100%;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  cursor: pointer;
}
.handle-left {
  background-color: white;
  width: 1rem;
  height: 1rem;
  border: 2px solid;
  position: absolute;
  top: 5rem;
  left: -5px !important;
  z-index: 1002;
}
.handle-right {
  background-color: white;
  width: 0.95rem;
  height: 1rem;
  border: 2px solid;
  position: absolute;
  top: 95%;
  right: -5px !important;
  z-index: 1002;
}
.handle-right:hover,
.handle-left:hover {
  width: 1.3rem;
  height: 1.3rem;
  transition: width, height 0.5s;
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
  width: 100%;
  border: 2px solid;
  border-bottom: transparent;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: white;
  padding: 0;
  cursor: move;
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
.main-container {
  max-width: calc(23rem + 6px);
  border: 2px solid black;
  border-top: 2px transparent;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.main-container:hover {
  border: 3px #0084ff solid;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
}
.on-edit {
  border: 3px red solid;
}
.starting-step {
  border-bottom: 1px solid #eee;
}
.starting-step {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: white;
  width: 23rem;
  height: 3rem;
  font-size: medium;
  text-align: left;
  padding-left: 0.5rem;
  padding-top: 0.3rem;
}
</style>
