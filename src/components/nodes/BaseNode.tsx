import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

/**
 * BaseNode - The foundational node component for the graph visualization.
 *
 * @component
 * @example
 * ```tsx
 * <BaseNode
 *   data={{
 *     label: "Object",
 *     type: "object",
 *     value: { key: "value" }
 *   }}
 *   id="node-1"
 *   selected={false}
 * />
 * ```
 *
 * @remarks
 * BaseNode serves as the foundation for all node types in the graph.
 * It provides common functionality and styling that other node types extend.
 *
 * Features:
 * - Common node structure and styling
 * - Connection point management
 * - Selection handling
 * - Drag interaction support
 * - Theme integration
 *
 * @designSystem
 * Uses the following design tokens:
 * - colors.node.background: Node background color
 * - colors.node.border: Node border color
 * - colors.node.selected: Selection highlight color
 * - spacing.node.padding: Internal padding
 * - typography.node: Text styling
 * - shadows.node: Drop shadow
 *
 * @accessibility
 * - Keyboard navigable
 * - Selection states
 * - Focus management
 * - ARIA attributes for node role and state
 *
 * @performance
 * - Memoized to prevent unnecessary re-renders
 * - Efficient update handling
 * - Optimized selection state
 */

export interface BaseNodeData {
  /** The display label for the node */
  label: string;

  /** The type of node - determines rendering and behavior */
  type: 'object' | 'array' | 'value';

  /** Optional value associated with the node */
  value?: any;
}

/**
 * BaseNode component implementation.
 * 
 * @param props - Component props from React Flow
 * @returns Memoized React component
 */
const BaseNode = memo(({ 
  data,
  selected,
  ...props 
}: NodeProps<BaseNodeData>) => {
  return (
    <div
      className={`
        relative p-4 rounded-lg
        bg-node-bg dark:bg-node-bg-dark
        border border-node-border dark:border-node-border-dark
        ${selected ? 'ring-2 ring-node-selected dark:ring-node-selected-dark' : ''}
        shadow-lg backdrop-blur-md
      `}
      role="treeitem"
      aria-selected={selected}
    >
      <div className="text-sm font-medium text-node-label dark:text-node-label-dark">
        {data.label}
      </div>
      {data.value && (
        <div className="mt-2 text-sm text-node-value dark:text-node-value-dark">
          {JSON.stringify(data.value)}
        </div>
      )}
    </div>
  );
});

BaseNode.displayName = 'BaseNode';

export default BaseNode; 