import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { designSystem } from '@/styles/design-system';

interface TabProps {
  id: string;
  name: string;
  isActive: boolean;
  isDirty: boolean;
  onActivate: () => void;
  onClose: () => void;
  onRename?: (id: string, newName: string) => void;
}

const TabContainer = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  gap: 8px;
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent'};
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  user-select: none;
  min-width: 120px;
  max-width: 200px;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;

const TabName = styled.div<{ $isEditing: boolean }>`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-primary);
  opacity: 0.85;
  font-size: 13px;
  display: ${props => props.$isEditing ? 'none' : 'block'};
`;

const TabInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 13px;
  padding: 0;
  margin: 0;
  width: 100%;

  &:focus {
    outline: none;
  }
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
  border-radius: 3px;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

const DirtyIndicator = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text-primary);
  opacity: 0.5;
`;

export const Tab: React.FC<TabProps> = ({
  id,
  name,
  isActive,
  isDirty,
  onActivate,
  onClose,
  onRename
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRename) {
      setIsEditing(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editValue.trim()) {
      onRename?.(id, editValue.trim());
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setEditValue(name);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (editValue.trim() && editValue !== name) {
      onRename?.(id, editValue.trim());
    } else {
      setEditValue(name);
    }
    setIsEditing(false);
  };

  return (
    <TabContainer
      $isActive={isActive}
      onClick={onActivate}
      onDoubleClick={handleDoubleClick}
      role="tab"
      aria-selected={isActive}
    >
      {isDirty && <DirtyIndicator />}
      <TabName $isEditing={isEditing}>{name}</TabName>
      {isEditing ? (
        <TabInput
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      ) : null}
      <CloseButton
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close tab"
      >
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </CloseButton>
    </TabContainer>
  );
}; 