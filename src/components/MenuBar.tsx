import React from 'react';

export const MenuBar: React.FC = () => {
  return (
    <nav className="menubar bg-toolbar dark:bg-toolbar-dark border-b border-toolbar-border dark:border-toolbar-border-dark">
      <div className="menubar-item menubar-text">
        File
      </div>
      <div className="menubar-item menubar-text">
        Edit
      </div>
      <div className="menubar-item menubar-text">
        View
      </div>
      <div className="menubar-item menubar-text">
        Help
      </div>
    </nav>
  );
}; 