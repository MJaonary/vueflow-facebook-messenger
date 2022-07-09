<script>
import "@braks/vue-flow/dist/style.css";
import "@braks/vue-flow/dist/theme-default.css";
</script>

<script setup>
import {
  MiniMap,
  Background,
  BackgroundVariant,
  Controls,
  VueFlow,
  useVueFlow,
} from "@braks/vue-flow";
import { computed, h, onMounted, ref } from "vue";

import container from "./components/container.vue";

// Manychat Copy Components.
import startingStep from "./components/startingStep.vue";
import facebookMessage from "./components/facebookMessage.vue";
import messageEditorVue from "./components/messageEditor.vue";
import messengerQuickReplyVue from "./components/messengerQuickReply.vue";
import freeMindVue from "./components/freeMind.vue";
import imageContainerVue from "./components/imageContainer.vue";
import boxWithTitleVue from "./components/boxWithTitle.vue";
import simpleTextVue from "./components/simpleText.vue";
// ------------------------.
import globalMenuVue from "./components/globalMenu.vue";
import redirectorEdgeVue from "./components/redirectorEdge.vue";

// Custom Connection line and Custom Edge
import customConnectionLine from "./components/customConnectionLine.vue";
import customEdgeVue from "./components/customEdge.vue";

// Simple Id Generator for basic Usage.
import getId from "./utils/radomId.js";

// Usage of Store Pinia
import { useStore } from "./stores/main.js";
const store = useStore();

const { setInteractive, onConnect, addEdges, addNodes, project, onPaneReady } =
  useVueFlow();

const elements = ref([]);

// Initialize elements values here.
// onMounted(() => {
//   elements.value = []
// })

// Methods that helps, centering the vue.
onPaneReady(({ fitView }) => {
  fitView();
});

// The dragAndDrop function that helps creating new nodes
// Just by dragging elements into the canvas.
// DragOver from the Sidebars.
const onDragOver = (event) => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
};

// The onDrop event handler that is responsible for the creation
const onDrop = (event) => {
  let id = getId();

  // console.log(event.target.parentNode);
  const type = event.dataTransfer?.getData("application/vueflow");
  const position = project({ x: event.clientX - 450, y: event.clientY - 20 });

  const newNode = {
    id: id,
    type,
    position,
    label: `${type} node`,
  };

  switch (type) {
    case "facebook-message":
      store.$patch((state) => {
        state.messages.push({
          id: id,
          type: "facebook-message",
          label: "Label",
          items: [
            // {
            //   id: getId(),
            //   type: "messengerTextVue",
            //   text: "Entre le Message",
            //   buttons: [],
            // },
            // {
            //   id: getId(),
            //   type: "messengerCardVue",
            //   number: 'Card Comment',
            //   image_url: '',
            //   title: "Title",
            //   subtitle: "Subtitle",
            //   default_action: [],
            //   buttons: [],
            // },
            // {
            //   id: getId(),
            //   type: "messengerImageVue",
            //   number: "Card Comment",
            //   image_url: "",
            //   link: "Facebook URL or Attachement ID",
            //   buttons: [],
            // },
          ],
        });
      });
      break;

    case "starting-step":
      store.$patch((state) => {
        state.messages.push({
          id: id,
          type: "starting-step",
          label: "Label",
          content: "Type",
          items: [],
        });
      });
      break;

    case "container":
      newNode.id = `container${id}`;
      store.$patch((state) => {
        state.messages.push({
          id: newNode.id,
          type: "container",
          label: "Label",
          width: "10em",
          height: "10em",
          color: "#000000",
        });
      });
      break;

    case "redirector":
      newNode.id = `redirector${id}`;
      store.$patch((state) => {
        state.messages.push({
          id: newNode.id,
          type: "redirector",
          label: "Label",
          width: "10em",
          height: "10em",
          color: "#000000",
        });
      });
      break;

    case "node-image":
      newNode.id = `node-image${id}`;
      store.$patch((state) => {
        state.messages.push({
          id: newNode.id,
          type: "node-image",
          label: "Label",
          src: "",
          width: "300px",
          height: "120px",
          color: "#000000",
        });
      });
      break;

    case "free-mind":
      newNode.id = `free-mind${id}`;
      store.$patch((state) => {
        state.messages.push({
          id: newNode.id,
          type: "free-mind",
          label: "Label",
          src: "",
          width: "25em",
          height: "14em",
          color: "#000000",
        });
      });
      break;

    case "box-with-title":
      newNode.id = `box-with-title${id}`;
      store.$patch((state) => {
        state.messages.push({
          id: newNode.id,
          type: "box-with-title",
          label: "Label",
          title: "Title",
          subtitle: "Subtitle",
          color: "#000000",
        });
      });
      break;

    default:
      break;
  }

  // Implementation of a basic container catching
  // TODO : update parent dynamicaly
  if (event.target.parentNode.id.substring(-1, 9) == "container") {
    console.log("in a container");
    newNode.parentNode = event.target.parentNode.id;
    newNode.extent = "parent";
  }

  addNodes([newNode]);
};

