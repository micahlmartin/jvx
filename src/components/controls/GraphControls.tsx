import React from 'react';
import { useReactFlow, Panel } from 'reactflow';

export const GraphControls: React.FC = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Panel position="bottom-right" className="m-4">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => fitView()}
          className="w-10 h-10 flex items-center justify-center bg-background dark:bg-background-dark border border-node-border dark:border-node-border-dark rounded-xl text-text-primary dark:text-text-primary-dark hover:bg-editor-bg-highlight dark:hover:bg-editor-bg-highlight-dark transition-colors duration-200"
          title="Fit view"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
            <path d="M15 3H21M21 3V9M21 3L14 10M9 21H3M3 21V15M3 21L10 14M15 21H21M21 21V15M21 21L14 14M9 3H3M3 3V9M3 3L10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex flex-col">
          <button
            onClick={() => zoomIn()}
            className="w-10 h-10 flex items-center justify-center bg-background dark:bg-background-dark border border-node-border dark:border-node-border-dark rounded-t-xl text-text-primary dark:text-text-primary-dark hover:bg-editor-bg-highlight dark:hover:bg-editor-bg-highlight-dark transition-colors duration-200"
            title="Zoom in"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => zoomOut()}
            className="w-10 h-10 flex items-center justify-center bg-background dark:bg-background-dark border border-t-0 border-node-border dark:border-node-border-dark rounded-b-xl text-text-primary dark:text-text-primary-dark hover:bg-editor-bg-highlight dark:hover:bg-editor-bg-highlight-dark transition-colors duration-200"
            title="Zoom out"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </Panel>
  );
}; 