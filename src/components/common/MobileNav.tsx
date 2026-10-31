import React from 'react';
import { useCRM, ActiveTab } from '../../context/CRMContext';
import { Users, Building2, MessageSquare, Instagram, Settings } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useCRM();

  const items: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'clinic', label: 'CRM', icon: <Users className="w-5 h-5" /> },
    { id: 'admin', label: 'Clinics', icon: <Building2 className="w-5 h-5" /> },
    { id: 'chat', label: 'Chat Demo', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'ad', label: 'Ad Preview', icon: <Instagram className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-14">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                isActive ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.icon}
              <span className="text-[10px] tracking-tight whitespace-nowrap shrink-0">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
