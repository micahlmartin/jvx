import React from 'react';
import styled from 'styled-components';
import { designSystem } from '../../styles/design-system';

interface PropertyRowProps {
  hasChild: boolean;
  children: React.ReactNode;
}

const StyledPropertyRow = styled.div<{ $hasChild: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  position: relative;
  min-height: 22px;
  --separator-color: ${designSystem.borders.separator};

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: -${designSystem.spacing.nodePadding};
    right: -${designSystem.spacing.nodePadding};
    bottom: -${parseInt(designSystem.spacing.propertyGap) / 2}px;
    height: 1px;
    background: var(--separator-color);
  }
`;

export const PropertyRow: React.FC<PropertyRowProps> = ({ hasChild, children }) => {
  return (
    <StyledPropertyRow $hasChild={hasChild}>
      {children}
    </StyledPropertyRow>
  );
};

export default PropertyRow; 