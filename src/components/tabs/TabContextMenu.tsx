import React from 'react';
import styled from 'styled-components';

interface TabContextMenuProps {
  x: number;
  y: number;
  onRename: () => void;
  onClose: () => void;
}

const MenuContainer = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  background: #1E1E2E;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 4px;
  min-width: 160px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);
  z-index: 1000;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  svg {
    width: 14px;
    height: 14px;
    opacity: 0.7;
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 4px 0;
`;

export const TabContextMenu: React.FC<TabContextMenuProps> = ({
  x,
  y,
  onRename,
  onClose,
}) => {
  return (
    <MenuContainer $x={x} $y={y}>
      <MenuItem onClick={onRename}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5 2.5L13.5 4.5M7.5 12.5H13.5M2.5 9.5L10.5 1.5L12.5 3.5L4.5 11.5L2 12L2.5 9.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Rename
      </MenuItem>
      <MenuDivider />
      <MenuItem onClick={onClose}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Close
      </MenuItem>
    </MenuContainer>
  );
}; 