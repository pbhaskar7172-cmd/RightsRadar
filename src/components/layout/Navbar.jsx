import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navLinks = [
    { name: 'AI Assistant', path: '/assistant' },
    { name: 'My Cases', path: '/cases' },
    { name: 'Documents', path: '/documents' },
    { name: 'ActionRadar', path: '/action-radar' },
    { name: 'About', path: '/#about' },
  ];

  const isActive = (path) => {
    if (path === '/#about') return location.hash === '#about';
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,9,25,0.04)]">
      <div className="h-20 max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
        {/* Brand & Nav */}
        <div className="flex items-center gap-stack-lg">
          <Link to="/" className="text-headline-lg font-headline-lg tracking-tight text-primary uppercase hover:opacity-90 transition-opacity">
            Nyaya AI
          </Link>
          
          <nav className="hidden lg:flex items-center gap-gutter">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors text-label-md font-label-md ${
                    active
                      ? 'text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-stack-md">
          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center p-1.5 rounded-full hover:bg-surface-variant relative"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-variant p-4 z-50 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
                  <span className="font-label-md text-label-md font-semibold text-primary">Alerts & Actions</span>
                  <span className="text-caption text-on-surface-variant">3 New</span>
                </div>
                <div className="py-2 space-y-3">
                  <div 
                    onClick={() => { setShowNotifications(false); navigate('/action-radar'); }}
                    className="p-2 rounded-lg bg-error-container/20 border-l-2 border-[#ef4444] cursor-pointer hover:bg-error-container/30 transition-colors"
                  >
                    <p className="text-caption font-semibold text-[#ef4444]">Action Required: Online Banking Fraud</p>
                    <p className="text-caption text-on-surface-variant">Deadline tomorrow for ombudsman submission.</p>
                  </div>
                  <div 
                    onClick={() => { setShowNotifications(false); navigate('/cases/matter-882-a'); }}
                    className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    <p className="text-caption font-semibold text-primary">Lease Document Needed</p>
                    <p className="text-caption text-on-surface-variant">Upload proof for Security Deposit Dispute.</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowNotifications(false); navigate('/action-radar'); }}
                  className="w-full mt-2 text-center text-caption font-semibold text-primary hover:underline"
                >
                  View all in ActionRadar →
                </button>
              </div>
            )}
          </div>

          {/* Profile Button */}
          <Link
            to="/profile"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity"
            title="User Profile"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </Link>

          {/* Primary CTA */}
          <Link
            to="/assistant"
            className="px-stack-md py-unit bg-primary text-on-primary text-label-md font-label-md rounded-lg hover:bg-primary-container transition-all shadow-sm hidden sm:inline-flex items-center"
          >
            Get Started
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-on-surface-variant hover:text-primary p-1"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-low border-b border-surface-variant px-6 py-4 space-y-3">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-body-md ${
                  active ? 'text-primary font-semibold' : 'text-on-surface-variant'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center py-2.5 bg-primary text-on-primary text-label-md font-label-md rounded-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
