import { NotificationItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-001',
    caseId: 'case-rti-101',
    title: 'Statutory Response Window — 13 Days Remaining',
    message: 'The 30-day statutory response deadline for RTI Case #case-rti-101 (Ward 42 Road Tender) is 12 September 2024. First Appeal preparation will unlock if no response is received.',
    type: 'deadline',
    read: false,
    timestamp: '2 hours ago',
    actionUrl: '/cases/case-rti-101'
  },
  {
    id: 'notif-002',
    caseId: 'case-cons-202',
    title: 'Legal Notice Ready for Final Review',
    message: 'Your Statutory Pre-Litigation Notice under CPA 2019 for Zenith Tech is finalized. Review and mark as ready to record dispatch.',
    type: 'document',
    read: false,
    timestamp: '1 day ago',
    actionUrl: '/document?caseId=case-cons-202'
  },
  {
    id: 'notif-003',
    caseId: 'case-rti-101',
    title: 'Submission Recorded via Speed Post',
    message: 'Postal acknowledgment #ED984210985IN has been attached to Case #case-rti-101. Timeline updated to Response Pending.',
    type: 'submission',
    read: true,
    timestamp: '3 days ago',
    actionUrl: '/cases/case-rti-101'
  },
  {
    id: 'notif-004',
    caseId: 'case-ten-303',
    title: 'ActionRadar Diagnostics Completed',
    message: 'Recommended Action for Tenancy Deposit Dispute: Serve 15-Day Demand Notice under Model Tenancy principles. Confidence score: 94%.',
    type: 'case',
    read: true,
    timestamp: '4 days ago',
    actionUrl: '/action-radar?caseId=case-ten-303'
  }
];
