<script setup>
import { computed } from "vue";
import messageRendererVue from "./messageRenderer.vue";

// Simple Id Generator for basic Usage.
import getId from "../utils/radomId";

// Importing SVG icons
import CardText from "../assets/svg/CardText.svg";
import CardImage from "../assets/svg/CardImage.svg";
import CardIcon from "../assets/svg/CardIcon.svg";
import GalleryIcon from "../assets/svg/GalleryIcon.svg";
import NextAudio from "../assets/svg/NextAudio.svg";
import VideoIcon from "../assets/svg/VideoIcon.svg";
import Attachment from "../assets/svg/Attachment.svg";
import Clock from "../assets/svg/Clock.svg";
import UserInput from "../assets/svg/UserInput.svg";
import CloudIcon from "../assets/svg/CloudIcon.svg";

// Drag and Drop Functionality
import { Container } from "vue3-smooth-dnd";
import applyDrag from "../utils/applyDrag";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

// Computed Values from Store.
const localStates = computed(() => {
  return store.getMessageById(props.id);
});

const localItems = computed(() => {
  return localStates.value?.items;
});
////////////////////////////////////////////.

// Method for adding element to the message editor
const addElement = (type) => {
  let element;
  try {
    switch (type) {
      case "messengerTextVue":
        element = {
          id: getId(),
          type: "messengerTextVue",
          text: "Entre le Message",
          buttons: [],
        };
        break;

      case "messengerImageVue":
        element = {
          id: getId(),
          type: "messengerImageVue",
          number: "Card Image Comment",
          image_url: "",
          link: "",
          buttons: [],
        };
        break;

      case "messengerCardVue":
        element = {
          id: getId(),
          type: "messengerCardVue",
          number: "Card Comment",
          image_url: "",
          title: "Title",
          subtitle: "Subtitle",
          default_action: [],
          buttons: [],
        };
        break;

      case "messengerAudioVue":
        element = {
          id: getId(),
          type: "messengerAudioVue",
          title: "",
          link: "",
        };
        break;

      case "messengerVideoVue":
        element = {
          id: getId(),
          type: "messengerVideoVue",
          number: "Card Video Comment",
          video_url: "",
          link: "",
          buttons: [],
        };
        break;

      case "messengerFileVue":
        element = {
          id: getId(),
          type: "messengerFileVue",
          file_url: "",
          link: "",
        };
        break;

      case "messengerDelayVue":
        element = {
          id: getId(),
          type: "messengerDelayVue",
          delay_to_wait: "",
        };
        break;

      case "messengerUserInputVue":
        element = {
          id: getId(),
          type: "messengerUserInputVue",
          description: "",
        };
        break;

      case "messengerDynamicVue":
        element = {
          id: getId(),
          type: "messengerDynamicVue",
          description: "",
        };
        break;

      default:
        break;
    }

    localStates.value.items.push(element);
  } catch (error) {
    console.error(error);
    console.log("There are no message to handle anymore.");
  }
};
////////////////////////////////////////////.

// Local variables and props declaration.
const props = defineProps({
  id: String,
});
////////////////////////////////////////////.

const onDrop = (dropResult) => {
  let content = applyDrag(localItems.value, dropResult);
  store.setMessageItems(props.id, content);
};
</script>

<template>
  <div class="container-editor">
    <div class="message-editor">
      <Container class="elements-display" @drop="onDrop" orientation="vertical">
        <!-- Vue-flow 1.5.0 Doesn't allow Handle having the same Id to exist -->
        <!-- The simple fix to that is not to display handle on the message editor (drill editor props) -->
        <messageRendererVue :id="id" :editor="true"></messageRendererVue>
      </Container>
      <div class="elements-adder">
        <div class="element" @click="addElement('messengerTextVue')">
          <div class="icons">
            <CardText />
          </div>
          <div>Text</div>
        </div>
        <div class="element" @click="addElement('messengerImageVue')">
          <div class="icons">
            <CardImage />
          </div>
          <div>Image</div>
        </div>
        <div class="element" @click="addElement('messengerCardVue')">
          <div class="icons">
            <CardIcon
              style="transform: scale(1.75); padding: 5px 0px 5px 5px"
            />
          </div>
          <div>Card</div>
        </div>
        <div class="element" @click="addElement('messengerCardVue')">
          <div class="icons">
            <GalleryIcon
              style="transform: scale(1.75); padding: 6px 0px 6px 5px"
            />
          </div>
          <div>Gallery</div>
        </div>
        <div class="element" @click="addElement('messengerAudioVue')">
          <div class="icons">
            <NextAudio />
          </div>
          <div>Audio</div>
        </div>
        <div class="element" @click="addElement('messengerVideoVue')">
          <div class="icons">
            <VideoIcon
              style="transform: scale(1.25); padding: 4px 0px 4px 2px"
            />
          </div>
          <div>Video</div>
        </div>
        <div class="element" @click="addElement('messengerFileVue')">
          <div class="icons">
            <Attachment
              style="transform: scale(1.35); padding: 6px 0px 6px 5px"
            />
          </div>
          <div>File</div>
        </div>
        <div class="element" @click="addElement('messengerDelayVue')">
          <div class="icons">
            <Clock />
          </div>
          <div>Delay</div>
        </div>
        <div class="element" @click="addElement('messengerUserInputVue')">
          <div class="icons">
            <UserInput
              style="transform: scale(1.75); padding: 7px 0px 6px 5px"
            />
          </div>
          <div>User Input</div>
        </div>
        <div class="element" @click="addElement('messengerDynamicVue')">
          <div class="icons">
            <CloudIcon />
          </div>
          <div>Dynamic</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
svg {
  width: 2rem;
  height: 2rem;
  fill: rgba(119, 114, 114, 0.823);
  margin-right: 0.4rem;
}

.element {
  display: flex;
  justify-content: left;
  align-items: center;
  border: 3px #7678797e dashed;
  border-radius: 1rem;
  width: 46%;
  padding: 0rem;
  margin: 1%;
  color: #303030ae;
  text-align: left;
}

.element:hover {
  cursor: pointer;
  background-color: rgba(238, 238, 238, 0.653);
}

.element:active {
  background-color: rgba(201, 199, 199, 0.856);
}

.elements-display {
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  margin: 2%;
  padding: 2%;
}

.elements-adder {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding: 0;
  border-radius: 1rem;
  height: 28rem;
}

.message-editor {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.container-editor {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 2.2%;
  right: 0;
  max-width: 22rem;
  border-radius: 1rem;
  height: 95%;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: white;
}

.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  border-right-width: 3px;
  border-right-color: #7678797e;
  border-right-style: dashed;
  margin-right: 1rem;
  padding-left: 8px;
  height: 100%;
  width: 30%;
}
</style>
