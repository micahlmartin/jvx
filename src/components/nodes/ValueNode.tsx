import { memo } from 'react';
import { NodeProps } from 'reactflow';
import BaseNode, { BaseNodeData } from './BaseNode';
import styled from 'styled-components';

export interface ValueNodeData extends BaseNodeData {
  type: 'value';
  value: any;
}

const ValueDisplay = styled.div`
  color: var(--text-value);
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
  margin-top: 8px;
`;

function ValueNode(props: NodeProps<ValueNodeData>) {
  const { data } = props;
  
  return (
    <BaseNode {...props}>
      <ValueDisplay>
        {JSON.stringify(data.value)}
      </ValueDisplay>
    </BaseNode>
  );
}

export default memo(ValueNode); 