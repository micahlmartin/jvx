import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export interface BaseNodeData {
  label: string;
  type: 'object' | 'array' | 'value';
  value?: any;
}

function BaseNode({ data, isConnectable }: NodeProps<BaseNodeData>) {
  return (
    <div className="bg-node-bg backdrop-blur-node border border-node-border rounded-node p-node-padding text-text-primary shadow-node transition-all duration-node hover:bg-editor-bg-highlight-dark hover:-translate-y-[1px]">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      
      <div className="flex items-center gap-header-gap mb-header-gap">
        <span className="text-type text-text-property bg-editor-bg-highlight-dark px-[6px] py-[2px] rounded-badge">
          {data.type}
        </span>
        <span>{data.label}</span>
      </div>

      <div className="font-mono text-label">
        {data.type === 'value' && (
          <span className="text-text-value">
            {JSON.stringify(data.value)}
          </span>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default memo(BaseNode); 