<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { Handle, Position } from '@vue-flow/core'

// custom Top Menu import
import topMenu from "./topMenu.vue";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

// Computed Values from Store.
let localStates = computed(() => {
  return store.getMessageById(props.id);
});
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
  <Handle
    id="bottom"
    class="handle"
    type="input"
    :position="Position.Bottom"
    style="top: 101%"
  />
  <!-- Handle for different utilities -->

  <div
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
    class="d-flex flex-column align-items-center"
  >
    <!-- Delete Button and color controls -->
    <topMenu :eid="props.id" :transparent="transparent"></topMenu>
    <!-- Delete Button and color controls -->

    <div
      class="main-container"
      :style="{
        border: selectedColor
          ? '3px red solid'
          : `3px ${localStates.color} solid`,
      }"
    >
      <!-- Label part -->
      <div class="d-flex align-items-center justify-content-center">
        <input class="label" v-model="localStates.label" />
      </div>
      <!-- Label part -->

      <div class="content">
        <!-- Title part -->
        <input
          class="title"
          @input="updateValues"
          v-model="localStates.title"
          placeholder="Title"
        />
        <!-- Title part -->

        <!-- Subtitle part -->
        <textarea
          :id="id + 'subtitle'"
          ref="textarea"
          v-model="localStates.subtitle"
          @input="resizeTextarea"
          placeholder="Subtitle"
        >
          {{ localStates.subtitle }}
        </textarea>
        <!-- Subtitle part -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0.2rem 0.1rem 0.1rem 0.1rem;
  width: 100%;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  cursor: pointer;
}

.container-color {
  width: 1rem;
  height: 1rem;
  margin-right: 5px;
  border-radius: 1rem;
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

.main-container {
  width: calc(18rem + 6px);
  height: 100%;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
}

.main-container:hover {
  border: 3px solid #d5cb07;
  border-radius: 1rem;
}

.label {
  text-align: center;
  padding: 0.5rem;
  width: 100%;
  background-color: white;
  border: transparent;
  border-bottom: 1px gray solid;
  outline: transparent;
}

textarea {
  width: 99%;
  display: block;
  text-align: left;
  border-radius: 1rem;
  margin-bottom: 0.1rem;
  padding: 0.4rem;
  border: 2px rgb(203, 203, 203) dashed;
  outline: transparent;
}

.title {
  text-align: left;
  padding: 0.4rem;
  margin-bottom: 0.2rem;
  font-weight: bold;
  width: 95%;
  border: transparent;
  border-bottom: 2px grey dashed;
  outline: transparent;
}
</style>
