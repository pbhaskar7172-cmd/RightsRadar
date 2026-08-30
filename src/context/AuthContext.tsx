import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'citizen' | 'advocate' | 'ngo_worker' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  avatar: string;
  phone?: string;
  location?: string;
  verified: boolean;
  activeCasesCount?: number;
  resolvedCasesCount?: number;
  remedySuccessRate?: number;
}

export interface DemoAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  avatar: string;
  phone: string;
  location: string;
  verified: boolean;
  description: string;
  accentGradient: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'demo-citizen',
    name: 'Priya Sharma',
    email: 'priya.sharma@civiccitizen.in',
    role: 'citizen',
    roleTitle: 'Verified Citizen Advocate',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98765 43210',
    location: 'New Delhi, India',
    verified: true,
    description: 'Active RTI filer & consumer dispute resolver managing municipal and builder grievances.',
    accentGradient: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'demo-advocate',
    name: 'Adv. Rajesh Verma',
    email: 'rajesh.verma@legalaction.org',
    role: 'advocate',
    roleTitle: 'High Court & RTI Legal Counsel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98111 22334',
    location: 'Lucknow, Uttar Pradesh',
    verified: true,
    description: 'Specializes in First Appellate RTI filings, statutory legal notices, and consumer tribunals.',
    accentGradient: 'from-purple-600 to-pink-600',
  },
  {
    id: 'demo-ngo',
    name: 'Ananya Sen',
    email: 'ananya.sen@janaadhikar.org',
    role: 'ngo_worker',
    roleTitle: 'Civic NGO Field Coordinator',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 97222 55667',
    location: 'Kolkata, West Bengal',
    verified: true,
    description: 'Assisting community welfare beneficiaries with delayed subsidies and cyber fraud intake.',
    accentGradient: 'from-emerald-600 to-teal-600',
  }
];

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string, role?: UserRole) => Promise<boolean>;
  loginAsDemo: (demoId: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AUTH_STORAGE_KEY = 'civicguide_auth_user_v2';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse auth user', e);
      }
    }
    // Default to the first demo account for a seamless instant onboarding
    return {
      id: DEMO_ACCOUNTS[0].id,
      name: DEMO_ACCOUNTS[0].name,
      email: DEMO_ACCOUNTS[0].email,
      role: DEMO_ACCOUNTS[0].role,
      roleTitle: DEMO_ACCOUNTS[0].roleTitle,
      avatar: DEMO_ACCOUNTS[0].avatar,
      phone: DEMO_ACCOUNTS[0].phone,
      location: DEMO_ACCOUNTS[0].location,
      verified: true,
      activeCasesCount: 4,
      resolvedCasesCount: 12,
      remedySuccessRate: 96,
    };
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, _pass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600)); // smooth realistic micro-delay
    
    // Check if matches any demo user
    const matchedDemo = DEMO_ACCOUNTS.find(d => d.email.toLowerCase() === email.toLowerCase());
    if (matchedDemo) {
      setUser({
        id: matchedDemo.id,
        name: matchedDemo.name,
        email: matchedDemo.email,
        role: matchedDemo.role,
        roleTitle: matchedDemo.roleTitle,
        avatar: matchedDemo.avatar,
        phone: matchedDemo.phone,
        location: matchedDemo.location,
        verified: matchedDemo.verified,
        activeCasesCount: 4,
        resolvedCasesCount: 12,
        remedySuccessRate: 96,
      });
    } else {
      const name = email.split('@')[0].replace('.', ' ');
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      setUser({
        id: `user-${Date.now()}`,
        name: formattedName || 'Citizen User',
        email,
        role: 'citizen',
        roleTitle: 'Civic Rights Advocate',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
        phone: '+91 98765 00000',
        location: 'India',
        verified: true,
        activeCasesCount: 1,
        resolvedCasesCount: 0,
        remedySuccessRate: 100,
      });
    }
    setIsLoading(false);
    return true;
  };

  const signup = async (name: string, email: string, _pass: string, role: UserRole = 'citizen'): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const roleTitleMap: Record<UserRole, string> = {
      citizen: 'Citizen Applicant',
      advocate: 'Legal Counsel',
      ngo_worker: 'NGO Community Rep',
      guest: 'Guest Citizen'
    };

    setUser({
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      roleTitle: roleTitleMap[role],
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      phone: '+91 98765 00000',
      location: 'India',
      verified: true,
      activeCasesCount: 0,
      resolvedCasesCount: 0,
      remedySuccessRate: 100,
    });
    setIsLoading(false);
    return true;
  };

  const loginAsDemo = (demoId: string) => {
    const demo = DEMO_ACCOUNTS.find(d => d.id === demoId) || DEMO_ACCOUNTS[0];
    setUser({
      id: demo.id,
      name: demo.name,
      email: demo.email,
      role: demo.role,
      roleTitle: demo.roleTitle,
      avatar: demo.avatar,
      phone: demo.phone,
      location: demo.location,
      verified: demo.verified,
      activeCasesCount: 4,
      resolvedCasesCount: 12,
      remedySuccessRate: 96,
    });
  };

  const loginAsGuest = () => {
    setUser({
      id: 'guest-user',
      name: 'Guest Citizen',
      email: 'guest@rightstrack.local',
      role: 'guest',
      roleTitle: 'Citizen Explorer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      verified: false,
      activeCasesCount: 2,
      resolvedCasesCount: 0,
      remedySuccessRate: 100,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      loginAsDemo,
      loginAsGuest,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

