<script setup>
import { ref, computed } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";

import getId from "../utils/radomId";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

const props = defineProps({
  mid: String,
  id: String,
});

let localStates = computed(() => {
  return store.messages.filter((element) => element.id == props.mid)[0];
});

let localItems = computed(() => {
  return localStates.value.items.filter((element) => element.id == props.id)[0];
});

let localButtons = computed(() => {
  return localItems.value?.buttons;
});

const updateValues = (event) => {
  switch (event.target.id) {
    case props.id + "message-text":
      localItems.value.text = event.target.innerText;
      break;

    default:
      break;
  }
};

const deleteElement = (id) => {
  localStates.value.items = localStates.value.items.filter(
    (element) => element.id != id
  );
};

const deleteButton = (id) => {
  localStates.value.items.filter(
    (element) => (element.id = props.id)
  )[0].buttons = localButtons.value.filter((element) => element.id != id);
};

const insertButton = () => {
  localStates.value.items
    .filter((element) => (element.id = props.id))[0]
    .buttons.push({
      id: getId(),
      text: `New Button ${localButtons.value.length + 1}`,
    });
};

const transparent = ref(true);
</script>

<template>
  <div
    class="d-flex flex-column align-items-center messenger-container"
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
  >
    <div
      type="text"
      class="bubble with-buttons"
      :id="id + 'message-text'"
      contenteditable
      @input="updateValues"
      style="position: relative"
    >
      {{ localItems.text }}
    </div>
    <div
      class="button-container"
      :class="{ transparent: transparent }"
      style="position: absolute; top: 50%; right: -2.2rem"
      @click="deleteElement(id)"
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
      v-for="button in localButtons"
      class="button"
      style="position: relative"
    >
      <div>{{ button.text }}</div>
      <Handle
        :id="button.id + 'right'"
        class="handle"
        type="input"
        :position="Position.Right"
        style="left: 0; top: 1.4rem; left: 100% !important"
      />
      <div
        class="button-container"
        @click="deleteButton(button.id)"
        style="position: absolute; right: 0"
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
    </div>
    <div class="button" @click="insertButton" v-if="localButtons.length < 3">
      Insert Button
    </div>
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: 3px solid #e1faec;
}

.handle {
  background-color: white;
  width: 1rem;
  height: 1rem;
  border: 2px solid;
  position: absolute;
  top: 5rem;
  left: -5px !important;
}

.handle:hover {
  width: 1.3rem;
  height: 1.3rem;
  transition: width, height 0.5s;
}

.messenger-container {
  position: relative;
  border: 2px solid;
  border-radius: 1rem;
  padding-bottom: 0.5rem;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed;
  border-radius: 1rem;
  width: 90%;
  margin-top: 0.5rem;
  height: 3rem;
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

.bubble {
  min-width: 18rem;
  white-space: pre-wrap;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  color: rgba(0, 0, 0, 1);
  margin: 1px;
  padding: 6px 12px;
  box-sizing: border-box;
  clear: left;
  overflow-wrap: break-word;
  display: inline-block;
  border-radius: 1em;
  text-align: left;
  -webkit-appearance: textarea;
}

.bubble.with-buttons {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-bottom: 0;
}
</style>
