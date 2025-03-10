import React from 'react';
import { Handle, Position, useStore } from 'reactflow';
import styled from 'styled-components';
import { designSystem } from '../../styles/design-system';

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
 * Styled handle component that implements the design system specifications.
 * Handles the visual appearance and positioning of connection points.
 */
const StyledHandle = styled(Handle)<{ $isVisible: boolean; $isConnecting: boolean }>`
  position: absolute;
  width: ${designSystem.handles.size.width};
  height: ${designSystem.handles.size.height};
  background: ${designSystem.handles.colors.default};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: ${({ $isVisible, $isConnecting, type }) => {
    if (type === 'target') return $isConnecting ? 1 : 0;
    return $isVisible ? 1 : 0;
  }};
  pointer-events: ${({ $isVisible, $isConnecting, type }) => {
    if (type === 'target') return $isConnecting ? 'all' : 'none';
    return $isVisible ? 'all' : 'none';
  }};
  transition: ${designSystem.handles.transitions.opacity};
  z-index: ${designSystem.zIndex.handles};

  &:hover {
    background: ${designSystem.handles.colors.hover};
  }

  ${({ position }) => {
    switch (position) {
      case Position.Left:
        return `
          left: 0;
          top: 50%;
          transform: translate(-50%, -50%);
        `;
      case Position.Right:
        return `
          right: 0;
          top: 50%;
          transform: translate(50%, -50%);
        `;
      default:
        return '';
    }
  }}
`;

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

  return (
    <StyledHandle
      type={type}
      position={position}
      $isVisible={isVisible}
      $isConnecting={isConnecting}
      id={id}
      className={className}
    />
  );
};

export default NodeHandle; 