import { memo } from 'react';
import { NodeProps } from 'reactflow';
import BaseNode, { BaseNodeData } from './BaseNode';

export interface ValueNodeData extends BaseNodeData {
  type: 'value';
  value: any;
}

function ValueNode(props: NodeProps<ValueNodeData>) {
  const { data } = props;
  
  return (
    <BaseNode {...props}>
      <div className="text-text-value font-mono text-label p-[4px_8px] bg-[rgba(255,255,255,0.03)] rounded-badge mt-header-gap">
        {JSON.stringify(data.value)}
      </div>
    </BaseNode>
  );
}

export default memo(ValueNode); 