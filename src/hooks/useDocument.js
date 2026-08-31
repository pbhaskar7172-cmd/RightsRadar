import { useState, useEffect, useCallback } from 'react';
import { documentService } from '../services/documentService';

export function useDocument(id) {
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDocument = useCallback(() => {
    if (!id) return;
    setLoading(true);
    documentService.getDocumentById(id).then((data) => {
      setDocumentData(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    documentService.getDocumentById(id).then((data) => {
      if (isMounted) {
        setDocumentData(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  const applyRevision = async (prompt) => {
    if (!id && !documentData?.id) return;
    const docId = documentData?.id || id;
    const updated = await documentService.addDocumentRevision(docId, prompt);
    setDocumentData({ ...updated });
    return updated;
  };

  const updateStatus = async (status) => {
    if (!id && !documentData?.id) return;
    const docId = documentData?.id || id;
    const updated = await documentService.updateDocumentStatus(docId, status);
    setDocumentData({ ...updated });
    return updated;
  };

  const updateDocumentData = async (updates) => {
    if (!id && !documentData?.id) return;
    const docId = documentData?.id || id;
    const updated = await documentService.updateDocument(docId, updates);
    setDocumentData({ ...updated });
    return updated;
  };

  return {
    documentData,
    loading,
    setDocumentData,
    fetchDocument,
    applyRevision,
    updateStatus,
    updateDocumentData
  };
}

export function useAllDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(() => {
    setLoading(true);
    documentService.getAllDocuments().then((data) => {
      setDocuments(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    documentService.getAllDocuments().then((data) => {
      if (isMounted) {
        setDocuments(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const createDocument = async (docInput) => {
    const created = await documentService.createDocument(docInput);
    fetchAll();
    return created;
  };

  return { documents, loading, setDocuments, refresh: fetchAll, createDocument };
}