// OnConnect node event, there is more work to do here.
onConnect((params) => {
  // console.log(params);
  (params.type = "custom"), (params.animated = false);
  // params.style = {};
  // params.markerEnd = MarkerType.ArrowClosed;
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
        :select-nodes-on-drag="true"
        :max-zoom="50"
        :min-zoom="0.05"
        @dragover="onDragOver"
        @drop="onDrop"
        @nodeDoubleClick="onClick"
      >
        <Background :variant="BackgroundVariant.Lines" />

        <!-- Custom Connection from example -->
        <template #connection-line="props">
          <customConnectionLine v-bind="props" />
        </template>

        <!-- Custom Edge from example -->
        <template #edge-custom="props">
          <customEdgeVue v-bind="props" />
        </template>
        <template #node-redirector="props">
          <redirectorEdgeVue v-bind="props" />
        </template>

        <!-- Imported Custom Templates -->
        <template #node-container="props">
          <container :id="props.id" />
        </template>
        <template #node-starting-step="props">
          <startingStep :id="props.id" />
        </template>
        <template #node-facebook-message="props">
          <facebookMessage :id="props.id" />
        </template>
        <template #node-quick-reply="props">
          <messengerQuickReplyVue :id="props.id" />
        </template>
        <template #node-free-mind="props">
          <freeMindVue :id="props.id" />
        </template>
        <template #node-node-image="props">
          <imageContainerVue :id="props.id" />
        </template>
        <template #node-box-with-title="props">
          <boxWithTitleVue :id="props.id" />
        </template>
        <template #node-simple-text="props">
          <simpleTextVue :id="props.id" />
        </template>

        <!-- End of importing templates -->
        <Controls />
        <MiniMap v-show="messageToEdit == ''" />
      </VueFlow>
    </div>

    <messageEditorVue
      v-show="messageToEdit != ''"
      :id="messageToEdit"
    ></messageEditorVue>
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

.vue-flow__minimap {
  background-color: #2c3e50a6;
  transform: scale(75%);
  transform-origin: bottom right;
}

.customnodeflow .vue-flow__node-custom {
  border: 1px solid #777;
  padding: 10px;
  border-radius: 10px;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  max-width: 250px;
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

.animated-bg-gradient {
  background: linear-gradient(122deg, #6f3381, #81c7d4, #fedfe1, #fffffb);
  background-size: 800% 800%;
  -webkit-animation: gradient 4s ease infinite;
  animation: gradient 4s ease infinite;
}

.vue-flow {
  background-color: #f2f5f7;
}

.vue-flow__edges {
  z-index: 9999 !important;
}

.handle {
  cursor: pointer !important;
}
</style>
