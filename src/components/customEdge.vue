<script setup>
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useVueFlow,
} from "@vue-flow/core";
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

const onClick = (evt, id) => {
  applyEdgeChanges([{ type: "remove", id }]);
  evt.stopPropagation();
};

const getRightLefttEdge = (props) => {
  return [
    `
  M ${props.sourceX - 7.5} ${props.sourceY}
  L ${props.sourceX + 15} ${props.sourceY}

  Q ${props.sourceX + 30} ${props.sourceY}  
  ${props.sourceX + 30} ${
      props.sourceY + (props.sourceY > props.targetY ? -15 : +15)
    }
  L ${props.sourceX + 30} ${
      props.targetY - (props.sourceY > props.targetY ? 45 : 75)
    }
  Q ${props.sourceX + 30} ${props.targetY - 60} 
   ${props.sourceX + 15} ${props.targetY - 60}
  L ${props.targetX - 30} ${props.targetY - 60}
  Q ${props.targetX - 45} ${props.targetY - 60}
   ${props.targetX - 45} ${props.targetY - 45}
  L ${props.targetX - 45} ${props.targetY - 15}
  Q ${props.targetX - 45} ${props.targetY}
   ${props.targetX - 30} ${props.targetY}
  L ${props.targetX} ${props.targetY}`,
    (props.sourceX + props.targetX) / 2,
    props.targetY - 60,
  ];
};

const getBottomLeftEdge = (props) => {
  return [
    `
  M ${props.sourceX} ${props.sourceY - 7.5}
  L ${props.sourceX} ${props.sourceY + 15}
  Q ${props.sourceX} ${props.sourceY + 30}
   ${props.sourceX - 15} ${props.sourceY + 30}
  L ${props.targetX - 15} ${props.sourceY + 30}
  Q ${props.targetX - 30} ${props.sourceY + 30}
   ${props.targetX - 30} ${
      props.sourceY + parseInt(props.sourceY < props.targetY - 30 ? 45 : 15)
    }
  L ${props.targetX - 30} ${
      props.targetY + parseInt(props.sourceY < props.targetY - 30 ? -15 : 15)
    }
  Q  ${props.targetX - 30} ${props.targetY} 
    ${props.targetX - 15} ${props.targetY}
  L ${props.targetX} ${props.targetY}
`,
    props.targetX - 15,
    props.targetY,
  ];
};

const getCurvedEdge = (props, margin = 8) => {
  return [
    `M${props.sourceX + margin}, ${props.sourceY} C ${props.sourceX} ${
      props.targetY
    } ${props.sourceX} ${props.targetY} ${props.targetX}, ${props.targetY}`,
    (props.sourceX + props.targetX) / 2,
    props.targetY,
  ];
};

const getDirectLine = (props) => {
  return [
    `M ${props.sourceX} ${props.sourceY} L ${props.targetX} ${props.targetY}`,
    (props.sourceX + props.targetX) / 2,
    (props.sourceY + props.targetY) / 2,
  ];
};

const validated = (validation) => {
  if (validation === true) {
    strokeColor.value = "#8492a6";
  } else {
    strokeColor.value = "red";
  }
  return;
};

const path = computed(() => {
  const [Q1, Q2, Q3, Q4] = [
    props.sourceX < props.targetX && props.sourceY > props.targetY,
    props.sourceX > props.targetX && props.sourceY > props.targetY,
    props.sourceX > props.targetX && props.sourceY < props.targetY,
    props.sourceX < props.targetX && props.sourceY < props.targetY,
  ];

  if (props.sourcePosition === "left") {
    if (props.targetPosition === "left") {
      validated(Q2); // TODO : Validate Q3
      return [
        `M ${props.sourceX}, ${props.sourceY} 
        C ${props.targetX}, ${props.sourceY + props.targetY} 
        ${props.targetX - props.sourceX / 8}, ${props.targetY + props.sourceY / 8} 
        ${props.targetX}, ${props.targetY}`,
        props.sourceX - 25,
        props.sourceY,
      ];
    } else if (props.targetPosition === "right") {
      validated(Q2 || Q3);
      return getBezierPath(props);
    } else if (props.targetPosition === "bottom") {
      validated(Q2);
      return [
        `M ${props.sourceX}, ${props.sourceY} C ${props.targetX}, ${props.sourceY} ${props.targetX}, ${props.targetX} ${props.targetX}, ${props.targetY}`,
        props.sourceX - 25,
        props.sourceY,
      ];
    } else {
    }

    return getCurvedEdge(props);
  } else if (props.sourcePosition === "right") {
    if (props.targetPosition === "left") {
      if (/right-redirector/.test(props.id)) { // Redirector Edge
        return getRightLefttEdge(props);
      }
      validated(Q1 || Q4); 
    } else if (props.targetPosition === "right") {
      validated(false);
    } else if (props.targetPosition === "bottom") {
      validated(Q1);
    } else {
    }

    return getBezierPath(props);
  } else if (props.sourcePosition === "bottom") {
    if (props.targetPosition === "left") {
      if (Q3 || Q2) {
        return getBottomLeftEdge(props);
      }
      validated(Q4);
    } else if (props.targetPosition === "right") {
      validated(Q3);
    } else if (props.targetPosition === "bottom") {
      validated(Q3 || Q4);
    } else {
    }

    return getCurvedEdge(props, 0);
  } else {
    if (props.targetPosition === "left") {
    } else if (props.targetPosition === "right") {
    } else if (props.targetPosition === "bottom") {
    } else {
    }
  }

  return getDirectLine(props);
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
  <BaseEdge
    :id="id"
    :style="{
      'stroke-width': 4,
      stroke: strokeColor,
    }"
    :path="path[0]"
    marker-end="url(#triangle)"
    markerWidth="4"
  />

  <defs>
    <marker
      id="triangle"
      viewBox="0 0 1 10"
      refX="1"
      refY="5"
      markerUnits="strokeWidth"
      markerHeight="8"
      markerWidth="8"
      orient="auto"
      :fill="strokeColor"
    >
      <path d="M 0 1.5 L 4 5 L 0 8.5 z" />
    </marker>
  </defs>

  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
        'z-index': 9999,
      }"
      class="nodrag nopan"
    >
      <div class="edge__button_delete" @click="(event) => onClick(event, id)">
        <TrashIcon />
      </div>
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
svg {
  transform: translate(-4%, -4%);
}

.edge__button_delete {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px black solid;
  border-radius: 1rem;
  padding: 0.1rem;
  background-color: #f2f5f7;
  color: rgba(255, 0, 0, 0.796);
}

.edge__button_delete:hover {
  transform: scale(1.2);
  transition: transform 0.5s 0.1s;
}
</style>
