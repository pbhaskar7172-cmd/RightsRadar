import { useState, useEffect, useCallback } from 'react';
import { caseService } from '../services/caseService';

export function useCases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCases = useCallback(() => {
    setLoading(true);
    caseService.getAllCases().then((data) => {
      setCases(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    caseService.getAllCases().then((data) => {
      if (isMounted) {
        setCases(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const createCase = async (caseInput) => {
    const created = await caseService.createCase(caseInput);
    fetchCases();
    return created;
  };

  return { cases, loading, setCases, refreshCases: fetchCases, createCase };
}

export function useCaseDetail(id) {
  const [caseItem, setCaseItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = useCallback(() => {
    if (!id) return;
    setLoading(true);
    caseService.getCaseById(id).then((data) => {
      setCaseItem(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    caseService.getCaseById(id).then((data) => {
      if (isMounted) {
        setCaseItem(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  const addEvidence = async (evidenceItem) => {
    if (!id) return;
    const updated = await caseService.addEvidence(id, evidenceItem);
    setCaseItem({ ...updated });
    return updated;
  };

  const updateStatus = async (status) => {
    if (!id) return;
    const updated = await caseService.updateStatus(id, status);
    setCaseItem({ ...updated });
    return updated;
  };

  const markSubmitted = async (details) => {
    if (!id) return;
    const updated = await caseService.markSubmitted(id, details);
    setCaseItem({ ...updated });
    return updated;
  };

  const markResolved = async (details) => {
    if (!id) return;
    const updated = await caseService.markResolved(id, details);
    setCaseItem({ ...updated });
    return updated;
  };

  return {
    caseItem,
    loading,
    setCaseItem,
    refresh: fetchDetail,
    addEvidence,
    updateStatus,
    markSubmitted,
    markResolved
  };
}
