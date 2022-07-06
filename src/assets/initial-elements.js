import { MarkerType, Position } from '@braks/vue-flow'

/**
 * You can pass elements together as a v-model value
 * or split them up into nodes and edges and pass them to the `nodes` and `edges` props of Vue Flow (or useVueFlow composable)
 */
export const initialElements = [
  {id: '1', type: 'input', label: 'Node 1', position: {x:1, y:1}, sourcePosition: Position.Right}
]
