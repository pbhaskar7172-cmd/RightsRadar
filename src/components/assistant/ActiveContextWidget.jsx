import { Link } from 'react-router-dom';
import { mockRecentGuidance } from '../../data/mockData';

export function ActiveContextWidget({ matterNumber = "Matter #882-A", title = "Property Dispute", progress = 33, stage = "Gathering initial facts (33%)", caseId = "matter-882-a" }) {
  return (
    <div className="flex flex-col gap-unit">
      <h3 className="text-title-lg font-title-lg text-primary mb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-[20px]">target</span>
        Active Context
      </h3>
      <Link to={`/cases/${caseId}`} className="block group">
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-variant flex flex-col gap-3 group-hover:border-primary/40 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-caption font-caption text-outline uppercase tracking-wider block mb-1">
                {matterNumber}
              </span>
              <h4 className="text-label-md font-label-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                {title}
              </h4>
            </div>
            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-label-md rounded font-semibold uppercase tracking-wider">
              In Progress
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-caption font-caption text-on-surface-variant">
            {stage}
          </p>
        </div>
      </Link>
    </div>
  );
}

export function RecentGuidanceList() {
  return (
    <div className="flex flex-col gap-unit mt-stack-sm">
      <h3 className="text-label-md font-label-md text-outline uppercase tracking-wider mb-2">
        Recent Guidance
      </h3>
      <div className="flex flex-col gap-2">
        {mockRecentGuidance.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-surface-container-lowest transition-colors border border-transparent hover:border-surface-variant/50"
          >
            <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary">
                {item.icon}
              </span>
            </div>
            <div>
              <h5 className="text-label-md font-label-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                {item.title}
              </h5>
              <p className="text-caption font-caption text-on-surface-variant mt-1">
                {item.time} • {item.meta}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        to="/cases"
        className="mt-2 text-label-md font-label-md text-primary hover:text-primary-container flex items-center gap-1 w-fit font-medium"
      >
        View all history
        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </Link>
    </div>
  );
}
