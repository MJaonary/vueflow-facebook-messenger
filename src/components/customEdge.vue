<script setup>
import { getBezierPath, getEdgeCenter, useVueFlow } from "@braks/vue-flow";
import { computed, ref } from "vue";

// Icons
import TrashIcon from "../assets/svg/TrashIcon.svg";

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
        <TrashIcon />
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
