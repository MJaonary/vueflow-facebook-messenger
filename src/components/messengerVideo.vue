<script setup>
import { ref, computed } from "vue";
import { Handle, Position, useVueFlow } from "@braks/vue-flow";

// Importing Externals Methods
import getId from "../utils/radomId";
////////////////////////////////////////////.

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
      localStates.value.items
        .find((element) => element.id == props.id)
        .buttons.find((element) => element.id == button_id).text =
        event.target.innerText || "Enter Text";
      break;

    case props.id + "number":
      localItems.value.number = event.target.innerText || "Card Video Comment";
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

// Local Variables and props related things.
const transparent = ref(true);
const props = defineProps({
  mid: String,
  id: String,
});
// Default image value :
const default_video_src_value =
  "https://drive.google.com/uc?export=view&confirm=yTib&id=1g8uCFA1CDKMvVsPwb8V8ayk-3Mop3_Hu";

// Default image value :
const default_image_src_value =
  "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
////////////////////////////////////////////.
</script>

<template>
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

  <div
    class="messenger-container"
    @mouseenter="transparent = false"
    @mouseleave="transparent = true"
    data-toggle="tooltip"
    data-placement="left"
    title="Messenger Video"
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
    <img :src="default_image_src_value" alt="" v-show="!localItems.video_url" />
    <video
      v-show="localItems.video_url"
      :src="localItems.video_url"
      muted
      controls
    />
    
    <input
      type="text"
      v-model="localItems.video_url"
      placeholder="Enter Source here"
    />
    <!-- Adding image viewer -->

    <input
      type="text"
      v-model="localItems.link"
      placeholder="Facebook URL or Attachement ID"
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
        type="input"
        :position="Position.Right"
        style="top: 1.4rem; left: 100% !important"
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
    <!-- Button render from localButtons -->
    <div class="button" @click="insertButton" v-if="localButtons.length < 1">
      Insert Button
    </div>
    <!-- Button template : Insert and render -->
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: none;
}
input {
  width: 90%;
  margin-top: 0.25rem;
  overflow: hidden;
  text-align: center;
  border-radius: 1rem;
}
img, video {
  border-radius: 1rem;
  width: 94%;
  height: 9rem;
  object-fit: contain;
  margin-top: 0.2rem;
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
  border: rgb(219, 13, 219) solid;
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
</style>
