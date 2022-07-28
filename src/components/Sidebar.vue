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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-card-text"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                />
                <path
                  d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-dash-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                />
                <path
                  d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-box"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"
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
                  Vue Flow
                </div>
                Container
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Container Custom Template -->

      <!-- Container Custom Template -->
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-90deg-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.854 14.854a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V3.5A2.5 2.5 0 0 1 6.5 1h8a.5.5 0 0 1 0 1h-8A1.5 1.5 0 0 0 5 3.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4z"
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
                  Vue Flow
                </div>
                Redirector Edge
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Container Custom Template -->

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-google"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="currentColor"
                class="bi bi-card-image"
                viewBox="0 0 16 16"
              >
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path
                  d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"
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
