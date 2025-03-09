import { memo } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import styled from 'styled-components';

export interface ArrayNodeData {
  label: string;
  type: 'array';
  items: any[];
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

const ArrayInfo = styled.span`
  color: var(--text-value);
  font-size: 12px;
  margin-left: auto;
  opacity: 0.7;
`;

const ItemList = styled.div`
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  min-height: 22px;
  position: relative;
`;

const ItemIndex = styled.span`
  color: var(--text-property);
  font-size: 12px;
`;

const ItemType = styled.span`
  color: var(--text-value);
  opacity: 0.7;
`;

function ArrayNode({ data }: NodeProps<ArrayNodeData>) {
  return (
    <NodeContainer>      
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: 'var(--node-border)' }}
      />
      
      <NodeHeader>
        <NodeType>array</NodeType>
        <NodeLabel>{data.label}</NodeLabel>
        <ArrayInfo>length: {data.items.length}</ArrayInfo>
      </NodeHeader>

      <ItemList>
        {data.items.slice(0, 5).map((item, index) => (
          <ItemRow key={index}>
            <ItemIndex>[{index}]</ItemIndex>
            <ItemType>{Array.isArray(item) ? `array[${item.length}]` : typeof item}</ItemType>
          </ItemRow>
        ))}
        {data.items.length > 5 && (
          <ItemRow>
            <ItemIndex>...</ItemIndex>
            <ItemType>{data.items.length - 5} more items</ItemType>
          </ItemRow>
        )}
      </ItemList>
    </NodeContainer>
  );
}

export default memo(ArrayNode); 