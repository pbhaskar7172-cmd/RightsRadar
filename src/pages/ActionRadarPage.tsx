import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCivicData } from '../context/CivicDataContext';
import { ActionRadarWidget } from '../components/radar/ActionRadarWidget';
import { Compass } from 'lucide-react';

export const ActionRadarPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cases } = useCivicData();

  const caseId = searchParams.get('caseId');
  const currentCase = cases.find(c => c.id === caseId) || cases[0];

  if (!currentCase) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-900 shadow-card">
        <h2 className="text-lg font-bold">No active ActionRadar</h2>
        <button className="btn-black mt-4" onClick={() => navigate('/start-case')}>Start Case</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn text-slate-900">
      {/* Top Header */}
      <div className="text-center sm:text-left">
        <span className="editorial-pill mb-3">
          <Compass className="w-3.5 h-3.5 text-slate-900 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Signature Strategy Engine</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mt-1">
          ActionRadar
        </h1>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed font-medium">
          Your precision civic roadmap: statutory steps, required evidence, and enforced response deadlines.
        </p>
      </div>

      {/* Signature ActionRadar Widget */}
      <ActionRadarWidget
        caseId={currentCase.id}
        issueType={currentCase.issueType}
        recommendedAction={currentCase.recommendedAction}
        actionRationale={currentCase.actionRationale}
        statutoryRule={currentCase.statutoryRule}
        statutoryTimeframe={currentCase.statutoryTimeframe}
        confidenceScore={currentCase.confidenceScore}
        requiredDocsList={currentCase.requiredDocsList}
        deadlineDays={currentCase.deadlineDaysRemaining || 30}
        deadlineDate={currentCase.deadlineDate}
        onPrepareDocument={() => navigate(`/document?caseId=${currentCase.id}`)}
        onViewSources={() => navigate(`/sources?type=${currentCase.issueType}`)}
      />
    </div>
  );
};


