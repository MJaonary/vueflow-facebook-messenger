<script setup>
import { ref, computed, watch } from "vue";
import { Handle, Position } from "@braks/vue-flow";

// Simple Id Generator for basic Usage.
import getId from "../utils/radomId.js";

// custom Top Menu import
import topMenu from "./topMenu.vue";

// Icons
import TrashIcon from "../assets/svg/TrashIcon.svg";
import PlayIcon from "../assets/svg/PlayIcon.svg";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

// Computed Values from Store.
let localStates = computed(() => {
  return store.getMessageById(props.id);
});

let localItems = computed(() => {
  return localStates.value.items;
});
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
    style="background-color: white;"
    :style="{ borderColor: selectedColor ? 'red' : '' }"
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

    <div class="main-container">
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
.add-type {
  text-align: left;
  border-radius: 1rem;
  padding: 0.4rem;
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
.items {
  border: 1px #e1faec solid;
  border-radius: 10px;
  padding: 0.8rem;
  color: rgb(120, 120, 120);
  margin: 0.4rem;
  background-color: #e1faec;
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
  max-width: calc(18rem + 6px);
  border: 2px solid black;
  border-top: 2px transparent;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.main-container:hover {
  border: 2px solid #0bcb6b;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
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
</style>
