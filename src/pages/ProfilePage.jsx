import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profileService } from '../services/profileService';
import { useCases } from '../hooks/useCases';
import { useAllDocuments } from '../hooks/useDocument';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+1 (555) 234-5678',
    address: '104 Landmark Avenue, Suite 4B, New York, NY 10001',
    jurisdiction: 'District Consumer Disputes Forum, State Jurisdiction',
    memberSince: 'October 2023',
    accountType: 'Verified Citizen Tier',
    verifiedIdentity: true,
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
  });

  const { cases } = useCases();
  const { documents } = useAllDocuments();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    let isMounted = true;
    profileService.getProfile().then((data) => {
      if (isMounted && data) {
        setProfile(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const validation = profileService.validateProfile(profile);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors({});
    await profileService.updateProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = async () => {
    const defaultData = await profileService.resetProfile();
    setProfile(defaultData);
    setValidationErrors({});
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col w-full relative min-h-[calc(100vh-80px)]">
      <div className="max-w-[1000px] w-full mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg relative z-10">
        {/* Profile Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-stack-md sm:p-stack-lg shadow-sm border border-surface-variant mb-stack-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-surface-variant/40">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
                <span className="material-symbols-outlined text-[36px]">person</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display-md text-headline-lg text-on-background font-bold">
                    {profile.name}
                  </h1>
                  {profile.verifiedIdentity && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-caption text-caption font-semibold">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      Verified Citizen
                    </span>
                  )}
                </div>
                <p className="text-caption text-on-surface-variant mt-0.5">
                  Member since {profile.memberSince} • {profile.accountType}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                to="/cases"
                className="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-label-md font-label-md hover:bg-surface-container-high transition-colors font-medium text-xs flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">folder</span>
                {cases.length || 4} Active Cases
              </Link>
              <Link
                to="/documents"
                className="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-label-md font-label-md hover:bg-surface-container-high transition-colors font-medium text-xs flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">description</span>
                {documents.length || 3} Legal Drafts
              </Link>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="pt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                Personal & Legal Profile
              </h3>
              <button
                type="button"
                onClick={handleReset}
                className="text-caption text-on-surface-variant hover:text-primary underline font-medium"
              >
                Reset to Default
              </button>
            </div>

            {savedSuccess && (
              <div className="p-3 bg-primary/10 text-primary text-caption rounded-lg flex items-center gap-2 font-semibold animate-fade-in">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Profile settings successfully persisted to your secure vault!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-caption font-caption text-on-surface-variant mb-1 font-medium">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className={`w-full bg-surface-container-low border ${validationErrors.name ? 'border-error ring-1 ring-error' : 'border-surface-variant'} rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary text-sm`}
                />
                {validationErrors.name && (
                  <p className="text-error text-caption mt-1">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-caption font-caption text-on-surface-variant mb-1 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email || ''}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className={`w-full bg-surface-container-low border ${validationErrors.email ? 'border-error ring-1 ring-error' : 'border-surface-variant'} rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary text-sm`}
                />
                {validationErrors.email && (
                  <p className="text-error text-caption mt-1">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-caption font-caption text-on-surface-variant mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className={`w-full bg-surface-container-low border ${validationErrors.phone ? 'border-error ring-1 ring-error' : 'border-surface-variant'} rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary text-sm`}
                />
                {validationErrors.phone && (
                  <p className="text-error text-caption mt-1">{validationErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-caption font-caption text-on-surface-variant mb-1 font-medium">
                  Primary Legal Jurisdiction
                </label>
                <input
                  type="text"
                  value={profile.jurisdiction || ''}
                  onChange={(e) => setProfile({ ...profile, jurisdiction: e.target.value })}
                  className="w-full bg-surface-container-low border border-surface-variant rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-caption font-caption text-on-surface-variant mb-1 font-medium">
                  Official Communication Address (Used in formal notices)
                </label>
                <input
                  type="text"
                  value={profile.address || ''}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full bg-surface-container-low border border-surface-variant rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-caption font-caption text-on-surface-variant mb-1 font-medium">
                  Preferred Language
                </label>
                <select
                  value={profile.preferredLanguage || 'English'}
                  onChange={(e) => setProfile({ ...profile, preferredLanguage: e.target.value })}
                  className="w-full bg-surface-container-low border border-surface-variant rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary text-sm"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Spanish">Spanish (Español)</option>
                  <option value="French">French (Français)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-on-primary rounded-lg text-label-md font-label-md hover:bg-primary-container transition-colors font-medium shadow-sm"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>

        {/* Security & Privacy Settings Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-stack-md shadow-sm border border-surface-variant">
          <h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-4">
            Security & Notification Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">lock</span>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface font-semibold">
                    Client-Attorney Style Encryption
                  </h4>
                  <p className="text-caption text-on-surface-variant">
                    All case drafts and uploaded files are secured with AES-256 local vault encryption.
                  </p>
                </div>
              </div>
              <span className="text-caption font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">radar</span>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface font-semibold">
                    Statutory Limitation & ActionRadar Alerts
                  </h4>
                  <p className="text-caption text-on-surface-variant">
                    Receive timely notification alerts prior to critical statutory limitation expiration.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.notificationPreferences?.deadlineAlerts ?? true}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    notificationPreferences: {
                      ...profile.notificationPreferences,
                      deadlineAlerts: e.target.checked
                    }
                  })
                }
                className="w-5 h-5 accent-primary rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
