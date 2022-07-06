<script>
import messengerTextVue from './messengerText.vue';
export default {
    components: {
        messengerTextVue
    }
}
</script>

<script setup>
import { computed } from 'vue'

import { useStore } from '../stores/main';
const store = useStore()

const props = defineProps({
    id: String,
})

const localStates = computed(() => {
    return store.messages.filter(element => element.id == props.id)[0]
})

const localItems = computed(() => {
    return localStates.value.items
})
</script>

<template>
    <component 
        v-for="item in localItems" 
        :is="item.type"
        :mid="id"
        :id="item.id"
    ></component>
</template>

<style>
</style>