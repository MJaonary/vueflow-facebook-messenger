<script setup>
import { ref, computed } from "vue";

import SidebarVue from "./Sidebar.vue";
import { useVueFlow } from "@braks/vue-flow";
import { saveAs } from "file-saver";

import getDateAsString from "../utils/getDateasString";

// Usage of Store Pinia
import { useStore } from "../stores/main.js";
const store = useStore();

const { toObject, setNodes, setEdges, setTransform } = useVueFlow();

// LocalStorage Saving State
const storeKey = "vueFlowState";

const onSave = () => {
  alert("Saving State.");
  store.$patch((state) => {
    state.layers.elements = toObject();
  });
  // lastSavedState = JSON.stringify(store.layers);
  localStorage.setItem(storeKey, JSON.stringify(store.layers));
};

const onRestore = (event, fromImport) => {
  let confirmation = true;

  if (!fromImport) {
    confirmation = confirm(
      "Restoring State.\nVous allez perdre tout les données non exportée,\nVoulez vous continuer ?"
    );
  }

  if (confirmation) {
    store.$patch((state) => {
      state.layers = JSON.parse(localStorage.getItem(storeKey));
    });

    const flow = store.layers.elements;

    if (flow) {
      const [x = 0, y = 0] = flow.position;
      setNodes(flow.nodes);
      setEdges(flow.edges);
      setTransform({ x, y, zoom: flow.zoom || 0 });
    }
  }
};

const onExport = () => {
  onSave();

  let name = prompt("Exportation, veuiller entrer un nom de fichier :");

  let blob = new Blob([JSON.stringify(store.layers)], {
    type: "text/plain;charset=utf-8",
  });

  saveAs(blob, name || getDateAsString() + ".txt");
};
////////////////////////////////////////////.

const onImport = () => {
  if (!importedFile.value) {
    alert("Vous devez selectionner un fichier à importer.");
  } else {
    if (
      confirm(
        "Vous allez perdre tout les données non exportée,\nVoulez vous continuer ?"
      )
    ) {
      localStorage.setItem(storeKey, importedFile.value);
      onRestore(null, true);
    }
  }
};
////////////////////////////////////////////.

// Function trigered on imported file change.
const fileSelected = (e) => {
  importedFileName.value = e.target.value.replace(/.*[\/\\]/, "");
  reader.readAsText(inputFileOne.value.files[0]);
};
////////////////////////////////////////////.

// Local Variables and props related things.
let inputFileOne = ref(null);
let importedFile = ref(null);
let importedFileName = ref("");
////////////////////////////////////////////.

// Creating a new file reader and registering
// an onload function that store the file content
const reader = new FileReader();
reader.onload = (e) => {
  importedFile.value = e.target.result;
  alert(
    `File ${importedFileName.value} a été chargée, vous pouvez l'importer.`
  );
};
////////////////////////////////////////////.
</script>

<template>
  <div class="border rounded w-25">
    <SidebarVue></SidebarVue>
    <div class="border">
      <button class="btn border rounded" @click="onSave">Save</button>
      <button class="btn border rounded" @click="onRestore">Restore</button>
      <button class="btn border rounded" @click="onExport">Export</button>
      <button class="btn border rounded" @click="onImport">Import</button>
    </div>
    <div class="options border file-input">
      <label for="file"
        >{{ importedFileName || "Select file" }}
        <input
          type="file"
          class="file"
          ref="inputFileOne"
          name="inputfile"
          id="inputfile"
          @change="fileSelected"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
.file-input label:hover {
  transform: scale(1.02);
}
.file-input label {
  display: block;
  position: relative;
  width: auto;
  height: 3rem;
  border-radius: 2rem;
  padding: 1rem;
  background: linear-gradient(40deg, #297cbc, #16d462);
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  transition: transform 0.2s ease-out;
  overflow: hidden;
}
.file {
  opacity: 0%;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
}
.btn {
  font-size: small;
  margin: 2px;
}
.btn:hover {
  background-color: #eee;
}
.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  margin: 0.2rem;
  padding: 0.5rem;
}
</style>
