import { memo } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';

export interface ArrayNodeData {
  label: string;
  type: 'array';
  items: any[];
}

function ArrayNode({ data }: NodeProps<ArrayNodeData>) {
  return (
    <div className="bg-node-bg backdrop-blur-node border border-node-border rounded-node w-fit min-w-[200px] max-w-[400px]">      
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-node-border"
      />
      
      <div className="p-[8px_12px] border-b border-node-border flex items-center gap-header-gap">
        <span className="text-type text-text-property bg-[rgba(255,255,255,0.1)] px-[6px] py-[2px] rounded-badge flex-shrink-0">
          array
        </span>
        <span className="text-text-primary font-medium overflow-hidden text-ellipsis whitespace-nowrap">
          {data.label}
        </span>
        <span className="text-type text-text-value ml-auto opacity-70">
          length: {data.items.length}
        </span>
      </div>

      <div className="p-[8px_12px] flex flex-col gap-[6px] font-mono">
        {data.items.slice(0, 5).map((item, index) => (
          <div key={index} className="grid grid-cols-[auto_1fr] items-center gap-header-gap text-property min-h-[22px] relative">
            <span className="text-type text-text-property">
              [{index}]
            </span>
            <span className="text-text-value opacity-70">
              {Array.isArray(item) ? `array[${item.length}]` : typeof item}
            </span>
          </div>
        ))}
        {data.items.length > 5 && (
          <div className="grid grid-cols-[auto_1fr] items-center gap-header-gap text-property min-h-[22px] relative">
            <span className="text-type text-text-property">...</span>
            <span className="text-text-value opacity-70">
              {data.items.length - 5} more items
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ArrayNode); 