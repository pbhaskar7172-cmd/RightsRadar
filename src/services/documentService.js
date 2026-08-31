import { mockDocuments } from '../data/mockData.js';
import { documentTemplateService } from './documentTemplateService.js';

const STORAGE_KEY = 'nyaya_documents_vault';

// Helper to retrieve documents from localStorage
function getStoredDocuments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockDocuments));
      return [...mockDocuments];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...mockDocuments];
  } catch {
    return [...mockDocuments];
  }
}

// Helper to save documents to localStorage
function saveStoredDocuments(docs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  } catch (err) {
    console.error('Failed to persist documents to localStorage:', err);
  }
}

export const documentService = {
  // 1. Get all documents
  getAllDocuments: async () => {
    const docs = getStoredDocuments();
    return Promise.resolve([...docs]);
  },

  // 2. Get document by ID
  getDocumentById: async (id) => {
    const docs = getStoredDocuments();
    const found = docs.find((d) => d.id === id);
    if (found) return Promise.resolve({ ...found });

    // Fallback search by caseId
    const byCase = docs.find((d) => d.caseId === id);
    if (byCase) return Promise.resolve({ ...byCase });

    return Promise.resolve(docs[0] || null);
  },

  // 3. Get all documents linked to a specific case ID
  getDocumentsByCaseId: async (caseId) => {
    const docs = getStoredDocuments();
    const matches = docs.filter((d) => d.caseId === caseId);
    return Promise.resolve([...matches]);
  },

  // 4. Create a new document (with template engine support)
  createDocument: async (docInput) => {
    const docs = getStoredDocuments();
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newId = docInput.id || `doc-${Date.now()}-${randomSuffix}`;
    const year = new Date().getFullYear();

    // If templateId provided, base defaults on template
    let baseDoc = {};
    if (docInput.templateId) {
      baseDoc = documentTemplateService.generateDocument(docInput.templateId, docInput);
    }

    const newDoc = {
      ...baseDoc,
      id: newId,
      caseId: docInput.caseId || baseDoc.caseId || null,
      templateId: docInput.templateId || baseDoc.templateId || 'general_complaint',
      title: docInput.title || baseDoc.title || 'Formal Legal Notice Draft',
      type: docInput.type || baseDoc.documentType || 'Formal Legal Notice',
      documentType: docInput.documentType || baseDoc.documentType || 'Formal Legal Notice',
      status: docInput.status || 'Draft Generated',
      date: docInput.date || baseDoc.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      refNumber: docInput.refNumber || baseDoc.refNumber || `Ref: NY-AI-${year}-${randomSuffix}`,
      documentTypeSummary: docInput.documentTypeSummary || baseDoc.documentTypeSummary || 'Formal legal demand notice prepared via Nyaya AI.',
      authority: docInput.authority || baseDoc.authority || {
        name: 'Competent Redressal Authority',
        jurisdiction: 'State District Jurisdiction'
      },
      sender: docInput.sender || baseDoc.sender || {
        name: 'Citizen Claimant',
        representative: 'Nyaya AI Automated Drafting / Legal Department'
      },
      recipient: docInput.recipient || baseDoc.recipient || {
        company: 'Counterparty Organization',
        address: 'Official Registered Address'
      },
      subject: docInput.subject || baseDoc.subject || `Formal Notice Regarding Breach and Demand for Resolution`,
      contractDate: docInput.contractDate || baseDoc.contractDate || 'January 2023',
      missedMilestone: docInput.missedMilestone || baseDoc.missedMilestone || 'Non-compliance with statutory/contractual obligations',
      demandAmount: docInput.demandAmount || baseDoc.demandAmount || '$1,500 USD',
      deadlineDays: docInput.deadlineDays || baseDoc.deadlineDays || '14 business days',
      deadlineDate: docInput.deadlineDate || baseDoc.deadlineDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      factsSummary: docInput.factsSummary || baseDoc.factsSummary || '',
      grounds: docInput.grounds || baseDoc.grounds || [],
      prayer: docInput.prayer || baseDoc.prayer || '',
      attachments: docInput.attachments || baseDoc.attachments || [],
      signature: docInput.signature || baseDoc.signature || {
        name: 'Citizen Claimant',
        role: 'Aggrieved Party',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      },
      isRevisionApplied: docInput.isRevisionApplied || false,
      revisions: docInput.revisions || [],
      aiSuggestion: docInput.aiSuggestion || baseDoc.aiSuggestion || {
        title: 'Nyaya AI Suggestion',
        text: 'Consider adding explicit statutory interest demand and formal payment account credentials.'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedList = [newDoc, ...docs.filter((d) => d.id !== newId)];
    saveStoredDocuments(updatedList);
    return Promise.resolve(newDoc);
  },

  // 5. Create document directly from template ID
  createDocumentFromTemplate: async (templateId, context = {}) => {
    const templateDoc = documentTemplateService.generateDocument(templateId, context);
    return documentService.createDocument(templateDoc);
  },

  // 5. Update an existing document
  updateDocument: async (id, updates) => {
    const docs = getStoredDocuments();
    const index = docs.findIndex((d) => d.id === id);
    if (index === -1) {
      // If not found by id, check by caseId
      const caseIndex = docs.findIndex((d) => d.caseId === id);
      if (caseIndex !== -1) {
        const updated = {
          ...docs[caseIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        docs[caseIndex] = updated;
        saveStoredDocuments(docs);
        return Promise.resolve(updated);
      }
      return Promise.reject(new Error(`Document not found with ID: ${id}`));
    }

    const updated = {
      ...docs[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    docs[index] = updated;
    saveStoredDocuments(docs);
    return Promise.resolve(updated);
  },

  // 6. Apply or toggle AI revision on document
  addDocumentRevision: async (id, revisionPrompt) => {
    const docs = getStoredDocuments();
    const index = docs.findIndex((d) => d.id === id || d.caseId === id);
    if (index === -1) return Promise.reject(new Error(`Document not found: ${id}`));

    const target = docs[index];
    const newRevisions = [
      ...(target.revisions || []),
      {
        prompt: revisionPrompt || 'AI Automatic Optimization',
        timestamp: new Date().toISOString()
      }
    ];

    const updated = {
      ...target,
      isRevisionApplied: true,
      revisions: newRevisions,
      updatedAt: new Date().toISOString()
    };

    docs[index] = updated;
    saveStoredDocuments(docs);
    return Promise.resolve(updated);
  },

  // 7. Update document status (e.g. 'Submitted to Authority', 'Review Ready')
  updateDocumentStatus: async (id, newStatus) => {
    const docs = getStoredDocuments();
    const index = docs.findIndex((d) => d.id === id || d.caseId === id);
    if (index === -1) return Promise.reject(new Error(`Document not found: ${id}`));

    const updated = {
      ...docs[index],
      status: newStatus,
      updatedAt: new Date().toISOString()
    };

    docs[index] = updated;
    saveStoredDocuments(docs);
    return Promise.resolve(updated);
  },

  // 8. Delete document
  deleteDocument: async (id) => {
    const docs = getStoredDocuments();
    const filtered = docs.filter((d) => d.id !== id && d.caseId !== id);
    saveStoredDocuments(filtered);
    return Promise.resolve(true);
  },

  // 9. Reset to default mock documents
  resetToDefaults: async () => {
    saveStoredDocuments(mockDocuments);
    return Promise.resolve([...mockDocuments]);
  }
};
