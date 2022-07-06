<script setup>
import SidebarVue from './Sidebar.vue';
import { useVueFlow } from '@braks/vue-flow'

// Usage of Store Pinia
import { useStore } from '../stores/main.js'
const store = useStore()

const { toObject, setNodes, setEdges, setTransform } = useVueFlow();

// LocalStorage Saving State (temporary usage)
const flowKey = 'example-flow'
const storeKey = 'example-store'

const onSave = () => {
  console.log('Saving State.');
  localStorage.setItem(flowKey, JSON.stringify(toObject()))
  localStorage.setItem(storeKey, JSON.stringify(store))
}

const onRestore = () => {
  console.log('Restoring State.');
  store.$state = JSON.parse(localStorage.getItem(storeKey))
  const flow = JSON.parse(localStorage.getItem(flowKey))
  if (flow) {
    const [x = 0, y = 0] = flow.position
    setNodes(flow.nodes)
    setEdges(flow.edges)
    setTransform({ x, y, zoom: flow.zoom || 0 })
  }
}
// --------------------------------------------
</script>

<template>
    <div class="m-1 border w-25">
        <SidebarVue></SidebarVue>
        <button class="btn border m-1 rounded" @click="onSave">Save</button>
        <button class="btn border m-1 rounded" @click="onRestore">Restore</button>
    </div>
</template>

<style>
</style>