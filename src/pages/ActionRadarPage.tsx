import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCivicData } from '../context/CivicDataContext';
import { ActionRadarWidget } from '../components/radar/ActionRadarWidget';
import { Button } from '../components/common/Button';
import { Compass } from 'lucide-react';

export const ActionRadarPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cases } = useCivicData();

  const caseId = searchParams.get('caseId');
  const currentCase = cases.find(c => c.id === caseId) || cases[0];

  if (!currentCase) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">No active ActionRadar</h2>
        <Button className="mt-4" onClick={() => navigate('/start-case')}>Start Case</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-civic-50 text-civic-700 border border-civic-200 text-xs font-semibold uppercase tracking-wider mb-2">
          <Compass className="w-3.5 h-3.5 text-civic-600" />
          Signature Strategy Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          ActionRadar
        </h1>
        <p className="text-sm text-slate-500 mt-1">
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
