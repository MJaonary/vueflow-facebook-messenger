<script setup>
import { ref, computed, onMounted } from "vue";
import { Handle, Position } from "@vue-flow/core";

// Importing Store Pinia
import { useStore } from "../../stores/main.js";

// Simple Id Generator for basic Usage.
import getId from "../../utils/radomId";

// Importing SVG icons
import TrashIcon from "../../assets/svg/TrashIcon.svg";

// Drag and Drop Functionality
import { Draggable } from "vue3-smooth-dnd";

// Local variables and props declaration.
const transparent = ref(true);
const props = defineProps({
  mid: String,
  id: String,
  editor: Boolean,
});
////////////////////////////////////////////.

// Usage of Store Pinia
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

let localDefaultAction = computed(() => {
  return localItems.value.default_action;
});

const default_image_src_value = computed(() => {
  return store.getDefaultValues().image;
});
////////////////////////////////////////////.

// Value update related methods are defined here.
const updateValues = (event, button_id) => {
  switch (event.target.id) {
    case props.id + "title":
      localItems.value.title = event.target.innerText || "Title";
      break;

    case props.id + "number":
      localItems.value.number = event.target.innerText || "Card Comment";
      break;

    case button_id + "button":
      localStates.value.items
        .find((element) => element.id == props.id)
        .buttons.find((element) => element.id == button_id).text =
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
  localStates.value.items.find((element) => element.id == props.id).buttons =
    localButtons.value.filter((element) => element.id != id);
};

const insertButton = () => {
  localStates.value.items
    .find((element) => element.id == props.id)
    .buttons.push({
      id: getId(),
      text: `New Button ${localButtons.value.length + 1}`,
    });
};
////////////////////////////////////////////.

// Default Action related methods.
// Very similar to button but one element only
// And not editable.
const insertDefaultAction = () => {
  localStates.value.items
    .find((element) => element.id == props.id)
    .default_action.push({
      id: getId(),
      text: `Default Action`,
    });
};

const deleteDefaultAction = (id) => {
  localStates.value.items.find(
    (element) => element.id == props.id
  ).default_action = localDefaultAction.value.filter(
    (element) => element.id != id
  );
};
////////////////////////////////////////////.

// Renderless resizable textarea
const textarea = ref(null); // Access the textarea by his ref.

const resizeTextarea = ($event) => {
  $event.target.style.height = "auto";
  $event.target.style.height = $event.target.scrollHeight + 4 + "px";
};

onMounted(() => {
  textarea.value.style.height = textarea.value.scrollHeight + 4 + "px";
});
////////////////////////////////////////////.
</script>

<template>
  <Draggable>
    <!-- Card Header, used as comment -->
    <div
      class="number"
      contenteditable="true"
      :id="id + 'number'"
      @input="updateValues"
    >
      {{ localItems.number }}
    </div>
    <!-- Card Header, used as comment -->

    <!-- Card template, Simple And Usable -->
    <div
      class="messenger-container"
      @mouseenter="transparent = false"
      @mouseleave="transparent = true"
      data-toggle="tooltip"
      data-placement="left"
      title="Messenger Carousel"
    >
      <!-- Handle for registering comments -->
      <Handle
        v-if="props.editor === false"
        :id="id + 'comment'"
        class="handle"
        type="target"
        :position="Position.Left"
        style="top: 10%; left: -3.5% !important"
      />
      <!-- Handle for registering comments -->

      <!-- Handle for registering comments -->
      <Handle
        v-if="props.editor === false"
        :id="id + 'right'"
        class="handle"
        type="source"
        :position="Position.Right"
        style="top: 10%; left: 98% !important"
      />
      <!-- Handle for registering comments -->

      <!-- Adding image viewer -->
      <img
        :src="localItems.image_url || default_image_src_value"
        style="width: 100%; height: 9rem; object-fit: contain"
      />
      <input
        type="text"
        :id="id + 'image_url'"
        class="image_source_input"
        v-model="localItems.image_url"
        placeholder="Enter Image Source here"
      />
      <!-- Adding image viewer -->

      <!-- Title Template -->
      <div
        class="content"
        :id="id + 'title'"
        contenteditable
        @input="updateValues"
      >
        {{ localItems.title }}
      </div>
      <!-- Title Template -->

      <!-- Subtitle Template -->
      <textarea
        ref="textarea"
        v-model="localItems.subtitle"
        @input="resizeTextarea"
        placeholder="Subtitle"
      >
      </textarea>
      <!-- Subtitle Template -->

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

      <!-- Default Action template : Insert and render -->
      <!-- Default Action render from localDefaultAction -->
      <div
        v-for="button in localDefaultAction"
        class="button"
        style="position: relative"
      >
        <div>
          {{ button.text }}
        </div>
        <Handle
          v-if="props.editor === false"
          :id="button.id + 'right'"
          class="handle"
          type="source"
          :position="Position.Right"
          style="top: 1.4rem; left: 100% !important"
        />
        <div
          class="button-container"
          @click="deleteDefaultAction(button.id)"
          style="position: absolute; right: 0"
        >
          <TrashIcon />
        </div>
      </div>
      <!-- Default Action render from localButtons -->
      <div
        class="button"
        @click="insertDefaultAction"
        v-if="localDefaultAction.length < 1"
      >
        Insert Default Action
      </div>
      <!-- Default Action template : Insert and render -->

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
          v-if="props.editor === false"
          :id="button.id + 'right'"
          class="handle"
          type="source"
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
      <div
        v-if="localButtons.length < 3"
        class="button"
        @click="
          (event) => {
            insertButton();
          }
        "
      >
        Insert Button
      </div>
      <!-- Button template : Insert and render -->
    </div>
    <!-- Card template, Simple And Usable -->
  </Draggable>
</template>

<style scoped>
[contenteditable]:focus {
  outline: none;
}

.image_source_input {
  width: 90%;
  margin-top: 0.25rem;
  overflow: hidden;
  text-align: center;
  border-radius: 1rem;
}

.number {
  border-top: 3px #eee dashed;
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
  border: rgb(8, 210, 236) solid;
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

textarea,
.content {
  width: 90%;
  height: fit-content;
  border-radius: 1rem;
  margin-top: 0.2rem;
  padding: 0.5rem;
  text-align: left;
  border: 2px solid;
  display: inline-block;
}

.content {
  font-weight: bold;
}
</style>
