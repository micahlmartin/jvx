import ArrayNode from './ArrayNode';
import ObjectNode from './ObjectNode';
import ValueNode from './ValueNode';

export const nodeTypes = {
  object: ObjectNode,
  array: ArrayNode,
  value: ValueNode,
};

export type { ObjectNodeData } from './ObjectNode';
export type { ArrayNodeData } from './ArrayNode';
export type { ValueNodeData } from './ValueNode';
export type { BaseNodeData } from './BaseNode';

export { default as ObjectNode } from './ObjectNode';
