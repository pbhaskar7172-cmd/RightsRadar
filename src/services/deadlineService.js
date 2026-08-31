// Deterministic Legal Limitation & ActionRadar Service

export const deadlineService = {
  /**
   * Parse a deadline string (e.g. "In 2 days", "Tomorrow", "October 28, 2023", "In 14 days")
   * into a standardized status, formatted display, and remaining day count.
   */
  parseDeadline(deadlineStr) {
    if (!deadlineStr) {
      return {
        label: 'Statutory Window Open',
        daysLeft: 14,
        status: 'standard', // overdue | urgent | approaching | standard | completed
        urgencyColor: 'text-on-surface-variant'
      };
    }

    const text = deadlineStr.toLowerCase().trim();

    if (text.includes('resolved') || text.includes('concluded') || text.includes('closed')) {
      return {
        label: 'Matter Concluded',
        daysLeft: 999,
        status: 'completed',
        urgencyColor: 'text-primary'
      };
    }

    if (text.includes('overdue') || text.includes('passed') || text.includes('expired')) {
      return {
        label: 'Overdue — Immediate Action Required',
        daysLeft: -1,
        status: 'overdue',
        urgencyColor: 'text-error'
      };
    }

    if (text.includes('today') || text.includes('tomorrow') || text.includes('24h') || text.includes('48h') || text.includes('2 days') || text.includes('3 days') || text.includes('1 day')) {
      return {
        label: deadlineStr,
        daysLeft: 2,
        status: 'urgent',
        urgencyColor: 'text-error'
      };
    }

    if (text.includes('5 days') || text.includes('7 days') || text.includes('10 days') || text.includes('14 days') || text.includes('2 weeks')) {
      return {
        label: deadlineStr,
        daysLeft: 10,
        status: 'approaching',
        urgencyColor: 'text-tertiary'
      };
    }

    return {
      label: deadlineStr,
      daysLeft: 30,
      status: 'standard',
      urgencyColor: 'text-on-surface-variant'
    };
  },

  /**
   * Generate dynamic ActionRadar items across all active cases and documents.
   * Excludes resolved cases from high-urgency alerts.
   */
  generateRadarFeed(cases = [], documents = []) {
    const radarItems = [];

    // Map documents by caseId for instant dynamic lookups
    const docsByCase = {};
    documents.forEach((doc) => {
      if (doc.caseId) {
        if (!docsByCase[doc.caseId]) docsByCase[doc.caseId] = [];
        docsByCase[doc.caseId].push(doc);
      }
    });

    cases.forEach((caseItem) => {
      // 1. Skip resolved/concluded cases from active radar
      if (caseItem.status === 'Resolved' || caseItem.status === 'Concluded') {
        return;
      }

      const linkedDocs = docsByCase[caseItem.id] || [];
      const parsedDeadline = this.parseDeadline(caseItem.deadline);

      // Determine appropriate priority based on deadline and case urgency
      let priority = caseItem.priority || 'Medium';
      if (parsedDeadline.status === 'urgent' || parsedDeadline.status === 'overdue') {
        priority = 'High';
      }

      // Check if draft exists and is ready for review/submission
      const primaryDoc = linkedDocs[0];
      const hasDraft = Boolean(primaryDoc);

      let title = caseItem.nextAction || 'Review Strategic Representation';
      let description = caseItem.description || `Active statutory monitoring for ${caseItem.title}.`;
      let actionLabel = caseItem.nextActionButtonText || 'Take Action';
      let actionType = 'open_case';

      if (hasDraft && (primaryDoc.status === 'Draft Generated' || primaryDoc.status === 'Review Ready')) {
        title = `Review & Issue ${primaryDoc.title || 'Formal Notice'}`;
        description = `Legal draft for "${caseItem.title}" is prepared. Review terms and dispatch before statutory window closes.`;
        actionLabel = 'Review Draft in Editor';
        actionType = 'open_document';
      } else if (caseItem.status === 'Submitted to Authority') {
        title = `Track Authority Response: ${caseItem.authority?.name || 'Forum'}`;
        description = `Statutory cure clock running. If no compliance within ${caseItem.deadline || '14 days'}, escalate via formal follow-up.`;
        actionLabel = 'View Case Timeline';
        actionType = 'open_case';
      }

      radarItems.push({
        id: `radar-${caseItem.id}`,
        caseId: caseItem.id,
        documentId: primaryDoc?.id || null,
        title: title,
        description: description,
        priority: priority,
        deadline: parsedDeadline.label,
        deadlineDaysLeft: parsedDeadline.daysLeft,
        badgeBg: priority === 'High' ? 'bg-[#ef4444]/10' : priority === 'Medium' ? 'bg-[#3b82f6]/10' : 'bg-surface-container',
        badgeText: priority === 'High' ? 'text-[#ef4444]' : priority === 'Medium' ? 'text-[#3b82f6]' : 'text-on-surface-variant',
        caseName: caseItem.title,
        actionType: actionType,
        actionLabel: actionLabel,
        authorityName: caseItem.authority?.name || 'Statutory Forum',
        matterNumber: caseItem.matterNumber || `#${caseItem.id.replace('matter-', '').toUpperCase()}`
      });
    });

    // Sort: High priority & closest deadlines first
    return radarItems.sort((a, b) => {
      if (a.priority === 'High' && b.priority !== 'High') return -1;
      if (b.priority === 'High' && a.priority !== 'High') return 1;
      return a.deadlineDaysLeft - b.deadlineDaysLeft;
    });
  }
};
