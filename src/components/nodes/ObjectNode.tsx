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
  min-width: 280px;
`;

const NodeHeader = styled.div`
  padding: 12px;
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
`;

const NodeLabel = styled.span`
  color: var(--text-primary);
  font-weight: 500;
`;

const PropertyList = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PropertyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-family: 'JetBrains Mono', monospace;
`;

const PropertyKey = styled.span`
  color: var(--text-property);
`;

const PropertyType = styled.span`
  color: var(--text-value);
  opacity: 0.5;
  font-size: 12px;
`;

const PropertyValue = styled.span`
  color: var(--text-value);
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