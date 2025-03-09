import { memo } from 'react';
import { NodeProps } from 'reactflow';
import BaseNode, { BaseNodeData } from './BaseNode';
import styled from 'styled-components';

export interface ArrayNodeData extends BaseNodeData {
  type: 'array';
  items: any[];
}

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
`;

const ItemIndex = styled.span`
  color: var(--text-property);
  min-width: 20px;
`;

function ArrayNode(props: NodeProps<ArrayNodeData>) {
  const { data } = props;
  
  return (
    <BaseNode {...props}>
      <ItemList>
        {data.items.map((item, index) => (
          <ItemRow key={index}>
            <ItemIndex>[{index}]</ItemIndex>
            <span>{typeof item}</span>
          </ItemRow>
        ))}
      </ItemList>
    </BaseNode>
  );
}

export default memo(ArrayNode); 