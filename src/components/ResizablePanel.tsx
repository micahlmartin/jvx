'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { PANEL_SIZES } from '@/constants/panels';

export interface ResizablePanelProps {
  children: React.ReactNode;
  isCollapsed: boolean;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  onResize?: (size: number) => void;
  className?: string;
}

const LOCAL_STORAGE_KEY = 'editor-panel-size';

export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  isCollapsed,
  defaultSize = PANEL_SIZES.DEFAULT_SIZE,
  minSize = PANEL_SIZES.MIN_SIZE,
  maxSize = PANEL_SIZES.MAX_SIZE,
  onResize,
  className,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Initialize with default size
  const [size, setSize] = useState(defaultSize);

  // Set initial size and handle localStorage on mount
  useEffect(() => {
    // Clear any existing stored size that might be too small
    const storedSize = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storedSize || parseInt(storedSize, 10) < PANEL_SIZES.MIN_SIZE) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setSize(defaultSize);
    }
  }, [defaultSize]);

  // Handle collapse state
  useEffect(() => {
    if (isCollapsed) {
      setSize(0);
    } else {
      // When uncollapsing, ensure we're at least at MIN_SIZE
      setSize(Math.max(size, PANEL_SIZES.MIN_SIZE));
    }
  }, [isCollapsed, size]);

  // Store size in localStorage when it changes and ensure it's never below MIN_SIZE
  useEffect(() => {
    if (size > 0) {
      const validSize = Math.max(size, PANEL_SIZES.MIN_SIZE);
      localStorage.setItem(LOCAL_STORAGE_KEY, validSize.toString());
      if (validSize !== size) {
        setSize(validSize);
      }
    }
  }, [size]);

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!panelRef.current) return;

      setIsDragging(true);
      document.body.classList.add('select-none', 'cursor-col-resize');

      const startX = e.clientX;
      const startWidth = panelRef.current.offsetWidth;

      const handleMouseMove = (e: MouseEvent) => {
        const delta = e.clientX - startX;
        const newSize = Math.min(Math.max(startWidth + delta, minSize), maxSize);
        setSize(newSize);
        onResize?.(newSize);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.body.classList.remove('select-none', 'cursor-col-resize');
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [minSize, maxSize, onResize]
  );

  return (
    <div
      ref={panelRef}
      className={twMerge(
        'h-full flex-none',
        !isDragging && 'transition-[width] duration-300 ease-in-out',
        isCollapsed ? 'w-0' : '',
        className
      )}
      style={{ width: isCollapsed ? 0 : `${size}px` }}
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-0">{children}</div>
        <div
          className={twMerge(
            'absolute top-0 -right-[3px] w-[6px] h-full cursor-col-resize z-[9999]',
            'hover:bg-resize-handle-hover dark:hover:bg-resize-handle-hover-dark',
            'after:content-[""] after:absolute after:top-0 after:left-[2px] after:w-[2px] after:h-full',
            'after:bg-resize-handle dark:after:bg-resize-handle-dark',
            'after:opacity-50 hover:after:opacity-100',
            isDragging ? 'after:opacity-100' : '',
            isDragging ? 'bg-resize-handle-hover dark:bg-resize-handle-hover-dark' : ''
          )}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};
