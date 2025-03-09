import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import styled from 'styled-components';

const NodeContainer = styled.div`
  background: var(--node-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--node-border);
  border-radius: 8px;
  padding: 12px;
  color: var(--text-primary);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }
`;

const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const NodeType = styled.span`
  font-size: 12px;
  color: var(--text-property);
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
`;

const NodeContent = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
`;

export interface BaseNodeData {
  label: string;
  type: 'object' | 'array' | 'value';
  value?: any;
}

function BaseNode({ data, isConnectable }: NodeProps<BaseNodeData>) {
  return (
    <NodeContainer>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      
      <NodeHeader>
        <NodeType>{data.type}</NodeType>
        <span>{data.label}</span>
      </NodeHeader>

      <NodeContent>
        {data.type === 'value' && (
          <span style={{ color: 'var(--text-value)' }}>
            {JSON.stringify(data.value)}
          </span>
        )}
      </NodeContent>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </NodeContainer>
  );
}

export default memo(BaseNode); 