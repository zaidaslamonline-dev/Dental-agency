import React from 'react';
import { CRMProvider, useCRM } from './context/CRMContext';
import { Header } from './components/common/Header';
import { MobileNav } from './components/common/MobileNav';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ClinicDashboard } from './components/clinic/ClinicDashboard';
import { PatientChatDemo } from './components/chat/PatientChatDemo';
import { InstagramAdPreview } from './components/ad/InstagramAdPreview';
import { ClinicSettings } from './components/settings/ClinicSettings';
import { CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, toastMessage } = useCRM();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'clinic' && <ClinicDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
        {activeTab === 'chat' && <PatientChatDemo />}
        {activeTab === 'ad' && <InstagramAdPreview />}
        {activeTab === 'settings' && <ClinicSettings />}
      </main>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs sm:text-sm flex items-center gap-2.5 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <MobileNav />
    </div>
  );
};

export default function App() {
  return (
    <CRMProvider>
      <MainContent />
    </CRMProvider>
  );
}
