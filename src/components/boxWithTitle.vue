<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";

// Icons
import TrashIcon from "../assets/svg/TrashIcon.svg";

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
const updateValues = (event) => {
  switch (event.target.id) {
    case props.id + "label":
      localStates.value.label = event.target.innerText || "Label";
      break;
  }
};
////////////////////////////////////////////.

// Elements related methods.
const deleteElement = (event, id) => {
  event.stopPropagation();

  let connectedEdges = toObject().edges.filter((edge) => [edge.target, edge.source].some(item => item === id));
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

// Renderless resizable textarea
const textarea = ref(null); // Access the textarea by his ref.

const resizeTextarea = (event) => {
  event.target.style.height = "auto";
  event.target.style.height = event.target.scrollHeight + 4 + "px";
};

onMounted(() => {
  textarea.value.style.height = textarea.value.scrollHeight + 4 + "px";
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
const props = defineProps({
  id: String,
  selected: Boolean,
});
////////////////////////////////////////////.
</script>

<template>
  <!-- Handle for different utilities -->
  <Handle id="right" class="handle" type="input" :position="Position.Right" />
  <Handle id="left" class="handle" type="input" :position="Position.Left" />
  <Handle id="bottom" class="handle" type="input" :position="Position.Bottom" style="top: 101%" />
  <!-- Handle for different utilities -->

  <div @mouseenter="transparent = false" @mouseleave="transparent = true" class="d-flex flex-column align-items-center">
    <!-- Delete Button and color controls -->
    <div class="d-flex button-container" :class="{ transparent: transparent }" style="margin-bottom: 0.5rem">
      <input type="color" class="container-color" v-model="localStates.color"
        :style="{ backgroundColor: `${localStates.color}` }" />
      <TrashIcon @click="(event) => deleteElement(event, id)" />
    </div>
    <!-- Delete Button and color controls -->

    <div class="main-container" :style="{
      border: selectedColor
        ? '3px red solid'
        : `3px ${localStates.color} solid`,
    }">
      <div class="starting-step">
        <!-- Label part -->
        <div class="d-flex align-items-center justify-content-center">
          <div class="p-2 starting-step-header" :id="id + 'label'" contenteditable="true" @input="updateValues">
            {{ localStates.label }}
          </div>
        </div>
        <!-- Label part -->
      </div>
      <div class="content">
        <!-- Title part -->
        <input class="add-title" @input="updateValues" v-model="localStates.title" placeholder="Title" />
        <!-- Title part -->

        <!-- Subtitle part -->
        <textarea :id="id + 'subtitle'" ref="textarea" v-model="localStates.subtitle" @input="resizeTextarea"
          placeholder="Subtitle">
          {{ localStates.subtitle }}
        </textarea>
        <!-- Subtitle part -->
      </div>
    </div>
  </div>
</template>

<style scoped>
[contenteditable]:focus,
textarea:focus {
  outline: 2px #74747463 solid;
  border-radius: 1rem;
}

.container-color {
  width: 1rem;
  height: 1rem;
  margin-right: 5px;
  border-radius: 1rem;
}

.add-title {
  text-align: left;
  border-radius: 1rem;
  padding: 0.4rem;
  margin-bottom: 0.4rem;
  font-weight: bold;
  width: 90%;
}

textarea {
  width: 95%;
  display: block;
  text-align: left;
  border-radius: 1rem;
  padding: 0.4rem;
  border: 2px rgb(203, 203, 203) dashed;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  width: 18rem;
  height: 3rem;
  font-size: medium;
  text-align: left;
  padding-left: 0.5rem;
  padding-top: 0.3rem;
  background-color: rgba(255, 255, 255, 0.442);
}

.starting-step {
  border-bottom: 1px solid #eee;
}

.main-container {
  width: calc(18rem + 6px);
  height: 100%;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.main-container:hover {
  border: 3px solid #d5cb07;
  border-radius: 1rem;
}
</style>
