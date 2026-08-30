import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { Shield, Sparkles, Scale, Heart } from 'lucide-react';

export const AppShell: React.FC = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white relative">
      {/* Header with Top Navigation Bar */}
      <Header onOpenMobileMenu={() => setIsMobileDrawerOpen(true)} />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 pb-24 lg:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Editorial Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">
              Y
            </div>
            <span className="font-extrabold text-slate-900 text-sm tracking-tight">RightsTrack Yojna</span>
            <span>•</span>
            <span>Statutory Citizen Rights System</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/sources" className="hover:text-slate-900 transition-colors">Statutory Acts</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Citizen FAQ</Link>
            <Link to="/radar" className="hover:text-slate-900 transition-colors">Action Radar</Link>
            <Link to="/documents" className="hover:text-slate-900 transition-colors">Legal Drafts</Link>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built for Citizens</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in India</span>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isDrawerOpen={isMobileDrawerOpen}
        onCloseDrawer={() => setIsMobileDrawerOpen(false)}
      />
    </div>
  );
};



