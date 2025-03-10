import { memo } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import styled from 'styled-components';

interface NodeProperty {
  key: string;
  type: string;
  value: any;
  childNodeId?: string;
}

export interface ObjectNodeData {
  label: string;
  type: 'object';
  properties: NodeProperty[];
}

const NodeContainer = styled.div`
  background: var(--node-bg);
  backdrop-filter: blur(12px);
  border: 2px solid var(--node-border) !important;
  border-radius: 8px;
  width: max-content;
  min-width: 200px;
  max-width: 400px;
  position: relative;
  isolation: isolate;
  z-index: 1;

  && {
    border: 2px solid var(--node-border);
  }
`;

const getHeaderColor = (label: string) => {
  if (label === 'Root') return 'rgba(82, 82, 91, 0.3)';  // dark gray for root

  // Get the parent name (second to last part) or the name itself if no parent
  const parts = label.split('-');
  const colorKey = parts.length > 2 ? parts[parts.length - 2] : parts[parts.length - 1];
  
  // Map of distinct background colors for different node types
  const colors: { [key: string]: string } = {
    customer: 'rgba(59, 130, 246, 0.15)',    // blue
    items: 'rgba(147, 51, 234, 0.15)',       // purple
    products: 'rgba(147, 51, 234, 0.15)',    // same as items (they're related)
    shipping: 'rgba(236, 72, 153, 0.15)',    // pink
    payment: 'rgba(16, 185, 129, 0.15)',     // green
    address: 'rgba(245, 158, 11, 0.15)',     // orange
    billingAddress: 'rgba(245, 158, 11, 0.15)'  // same as address
  };

  return colors[colorKey] || 'rgba(82, 82, 91, 0.15)';  // fallback gray
};

const getTitleColor = (label: string) => {
  if (label === 'Root') return 'rgba(161, 161, 170, 0.9)';  // light gray for root

  // Get the parent name (second to last part) or the name itself if no parent
  const parts = label.split('-');
  const colorKey = parts.length > 2 ? parts[parts.length - 2] : parts[parts.length - 1];
  
  // Map of title colors that correspond to the background colors but are lighter/more opaque
  const colors: { [key: string]: string } = {
    customer: 'rgba(96, 165, 250, 0.9)',    // light blue
    items: 'rgba(167, 139, 250, 0.9)',      // light purple
    products: 'rgba(167, 139, 250, 0.9)',   // same as items
    shipping: 'rgba(236, 72, 153, 0.9)',    // light pink
    payment: 'rgba(52, 211, 153, 0.9)',     // light green
    address: 'rgba(251, 191, 36, 0.9)',     // light orange
    billingAddress: 'rgba(251, 191, 36, 0.9)'  // same as address
  };

  return colors[colorKey] || 'rgba(161, 161, 170, 0.9)';  // fallback light gray
};

const NodeHeader = styled.div<{ $bgColor: string }>`
  padding: 8px 12px;
  border-bottom: 2px solid var(--node-border) !important;
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.$bgColor};

  && {
    border-bottom: 2px solid var(--node-border);
  }
`;

const NodeType = styled.span`
  font-size: 12px;
  color: var(--text-property);
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
`;

const NodeLabel = styled.span<{ $titleColor: string }>`
  color: ${props => props.$titleColor};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'JetBrains Mono', monospace;
`;

const PropertyList = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const PropertyRow = styled.div<{ hasChild?: boolean }>`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
  min-height: 22px;
  position: relative;
  padding: 6px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const PropertyKey = styled.span`
  color: #768390;  // muted blue-gray for property names
  white-space: nowrap;
`;

const PropertyValue = styled.span<{ valueType: string; value?: any }>`
  color: ${props => {
    switch (props.valueType) {
      case 'string':
        return '#00FFFF';  // neon cyan for strings
      case 'number':
        return '#FF00FF';  // neon magenta for numbers
      case 'boolean':
        return props.value === 'true' ? '#39FF14' : '#FF4545';  // neon green / bright red for booleans
      default:
        return '#FFFFFF';  // pure white for text and other types
    }
  }};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    overflow: visible;
    position: relative;
    z-index: 2;

    &::after {
      content: attr(data-full-value);
      position: absolute;
      left: 0;
      top: -2px;
      padding: 2px 6px;
      background: var(--node-bg);
      border-radius: 4px;
      white-space: nowrap;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      opacity: 1;
    }
  }
`;

const PropertySourceHandle = styled(Handle)`
  position: absolute !important;
  right: -4px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  background: var(--node-border) !important;
  width: 8px !important;
  height: 8px !important;
  border: none !important;
  pointer-events: none !important;
  opacity: 1 !important;
  border-radius: 50% !important;
  z-index: 1 !important;

  && {
    opacity: 1 !important;
  }
`;

const PropertyTargetHandle = styled(Handle)`
  position: absolute !important;
  left: -1px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  background: transparent !important;
  width: 3px !important;
  height: 10px !important;
  border: none !important;
  opacity: 0 !important;
  border-radius: 0 !important;
  z-index: 1 !important;
`;

function ObjectNode({ data }: NodeProps<ObjectNodeData>) {
  const isRoot = data.label === 'Root' || data.label.startsWith('{');
  
  const getDisplayLabel = (label: string) => {
    if (isRoot) return label.startsWith('{') ? label : `{${label}}`;
    
    const parts = label.split('-');
    const isArrayItem = /^\d+$/.test(parts[parts.length - 1]);
    const name = isArrayItem ? parts[parts.length - 2] : parts[parts.length - 1];
    
    return isArrayItem ? `[${name}]` : `{${name}}`;
  };

  const displayLabel = getDisplayLabel(data.label);
  const headerColor = getHeaderColor(data.label);
  const titleColor = getTitleColor(data.label);

  return (
    <NodeContainer>      
      {!isRoot && (
        <PropertyTargetHandle
          type="target"
          position={Position.Left}
        />
      )}
      
      <NodeHeader $bgColor={headerColor}>
        <NodeLabel $titleColor={titleColor}>{displayLabel}</NodeLabel>
      </NodeHeader>

      <PropertyList>
        {data.properties.map((prop) => (
          <PropertyRow key={prop.key} hasChild={!!prop.childNodeId || prop.type === 'array'}>
            <PropertyKey>{prop.key}:</PropertyKey>
            {prop.type === 'string' ? (
              <PropertyValue 
                valueType="string" 
                data-full-value={`"${prop.value}"`}
              >"{prop.value}"</PropertyValue>
            ) : prop.type === 'boolean' ? (
              <PropertyValue 
                valueType="boolean" 
                value={prop.value.toString()}
                data-full-value={prop.value.toString()}
              >{prop.value.toString()}</PropertyValue>
            ) : prop.type === 'number' ? (
              <PropertyValue 
                valueType="number"
                data-full-value={prop.value}
              >{prop.value}</PropertyValue>
            ) : (
              <PropertyValue 
                valueType={prop.type}
                data-full-value={prop.value}
              >{prop.value}</PropertyValue>
            )}
            {(prop.childNodeId || prop.type === 'array') && (
              <PropertySourceHandle
                type="source"
                position={Position.Right}
                id={`property-${prop.key}`}
                className="nodrag"
              />
            )}
          </PropertyRow>
        ))}
      </PropertyList>
    </NodeContainer>
  );
}

export default memo(ObjectNode); 