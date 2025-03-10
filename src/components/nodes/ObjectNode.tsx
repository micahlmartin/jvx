import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface NodeProperty {
  id: string;
  key: string;
  type: string;
  value: string;
  childNodeId?: string;
}

interface ObjectNodeData {
  label: string;
  type: 'object';
  properties: NodeProperty[];
}

const getHeaderColor = (label: string): string => {
  if (label === 'Root') return 'bg-[rgba(82,82,91,0.3)]';  // dark gray for root

  // Get the parent name (second to last part) or the name itself if no parent
  const parts = label.split('-');
  const colorKey = parts.length > 2 ? parts[parts.length - 2] : parts[parts.length - 1];
  
  // Map of distinct background colors for different node types
  const colors: Record<string, string> = {
    customer: 'bg-[rgba(59,130,246,0.15)]',    // blue
    items: 'bg-[rgba(147,51,234,0.15)]',       // purple
    products: 'bg-[rgba(147,51,234,0.15)]',    // same as items (they're related)
    shipping: 'bg-[rgba(236,72,153,0.15)]',    // pink
    payment: 'bg-[rgba(16,185,129,0.15)]',     // green
    address: 'bg-[rgba(245,158,11,0.15)]',     // orange
    billingAddress: 'bg-[rgba(245,158,11,0.15)]'  // same as address
  };

  return colors[colorKey] || 'bg-[rgba(82,82,91,0.15)]';  // fallback gray
};

const getTitleColor = (label: string): string => {
  if (label === 'Root') return 'text-[rgba(161,161,170,0.9)]';  // light gray for root

  // Get the parent name (second to last part) or the name itself if no parent
  const parts = label.split('-');
  const colorKey = parts.length > 2 ? parts[parts.length - 2] : parts[parts.length - 1];
  
  // Map of title colors that correspond to the background colors but are lighter/more opaque
  const colors: Record<string, string> = {
    customer: 'text-[rgba(96,165,250,0.9)]',    // light blue
    items: 'text-[rgba(167,139,250,0.9)]',      // light purple
    products: 'text-[rgba(167,139,250,0.9)]',   // same as items
    shipping: 'text-[rgba(236,72,153,0.9)]',    // light pink
    payment: 'text-[rgba(52,211,153,0.9)]',     // light green
    address: 'text-[rgba(251,191,36,0.9)]',     // light orange
    billingAddress: 'text-[rgba(251,191,36,0.9)]'  // same as address
  };

  return colors[colorKey] || 'text-[rgba(161,161,170,0.9)]';  // fallback light gray
};

function ObjectNode({ data }: NodeProps<ObjectNodeData>) {
  const isRoot = data.label === 'Root' || data.label.startsWith('{');
  
  const getDisplayLabel = (label: string): string => {
    if (isRoot) return label.startsWith('{') ? label : `{${label}}`;
    
    const parts = label.split('-');
    const isArrayItem = /^\d+$/.test(parts[parts.length - 1]);
    const name = isArrayItem ? parts[parts.length - 2] : parts[parts.length - 1];
    
    return isArrayItem ? `[${name}]` : `{${name}}`;
  };

  const displayLabel = getDisplayLabel(data.label);
  const headerColor = getHeaderColor(data.label);
  const titleColor = getTitleColor(data.label);

  const getValueColor = (type: string, value: string): string => {
    switch (type) {
      case 'string':
        return 'text-[#00FFFF]';  // neon cyan for strings
      case 'number':
        return 'text-[#FF00FF]';  // neon magenta for numbers
      case 'boolean':
        return value === 'true' ? 'text-[#39FF14]' : 'text-[#FF4545]';  // neon green / bright red
      default:
        return 'text-white';  // pure white for text and other types
    }
  };

  return (
    <div className="bg-node-bg backdrop-blur-node border-2 border-node-border rounded-node w-full min-w-[200px] max-w-[400px] relative isolation-isolate z-node-base">      
      {/* Target handle for non-root nodes */}
      {!isRoot && (
        <Handle
          type="target"
          position={Position.Left}
          className="!absolute !-left-[1px] !top-1/2 !-translate-y-1/2 !bg-transparent !w-[3px] !h-[10px] !border-none !opacity-0 !rounded-none !z-handles"
        />
      )}
      
      <div className={`${headerColor} p-[8px_12px] border-b-2 border-node-border flex items-center gap-header-gap w-full overflow-hidden`}>
        <span className={`${titleColor} font-medium overflow-hidden text-ellipsis whitespace-nowrap font-mono min-w-0 flex-1`}>
          {displayLabel}
        </span>
      </div>

      <div className="p-0 flex flex-col">
        {data.properties.map((prop) => (
          <div key={prop.id} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-header-gap text-property font-mono min-h-[22px] relative p-[6px_12px] border-b border-[rgba(255,255,255,0.1)] last:border-b-0">
            <span className="text-[#768390] whitespace-nowrap">
              {prop.key}:
            </span>
            <span 
              className={`${getValueColor(prop.type, prop.value)} overflow-hidden text-ellipsis whitespace-nowrap hover:overflow-visible hover:relative hover:z-tooltip group`}
              data-full-value={
                prop.type === 'string' ? `"${prop.value}"` :
                prop.value.toString()
              }
            >
              {prop.type === 'string' ? `"${prop.value}"` : prop.value.toString()}
              <span className="invisible group-hover:visible absolute left-0 -top-0.5 px-[6px] py-0.5 bg-node-bg rounded-badge shadow-md whitespace-nowrap">
                {prop.type === 'string' ? `"${prop.value}"` : prop.value.toString()}
              </span>
            </span>
            {/* Source handles - show for all root properties or child/array properties */}
            {(isRoot || prop.childNodeId || prop.type === 'array') && (
              <Handle
                type="source"
                position={Position.Right}
                id={`property-${prop.key}`}
                className="!absolute !-right-1 !top-1/2 !-translate-y-1/2 !bg-node-border !w-2 !h-2 !border-none !pointer-events-none !opacity-100 !rounded-full !z-handles nodrag"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(ObjectNode); 