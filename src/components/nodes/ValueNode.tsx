import { memo } from 'react';
import { NodeProps } from 'reactflow';

import BaseNode, { BaseNodeData } from './BaseNode';

export interface ValueNodeData extends BaseNodeData {
  type: 'value';
  value: string | number | boolean | null;
}

function ValueNode(props: NodeProps<ValueNodeData>) {
  const { data } = props;

  return (
    <BaseNode {...props}>
      <div className="text-text-value dark:text-text-value-dark font-mono text-label p-[4px_8px] bg-editor-bg-highlight dark:bg-editor-bg-highlight-dark/30 rounded-badge mt-header-gap">
        {JSON.stringify(data.value)}
      </div>
    </BaseNode>
  );
}

export default memo(ValueNode);
