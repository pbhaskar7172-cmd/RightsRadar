import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_FAQS } from '../data/mockFaqs';
import { ISSUE_TYPE_LIST } from '../data/issueTypes';
import { FaqItem } from '../types';
import { Modal } from '../components/common/Modal';
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
  ArrowUpRight
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
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn text-slate-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="editorial-pill mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-slate-900" />
            <span>Citizen Knowledge Base & FAQ</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mt-1">
            How Can We Assist You?
          </h1>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed font-medium">
            Learn how RightsTrack empowers you with statutory notices, RTI appeals, and consumer remedies.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsContactModalOpen(true)}
          className="btn-black py-3 px-6 text-sm shrink-0"
        >
          <span>Contact Citizen Support</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs, RTI rules, consumer timeframes, tenancy rights..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 rounded-2xl border border-slate-200 focus:border-slate-900 outline-none transition-all font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 border-t border-slate-100">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-pill'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Questions ({MOCK_FAQS.length})
          </button>

          <button
            onClick={() => setSelectedCategory('general')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 transition-all cursor-pointer ${
              selectedCategory === 'general'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            General RightsTrack
          </button>

          {ISSUE_TYPE_LIST.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedCategory(type.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === type.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: type.accentColor }} />
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
              className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                isExpanded ? 'bg-white border-slate-900 shadow-card' : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-subtle'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                    isExpanded ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-950 leading-snug">
                    {faq.question}
                  </h3>
                </div>

                <div className="text-slate-400 shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-900" /> : <ChevronDown className="w-5 h-5" />}
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
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 space-y-3 border-t border-slate-100 font-medium">
                      <p className="leading-relaxed text-slate-700">{faq.answer}</p>

                      {faq.statuteReference && (
                        <div className="inline-flex items-center gap-1.5 text-xs text-blue-900 bg-pastel-blue-light px-3.5 py-1.5 rounded-full border border-blue-200 font-bold">
                          <Scale className="w-3.5 h-3.5 text-blue-700" />
                          <span><strong>Governing Statute:</strong> {faq.statuteReference}</span>
                        </div>
                      )}

                      {faq.actionTip && (
                        <div className="p-4 bg-pastel-yellow-light rounded-2xl border border-amber-200 text-xs text-slate-800 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
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
        title="Contact Citizen Support"
        description="Submit a question or feedback regarding the RightsTrack platform"
      >
        {contactSent ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-pastel-mint text-emerald-800 flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-950">Message Received!</h3>
            <p className="text-xs text-slate-500 font-medium">
              Thank you for reaching out. Our citizen support team will review your inquiry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-extrabold text-slate-700 mb-1">Subject / Question Topic *</label>
              <input
                type="text"
                required
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="e.g. Question on Consumer Forum notice format"
                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:border-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block font-extrabold text-slate-700 mb-1">Message Description *</label>
              <textarea
                rows={4}
                required
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Please describe how we can assist you..."
                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:border-slate-900 outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button type="button" onClick={() => setIsContactModalOpen(false)} className="btn-pill-outline text-xs">Cancel</button>
              <button type="submit" className="btn-black text-xs flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};


