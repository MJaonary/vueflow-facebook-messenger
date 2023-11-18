<script>
import messengerTextVue from "./messengerItems/messengerText.vue";
import messengerCardVue from "./messengerItems/messengerCard.vue";
import messengerImageVue from "./messengerItems/messengerImage.vue";
import messengerAudioVue from "./messengerItems/messengerAudio.vue";
import messengerVideoVue from "./messengerItems/messengerVideo.vue";
import messengerFileVue from "./messengerItems/messengerFile.vue";
import messengerDelayVue from "./messengerItems/messengerDelay.vue";
import messengerUserInputVue from "./messengerItems/messengerUserInput.vue";
import messengerDynamicVue from "./messengerItems/messengerDynamic.vue";
export default {
  components: {
    messengerTextVue,
    messengerCardVue,
    messengerImageVue,
    messengerAudioVue,
    messengerVideoVue,
    messengerFileVue,
    messengerDelayVue,
    messengerUserInputVue,
    messengerDynamicVue,
    messengerDynamicVue,
  },
};
</script>

<script setup>
import { computed } from "vue";

// Usage of Store Pinia
import { useStore } from "../stores/main";
const store = useStore();

// Computed Values from Store.
let localStates = computed(() => {
  return store.getMessageById(props.id);
});

const localItems = computed(() => {
  return localStates.value?.items;
});
////////////////////////////////////////////.

// Local variables and props declaration.
const props = defineProps({
  id: String,
  editor: { type: Boolean, default: false },
});
////////////////////////////////////////////.
</script>

<template>
  <component
    v-for="item in localItems"
    :is="item.type"
    :mid="id"
    :id="item.id"
    :editor="props.editor"
  ></component>
</template>

<style scoped></style>
