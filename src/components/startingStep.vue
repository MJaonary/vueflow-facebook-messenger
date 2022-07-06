<script setup>
import { ref, computed } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";

// Simple Id Generator for basic Usage.
import getId from "../utils/radomId.js";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

const { applyNodeChanges } = useVueFlow();

// Default id is passed from the component.
const props = defineProps({
  id: String,
});

let localStates = computed(() => {
  return store.messages.filter((element) => element.id == props.id)[0];
});

let localItems = computed(() => {
  return localStates.value.items;
});

const transparent = ref(true);

const deleteElement = (event, id) => {
  applyNodeChanges([{ type: "remove", id }]);
  event.stopPropagation();
  store.messages = store.messages.filter((element) => {
    return element.id != id;
  });
};

const deleteItemId = (id) => {
  localStates.value.items = localItems.value.filter((element) => {
    return element.id != id;
  });
};

const addItem = () => {
  localItems.value.push({ id: getId(), keyword: "Insert Keyword" });
};

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
</script>

<template>
  <Handle
    id="right"
    class="handle"
    type="input"
    :position="Position.Right"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="24"
              fill="currentColor"
              class="bi bi-caret-right"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
              />
            </svg>
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
          v-for="items in localItems"
          class="items d-flex justify-content-center align-items-center"
          style="position: relative"
        >
          <div
            class="col-11"
            :id="items.id"
            contenteditable="true"
            @input="updateValues"
          >
            {{ items.keyword }}
          </div>
          <div class="text-danger" @click="deleteItemId(items.id)">
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
  transform: scale(1.5);
  transform-origin: left bottom;
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
