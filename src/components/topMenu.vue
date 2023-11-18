<script setup>
import { computed, ref, watch } from "vue";
import { useVueFlow } from '@vue-flow/core';

// Importing SVG icons
import TrashIcon from "../assets/svg/TrashIcon.svg";
import GearIcon from "../assets/svg/GearIcon.svg";
import Check2All from "../assets/svg/check2-all.svg";
import copyIcon from "../assets/svg/copyIcon.svg";

import { copyVueNode } from "../utils/createVueNode";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

const { addNodes, applyEdgeChanges, applyNodeChanges, getNode, toObject } = useVueFlow();

// Computed Values from Store.
const localStates = computed(() => {
  return store.getMessageById(props.eid);
});

const messages = computed(() => {
  return store.getMessages();
});
////////////////////////////////////////////.

// Elements related methods.
const deleteElement = (event, id) => {
  event.stopPropagation();

  let connectedEdges = toObject().edges.filter((edge) =>
    [edge.target, edge.source].some((item) => item === id)
  );
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

// Ref Targeting Hidden Color Input
const colorInput = ref(null);
const onClickColorInput = () => {
  colorInput.value.click();
};
////////////////////////////////////////////.

// handling container in and out
const hanldeContainer = (e) => {
  menu.value = !menu.value;

  function containerParser(containerNodes) {
    return containerNodes.map((item) => {
      const label = messages.value.find(
        (element) => element.id === item.id
      ).label;
      return { id: item.id, label: label };
    });
  }

  let containersNodes = toObject().nodes.filter(
    (item) => item.type === "container"
  );

  containers.value = containerParser(containersNodes);

  let currentObject = toObject().nodes.filter((item) => item.id === props.eid);
  if (currentObject[0].parentNode) {
    parent.value = currentObject[0].parentNode;
  } else {
    parent.value = null;
  }
};
////////////////////////////////////////////.

// Local variables and props declaration.
const menu = ref(true);
const containers = ref(null);
const parent = ref(null);
const props = defineProps({
  eid: String,
  transparent: Boolean,
});
////////////////////////////////////////////.

// Watch over transparent value
watch(
  () => props.transparent,
  (transparent) => {
    if (transparent === true) {
      menu.value = true;
    }
  }
);
////////////////////////////////////////////.

// Set the parent of the current node.
const setParent = (parentId) => {
  menu.value = true;
  const node = getNode.value(props.eid);
  if (node.parentNode === parentId) {
    delete node.parentNode;
  } else {
    if (parentId !== props.eid) {
      node.parentNode = parentId;
    } else {
      return;
    }
  }
};
////////////////////////////////////////////.

// Handle Copying element
const copyElement = (eid) => {
  copyVueNode(addNodes, eid, getNode, store);
};
////////////////////////////////////////////.
</script>

<template>
  <div class="button-menu-container" :class="{ transparent: transparent }">
    <div>
      <span class="color-input" :style="{ backgroundColor: localStates.color }" @click="onClickColorInput"><input
          ref="colorInput" type="color" class="container-color" v-model="localStates.color" /></span>
    </div>
    <div @click="(event) => deleteElement(event, eid)">
      <TrashIcon class="text-danger" />
    </div>
    <div @click="() => copyElement(eid)">
      <copyIcon />
    </div>
    <div style="position: relative" @click.self="hanldeContainer">
      <GearIcon class="text-primary" @click.stop="hanldeContainer" />
      <div :class="{ transparent: menu }" class="menu-container">
        <div style="width: 80%; border-bottom: 1px black solid">
          Parent Container
        </div>
        <ul>
          <li v-for="item in containers" @click="
            () => {
              setParent(item.id);
            }
          ">
            <div :style="{
              width: item.id === parent ? '90%' : '100%',
            }">
              {{ item.label }}
            </div>
            <div v-if="item.id === parent">
              <Check2All class="text-primary" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
li div {
  transition: opacity 0.5s 0s;
}

/* Button Menu Top Container */
.button-menu-container {
  display: flex;
  margin-bottom: 0.1rem;
  background-color: white;
  width: auto;
  border-radius: 1rem;
  overflow: visible;
  transition: opacity 1s 0.5s;
}

.button-menu-container>div {
  display: flex;
  padding: 0.35rem;
}

.button-menu-container>div:hover {
  background-color: #eee;
}

/* Button Menu Top Container */

/* Colored Color Input with input Hidden */
.color-input {
  width: 0px;
  height: 0px;
  padding: 0.5rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.container-color {
  position: absolute;
  width: 0;
  height: 0;
  transform: translate(-50%, -50%);
  transform: scale(0);
}

/* Colored Color Input with input Hidden */

.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: white;
  border-radius: 1rem;
  width: 15rem;
  left: 125%;
  font-size: x-small;
  border: 1px black solid;
  padding: 0.2rem 0.4rem;
}

ul {
  width: 100%;
  padding: 0;
  margin: 0.3rem;
}

li {
  display: flex;
  border: 1px rgb(162, 159, 159) dashed;
  width: 100%;
  border-radius: 0.3rem;
  padding: 0.3rem;
  margin: 0.1rem 0rem;
}

li::marker {
  content: none;
}

li:hover {
  background-color: #eee;
}

li:active {
  transform: scale(1.1);
}

span:hover,
svg:hover {
  cursor: pointer;
}

.transparent {
  opacity: 0%;
  transition: opacity 0.5s 0s;
}
</style>
