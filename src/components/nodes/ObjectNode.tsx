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
  depth?: number;
}

const getHeaderColor = (label: string): string => {
  if (label === 'Root') return 'bg-node-root';

  // Get the parent name (second to last part) or the name itself if no parent
  const parts = label.split('-');
  const colorKey = parts.length > 2 ? parts[parts.length - 2] : parts[parts.length - 1];
  
  // Map node types to Tailwind classes
  const nodeTypes: Record<string, string> = {
    customer: 'bg-node-customer',
    items: 'bg-node-items',
    products: 'bg-node-items',
    shipping: 'bg-node-shipping',
    payment: 'bg-node-payment',
    address: 'bg-node-address',
    billingAddress: 'bg-node-address'
  };

  return nodeTypes[colorKey] || 'bg-node-default';
};

const getTitleColor = (label: string): string => {
  if (label === 'Root') return 'text-node-root-text';

  // Get the parent name (second to last part) or the name itself if no parent
  const parts = label.split('-');
  const colorKey = parts.length > 2 ? parts[parts.length - 2] : parts[parts.length - 1];
  
  // Map node types to Tailwind classes
  const nodeTypes: Record<string, string> = {
    customer: 'text-node-customer-text',
    items: 'text-node-items-text',
    products: 'text-node-items-text',
    shipping: 'text-node-shipping-text',
    payment: 'text-node-payment-text',
    address: 'text-node-address-text',
    billingAddress: 'text-node-address-text'
  };

  return nodeTypes[colorKey] || 'text-node-default-text';
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
        return 'text-node-value-string';
      case 'number':
        return 'text-node-value-number';
      case 'boolean':
        return value === 'true' ? 'text-node-value-boolean-true' : 'text-node-value-boolean-false';
      default:
        return 'text-text-primary dark:text-text-primary-dark';
    }
  };

  return (
    <div className={`bg-node-bg dark:bg-node-bg-dark backdrop-blur-node border-2 border-node-border dark:border-node-border-dark rounded-node w-full min-w-[200px] max-w-[400px] relative isolation-isolate z-node-base shadow-lg hover:shadow-xl transition-all duration-300 ${
      data.depth && data.depth > 0 ? 'ml-4' : ''
    }`}>      
      {/* Target handle for non-root nodes */}
      {!isRoot && (
        <Handle
          type="target"
          position={Position.Left}
          className="!absolute !-left-[1px] !top-1/2 !-translate-y-1/2 !bg-transparent !w-[3px] !h-[10px] !border-none !opacity-0 !rounded-none !z-handles"
        />
      )}
      
      <div className={`${headerColor} p-[8px_12px] border-b-2 border-node-border dark:border-node-border-dark flex items-center gap-header-gap w-full overflow-hidden backdrop-blur-sm bg-opacity-90`}>
        <span className={`${titleColor} font-medium overflow-hidden text-ellipsis whitespace-nowrap font-mono min-w-0 flex-1`}>
          {displayLabel}
        </span>
        {data.depth !== undefined && (
          <span className="text-xs opacity-50 font-mono">Level {data.depth}</span>
        )}
      </div>

      <div className="p-0 flex flex-col divide-y divide-node-border dark:divide-node-border-dark">
        {data.properties.map((prop) => (
          <div key={prop.id} className="grid grid-cols-[auto_1fr] items-center gap-header-gap text-property font-mono min-h-[22px] relative p-[6px_12px] hover:bg-node-border/5 dark:hover:bg-node-border-dark/5 transition-colors duration-200">
            <span className="text-node-value-property whitespace-nowrap">
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
              <span className="invisible group-hover:visible absolute left-0 -top-0.5 px-[6px] py-0.5 bg-node-bg dark:bg-node-bg-dark rounded-badge shadow-md whitespace-nowrap">
                {prop.type === 'string' ? `"${prop.value}"` : prop.value.toString()}
              </span>
            </span>
            {/* Source handles - show for all root properties or child/array properties */}
            {(isRoot || prop.childNodeId || prop.type === 'array') && (
              <Handle
                type="source"
                position={Position.Right}
                id={`property-${prop.key}`}
                className="!absolute !-right-[9px] !top-1/2 !-translate-y-1/2 !bg-node-border dark:!bg-node-border-dark !w-2 !h-2 !border-none !pointer-events-none !opacity-100 !rounded-full !z-handles nodrag"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(ObjectNode); 