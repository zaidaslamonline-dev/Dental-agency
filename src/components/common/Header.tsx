import React, { useState } from 'react';
import { useCRM, ActiveTab } from '../../context/CRMContext';
import { Building2, MessageSquare, Instagram, Settings, Users, Plus, ChevronDown, Check, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    clinics,
    activeClinic,
    activeClinicId,
    setActiveClinicId,
    activeTab,
    setActiveTab,
    setActiveTab: setTab,
  } = useCRM();

  const [clinicDropdownOpen, setClinicDropdownOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'clinic', label: 'Clinic CRM', icon: <Users className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin Portfolio', icon: <Building2 className="w-4 h-4" /> },
    { id: 'chat', label: 'Patient Chat Demo', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'ad', label: 'Instagram Ad', icon: <Instagram className="w-4 h-4" /> },
    { id: 'settings', label: 'Clinic Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Title */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('clinic')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-sm"
                style={{ backgroundColor: activeClinic.brandColor || '#0d9488' }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white group-hover:text-teal-300 transition-colors whitespace-nowrap">
                  DentalFlow
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-normal">
                  CRM
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-slate-800 text-teal-400 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Multi-tenant Clinic Switcher & Quick Intake CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Clinic Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setClinicDropdownOpen(!clinicDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700/80 text-slate-200 rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: activeClinic.brandColor || '#0d9488' }}
                />
                <span className="max-w-[120px] sm:max-w-[180px] truncate text-left">
                  {activeClinic.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {clinicDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setClinicDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-20 text-slate-900 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Active Clinic Tenant
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Switch between managed dental practices
                      </p>
                    </div>

                    <div className="py-1 max-h-60 overflow-y-auto">
                      {clinics.map((clinic) => {
                        const isSelected = clinic.id === activeClinicId;
                        return (
                          <button
                            key={clinic.id}
                            onClick={() => {
                              setActiveClinicId(clinic.id);
                              setClinicDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                              isSelected ? 'bg-slate-50 font-semibold text-teal-700' : 'text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: clinic.brandColor }}
                              />
                              <div className="truncate">
                                <p className="truncate font-medium">{clinic.name}</p>
                                <p className="text-[11px] text-slate-500 truncate">{clinic.city}</p>
                              </div>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="px-2 pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setClinicDropdownOpen(false);
                          setActiveTab('admin');
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-teal-700 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Manage & Add Clinics</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Quick Action: Test Intake Simulator */}
            <button
              onClick={() => setTab('chat')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Simulate Chat Intake</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
