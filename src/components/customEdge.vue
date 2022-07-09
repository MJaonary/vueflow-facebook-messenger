<script setup>
import { getBezierPath, getEdgeCenter, useVueFlow } from "@braks/vue-flow";
import { computed, ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
});

const { applyEdgeChanges } = useVueFlow();

const foreignObjectSize = 40;

const onClick = (evt, id) => {
  applyEdgeChanges([{ type: "remove", id }]);
  evt.stopPropagation();
};

const getCustomStraightLine = (prop) => {
  return `
  M ${prop.sourceX - 7.5} ${prop.sourceY}
  L ${prop.sourceX + 10} ${prop.sourceY}
  L ${prop.sourceX + 10} ${prop.targetY - 130}
  L ${prop.targetX - 30} ${prop.targetY - 130}
  L ${prop.targetX - 30} ${prop.targetY}
  L ${prop.targetX} ${prop.targetY}`;
};

const getStraightLine = (prop) => {
  return `
  M ${prop.sourceX} ${prop.sourceY - 7.5}
  L ${prop.sourceX} ${prop.targetY}
  L ${prop.targetX} ${prop.targetY}`;
};

const getCustomEdgePosition = (prop) => {
  return [(prop.sourceX + prop.targetX) / 2, prop.targetY - 130, 0, 0];
};

const getEdgePosition = (prop) => {
  return [prop.sourceX, (prop.sourceY + prop.targetY) / 2, 0, 0];
}

const edgePath = computed(() => {
  const args = {
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  };
  if (props.targetX < props.sourceX) {
    return getCustomStraightLine(args);
  } else if (props.sourcePosition == "bottom") {
    return getStraightLine(args);
  } else {
    return getBezierPath(args);
  }
});

const center = computed(() => {
  const args = {
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  };
  if (props.targetX < props.sourceX) {
    return getCustomEdgePosition(args);
  } else if (props.sourcePosition == "bottom") {
    return getEdgePosition(args);
  } else {
    return getEdgeCenter(args);
  }
});

// Local Variables and props related things.
let strokeColor = ref("#8492a6");
////////////////////////////////////////////.
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <defs>
    <marker
      id="triangle"
      viewBox="0 0 10 10"
      refX="1"
      refY="5"
      markerUnits="strokeWidth"
      markerWidth="10"
      markerHeight="10"
      orient="auto"
      :fill="strokeColor"
    >
      <path d="M 0 1.5 L 4 5 L 0 8.5 z" />
    </marker>
  </defs>
  <path
    fill="none"
    :stroke="strokeColor"
    :stroke-width="4"
    :d="edgePath"
    marker-end="url(#triangle)"
    style="position: relative"
  />
  <foreignObject
    :width="foreignObjectSize"
    :height="foreignObjectSize"
    :x="center[0] - foreignObjectSize / 2"
    :y="center[1] - foreignObjectSize / 2"
    requiredExtensions="http://www.w3.org/1999/xhtml"
  >
    <body
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
      "
    >
      <div class="button-delete-edge" @click="(event) => onClick(event, id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash3"
          viewBox="0 0 16 16"
        >
          <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
          />
        </svg>
      </div>
    </body>
  </foreignObject>
</template>

<style scoped>
.button-delete-edge {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px black solid;
  border-radius: 1rem;
  padding: 0.1rem;
  background-color: #f2f5f7;
  color: rgba(255, 0, 0, 0.796);
}

.button-delete-edge:hover {
  transform: scale(1.2);
  transition: transform 0.5s 0.1s;
}
</style>
