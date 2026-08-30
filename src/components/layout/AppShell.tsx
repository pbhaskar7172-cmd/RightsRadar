import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';

export const AppShell: React.FC = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-civic-500 selection:text-white relative overflow-x-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[35rem] h-[35rem] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[35rem] h-[35rem] rounded-full bg-emerald-600/8 blur-[130px]" />
        <div className="absolute inset-0 radar-grid opacity-20" />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 relative z-20">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0 relative z-10">
        <Header onOpenMobileMenu={() => setIsMobileDrawerOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isDrawerOpen={isMobileDrawerOpen}
        onCloseDrawer={() => setIsMobileDrawerOpen(false)}
      />
    </div>
  );
};

