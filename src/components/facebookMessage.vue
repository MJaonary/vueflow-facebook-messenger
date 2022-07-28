<script setup>
import { ref, computed, watch } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";

import messageRendererVue from "./messageRenderer.vue";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

const { applyNodeChanges } = useVueFlow();

// Computed Values from Store.
let localStates = computed(() => {
  return store.getMessageById(props.id);
});

let messageToEdit = computed(() => {
  return store.messageToEdit;
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
    case props.id + "type":
      localStates.value.content = event.target.innerText;
      break;

    case props.id + "label":
      localStates.value.label = event.target.innerText;
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
  >
    <div
      class="label"
      :id="id + 'label'"
      contenteditable="true"
      @input="updateValues"
    >
      {{ localStates.label }}
    </div>
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
    <div
      class="main-container"
      :class="{ 'on-edit': messageToEdit == id }"
      :style="{ borderColor: selectedColor ? 'red' : '' }"
    >
      <div class="starting-step">
        <div class="d-flex align-items-center">
          <div style="width: 2rem; height: 2rem">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 800"
              width="32"
              height="32"
            >
              <radialGradient
                id="a"
                cx="101.9"
                cy="809"
                r="1.1"
                gradientTransform="matrix(800 0 0 -800 -81386 648000)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" style="stop-color: #09f" />
                <stop offset=".6" style="stop-color: #a033ff" />
                <stop offset=".9" style="stop-color: #ff5280" />
                <stop offset="1" style="stop-color: #ff7061" />
              </radialGradient>
              <path
                fill="url(#a)"
                d="M400 0C174.7 0 0 165.1 0 388c0 116.6 47.8 217.4 125.6 287 6.5 5.8 10.5 14 10.7 22.8l2.2 71.2a32 32 0 0 0 44.9 28.3l79.4-35c6.7-3 14.3-3.5 21.4-1.6 36.5 10 75.3 15.4 115.8 15.4 225.3 0 400-165.1 400-388S625.3 0 400 0z"
              />
              <path
                fill="#FFF"
                d="m159.8 501.5 117.5-186.4a60 60 0 0 1 86.8-16l93.5 70.1a24 24 0 0 0 28.9-.1l126.2-95.8c16.8-12.8 38.8 7.4 27.6 25.3L522.7 484.9a60 60 0 0 1-86.8 16l-93.5-70.1a24 24 0 0 0-28.9.1l-126.2 95.8c-16.8 12.8-38.8-7.3-27.5-25.2z"
              />
            </svg>
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
        <messageRendererVue :id="id"></messageRendererVue>
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
.label {
  position: absolute;
  left: 50%;
  font-size: 1rem;
  transform: translate(-50%, -100%);
  border: 2px dashed;
  padding: 5px 1em 0px 1em;
  border-radius: 1rem;
  clear: left;
  display: inline-block;
  width: 100%;
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
.starting-step {
  border-bottom: 1px solid #eee;
}
.main-container {
  max-width: calc(23rem + 6px);
  border: 3px solid transparent;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.main-container:hover {
  border: 3px #0084ff solid;
  border-radius: 1rem;
}
.on-edit {
  border: 3px red solid;
}
</style>
