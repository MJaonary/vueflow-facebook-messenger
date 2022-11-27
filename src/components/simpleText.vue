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
  textarea.value.style.height = textarea.value.scrollHeight + "px";
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
    <!-- Delete Button and color controls Menu -->
    <topMenu :eid="props.id" :transparent="transparent"></topMenu>
    <!-- Delete Button and color controls Menu -->

    <div
      class="main-container"
      :style="{
        border: selectedColor
          ? '3px red solid'
          : `3px ${localStates.color} solid`,
      }"
    >
      <div class="content">
        <!-- Subtitle part -->
        <textarea
          :id="id + 'subtitle'"
          ref="textarea"
          v-model="localStates.subtitle"
          @input="resizeTextarea"
        >
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
  border-radius: 1rem;
}

textarea {
  width: 100%;
  display: block;
  text-align: left;
  border-radius: 1rem;
  padding: 0.3rem;
  border: 2px rgb(203, 203, 203) dashed;
  outline: transparent;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 0.2rem;
  width: 100%;
  border-radius: 1rem;
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
