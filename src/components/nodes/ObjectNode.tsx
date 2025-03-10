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
  width: fit-content;
  min-width: 200px;
  max-width: 400px;
  position: relative;
  isolation: isolate;
  z-index: 1;

  && {
    border: 2px solid var(--node-border);
  }
`;

const NodeHeader = styled.div`
  padding: 8px 12px;
  border-bottom: 2px solid var(--node-border) !important;
  display: flex;
  align-items: center;
  gap: 8px;

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

const NodeLabel = styled.span`
  color: var(--text-primary);
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
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
  min-height: 22px;
  position: relative;
  padding: 6px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  > * {
    opacity: 0.75;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PropertyKey = styled.span`
  color: var(--text-value);
  white-space: nowrap;
`;

const PropertyValue = styled.span<{ valueType: string; value?: any }>`
  color: ${props => {
    switch (props.valueType) {
      case 'string':
        return '#3B9CFF';  // bright blue for strings
      case 'number':
        return '#B392F0';  // purple for numbers
      case 'boolean':
        return props.value === 'true' ? '#79C99E' : '#FF7B72';  // green for true, red for false
      default:
        return '#C9D1D9';  // lighter gray for other types
    }
  }};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  const isRoot = data.label === 'Root';
  
  const getDisplayLabel = (label: string) => {
    if (isRoot) return '{Root}';
    
    const parts = label.split('-');
    const isArrayItem = /^\d+$/.test(parts[parts.length - 1]);
    const name = isArrayItem ? parts[parts.length - 2] : parts[parts.length - 1];
    
    return isArrayItem ? `[${name}]` : `{${name}}`;
  };

  const displayLabel = getDisplayLabel(data.label);

  return (
    <NodeContainer>      
      {!isRoot && (
        <PropertyTargetHandle
          type="target"
          position={Position.Left}
        />
      )}
      
      <NodeHeader>
        <NodeLabel>{displayLabel}</NodeLabel>
      </NodeHeader>

      <PropertyList>
        {data.properties.map((prop) => (
          <PropertyRow key={prop.key} hasChild={!!prop.childNodeId || prop.type === 'array'}>
            <PropertyKey>{prop.key}:</PropertyKey>
            {prop.type === 'string' ? (
              <PropertyValue valueType="string">"{prop.value}"</PropertyValue>
            ) : prop.type === 'boolean' ? (
              <PropertyValue valueType="boolean" value={prop.value.toString()}>{prop.value.toString()}</PropertyValue>
            ) : prop.type === 'number' ? (
              <PropertyValue valueType="number">{prop.value}</PropertyValue>
            ) : (
              <PropertyValue valueType={prop.type}>{prop.value}</PropertyValue>
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