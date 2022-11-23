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
        <div>
          <div class="d-flex align-items-center">
            <div
              class="d-flex justify-content-center align-items-center"
              style="
                background-color: blue;
                color: white;
                border-radius: 50%;
                width: 2.5rem;
                height: 2rem;
              "
            >
              <CardText />
            </div>
            <div style="width: 100%">
              <div class="p-1 starting-step-header d-flex flex-column">
                <div
                  style="
                    font-size: x-small;
                    color: #7e8c9e;
                    height: 8px;
                    margin-bottom: 3px;
                  "
                >
                  Vue Flow
                </div>
                Simple text
              </div>
            </div>
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
        <div>
          <div class="d-flex align-items-center">
            <div
              class="d-flex justify-content-center align-items-center"
              style="
                background-color: blue;
                color: white;
                border-radius: 50%;
                width: 2.5rem;
                height: 2rem;
              "
            >
              <DashSquare />
            </div>
            <div style="width: 100%">
              <div class="p-1 starting-step-header d-flex flex-column">
                <div
                  style="
                    font-size: x-small;
                    color: #7e8c9e;
                    height: 8px;
                    margin-bottom: 3px;
                  "
                >
                  Vue Flow
                </div>
                Box With Title
              </div>
            </div>
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
        <div>
          <div class="d-flex align-items-center">
            <div
              class="d-flex justify-content-center align-items-center"
              style="
                background-color: #7e8c9e;
                color: white;
                border-radius: 50%;
                width: 2.5rem;
                height: 2rem;
              "
            >
              <Box />
            </div>
            <div style="width: 100%">
              <div class="p-1 starting-step-header d-flex flex-column">
                <div
                  style="
                    font-size: x-small;
                    color: #7e8c9e;
                    height: 8px;
                    margin-bottom: 3px;
                  "
                >
                  Vue Flow
                </div>
                Container
              </div>
            </div>
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
        <div>
          <div class="d-flex align-items-center">
            <div
              class="d-flex justify-content-center align-items-center"
              style="
                background-color: #7e8c9e;
                color: white;
                border-radius: 50%;
                width: 2.5rem;
                height: 2rem;
              "
            >
              <Arrow90Down />
            </div>
            <div style="width: 100%">
              <div class="p-1 starting-step-header d-flex flex-column">
                <div
                  style="
                    font-size: x-small;
                    color: #7e8c9e;
                    height: 8px;
                    margin-bottom: 3px;
                  "
                >
                  Vue Flow
                </div>
                Redirector Edge
              </div>
            </div>
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
        <div>
          <div class="d-flex align-items-center">
            <div
              class="d-flex justify-content-center align-items-center"
              style="
                background-color: red;
                color: white;
                border-radius: 50%;
                width: 2.5rem;
                height: 2rem;
              "
            >
              <BiGoogle />
            </div>
            <div style="width: 100%">
              <div class="p-1 starting-step-header d-flex flex-column">
                <div
                  style="
                    font-size: x-small;
                    color: #7e8c9e;
                    height: 8px;
                    margin-bottom: 3px;
                  "
                >
                  Vue Flow
                </div>
                Google Embed Frame
              </div>
            </div>
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
        <div>
          <div class="d-flex align-items-center">
            <div
              class="d-flex justify-content-center align-items-center"
              style="
                background-color: #0bcb6b;
                color: white;
                border-radius: 50%;
                width: 2rem;
                height: 2rem;
              "
            >
              <CardImage />
            </div>
            <div style="width: 100%">
              <div class="p-1 starting-step-header d-flex flex-column">
                <div
                  style="
                    font-size: x-small;
                    color: #7e8c9e;
                    height: 8px;
                    margin-bottom: 3px;
                  "
                >
                  Vue Flow
                </div>
                <div>Image</div>
              </div>
            </div>
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
        <div>
          <div class="d-flex align-items-center">
            <div
              class="d-flex justify-content-center align-items-center"
              style="
                background-color: #0bcb6b;
                color: white;
                border-radius: 50%;
                width: 2rem;
                height: 2rem;
              "
            >
              <PlayIcon />
            </div>
            <div style="width: 100%">
              <div class="p-1 starting-step-header d-flex flex-column">
                <div
                  style="
                    font-size: x-small;
                    color: #7e8c9e;
                    height: 8px;
                    margin-bottom: 3px;
                  "
                >
                  Facebook
                </div>
                <div>Starting Step</div>
              </div>
            </div>
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
        <div>
          <div class="d-flex align-items-center">
            <div style="width: 2rem; height: 2rem">
              <Messenger />
            </div>
            <div style="width: 100%">
              <div class="p-1 starting-step-header d-flex flex-column">
                <div
                  style="
                    font-size: x-small;
                    color: #7e8c9e;
                    height: 8px;
                    margin-bottom: 3px;
                  "
                >
                  Facebook
                </div>
                <div>Send Message</div>
              </div>
            </div>
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

.quick-reply {
  margin: 0.3rem;
  padding: 0.5rem;
  border-radius: 10rem;
  border: 3px rgb(58, 140, 199) solid;
  font-size: small;
}

.element-dragable {
  width: 14rem;
  border-radius: 10rem;
  border: 3px rgb(58, 140, 199) solid;
}

.element-dragable:hover {
  border-color: green;
}

.element-dragable:active {
  border-color: red;
}
</style>
