<script>
import messengerTextVue from "./messengerText.vue";
import messengerCardVue from "./messengerCard.vue";
import messengerImageVue from "./messengerImage.vue";
import messengerAudioVue from "./messengerAudio.vue";
import messengerVideoVue from "./messengerVideo.vue";
import messengerFileVue from "./messengerFile.vue";
import messengerDelayVue from "./messengerDelay.vue";
import messengerUserInputVue from "./messengerUserInput.vue";
import messengerDynamicVue from "./messengerDynamic.vue";
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
    messengerDynamicVue,messengerDynamicVue
  },
};
</script>

<script setup>
import { computed } from "vue";

import { useStore } from "../stores/main";
const store = useStore();

const props = defineProps({
  id: String,
});

const localStates = computed(() => {
  return store.messages.filter((element) => element.id == props.id)[0];
});

const localItems = computed(() => {
  return localStates.value?.items;
});
</script>

<template>
  <component
    v-for="item in localItems"
    :is="item.type"
    :mid="id"
    :id="item.id"
  ></component>
</template>

<style scoped>
</style>
