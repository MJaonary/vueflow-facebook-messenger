<script setup>
import { ref, computed } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";

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

const deleteElement = (event, id) => {
  applyNodeChanges([{ type: "remove", id }]);
  event.stopPropagation();
  store.messages = store.messages.filter((element) => {
    return element.id != id;
  });
};

const updateValues = (event) => {
  switch (event.target.id) {
    case props.id + "title":
      localStates.value.title = event.target.innerText || "Title";
      break;

    case props.id + "subtitle":
      localStates.value.subtitle = event.target.innerText || "Description";
      break;

    case props.id + "label":
      localStates.value.label = event.target.innerText;
      break;
  }
};

const transparent = ref(true);
</script>

<template>
  <Handle id="right" class="handle" type="input" :position="Position.Right" />
  <Handle id="left" class="handle" type="input" :position="Position.Left" />
  <Handle
    id="bottom"
    class="handle"
    type="input"
    :position="Position.Bottom"
    style="top: 101%"
  />
  <div
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
    class="d-flex flex-column align-items-center"
  >
    <div
      class="d-flex button-container"
      :class="{ transparent: transparent }"
      style="margin-bottom: 0.5rem"
    >
      <input
        type="color"
        class="container-color"
        v-model="localStates.color"
        :style="{ backgroundColor: `${localStates.color}` }"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-trash3 delete-button"
        viewBox="0 0 16 16"
        @click="(event) => deleteElement(event, id)"
      >
        <path
          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
        />
      </svg>
    </div>
    <div
      class="main-container"
      :style="{ border: `3px ${localStates.color} solid` }"
    >
      <div class="starting-step">
        <div class="d-flex align-items-center justify-content-center">
          <div
            class="p-2 starting-step-header"
            :id="id + 'label'"
            contenteditable="true"
            @input="updateValues"
          >
            {{ localStates.label }}
          </div>
        </div>
      </div>
      <div class="content">
        <div
          class="add-type"
          :id="id + 'title'"
          contenteditable="true"
          @input="updateValues"
        >
          {{ localStates.title }}
        </div>
        <div
          class="add-type"
          :id="id + 'subtitle'"
          contenteditable="true"
          @input="updateValues"
        >
          {{ localStates.subtitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: 3px solid #e1faec;
}
.container-color {
  width: 1rem;
  height: 1rem;
  margin-right: 5px;
  border-radius: 1rem;
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
.button-container {
  background-color: white;
  padding: 5px;
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
.delete-button:hover {
  background-color: #eee;
  border-radius: 1rem;
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
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.main-container:hover {
  border: 3px solid #d5cb07;
  border-radius: 1rem;
}
</style>
