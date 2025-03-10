import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Document } from '@/components/tabs/TabBar';

interface DocumentState {
  documents: Document[];
  activeDocument: string | null;
}

type DocumentAction =
  | { type: 'ADD_DOCUMENT'; payload: Document }
  | { type: 'REMOVE_DOCUMENT'; payload: string }
  | { type: 'UPDATE_DOCUMENT'; payload: Document }
  | { type: 'SET_ACTIVE_DOCUMENT'; payload: string }
  | { type: 'MARK_DOCUMENT_DIRTY'; payload: { id: string; isDirty: boolean } }
  | { type: 'RENAME_DOCUMENT'; payload: { id: string; name: string } };

interface DocumentContextType extends DocumentState {
  addDocument: (document: Document) => void;
  removeDocument: (id: string) => void;
  updateDocument: (document: Document) => void;
  setActiveDocument: (id: string) => void;
  markDocumentDirty: (id: string, isDirty: boolean) => void;
  renameDocument: (id: string, name: string) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

const documentReducer = (state: DocumentState, action: DocumentAction): DocumentState => {
  switch (action.type) {
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [...state.documents, action.payload],
        activeDocument: action.payload.id
      };

    case 'REMOVE_DOCUMENT': {
      const newDocuments = state.documents.filter(doc => doc.id !== action.payload);
      const newActiveDocument = state.activeDocument === action.payload
        ? newDocuments[newDocuments.length - 1]?.id || null
        : state.activeDocument;
      return {
        ...state,
        documents: newDocuments,
        activeDocument: newActiveDocument
      };
    }

    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id ? action.payload : doc
        )
      };

    case 'SET_ACTIVE_DOCUMENT':
      return {
        ...state,
        activeDocument: action.payload
      };

    case 'MARK_DOCUMENT_DIRTY':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id
            ? { ...doc, isDirty: action.payload.isDirty }
            : doc
        )
      };

    case 'RENAME_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id
            ? { ...doc, name: action.payload.name }
            : doc
        )
      };

    default:
      return state;
  }
};

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(documentReducer, {
    documents: [],
    activeDocument: null
  });

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

  return (
    <DocumentContext.Provider
      value={{
        ...state,
        addDocument,
        removeDocument,
        updateDocument,
        setActiveDocument,
        markDocumentDirty,
        renameDocument
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
}; 