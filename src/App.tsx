import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CivicDataProvider } from './context/CivicDataContext';
import { AppShell } from './components/layout/AppShell';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { StartCasePage } from './pages/StartCasePage';
import { IntakePage } from './pages/IntakePage';
import { DiagnosisPage } from './pages/DiagnosisPage';
import { ActionRadarPage } from './pages/ActionRadarPage';
import { SourcesPage } from './pages/SourcesPage';
import { DocumentPage } from './pages/DocumentPage';
import { SubmissionPage } from './pages/SubmissionPage';
import { CasesPage } from './pages/CasesPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { EvidencePage } from './pages/EvidencePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { HelpPage } from './pages/HelpPage';

export function App() {
  return (
    <CivicDataProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/start-case" element={<StartCasePage />} />
            <Route path="/intake" element={<IntakePage />} />
            <Route path="/diagnosis" element={<DiagnosisPage />} />
            <Route path="/action-radar" element={<ActionRadarPage />} />
            <Route path="/sources" element={<SourcesPage />} />
            <Route path="/document" element={<DocumentPage />} />
            <Route path="/submission" element={<SubmissionPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/cases/:id" element={<CaseDetailPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/evidence" element={<EvidencePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CivicDataProvider>
  );
}

export default App;
