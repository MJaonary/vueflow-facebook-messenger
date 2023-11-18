<script setup>
import SidebarTemplate from "./SidebarTemplate.vue";

// Importing SVG icons
import Arrow90Down from "../../assets/svg/Arrow90Down.svg";
import BiGoogle from "../../assets/svg/BiGoogle.svg";
import Box from "../../assets/svg/Box.svg";
import CardImage from "../../assets/svg/CardImage.svg";
import CardText from "../../assets/svg/CardText.svg";
import DashSquare from "../../assets/svg/DashSquare.svg";
import Messenger from "../../assets/svg/Messenger.svg";
import PlayIcon from "../../assets/svg/PlayIcon.svg";
import QuickReply from "../../assets/svg/QuickReply.svg";

const templates = [
  {
    type: 'simple-text',
    title: 'Vue Flow',
    subtitle: 'Simple text',
    logoColor: 'blue',
    logoComponent: CardText,
  },
  {
    type: 'box-with-title',
    title: 'Vue Flow',
    subtitle: 'Box With Title',
    logoColor: 'blue',
    logoComponent: DashSquare,
  },
  {
    type: 'container',
    title: 'Vue Flow',
    subtitle: 'Container',
    logoColor: '#7e8c9e',
    logoComponent: Box,
  },
  {
    type: 'redirector',
    title: 'Vue Flow',
    subtitle: 'Redirector Edge',
    logoColor: '#7e8c9e',
    logoComponent: Arrow90Down,
  },
  {
    type: 'free-mind',
    title: 'Vue Flow',
    subtitle: 'Simple Iframe',
    logoColor: 'red',
    logoComponent: BiGoogle,
  },
  {
    type: 'node-image',
    title: 'Vue Flow',
    subtitle: 'Image',
    logoColor: '#0bcb6b',
    logoComponent: CardImage,
  },
  {
    type: 'starting-step',
    title: 'Facebook',
    subtitle: 'Starting Step',
    logoColor: '#0bcb6b',
    logoComponent: PlayIcon,
  },
  {
    type: 'facebook-message',
    title: 'Facebook',
    subtitle: 'Send Message',
    logoColor: '',
    logoComponent: Messenger,
  },
  {
    type: 'quick-reply',
    title: 'Vue Flow',
    subtitle: 'Quick Reply',
    logoColor: '#0bcbff',
    logoComponent: QuickReply,
  },
];
</script>

<template>
  <aside>
    <h1 class="mt-2">Flowchart Basic Nodes</h1>
    <div class="container">
      <SidebarTemplate v-for="template in templates" v-bind="template" />
    </div>
  </aside>
</template>

<style scoped>
h1 {
  font-size: 1rem;
}

.container {
  border-top: 1px #eee solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
