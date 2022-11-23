<script setup>
import { ref, computed, watch } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";


import getId from "../utils/radomId.js";

// Icons
import TrashIcon from "../assets/svg/TrashIcon.svg";
import PlayIcon from "../assets/svg/PlayIcon.svg";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

const { applyNodeChanges } = useVueFlow();

// Computed Values from Store.
let localStates = computed(() => {
  return store.getMessageById(props.id);
});

let localItems = computed(() => {
  return localStates.value.items;
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

// Items related methods.
const deleteItemId = (id) => {
  localStates.value.items = localItems.value.filter((element) => {
    return element.id != id;
  });
};

const addItem = () => {
  localItems.value.push({ id: getId(), keyword: "Enter Keywords" });
};
////////////////////////////////////////////.

// Value Update related methods all wrapped here
const updateValues = (event, id) => {
  switch (event.target.id) {
    case props.id + "type":
      localStates.value.content = event.target.innerText;
      break;

    case props.id + "label":
      localStates.value.label = event.target.innerText;
      break;

    case id + "items":
      localStates.value.items.find((element) => element.id == id).keyword =
        event.target.innerText;
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
const props = defineProps({
  id: String,
  selected: Boolean,
});
////////////////////////////////////////////.
</script>

<template>
  <Handle
    :id="id + 'right'"
    type="input"
    class="handle"
    :position="Position.Right"
  />
  <Handle
    :id="id + 'bottom'"
    class="handle"
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
      @click="
        ($event) => {
          deleteElement($event, id);
        }
      "
    >
      <TrashIcon />
    </div>
    <div
      class="main-container"
      :style="{ borderColor: selectedColor ? 'red' : '' }"
    >
      <div class="starting-step">
        <div class="d-flex align-items-center">
          <div
            class="d-flex justify-content-center align-items-center"
            style="
              background-color: #0bcb6b;
              color: white;
              border-radius: 50%;
              width: 2rem;
              height: 2rem;
            "
          >
            <PlayIcon />
          </div>
          <div class="p-2 starting-step-header">Starting Step</div>
        </div>
      </div>
      <div class="content">
        <div
          class="add-type"
          :id="id + 'type'"
          contenteditable="true"
          @input="updateValues"
        >
          {{ localStates.content }}
        </div>
        <div
          v-for="item in localItems"
          class="items d-flex justify-content-center align-items-center"
          style="position: relative"
        >
          <div
            class="col-11"
            :id="item.id + 'items'"
            contenteditable="true"
            @input="
              ($event) => {
                updateValues($event, item.id);
              }
            "
          >
            {{ item.keyword }}
          </div>
          <Handle
            :id="item.id + 'right'"
            class="handle"
            type="input"
            :position="Position.Right"
            style="top: 1.4rem; left: 100% !important"
          />
          <div class="text-danger" @click="deleteItemId(item.id)">
            <TrashIcon />
          </div>
        </div>
        <div class="add-items" @click="addItem()">Add Triggers</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: 3px solid #e1faec;
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
.add-type {
  text-align: left;
  border-radius: 1rem;
  padding: 0.4rem;
}
.items {
  border: 1px #e1faec solid;
  border-radius: 10px;
  padding: 0.8rem;
  color: rgb(120, 120, 120);
  margin: 0.4rem;
  background-color: #e1faec;
}
.add-items {
  border: 1px rgb(120, 120, 120) dashed;
  border-radius: 5px;
  padding: 0.8rem;
  color: rgb(120, 120, 120);
  margin: 0.4rem;
}
.add-items:hover {
  background-color: #eee;
  color: #0084ff;
}
.add-items:active {
  cursor: grabbing;
}
.content {
  background-color: #fff;
  padding: 0.5rem 1rem 0.5rem 1rem;
  width: 100%;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  cursor: pointer;
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
  width: 18rem;
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
  max-width: calc(18rem + 6px);
  border: 3px solid transparent;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.main-container:hover {
  border: 3px solid #0bcb6b;
  border-radius: 1rem;
}
</style>
