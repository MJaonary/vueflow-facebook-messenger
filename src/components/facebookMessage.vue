<script setup>
import { ref, computed, watch } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";

import messageRendererVue from "./messageRenderer.vue";

// Icons
import TrashIcon from "../assets/svg/TrashIcon.svg";
import Messenger from "../assets/svg/Messenger.svg";


// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

const { applyNodeChanges, applyEdgeChanges, toObject } = useVueFlow();

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
  event.stopPropagation();

  let connectedEdges = toObject().edges.filter((edge) => edge.target === id);
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
      <TrashIcon />
    </div>
    <div
      class="main-container"
      :class="{ 'on-edit': messageToEdit == id }"
      :style="{ borderColor: selectedColor ? 'red' : '' }"
    >
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
