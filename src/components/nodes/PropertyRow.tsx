import React from 'react';

interface PropertyRowProps {
  hasChild: boolean;
  children: React.ReactNode;
}

export const PropertyRow: React.FC<PropertyRowProps> = ({ hasChild, children }) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-header-gap relative min-h-[22px] last:after:hidden after:content-[''] after:absolute after:left-[-12px] after:right-[-12px] after:bottom-[-3px] after:h-[1px] after:bg-node-border">
      {children}
    </div>
  );
};

export default PropertyRow; 