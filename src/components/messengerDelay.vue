<script setup>
import { ref, computed } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

// Computed Values from Store.
let localStates = computed(() => {
  return store.getMessageById(props.mid);
});

let Items = computed(() => {
  return localStates.value.items;
});

let localItems = computed(() => {
  return store.getItemById(props.mid, props.id);
});
////////////////////////////////////////////.

// Elements related methods.
const deleteElement = (id) => {
  localStates.value.items = Items.value.filter((element) => element.id != id);
};
////////////////////////////////////////////.

// Local Variables and props related things.
const transparent = ref(true);
const props = defineProps({
  mid: String,
  id: String,
});
////////////////////////////////////////////.
</script>

<template>
  <div
    class="messenger-container"
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
    data-toggle="tooltip"
    data-placement="left"
    title="Messenger Delay"
  >
    <!-- Handle for registering comments -->
    <Handle
      :id="id + 'comment'"
      class="handle"
      type="input"
      :position="Position.Left"
      style="top: 10%; left: -3.5% !important"
    />
    <!-- Handle for registering comments -->

    <!-- Adding image viewer -->
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 304.547 304.547"
      style="enable-background: new 0 0 304.547 304.547"
      xml:space="preserve"
      class="delay"
    >
      <g>
        <g>
          <g>
            <path
              d="M279.924,69.575c-3.803-5.837-12.088-6.611-17.014-1.685c-3.644,3.644-4.301,9.344-1.483,13.661
				c14.949,22.931,22.958,50.763,20.717,80.607c-4.683,62.432-54.571,113.656-116.887,119.721
				C83.267,289.862,14.68,221.274,22.668,139.29C28.59,78.473,77.578,29.194,138.342,22.773c31.37-3.316,60.69,4.736,84.659,20.357
				c4.317,2.813,10.017,2.156,13.661-1.489c4.926-4.926,4.153-13.211-1.684-17.015C205.091,5.15,168.064-4.204,128.642,1.808
				C63.789,11.703,11.76,63.52,1.833,128.368c-15.701,102.574,71.755,190.036,174.335,174.346
				c64.853-9.916,116.675-61.945,126.571-126.798C308.756,136.494,299.396,99.461,279.924,69.575z"
            />
            <path
              d="M150.064,174.929v-0.004V92.458c0-6.081-4.932-11.018-11.018-11.018s-11.018,4.932-11.018,11.018v93.484
				c0,6.081,4.932,11.018,11.018,11.018h93.484c6.086,0,11.013-4.932,11.013-11.018c0-6.081-4.932-11.013-11.013-11.013H150.064z"
            />
          </g>
        </g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
    <!-- Adding image viewer -->

    <input
      type="text"
      class="image_source_input"
      v-model="localItems.delay_to_wait"
      placeholder="Enter Delay in millisecond"
    />

    <!-- Button Poped to request delete element -->
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
    <!-- Button Poped to request delete element -->
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: none;
}
.delay {
  width: 2rem;
  height: 2rem;
  margin-top: 0.5rem;
}
.image_source_input {
  width: 90%;
  margin-top: 0.25rem;
  overflow: hidden;
  text-align: center;
  border-radius: 1rem;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid;
  border-radius: 1rem;
  padding-bottom: 0.5rem;
  border: rgb(219, 13, 102) solid;
  margin-bottom: 1rem;
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
</style>
