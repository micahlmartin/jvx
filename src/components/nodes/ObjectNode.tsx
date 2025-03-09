import { memo } from 'react';
import { NodeProps } from 'reactflow';
import BaseNode, { BaseNodeData } from './BaseNode';
import styled from 'styled-components';

export interface ObjectNodeData extends BaseNodeData {
  type: 'object';
  properties: Record<string, any>;
}

const PropertyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`;

const PropertyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
`;

const PropertyName = styled.span`
  color: var(--text-property);
`;

function ObjectNode(props: NodeProps<ObjectNodeData>) {
  const { data } = props;
  
  return (
    <BaseNode {...props}>
      <PropertyList>
        {Object.entries(data.properties).map(([key, value]) => (
          <PropertyItem key={key}>
            <PropertyName>{key}:</PropertyName>
            <span>{typeof value}</span>
          </PropertyItem>
        ))}
      </PropertyList>
    </BaseNode>
  );
}

export default memo(ObjectNode); 