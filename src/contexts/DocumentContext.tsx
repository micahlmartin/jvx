import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Document } from '@/components/tabs/TabBar';

/**
 * DocumentContext - Global state management for document handling in the editor.
 *
 * @context
 * @example
 * ```tsx
 * // Provider usage
 * <DocumentProvider>
 *   <App />
 * </DocumentProvider>
 *
 * // Hook usage
 * const { documents, activeDocument, addDocument } = useDocuments();
 * ```
 *
 * @remarks
 * Provides centralized state management for all document-related operations.
 * Handles document creation, updates, selection, and synchronization across the application.
 *
 * Features:
 * - Document CRUD operations
 * - Active document tracking
 * - Dirty state management
 * - Document synchronization
 * - Tab state persistence
 *
 * State Management:
 * - Uses React's useReducer for predictable state updates
 * - Implements action creators for state modifications
 * - Maintains normalized state structure
 * - Handles concurrent updates
 *
 * @performance
 * - Optimized state updates
 * - Memoized action creators
 * - Efficient document tracking
 * - Minimal re-renders
 */

/**
 * The state shape for document management
 */
interface DocumentState {
  /** Array of all documents in the editor */
  documents: Document[];
  
  /** ID of the currently active document, null if no document is active */
  activeDocument: string | null;
}

/**
 * Union type of all possible document actions
 */
type DocumentAction =
  | { type: 'ADD_DOCUMENT'; payload: Document }
  | { type: 'REMOVE_DOCUMENT'; payload: string }
  | { type: 'UPDATE_DOCUMENT'; payload: Document }
  | { type: 'SET_ACTIVE_DOCUMENT'; payload: string }
  | { type: 'MARK_DOCUMENT_DIRTY'; payload: { id: string; isDirty: boolean } }
  | { type: 'RENAME_DOCUMENT'; payload: { id: string; name: string } };

/**
 * The shape of the context value provided to consumers
 */
interface DocumentContextType extends DocumentState {
  /** Add a new document to the editor */
  addDocument: (document: Document) => void;
  
  /** Remove a document from the editor */
  removeDocument: (id: string) => void;
  
  /** Update an existing document's content */
  updateDocument: (document: Document) => void;
  
  /** Set the active document */
  setActiveDocument: (id: string) => void;
  
  /** Mark a document as dirty/clean */
  markDocumentDirty: (id: string, isDirty: boolean) => void;
  
  /** Rename an existing document */
  renameDocument: (id: string, name: string) => void;
}

// Create the context with a default value
const DocumentContext = createContext<DocumentContextType | null>(null);

/**
 * Initial state for the document reducer
 */
const initialState: DocumentState = {
  documents: [],
  activeDocument: null,
};

/**
 * Reducer function for handling document state updates
 * 
 * @param state - Current document state
 * @param action - Action to perform
 * @returns Updated document state
 */
function documentReducer(state: DocumentState, action: DocumentAction): DocumentState {
  switch (action.type) {
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [...state.documents, action.payload],
        activeDocument: action.payload.id,
      };
      
    case 'REMOVE_DOCUMENT': {
      const newDocs = state.documents.filter(doc => doc.id !== action.payload);
      return {
        ...state,
        documents: newDocs,
        activeDocument: state.activeDocument === action.payload
          ? newDocs[newDocs.length - 1]?.id || null
          : state.activeDocument,
      };
    }
    
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id ? action.payload : doc
        ),
      };
      
    case 'SET_ACTIVE_DOCUMENT':
      return {
        ...state,
        activeDocument: action.payload,
      };
      
    case 'MARK_DOCUMENT_DIRTY':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id
            ? { ...doc, isDirty: action.payload.isDirty }
            : doc
        ),
      };
      
    case 'RENAME_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id
            ? { ...doc, name: action.payload.name }
            : doc
        ),
      };
      
    default:
      return state;
  }
}

/**
 * Provider component for document state management
 */
export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(documentReducer, initialState);

  const addDocument = useCallback((document: Document) => {
    dispatch({ type: 'ADD_DOCUMENT', payload: document });
  }, []);

  const removeDocument = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_DOCUMENT', payload: id });
  }, []);

  const updateDocument = useCallback((document: Document) => {
    dispatch({ type: 'UPDATE_DOCUMENT', payload: document });
  }, []);

  const setActiveDocument = useCallback((id: string) => {
    dispatch({ type: 'SET_ACTIVE_DOCUMENT', payload: id });
  }, []);

  const markDocumentDirty = useCallback((id: string, isDirty: boolean) => {
    dispatch({ type: 'MARK_DOCUMENT_DIRTY', payload: { id, isDirty } });
  }, []);

  const renameDocument = useCallback((id: string, name: string) => {
    dispatch({ type: 'RENAME_DOCUMENT', payload: { id, name } });
  }, []);

  const value = {
    ...state,
    addDocument,
    removeDocument,
    updateDocument,
    setActiveDocument,
    markDocumentDirty,
    renameDocument,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

/**
 * Hook for accessing document state and actions
 * 
 * @throws {Error} When used outside of DocumentProvider
 * @returns Document context value
 */
export function useDocuments() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
} 