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
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn text-slate-100">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-civic-950 text-civic-300 border border-civic-500/40 text-xs font-semibold uppercase tracking-wider mb-3 shadow-glow">
            <HelpCircle className="w-3.5 h-3.5 text-civic-400" />
            <span>Citizen Knowledge Base & FAQ</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            How Can We Assist You?
          </h1>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            Learn how RightsTrack empowers you with statutory notices, RTI appeals, and consumer remedies.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsContactModalOpen(true)}
          className="py-3 px-5 rounded-xl bg-gradient-to-r from-civic-600 via-blue-600 to-indigo-600 hover:from-civic-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Citizen Support</span>
        </motion.button>
      </div>

      {/* Search Input Box */}
      <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs, RTI rules, consumer timeframes, tenancy rights..."
            className="w-full pl-12 pr-4 py-3 bg-slate-950 text-sm text-white placeholder:text-slate-500 rounded-2xl border border-slate-800 focus:border-civic-500 focus:ring-2 focus:ring-civic-500/20 outline-none transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-glow'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
            }`}
          >
            All Questions ({MOCK_FAQS.length})
          </button>

          <button
            onClick={() => setSelectedCategory('general')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === 'general'
                ? 'bg-civic-600 text-white shadow-glow'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
            }`}
          >
            General RightsTrack
          </button>

          {ISSUE_TYPE_LIST.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedCategory(type.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                selectedCategory === type.id
                  ? 'bg-civic-950 text-civic-300 border border-civic-500/50 shadow-glow'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
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
                isExpanded ? 'bg-slate-900/95 border-civic-500 shadow-glow' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    isExpanded ? 'bg-civic-950 text-civic-400 border-civic-500/40 shadow-glow' : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </h3>
                </div>

                <div className="text-slate-400 shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-civic-400" /> : <ChevronDown className="w-5 h-5" />}
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
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 space-y-3 border-t border-slate-800">
                      <p className="leading-relaxed text-slate-300">{faq.answer}</p>

                      {faq.statuteReference && (
                        <div className="inline-flex items-center gap-1.5 text-xs text-blue-300 bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-500/30">
                          <Scale className="w-3.5 h-3.5 text-blue-400" />
                          <span><strong>Governing Statute:</strong> {faq.statuteReference}</span>
                        </div>
                      )}

                      {faq.actionTip && (
                        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-civic-400 shrink-0 mt-0.5" />
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
        description="Submit a question or feedback regarding the RightsTrack platform"
      >
        {contactSent ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-glow-emerald">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Message Received!</h3>
            <p className="text-xs text-slate-400">
              Thank you for reaching out. Our citizen support team will review your inquiry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Subject / Question Topic *</label>
              <input
                type="text"
                required
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="e.g. Question on Consumer Forum notice format"
                className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-medium focus:border-civic-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Message Description *</label>
              <textarea
                rows={4}
                required
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Please describe how we can assist you..."
                className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-medium focus:border-civic-500 outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsContactModalOpen(false)} className="border-slate-700 text-slate-300 hover:text-white">Cancel</Button>
              <Button type="submit" variant="civic-glow" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />}>Send Message</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

