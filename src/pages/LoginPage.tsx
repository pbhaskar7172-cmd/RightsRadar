import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Scale, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Zap, 
  Users, 
  ArrowUpRight
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS, UserRole } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, signup, loginAsDemo, loginAsGuest, isLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'demo' | 'signin' | 'signup'>('demo');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('priya.sharma@civiccitizen.in');
  const [signInPassword, setSignInPassword] = useState('password123');

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpRole, setSignUpRole] = useState<UserRole>('citizen');

  // Newsletter / Quick Email State (from reference image)
  const [quickEmail, setQuickEmail] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!signInEmail || !signInPassword) {
      setErrorMsg('Please enter your email and password.');
      return;
    }
    try {
      await login(signInEmail, signInPassword);
      navigate('/');
    } catch (err) {
      setErrorMsg('Failed to sign in. Please try again.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!signUpName || !signUpEmail || !signUpPassword) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    try {
      await signup(signUpName, signUpEmail, signUpPassword, signUpRole);
      navigate('/');
    } catch (err) {
      setErrorMsg('Failed to create account.');
    }
  };

  const handleDemoSelect = (demoId: string) => {
    loginAsDemo(demoId);
    navigate('/');
  };

  const handleGuestEnter = () => {
    loginAsGuest();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col justify-center relative font-sans selection:bg-slate-900 selection:text-white py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl w-full mx-auto my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold Headline & Newsletter (Matching Reference Image) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8"
          >
            {/* Minimal Brand Mark */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-sm">
                人
              </div>
              <div>
                <span className="font-extrabold text-slate-950 text-lg tracking-tight block leading-tight">
                  RightsTrack
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Citizen Legal Intelligence
                </span>
              </div>
            </div>

            {/* Bold Headline (Matching Image "Grow Bold. Move Free. Play Hard.") */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.05]">
                Grow Bold.<br />
                Move Free.<br />
                Claim Rights.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
                A modern platform where citizens discover statutory rights, enforce legal timelines, generate valid notices, and hold authorities accountable.
              </p>
            </div>

            {/* Input & Black Action Button (Matching Image email address + Subscribe button) */}
            <div className="pt-2 max-w-md space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Quick Access by Email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="flex-1 px-4 py-3 bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-2xl border border-slate-200 focus:border-slate-900 outline-none shadow-subtle font-medium"
                />
                <button
                  onClick={() => {
                    if (quickEmail) {
                      login(quickEmail, 'password123');
                      navigate('/');
                    } else {
                      handleGuestEnter();
                    }
                  }}
                  className="btn-black px-6"
                >
                  <span>Enter</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-slate-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Client-Side Privacy</span>
                </span>
                <span>•</span>
                <span>RTI Act 2005 & CPA 2019 Ready</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean White Rounded Card with Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 max-w-lg w-full mx-auto"
          >
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-elevated">
              
              {/* Card Header with Guest Mode Link */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-950 tracking-tight">
                    Citizen Access Hub
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Select a demo persona or use your credentials
                  </p>
                </div>

                <button
                  onClick={handleGuestEnter}
                  className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Guest</span>
                </button>
              </div>

              {/* Animated Tab Bar */}
              <div className="flex p-1 mt-5 rounded-full bg-slate-100 border border-slate-200/60 relative">
                <button
                  type="button"
                  onClick={() => { setActiveTab('demo'); setErrorMsg(''); }}
                  className={`flex-1 py-2 rounded-full text-xs font-extrabold transition-all relative z-10 flex items-center justify-center gap-1.5 ${
                    activeTab === 'demo' ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Quick Demo</span>
                  {activeTab === 'demo' && (
                    <motion.div
                      layoutId="activeLoginTab"
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-pill border border-slate-200/80"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setErrorMsg(''); }}
                  className={`flex-1 py-2 rounded-full text-xs font-extrabold transition-all relative z-10 flex items-center justify-center gap-1.5 ${
                    activeTab === 'signin' ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                  {activeTab === 'signin' && (
                    <motion.div
                      layoutId="activeLoginTab"
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-pill border border-slate-200/80"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
                  className={`flex-1 py-2 rounded-full text-xs font-extrabold transition-all relative z-10 flex items-center justify-center gap-1.5 ${
                    activeTab === 'signup' ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                  {activeTab === 'signup' && (
                    <motion.div
                      layoutId="activeLoginTab"
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-pill border border-slate-200/80"
                    />
                  )}
                </button>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2"
                  >
                    <span>⚠️ {errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* TAB 1: DEMO PERSONAS */}
              {activeTab === 'demo' && (
                <div className="mt-5 space-y-3">
                  <p className="text-xs font-bold text-slate-500">
                    Select a preloaded role to test case workflows immediately:
                  </p>

                  <div className="space-y-2.5">
                    {DEMO_ACCOUNTS.map((account, i) => {
                      const pastelBg = [
                        'bg-pastel-blue-light border-blue-200',
                        'bg-pastel-yellow-light border-amber-200',
                        'bg-pastel-purple-light border-purple-200'
                      ][i % 3];

                      return (
                        <motion.button
                          key={account.id}
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleDemoSelect(account.id)}
                          className={`w-full p-3.5 rounded-2xl ${pastelBg} border text-left flex items-center justify-between group shadow-subtle cursor-pointer transition-all`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={account.avatar}
                              alt={account.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-slate-900 text-sm truncate">
                                  {account.name}
                                </span>
                                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                                  {account.role.toUpperCase()}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                                {account.roleTitle}
                              </div>
                            </div>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors shadow-subtle shrink-0 ml-2">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: SIGN IN */}
              {activeTab === 'signin' && (
                <form onSubmit={handleSignIn} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-sm text-slate-900 rounded-2xl border border-slate-200 focus:border-slate-900 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Password</label>
                      <span className="text-[11px] font-bold text-slate-500 hover:underline cursor-pointer">Forgot?</span>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 text-sm text-slate-900 rounded-2xl border border-slate-200 focus:border-slate-900 outline-none transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-black py-3.5 mt-2 text-sm font-extrabold flex items-center justify-center gap-2"
                  >
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* TAB 3: SIGN UP */}
              {activeTab === 'signup' && (
                <form onSubmit={handleSignUp} className="mt-5 space-y-3.5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Full Legal Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 text-sm text-slate-900 rounded-2xl border border-slate-200 focus:border-slate-900 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="citizen@domain.com"
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 text-sm text-slate-900 rounded-2xl border border-slate-200 focus:border-slate-900 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Select Persona Role</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['citizen', 'advocate', 'ngo_worker'] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setSignUpRole(r)}
                          className={`p-2 rounded-2xl text-xs font-extrabold border transition-all capitalize ${
                            signUpRole === r
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900'
                          }`}
                        >
                          {r.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Create Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="Minimum 8 characters"
                        className="w-full pl-10 pr-10 py-2 bg-slate-50 text-sm text-slate-900 rounded-2xl border border-slate-200 focus:border-slate-900 outline-none transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-black py-3.5 mt-2 text-sm font-extrabold flex items-center justify-center gap-2"
                  >
                    <span>Create Account & Start</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

