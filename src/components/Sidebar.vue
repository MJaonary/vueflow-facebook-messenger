<script setup>
// Icons
import Arrow90Down from "../assets/svg/Arrow90Down.svg";
import BiGoogle from "../assets/svg/BiGoogle.svg";
import Box from "../assets/svg/Box.svg";
import CardImage from "../assets/svg/CardImage.svg";
import CardText from "../assets/svg/CardText.svg";
import DashSquare from "../assets/svg/DashSquare.svg";
import Messenger from "../assets/svg/Messenger.svg";
import PlayIcon from "../assets/svg/PlayIcon.svg";

const onDragStart = (event, nodeType) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/vueflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }
};
</script>

<template>
  <aside>
    <h1>Flowchart Basic Nodes</h1>
    <div
      class="border nodes d-flex flex-column justify-content-center align-items-center"
    >
      <!-- Simple Text Custom Template -->
      <div
        class="vue-flow__node-output m-1 element-dragable"
        :draggable="true"
        @dragstart="onDragStart($event, 'simple-text')"
      >
        <div class="d-flex align-items-center">
          <div class="Logo" style="background-color: blue">
            <CardText />
          </div>
          <div style="width: 100%">
            <div class="text-header">Vue Flow</div>
            Simple text
          </div>
        </div>
      </div>
      <!-- Simple Text Custom Template -->

      <!-- Box With Title Custom Template -->
      <div
        class="vue-flow__node-output m-1 element-dragable"
        :draggable="true"
        @dragstart="onDragStart($event, 'box-with-title')"
      >
        <div class="d-flex align-items-center">
          <div class="Logo" style="background-color: blue">
            <DashSquare />
          </div>
          <div style="width: 100%">
            <div class="text-header">Vue Flow</div>
            Box With Title
          </div>
        </div>
      </div>
      <!-- Simple Text Custom Template -->

      <!-- Container Custom Template -->
      <div
        class="vue-flow__node-output m-1 element-dragable"
        :draggable="true"
        @dragstart="onDragStart($event, 'container')"
      >
        <div class="d-flex align-items-center">
          <div class="Logo" style="background-color: #7e8c9e">
            <Box />
          </div>
          <div style="width: 100%">
            <div class="text-header">Vue Flow</div>
            Container
          </div>
        </div>
      </div>
      <!-- Container Custom Template -->

      <!-- Redirector Edge Template -->
      <div
        class="vue-flow__node-output m-1 element-dragable"
        :draggable="true"
        @dragstart="onDragStart($event, 'redirector')"
      >
        <div class="d-flex align-items-center">
          <div class="Logo" style="background-color: #7e8c9e">
            <Arrow90Down />
          </div>
          <div style="width: 100%">
            <div class="text-header">Vue Flow</div>
            Redirector Edge
          </div>
        </div>
      </div>
      <!-- Redirector Edge Template -->

      <!-- Free Mind Custom Template -->
      <div
        class="vue-flow__node-output m-1 element-dragable"
        :draggable="true"
        @dragstart="onDragStart($event, 'free-mind')"
      >
        <div class="d-flex align-items-center">
          <div class="Logo" style="background-color: red">
            <BiGoogle />
          </div>
          <div style="width: 100%">
            <div class="text-header">Vue Flow</div>
            Simple Iframe
          </div>
        </div>
      </div>
      <!-- Free Mind Custom Template -->

      <!-- Image Custom Template -->
      <div
        class="vue-flow__node-output m-1 element-dragable"
        :draggable="true"
        @dragstart="onDragStart($event, 'node-image')"
      >
        <div class="d-flex align-items-center">
          <div class="Logo" style="background-color: #0bcb6b">
            <CardImage />
          </div>
          <div style="width: 100%">
            <div class="text-header">Vue Flow</div>
            <div>Image</div>
          </div>
        </div>
      </div>
      <!-- Image Custom Template -->

      <!-- Starting Step Custom Template -->
      <div
        class="vue-flow__node-output m-1 element-dragable"
        :draggable="true"
        @dragstart="onDragStart($event, 'starting-step')"
      >
        <div class="d-flex align-items-center">
          <div class="Logo" style="background-color: #0bcb6b">
            <PlayIcon />
          </div>
          <div style="width: 100%">
            <div class="text-header">Facebook</div>
            <div>Starting Step</div>
          </div>
        </div>
      </div>
      <!-- Starting Step Custom Template -->

      <!-- Facebook Send Message Custom Template -->
      <div
        class="vue-flow__node-output m-1 element-dragable"
        :draggable="true"
        @dragstart="onDragStart($event, 'facebook-message')"
      >
        <div class="d-flex align-items-center">
          <div class="Logo">
            <Messenger />
          </div>
          <div style="width: 100%">
            <div class="text-header">Facebook</div>
            <div>Send Message</div>
          </div>
        </div>
      </div>
      <!-- Facebook Send Message Custom Template -->

      <!-- Quick Reply Custom Template -->
      <div
        class="quick-reply"
        :draggable="true"
        @dragstart="onDragStart($event, 'quick-reply')"
      >
        Quick Reply
      </div>
      <!-- Quick Reply Custom Template -->
    </div>
  </aside>
</template>

<style scoped>
h1 {
  font-size: 1rem;
}

.element-dragable {
  width: 14rem;
  border-radius: 1rem;
  border: 3px rgb(58, 140, 199) solid;
}

.element-dragable:hover {
  border-color: green;
}

.element-dragable:active {
  border-color: red;
}

.Logo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.25rem;
  padding: 3px;
}

.quick-reply {
  margin: 0.3rem;
  padding: 0.5rem;
  border-radius: 10rem;
  border: 3px rgb(58, 140, 199) solid;
  font-size: small;
}

.text-header {
  font-size: x-small;
  color: #7e8c9e;
  height: 8px;
  margin-bottom: 3px;
}
</style>
