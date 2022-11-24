<script setup>
import { ref, computed, onMounted } from "vue";
import { Handle, Position } from "@braks/vue-flow";

// Importing Externals Methods
import getId from "../utils/radomId";
////////////////////////////////////////////.

// Icons
import TrashIcon from "../assets/svg/TrashIcon.svg";

// Drag and Drop Functionality
import { Draggable } from "vue3-smooth-dnd";

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

let localButtons = computed(() => {
  return localItems.value?.buttons;
});
////////////////////////////////////////////.

// Value Update related methods all wrapped here
const updateValues = (event, button_id) => {
  switch (event.target.id) {
    case button_id + "button":
      localButtons.value.find((element) => element.id == button_id).text =
        event.target.innerText || "Enter Text";
      break;

    default:
      break;
  }
};
////////////////////////////////////////////.

// Elements related methods.
const deleteElement = (id) => {
  localStates.value.items = Items.value.filter((element) => element.id != id);
};
////////////////////////////////////////////.

// Buttons related methods.
const deleteButton = (id) => {
  localItems.value.buttons = localButtons.value.filter(
    (element) => element.id != id
  );
};

const insertButton = () => {
  localButtons.value.push({
    id: getId(),
    text: `New Button ${localButtons.value.length + 1}`,
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

// Local Variables and props related things.
const transparent = ref(true);
const props = defineProps({
  mid: String,
  id: String,
});
////////////////////////////////////////////.
</script>

<template>
  <Draggable
    class="messenger-container"
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
    data-toggle="tooltip"
    data-placement="left"
    title="Messenger Text and Buttons"
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

    <textarea
      class="bubble"
      ref="textarea"
      :class="{ 'with-buttons': localButtons.length > 0 }"
      v-model="localItems.text"
      @input="resizeTextarea"
    >
    </textarea>

    <!-- Button Poped to request delete element -->
    <div
      class="button-container"
      :class="{ transparent: transparent }"
      style="position: absolute; top: 50%; right: -2.2rem"
      @click="deleteElement(id)"
    >
      <TrashIcon />
    </div>
    <!-- Button Poped to request delete element -->

    <div
      class="d-flex flex-column justify-content-center align-items-center"
      style="width: 100%"
    >
      <!-- Button template : Insert and render -->
      <!-- Button render from localButtons -->
      <div
        v-for="button in localButtons"
        class="button"
        style="position: relative"
      >
        <div
          :id="button.id + 'button'"
          contenteditable="true"
          @input="
            (event) => {
              updateValues(event, button.id);
            }
          "
        >
          {{ button.text }}
        </div>
        <Handle
          :id="button.id + 'right'"
          class="handle"
          type="outupt"
          :position="Position.Right"
          style="top: 1.4rem; left: 100% !important"
        />
        <div
          class="button-container"
          @click="deleteButton(button.id)"
          style="position: absolute; right: 0"
        >
          <TrashIcon />
        </div>
      </div>
      <!-- Button render from localButtons -->
      <div class="button" @click="insertButton" v-if="localButtons.length < 3">
        Insert Button
      </div>
      <!-- Button template : Insert and render -->
    </div>
  </Draggable>
</template>

<style scoped>
[contenteditable]:focus {
  outline: none;
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
  justify-content: center;
  align-items: center;
  border: 2px solid;
  border-radius: 1rem;
  padding-bottom: 0.5rem;
  border: rgb(67, 206, 12) solid;
  margin-bottom: 1rem;
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
  width: 100%;
  white-space: normal;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  color: rgba(0, 0, 0, 1);
  padding: 6px 12px;
  box-sizing: border-box;
  overflow: hidden !important;
  overflow-wrap: break-word;
  display: inline-block;
  border-radius: 1em;
  text-align: left;
}

.bubble.with-buttons {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-bottom: 0;
}
</style>
