import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Scale, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Zap, 
  Users, 
  Award,
  ChevronRight
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS, UserRole } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, signup, loginAsDemo, loginAsGuest, isLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'demo'>('demo');
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
    <div className="min-h-screen bg-[#060B18] text-slate-100 flex flex-col justify-center relative overflow-hidden selection:bg-civic-500 selection:text-white">
      {/* Animated Ambient Light Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-purple-600/0 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-pink-600/20 via-purple-600/25 to-indigo-600/0 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-gradient-to-t from-emerald-600/25 via-teal-600/15 to-transparent blur-[110px]"
        />
        <div className="absolute inset-0 radar-grid opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Showcase & Brand Intro */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-civic-500/20 to-indigo-500/20 border border-civic-400/30 text-civic-300 text-xs font-semibold shadow-glow backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-civic-400 animate-pulse" />
              <span>Civic Action & Statutory Rights Radar</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Turn Citizen Grievances into <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                  Enforceable Legal Action
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                AI-guided legal notice drafting, RTI 2005 filing automation, and statutory deadline tracking for RTI, Consumer Disputes, Tenancy, and Workplace Rights.
              </p>
            </div>

            {/* Key Value Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-civic-500/40 transition-all group text-left">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="font-bold text-white text-xs sm:text-sm">Instant Statutory Drafts</div>
                <div className="text-slate-400 text-xs mt-0.5">Section-compliant legal notices generated in 60 seconds.</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-indigo-500/40 transition-all group text-left">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Scale className="w-4 h-4" />
                </div>
                <div className="font-bold text-white text-xs sm:text-sm">ActionRadar Tracking</div>
                <div className="text-slate-400 text-xs mt-0.5">30-day statutory response alerts & First Appeal escalation.</div>
              </div>
            </div>

            {/* Social Proof & Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Client-Side Data Privacy</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-civic-300 font-medium">
                <Award className="w-4 h-4" />
                <span>RTI Act 2005 & CPA 2019 Compliant</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Animated Auth Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-6 max-w-lg w-full mx-auto"
          >
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-slate-900 shadow-2xl backdrop-blur-2xl">
              <div className="rounded-[23px] bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl border border-slate-800/80">
                
                {/* Brand Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-civic-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-glow">
                      <Compass className="w-6 h-6 animate-pulse-slow" />
                    </div>
                    <div>
                      <div className="font-extrabold text-white text-lg tracking-tight flex items-center gap-1.5">
                        CivicGuide <span className="text-xs font-bold text-civic-400 px-1.5 py-0.5 rounded bg-civic-950 border border-civic-500/40">Radar</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium">Access Citizen Dashboard</p>
                    </div>
                  </div>

                  <button
                    onClick={handleGuestEnter}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Guest Mode</span>
                  </button>
                </div>

                {/* Interactive Animated Tabs */}
                <div className="flex p-1 mt-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 relative">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('demo'); setErrorMsg(''); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all relative z-10 flex items-center justify-center gap-1.5 ${
                      activeTab === 'demo' ? 'text-amber-300' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Quick Demo</span>
                    {activeTab === 'demo' && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-gradient-to-r from-amber-600/40 to-orange-600/40 border border-amber-500/50 rounded-xl -z-10 shadow-sm"
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('signin'); setErrorMsg(''); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all relative z-10 flex items-center justify-center gap-1.5 ${
                      activeTab === 'signin' ? 'text-civic-300' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-civic-400" />
                    <span>Sign In</span>
                    {activeTab === 'signin' && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-gradient-to-r from-civic-600/50 to-blue-600/50 border border-civic-500/50 rounded-xl -z-10 shadow-sm"
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all relative z-10 flex items-center justify-center gap-1.5 ${
                      activeTab === 'signup' ? 'text-purple-300' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Sign Up</span>
                    {activeTab === 'signup' && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-pink-600/50 border border-purple-500/50 rounded-xl -z-10 shadow-sm"
                      />
                    )}
                  </button>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2"
                    >
                      <span>⚠️ {errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* TAB 1: QUICK DEMO PERSONAS */}
                {activeTab === 'demo' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 space-y-3"
                  >
                    <p className="text-xs text-slate-300">
                      Select an instant pre-loaded profile to test case workflows immediately:
                    </p>

                    <div className="space-y-2.5">
                      {DEMO_ACCOUNTS.map((account) => (
                        <motion.button
                          key={account.id}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDemoSelect(account.id)}
                          className="w-full p-3.5 rounded-2xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-civic-500/60 transition-all text-left flex items-center justify-between group shadow-sm cursor-pointer"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <img
                              src={account.avatar}
                              alt={account.name}
                              className="w-11 h-11 rounded-xl object-cover border border-slate-700 group-hover:border-civic-400 transition-colors shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm truncate">{account.name}</span>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${account.accentGradient} text-white shadow-xs`}>
                                  {account.role.toUpperCase()}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-400 truncate mt-0.5">{account.roleTitle}</div>
                              <div className="text-[10px] text-slate-500 truncate">{account.location}</div>
                            </div>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-civic-600 flex items-center justify-center text-slate-400 group-hover:text-white transition-all shrink-0 ml-2">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="pt-2 text-center">
                      <button
                        onClick={handleGuestEnter}
                        className="text-xs text-slate-400 hover:text-civic-300 font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Or continue anonymously without saving</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: SIGN IN */}
                {activeTab === 'signin' && (
                  <motion.form
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSignIn}
                    className="mt-6 space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          placeholder="name@domain.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 text-sm text-white placeholder:text-slate-500 rounded-xl border border-slate-800 focus:border-civic-500 focus:ring-2 focus:ring-civic-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-slate-300">Password</label>
                        <span className="text-[11px] text-civic-400 hover:underline cursor-pointer">Forgot?</span>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 text-sm text-white placeholder:text-slate-500 rounded-xl border border-slate-800 focus:border-civic-500 focus:ring-2 focus:ring-civic-500/20 outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-civic-600 to-indigo-600 hover:from-civic-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Sign In to Dashboard</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}

                {/* TAB 3: SIGN UP */}
                {activeTab === 'signup' && (
                  <motion.form
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSignUp}
                    className="mt-6 space-y-3.5"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full pl-10 pr-4 py-2 bg-slate-950/80 text-sm text-white placeholder:text-slate-500 rounded-xl border border-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          placeholder="citizen@domain.com"
                          className="w-full pl-10 pr-4 py-2 bg-slate-950/80 text-sm text-white placeholder:text-slate-500 rounded-xl border border-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Select Persona Role</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['citizen', 'advocate', 'ngo_worker'] as UserRole[]).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setSignUpRole(r)}
                            className={`p-2 rounded-xl text-xs font-medium border transition-all capitalize ${
                              signUpRole === r
                                ? 'bg-purple-950 text-purple-300 border-purple-500/60 shadow-glow'
                                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                            }`}
                          >
                            {r.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Create Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          placeholder="Minimum 8 characters"
                          className="w-full pl-10 pr-10 py-2 bg-slate-950/80 text-sm text-white placeholder:text-slate-500 rounded-xl border border-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Create Account & Start</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
