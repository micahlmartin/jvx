import { memo } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';

export interface ArrayNodeData {
  label: string;
  type: 'array';
  items: (string | number | boolean | null | object | unknown[])[];
}

function ArrayNode({ data }: NodeProps<ArrayNodeData>) {
  return (
    <div className="bg-node-bg dark:bg-node-bg-dark backdrop-blur-node border border-node-border dark:border-node-border-dark rounded-node w-fit min-w-[200px] max-w-[400px]">      
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-node-border dark:!bg-node-border-dark !w-2 !h-2 !border-none !rounded-full !z-handles"
      />
      
      <div className="p-[8px_12px] border-b border-node-border dark:border-node-border-dark flex items-center gap-header-gap">
        <span className="text-type text-text-property dark:text-text-property-dark bg-editor-bg-highlight dark:bg-editor-bg-highlight-dark px-[6px] py-[2px] rounded-badge flex-shrink-0">
          array
        </span>
        <span className="text-text-primary dark:text-text-primary-dark font-medium overflow-hidden text-ellipsis whitespace-nowrap">
          {data.label}
        </span>
        <span className="text-type text-text-value ml-auto opacity-text-muted">
          length: {data.items.length}
        </span>
      </div>

      <div className="p-[8px_12px] flex flex-col gap-[6px] font-mono">
        {data.items.slice(0, 5).map((item, index) => (
          <div key={`${data.label}-${index}`} className="grid grid-cols-[auto_1fr] items-center gap-header-gap text-property min-h-[22px] relative">
            <span className="text-type text-text-property">
              [{index}]
            </span>
            <span className="text-text-value opacity-text-muted">
              {Array.isArray(item) ? `array[${item.length}]` : typeof item}
            </span>
          </div>
        ))}
        {data.items.length > 5 && (
          <div key={`${data.label}-more`} className="grid grid-cols-[auto_1fr] items-center gap-header-gap text-property min-h-[22px] relative">
            <span className="text-type text-text-property">...</span>
            <span className="text-text-value opacity-text-muted">
              {data.items.length - 5} more items
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ArrayNode); 