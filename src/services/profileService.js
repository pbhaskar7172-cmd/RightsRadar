import { mockUserProfile } from '../data/mockData.js';

const STORAGE_KEY = 'nyaya_user_profile';

const defaultProfile = {
  ...mockUserProfile,
  address: '104 Landmark Avenue, Suite 4B, New York, NY 10001',
  preferredLanguage: 'English',
  notificationPreferences: {
    email: true,
    sms: true,
    radarAlerts: true,
    deadlineAlerts: true
  },
  accessibilityPreferences: {
    highContrast: false,
    reducedMotion: false,
    largerFont: false
  }
};

function getStoredProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfile));
      return { ...defaultProfile };
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? { ...defaultProfile, ...parsed } : { ...defaultProfile };
  } catch {
    return { ...defaultProfile };
  }
}

function saveStoredProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to persist profile to localStorage:', err);
  }
}

export const profileService = {
  getProfile: async () => {
    return Promise.resolve(getStoredProfile());
  },

  updateProfile: async (updates) => {
    const current = getStoredProfile();
    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveStoredProfile(updated);
    return Promise.resolve(updated);
  },

  resetProfile: async () => {
    saveStoredProfile(defaultProfile);
    return Promise.resolve({ ...defaultProfile });
  },

  validateProfile: (profile) => {
    const errors = {};
    if (!profile.name || !profile.name.trim()) {
      errors.name = 'Full legal name is required.';
    }
    if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) {
      errors.email = 'A valid email address is required.';
    }
    if (profile.phone && !/^[+0-9\s\-()]{7,20}$/.test(profile.phone.trim())) {
      errors.phone = 'Please enter a valid phone number format.';
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};
