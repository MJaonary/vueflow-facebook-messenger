<script setup>
const onDragStart = (event, nodeType) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/vueflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }
};
</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane.</div>
    <div
      class="border nodes d-flex flex-column justify-content-center align-items-center"
    >
      <div
        class="vue-flow__node-default m-1 element-dragable"
        :draggable="true"
        @dragstart="onDragStart($event, 'container')"
      >
        Container Node
      </div>
      <div
        class="vue-flow__node-output m-1"
        :draggable="true"
        @dragstart="onDragStart($event, 'free-mind')"
      >
        Free Mind
      </div>

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="24"
                fill="currentColor"
                class="bi bi-caret-right"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 800"
                width="32"
                height="32"
              >
                <radialGradient
                  id="a"
                  cx="101.9"
                  cy="809"
                  r="1.1"
                  gradientTransform="matrix(800 0 0 -800 -81386 648000)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" style="stop-color: #09f" />
                  <stop offset=".6" style="stop-color: #a033ff" />
                  <stop offset=".9" style="stop-color: #ff5280" />
                  <stop offset="1" style="stop-color: #ff7061" />
                </radialGradient>
                <path
                  fill="url(#a)"
                  d="M400 0C174.7 0 0 165.1 0 388c0 116.6 47.8 217.4 125.6 287 6.5 5.8 10.5 14 10.7 22.8l2.2 71.2a32 32 0 0 0 44.9 28.3l79.4-35c6.7-3 14.3-3.5 21.4-1.6 36.5 10 75.3 15.4 115.8 15.4 225.3 0 400-165.1 400-388S625.3 0 400 0z"
                />
                <path
                  fill="#FFF"
                  d="m159.8 501.5 117.5-186.4a60 60 0 0 1 86.8-16l93.5 70.1a24 24 0 0 0 28.9-.1l126.2-95.8c16.8-12.8 38.8 7.4 27.6 25.3L522.7 484.9a60 60 0 0 1-86.8 16l-93.5-70.1a24 24 0 0 0-28.9.1l-126.2 95.8c-16.8 12.8-38.8-7.3-27.5-25.2z"
                />
              </svg>
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
      <div
        class="quick-reply"
        :draggable="true"
        @dragstart="onDragStart($event, 'quick-reply')"
      >
        Quick Reply
      </div>
    </div>
  </aside>
</template>

<style>
.quick-reply {
  margin: 0.3rem;
  padding: 0.5rem;
  border-radius: 10rem;
  border: 3px rgb(58, 140, 199) solid;
  color: rgb(58, 140, 199);
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
