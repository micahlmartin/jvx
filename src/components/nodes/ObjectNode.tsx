import { memo } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import styled from 'styled-components';

interface NodeProperty {
  key: string;
  type: string;
  value: any;
}

export interface ObjectNodeData {
  label: string;
  type: 'object';
  properties: NodeProperty[];
}

const NodeContainer = styled.div`
  background: var(--node-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--node-border);
  border-radius: 8px;
  width: fit-content;
  min-width: 200px;
  max-width: 400px;
`;

const NodeHeader = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid var(--node-border);
  display: flex;
  align-items: center;
  gap: 8px;
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
`;

const PropertyList = styled.div`
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PropertyRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
  min-height: 22px;
`;

const PropertyKey = styled.span`
  color: var(--text-property);
  white-space: nowrap;
`;

const PropertyType = styled.span`
  color: var(--text-value);
  opacity: 0.5;
  font-size: 11px;
  white-space: nowrap;
`;

const PropertyValue = styled.span`
  color: var(--text-value);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function ObjectNode({ data }: NodeProps<ObjectNodeData>) {
  return (
    <NodeContainer>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: 'var(--node-border)' }}
      />
      
      <NodeHeader>
        <NodeType>object</NodeType>
        <NodeLabel>{data.label}</NodeLabel>
      </NodeHeader>

      <PropertyList>
        {data.properties.map((prop) => (
          <PropertyRow key={prop.key}>
            <PropertyKey>{prop.key}:</PropertyKey>
            {prop.type === 'string' ? (
              <PropertyValue>"{prop.value}"</PropertyValue>
            ) : (
              <PropertyValue>{prop.value}</PropertyValue>
            )}
            <PropertyType>({prop.type})</PropertyType>
          </PropertyRow>
        ))}
      </PropertyList>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: 'var(--node-border)' }}
      />
    </NodeContainer>
  );
}

export default memo(ObjectNode); 