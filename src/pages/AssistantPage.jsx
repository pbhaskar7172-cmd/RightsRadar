import { useState } from 'react';
import AtmosphericShader from '../animations/AtmosphericShader';
import ComposerCard from '../components/assistant/ComposerCard';
import ConversationFlow from '../components/assistant/ConversationFlow';
import { ActiveContextWidget, RecentGuidanceList } from '../components/assistant/ActiveContextWidget';
import { aiService } from '../services/aiService';

export default function AssistantPage() {
  const [aiState, setAiState] = useState('idle'); // idle, listening, understanding, analyzing, asking, responding, generating
  const [userPrompt, setUserPrompt] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [guidanceResult, setGuidanceResult] = useState(null);

  const handlePromptSubmit = async (prompt) => {
    setUserPrompt(prompt);
    setAiState('understanding');

    try {
      // Step 1: UNDERSTAND & DIAGNOSE
      setAiState('analyzing');
      const analysis = await aiService.analyzeScenario(prompt);
      setAnalysisResult(analysis);
      setAiState('asking');
    } catch {
      setAiState('idle');
    }
  };

  const handleCollectSubmit = async (answers) => {
    if (!analysisResult) return;
    setAiState('preparing_information');

    try {
      // Stepped AI Generation workflow
      await new Promise((r) => setTimeout(r, 450));
      setAiState('selecting_template');
      await new Promise((r) => setTimeout(r, 450));
      setAiState('generating_draft');

      const guidance = await aiService.generateGuidanceAndDocument(analysisResult, answers);
      setGuidanceResult(guidance);
      setAiState('ready_for_review');
      setTimeout(() => setAiState('responding'), 600);
    } catch {
      setAiState('asking');
    }
  };

  const handleReset = () => {
    setUserPrompt('');
    setAnalysisResult(null);
    setGuidanceResult(null);
    setAiState('idle');
  };

  const activeMatterTitle = analysisResult ? analysisResult.category : 'Property Dispute';
  const activeMatterNumber = analysisResult ? 'Active Matter' : 'Matter #882-A';
  const activeProgress = guidanceResult ? 85 : analysisResult ? 55 : 33;
  const activeStage = guidanceResult
    ? 'Document generated & ready (85%)'
    : analysisResult
    ? 'Diagnosis complete, collecting facts (55%)'
    : 'Gathering initial facts (33%)';

  return (
    <div className="flex flex-col w-full relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Atmospheric WebGL Background reacting directly to AI State */}
      <AtmosphericShader
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-multiply pointer-events-none z-0"
        aiState={aiState}
      />

      {/* Main Workspace Container */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop py-stack-lg gap-gutter h-full flex-grow">
        {/* Central AI Composer / Conversation Area */}
        <div className="flex flex-col w-full lg:w-2/3 xl:w-3/4 justify-center py-stack-lg">
          {aiState === 'understanding' || aiState === 'analyzing' ? (
            <div className="bg-surface-container-lowest/90 backdrop-blur-xl p-8 rounded-2xl border border-surface-variant text-center flex flex-col items-center justify-center space-y-4 min-h-[360px] shadow-lg animate-fade-in">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                <span className="material-symbols-outlined absolute text-primary text-[24px]">
                  psychology
                </span>
              </div>
              <h3 className="font-title-lg text-title-lg text-primary font-bold">
                {aiState === 'understanding'
                  ? 'Understanding Fact Pattern...'
                  : 'Diagnosing Governing Statutes & Jurisdictions...'}
              </h3>
              <p className="text-body-md text-on-surface-variant max-w-md text-sm">
                Evaluating applicable consumer acts, limitation windows, and identifying required evidentiary elements.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-caption rounded-full animate-pulse font-medium">
                  Statute Matcher Active
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-caption rounded-full animate-pulse font-medium" style={{ animationDelay: '200ms' }}>
                  Extracting Relief Parameters
                </span>
              </div>
            </div>
          ) : aiState === 'preparing_information' || aiState === 'selecting_template' || aiState === 'generating_draft' || aiState === 'ready_for_review' ? (
            <div className="bg-surface-container-lowest/90 backdrop-blur-xl p-8 rounded-2xl border border-surface-variant text-center flex flex-col items-center justify-center space-y-4 min-h-[360px] shadow-lg animate-fade-in">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                <span className="material-symbols-outlined absolute text-primary text-[24px]">
                  {aiState === 'selecting_template' ? 'find_in_page' : aiState === 'generating_draft' ? 'edit_document' : 'auto_fix_high'}
                </span>
              </div>
              <h3 className="font-title-lg text-title-lg text-primary font-bold">
                {aiState === 'preparing_information'
                  ? 'Preparing Collected Information...'
                  : aiState === 'selecting_template'
                  ? 'Selecting Appropriate Legal Template...'
                  : aiState === 'generating_draft'
                  ? 'Generating Structured Legal Draft...'
                  : 'Ready for Review!'}
              </h3>
              <p className="text-body-md text-on-surface-variant max-w-md text-sm">
                Assembling formal petition structure, inserting collected facts, and preparing statutory grounds.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className={`px-3 py-1 text-caption rounded-full font-medium ${aiState === 'preparing_information' ? 'bg-primary text-on-primary animate-pulse' : 'bg-surface-variant text-on-surface-variant'}`}>
                  1. Prepare Information
                </span>
                <span className={`px-3 py-1 text-caption rounded-full font-medium ${aiState === 'selecting_template' ? 'bg-primary text-on-primary animate-pulse' : 'bg-surface-variant text-on-surface-variant'}`}>
                  2. Select Template
                </span>
                <span className={`px-3 py-1 text-caption rounded-full font-medium ${aiState === 'generating_draft' ? 'bg-primary text-on-primary animate-pulse' : 'bg-surface-variant text-on-surface-variant'}`}>
                  3. Generate Draft
                </span>
                <span className={`px-3 py-1 text-caption rounded-full font-medium ${aiState === 'ready_for_review' ? 'bg-primary text-on-primary animate-pulse' : 'bg-surface-variant text-on-surface-variant'}`}>
                  4. Ready for Review
                </span>
              </div>
            </div>
          ) : analysisResult ? (
            <ConversationFlow
              userPrompt={userPrompt}
              analysisResult={analysisResult}
              guidanceResult={guidanceResult}
              onCollectSubmit={handleCollectSubmit}
              onReset={handleReset}
              aiState={aiState}
            />
          ) : (
            <ComposerCard
              onSubmitPrompt={handlePromptSubmit}
              onListeningChange={(state) => setAiState(state)}
            />
          )}
        </div>

        {/* Sidebar: Context & Recent */}
        <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-stack-md py-stack-lg border-t lg:border-t-0 lg:border-l border-surface-variant/40 lg:pl-gutter lg:ml-gutter">
          <ActiveContextWidget
            matterNumber={activeMatterNumber}
            title={activeMatterTitle}
            progress={activeProgress}
            stage={activeStage}
            caseId="matter-882-a"
          />
          <RecentGuidanceList />
        </div>
      </div>
    </div>
  );
}
