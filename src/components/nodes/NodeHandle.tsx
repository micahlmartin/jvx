import React from 'react';
import { Handle, Position, useStore } from 'reactflow';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the NodeHandle component.
 * @interface NodeHandleProps
 */
interface NodeHandleProps {
  /** The type of handle - either a source for outgoing connections or a target for incoming connections */
  type: 'source' | 'target';
  
  /** The position of the handle on the node - typically Left for targets and Right for sources */
  position: Position;
  
  /** Whether the handle is visible - only affects source handles as target handles have their own visibility logic */
  isVisible?: boolean;
  
  /** Optional ID for the handle - useful when multiple handles are present on the same node */
  id?: string;
  
  /** Optional className for additional styling */
  className?: string;
}

/**
 * NodeHandle component that provides connection points for nodes in a flow diagram.
 * 
 * This component follows the design system specifications for handle appearance and behavior:
 * - Target handles are invisible by default and only show when a connection is being made
 * - Source handles are visible by default but can be hidden via the isVisible prop
 * - Handles are positioned exactly at the edge of nodes with a visual offset
 * - Transitions are smooth for all visibility changes
 * 
 * @component
 * @example
 * // Target handle on the left side of a node
 * <NodeHandle
 *   type="target"
 *   position={Position.Left}
 * />
 * 
 * @example
 * // Source handle on the right side of a node
 * <NodeHandle
 *   type="source"
 *   position={Position.Right}
 *   isVisible={true}
 * />
 */
export const NodeHandle: React.FC<NodeHandleProps> = ({ 
  type, 
  position, 
  isVisible = true, 
  id,
  className 
}) => {
  const isConnecting = useStore((state) => state.connectionNodeId != null);
  
  const baseClasses = "!absolute !w-2 !h-2 !bg-node-border hover:!bg-[rgba(255,255,255,0.5)] !border-none !rounded-full !cursor-pointer !transition-opacity !duration-200 !z-handles";
  
  const visibilityClasses = type === 'target'
    ? isConnecting ? "!opacity-100 !pointer-events-auto" : "!opacity-0 !pointer-events-none"
    : isVisible ? "!opacity-100 !pointer-events-auto" : "!opacity-0 !pointer-events-none";
    
  const positionClasses = position === Position.Left
    ? "!left-0 !top-1/2 !-translate-x-1/2 !-translate-y-1/2"
    : "!right-0 !top-1/2 !translate-x-1/2 !-translate-y-1/2";

  return (
    <Handle
      type={type}
      position={position}
      id={id}
      className={twMerge(baseClasses, visibilityClasses, positionClasses, className)}
    />
  );
};

export default NodeHandle; 