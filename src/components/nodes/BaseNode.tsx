import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export interface BaseNodeData {
  label: string;
  type: 'object' | 'array' | 'value';
  value?: any;
}

function BaseNode({ data, isConnectable }: NodeProps<BaseNodeData>) {
  return (
    <div className="bg-node-bg dark:bg-node-bg-dark backdrop-blur-node border border-node-border dark:border-node-border-dark rounded-node p-node-padding text-text-primary dark:text-text-primary-dark shadow-node transition-all duration-node hover:bg-editor-bg-highlight hover:dark:bg-editor-bg-highlight-dark hover:-translate-y-[1px]">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="!bg-node-border dark:!bg-node-border-dark !w-2 !h-2 !border-none !rounded-full !z-handles"
      />
      
      <div className="flex items-center gap-header-gap mb-header-gap">
        <span className="text-type text-text-property dark:text-text-property-dark bg-editor-bg-highlight dark:bg-editor-bg-highlight-dark px-[6px] py-[2px] rounded-badge">
          {data.type}
        </span>
        <span>{data.label}</span>
      </div>

      <div className="font-mono text-label">
        {data.type === 'value' && (
          <span className="text-text-value dark:text-text-value-dark">
            {JSON.stringify(data.value)}
          </span>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="!bg-node-border dark:!bg-node-border-dark !w-2 !h-2 !border-none !rounded-full !z-handles"
      />
    </div>
  );
}

export default memo(BaseNode); 