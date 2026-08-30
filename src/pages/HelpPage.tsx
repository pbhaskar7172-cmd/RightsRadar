import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_FAQS } from '../data/mockFaqs';
import { ISSUE_TYPE_LIST } from '../data/issueTypes';
import { FaqItem } from '../types';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Scale, 
  Sparkles, 
  CheckCircle2,
  Send,
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-01');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const filteredFaqs = MOCK_FAQS.filter((faq: FaqItem) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.statuteReference && faq.statuteReference.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setIsContactModalOpen(false);
      setContactSubject('');
      setContactMessage('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-civic-50 text-civic-700 border border-civic-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-civic-600" />
            Citizen Knowledge Base & FAQ
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Can We Assist You?
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Learn how CivicGuide empowers you with statutory notices, RTI appeals, and consumer remedies.
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={() => setIsContactModalOpen(true)}
          leftIcon={<MessageSquare className="w-4 h-4" />}
        >
          Contact Citizen Support
        </Button>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-elevated">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs, RTI rules, consumer timeframes, tenancy rights..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 focus:bg-white text-sm text-slate-900 rounded-2xl border border-slate-200 focus:border-civic-600 focus:ring-4 focus:ring-civic-100 outline-none transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-navy-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Questions ({MOCK_FAQS.length})
          </button>

          <button
            onClick={() => setSelectedCategory('general')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === 'general'
                ? 'bg-civic-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            General CivicGuide
          </button>

          {ISSUE_TYPE_LIST.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedCategory(type.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                selectedCategory === type.id
                  ? 'bg-civic-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: type.accentColor }} />
              <span>{type.shortName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq: FaqItem) => {
          const isExpanded = expandedFaqId === faq.id;

          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded ? 'bg-white border-civic-300 shadow-md ring-2 ring-civic-50' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isExpanded ? 'bg-civic-50 text-civic-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </h3>
                </div>

                <div className="text-slate-400 shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 space-y-3 border-t border-slate-100">
                      <p className="leading-relaxed">{faq.answer}</p>

                      {faq.statuteReference && (
                        <div className="inline-flex items-center gap-1.5 text-xs text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                          <Scale className="w-3.5 h-3.5 text-blue-600" />
                          <span><strong>Governing Statute:</strong> {faq.statuteReference}</span>
                        </div>
                      )}

                      {faq.actionTip && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-civic-600 shrink-0 mt-0.5" />
                          <span><strong>Strategic Tip:</strong> {faq.actionTip}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Contact Citizen Support Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Contact Citizen Guide Support"
        description="Submit a question or feedback regarding the CivicGuide platform"
      >
        {contactSent ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Message Received!</h3>
            <p className="text-xs text-slate-500">
              Thank you for reaching out. Our citizen support team will review your inquiry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Subject / Question Topic *</label>
              <input
                type="text"
                required
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="e.g. Question on Consumer Forum notice format"
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Message Description *</label>
              <textarea
                rows={4}
                required
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Please describe how we can assist you..."
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsContactModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />}>Send Message</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
