<script>
// Importing vueflow specific stylesheet
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
////////////////////////////////////////////.
</script>

<script setup>
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background, Controls, MiniMap } from "@vue-flow/additional-components";
import { onMounted, ref } from "vue";

// Initials Elements
import { initialElements } from "./assets/initial-elements";

import container from "./components/container.vue";

// Manychat Copy Components.
import startingStep from "./components/startingStep.vue";
import facebookMessage from "./components/facebookMessage.vue";
import messageEditorVue from "./components/messageEditor.vue";
import messengerQuickReplyVue from "./components/messengerQuickReply.vue";
import iframeVue from "./components/iframe.vue";
import imageContainerVue from "./components/imageContainer.vue";
import boxWithTitleVue from "./components/boxWithTitle.vue";
import simpleTextVue from "./components/simpleText.vue";
////////////////////////////////////////////.

import globalMenuVue from "./components/globalMenu.vue";
import redirectorEdgeVue from "./components/redirectorEdge.vue";

// Custom Connection line and Custom Edge
import customConnectionLine from "./components/customConnectionLine.vue";
import customEdgeVue from "./components/customEdge.vue";
////////////////////////////////////////////.

// Externalise node creation process on Drop here
import { createVueNode } from "./utils/createVueNode";
////////////////////////////////////////////.

// Usage of Store Pinia
import { useStore } from "./stores/main.js";
const store = useStore();

const { setInteractive, onConnect, addEdges, addNodes, project, onPaneReady } =
  useVueFlow();

// Initialize elements values here.
// onMounted(() => {
//   elements.value = []
// })

// Methods that helps, centering the vue.
onPaneReady(({ fitView }) => {
  fitView();
});
////////////////////////////////////////////.

// The dragAndDrop function that helps creating new nodes
// Just by dragging elements into the canvas.
// DragOver from the Sidebars.
const onDragOver = (event) => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
};
////////////////////////////////////////////.

// The onDrop event handler that is responsible for the creation
const onDrop = (event) => {
  // console.log(event.target.parentNode);
  createVueNode(event, addNodes, project, store);
};
////////////////////////////////////////////.

// OnConnect node event, there is more work to do here.
onConnect((params) => {
  (params.type = "custom"), (params.animated = false);
  addEdges([params]);
});
////////////////////////////////////////////.

// Handling Clicked message to the message editor
// OnClick : connect message clicked to the message editor.
const onClick = (event) => {
  if (event.node.type == "facebook-message") {
    if (messageToEdit.value == event.node.id) {
      messageToEdit.value = "";
    } else {
      messageToEdit.value = event.node.id;
    }
  }
  store.messageToEdit = messageToEdit.value;
};
////////////////////////////////////////////.

// Implementation of a global key listener
let onKeyUp = (event) => {
  switch (event.key) {
    case "AltGraph":
      setInteractive(true);
      break;

    // Close the editor if Escape key is pressed
    case "Escape":
      messageToEdit.value = "";
      break;

    default:
      break;
  }
};

let onKeyDown = (event) => {
  switch (event.key) {
    case "AltGraph":
      setInteractive(false);
      break;

    default:
      break;
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
});
////////////////////////////////////////////.

// Local Variables and props related things.
let messageToEdit = ref("");
const elements = ref(initialElements);
////////////////////////////////////////////.

// Removing data from the message store if delete button used
const onChange = (event) => {
  event.forEach((element) => {
    if (element.type == "remove") {
      store.layers.messages = store.layers.messages.filter((item) => {
        return item.id != element.id;
      });
    }
  });
};
////////////////////////////////////////////.
</script>

<template>
  <!-- {{ store }} -->
  <div class="d-flex border" style="height: 100vh">
    <globalMenuVue></globalMenuVue>

    <div
      class="m-1 border"
      id="vue_flow"
      oncontextmenu="return false;"
      style="position: relative; width: 95%"
    >
      <VueFlow
        v-model="elements"
        class="customnodeflow"
        :snap-to-grid="true"
        :select-nodes-on-drag="true"
        :only-render-visible-elements="true"
        :max-zoom="50"
        :min-zoom="0.05"
        @dragover="onDragOver"
        @drop="onDrop"
        @nodeDoubleClick="onClick"
        @nodesChange="onChange"
      >
        <Background pattern-color="#999" gap="16" size="1.2" />

        <!-- Custom Connection from example -->
        <template #connection-line="props">
          <customConnectionLine v-bind="props" />
        </template>
        <!-- Custom Connection from example -->

        <!-- Custom Edge from example -->
        <template #edge-custom="props">
          <customEdgeVue v-bind="props" />
        </template>
        <!-- Custom Edge from example -->

        <!-- Redirector used as a proxy, for returning edges -->
        <template #node-redirector="props">
          <redirectorEdgeVue v-bind="props" />
        </template>
        <!-- Redirector used as a proxy, for returning edges -->

        <!-- Imported Custom Templates -->
        <template #node-container="props">
          <container :id="props.id" :selected="props.selected" />
        </template>
        <template #node-starting-step="props">
          <startingStep :id="props.id" :selected="props.selected" />
        </template>
        <template #node-facebook-message="props">
          <facebookMessage :id="props.id" :selected="props.selected" />
        </template>
        <template #node-quick-reply="props">
          <messengerQuickReplyVue :id="props.id" :selected="props.selected" />
        </template>
        <template #node-free-mind="props">
          <iframeVue :id="props.id" :selected="props.selected" />
        </template>
        <template #node-node-image="props">
          <imageContainerVue :id="props.id" :selected="props.selected" />
        </template>
        <template #node-box-with-title="props">
          <boxWithTitleVue :id="props.id" :selected="props.selected" />
        </template>
        <template #node-simple-text="props">
          <simpleTextVue :id="props.id" :selected="props.selected" />
        </template>
        <!-- End of importing Custom templates -->

        <Controls />
        <MiniMap v-show="messageToEdit === ''" />
      </VueFlow>
    </div>

    <!-- Message Editor extension -->
    <messageEditorVue
      v-if="messageToEdit != ''"
      :id="messageToEdit"
    ></messageEditorVue>
    <!-- Message Editor extension -->
  </div>
</template>

<style>
html,
body,
#app {
  margin: 0;
  height: 100%;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Vueflow additional components style */
.vue-flow__minimap {
  background-color: #2c3e50a6;
  transform: scale(75%);
  transform-origin: bottom right;
}

.customnodeflow button {
  padding: 5px;
  width: 25px;
  height: 25px;
  border-radius: 25px;
  box-shadow: 0 5px 10px #0000004d;
  cursor: pointer;
}

.customnodeflow button:hover {
  opacity: 0.9;
  transform: scale(105%);
  transition: 0.25s all ease;
}

/* VueFlow Specifics */
.vue-flow {
  background-color: #f2f5f7;
}

.vue-flow__edges {
  z-index: 9999 !important;
}

/* Customize Handle */
.handle {
  cursor: pointer !important;
}

/* Class used to select Control and Control Button */
.vue-flow__controls {
  background-color: white;
  padding: 0.15rem;
  border-radius: 1rem;
}

.vue-flow__controls-button {
  margin: 0.15rem;
  border: 1px grey solid;
}
</style>
