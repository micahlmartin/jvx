import React from 'react';
import styled from 'styled-components';
import { designSystem } from '@/styles/design-system';

interface TabProps {
  id: string;
  name: string;
  isActive: boolean;
  isDirty: boolean;
  onActivate: () => void;
  onClose: () => void;
}

const TabContainer = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  height: 100%;
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  cursor: pointer;
  user-select: none;
  position: relative;
  min-width: 120px;
  max-width: 200px;
  transition: all 0.1s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  ${props => props.$isActive && `
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: #38BDF8;
    }
  `}
`;

const FileType = styled.span`
  font-size: 11px;
  color: #E4943B;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.9;
`;

const TabName = styled.span<{ $isDirty: boolean }>`
  color: var(--text-primary);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  opacity: 0.9;
  font-weight: 400;

  ${props => props.$isDirty && `
    &:after {
      content: '●';
      margin-left: 6px;
      color: #38BDF8;
      font-size: 10px;
    }
  `}
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
  color: var(--text-primary);
  opacity: 0.5;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  line-height: 1;
  margin-right: -4px;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

export const Tab: React.FC<TabProps> = ({
  name,
  isActive,
  isDirty,
  onActivate,
  onClose
}) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <TabContainer 
      $isActive={isActive}
      onClick={onActivate}
      role="tab"
      aria-selected={isActive}
    >
      <FileType>JSON</FileType>
      <TabName $isDirty={isDirty}>{name}</TabName>
      <CloseButton
        onClick={handleClose}
        aria-label={`Close ${name}`}
      >
        ×
      </CloseButton>
    </TabContainer>
  );
}; 