<script setup>
import { ref, computed, watch } from "vue";

import { Handle, Position, useVueFlow } from '@vue-flow/core'

// custom Top Menu import
import topMenu from "./topMenu.vue";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

const { applyNodeChanges, applyEdgeChanges, toObject } = useVueFlow();

// Computed Values from Store.
let localStates = computed(() => {
  return store.getMessageById(props.id);
});
////////////////////////////////////////////.

// Value Update related methods all wrapped here
const updateValues = (e) => {
  localStates.value.label = e.target.innerText;
};
////////////////////////////////////////////.

// Elements related methods.
const deleteElement = (event, id) => {
  event.stopPropagation();

  let connectedEdges = toObject().edges.filter((edge) =>
    [edge.target, edge.source].some((item) => item === id)
  );
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
  <svg
    class="container-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 120"
    :fill="localStates.color"
  >
    <path
      style="transform: scale(6.5) translate(0.075rem, 0.15rem)"
      d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"
    />
    <foreignObject
      x="0"
      y="0"
      width="100%"
      height="100%"
      style="position: relative; border-radius: 1rem; overflow: visible"
      @mouseenter="transparent = false"
      @mouseleave="transparent = true"
    >
      <div
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          font-size: 5px;
          transform: translate(-50%, -50%);
        "
      >
        <!-- Delete Button and color controls Menu -->
        <topMenu
          :eid="props.id"
          :transparent="transparent"
          style="position: absolute; transform: translate(-54%, -25%)"
        ></topMenu>
        <!-- Delete Button and color controls Menu -->
      </div>

      <Handle
        :id="id + 'left'"
        class="handle"
        type="input"
        :position="Position.Left"
        style="top: 50%; left: 0%"
      />

      <Handle
        :id="id + 'right'"
        class="handle"
        type="input"
        :position="Position.Right"
        style="top: 50%; right: 0"
      />

      <Handle
        :id="id + 'bottom'"
        class="handle"
        type="input"
        :position="Position.Bottom"
        style="top: 67%"
      />
    </foreignObject>
  </svg>
</template>

<style scoped>
svg {
  width: 7rem;
  height: 7rem;
  overflow: visible;
}

[contenteditable]:focus {
  outline: none;
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
}

.handle {
  position: absolute;
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

.resize {
  width: 8rem;
  height: 2rem;
  border-radius: 1rem;
  border: 2px red solid;
}
</style>
