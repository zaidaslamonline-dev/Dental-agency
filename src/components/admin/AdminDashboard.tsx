import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Clinic } from '../../types/crm';
import {
  Building2,
  Users,
  CalendarCheck,
  TrendingUp,
  DollarSign,
  Plus,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    clinics,
    leads,
    setActiveClinicId,
    setActiveTab,
    addClinic,
    updateClinicSettings,
  } = useCRM();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClinic, setNewClinic] = useState({
    name: '',
    doctorName: '',
    doctorTitle: 'Orthodontic Specialist',
    location: '',
    city: '',
    phone: '',
    whatsappNumber: '',
    brandColor: '#0d9488',
    welcomeMessage: 'Hi there! Thanks for reaching out. Let’s find a convenient time for your smile evaluation.',
  });

  // Calculate aggregates
  const totalLeads = leads.length;
  const totalConsultations = leads.filter(
    (l) => l.status === 'Consultation Requested' || l.status === 'Confirmed' || l.status === 'Completed'
  ).length;
  const totalConfirmed = leads.filter(
    (l) => l.status === 'Confirmed' || l.status === 'Completed'
  ).length;
  const blendedConversion = totalLeads > 0 ? ((totalConsultations / totalLeads) * 100).toFixed(1) : '0';
  const totalPipeline = leads
    .filter((l) => l.status !== 'Lost')
    .reduce((acc, curr) => acc + (curr.estimatedValue || 4500), 0);

  const handleCreateClinic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClinic.name.trim() || !newClinic.doctorName.trim()) return;

    addClinic(newClinic);
    setIsAddModalOpen(false);
    setNewClinic({
      name: '',
      doctorName: '',
      doctorTitle: 'Orthodontic Specialist',
      location: '',
      city: '',
      phone: '',
      whatsappNumber: '',
      brandColor: '#0d9488',
      welcomeMessage: 'Hi there! Thanks for reaching out. Let’s find a convenient time for your smile evaluation.',
    });
  };

  const colorPresets = [
    { label: 'Teal', hex: '#0d9488' },
    { label: 'Ocean Blue', hex: '#0284c7' },
    { label: 'Navy Deep', hex: '#1e3a8a' },
    { label: 'Emerald', hex: '#059669' },
    { label: 'Indigo', hex: '#4f46e5' },
    { label: 'Rose Gold', hex: '#be185d' },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>DentalFlow</span>
            <span aria-hidden="true">·</span>
            <span>Multi-Tenant Network</span>
            <span aria-hidden="true">·</span>
            <span>{clinics.length} Active Practices</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Tenant Portfolio Overview
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Aggregate patient acquisition telemetry, appointment conversion metrics, and multi-practice clinic configurations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Dental Practice</span>
          </button>
        </div>
      </div>

      {/* Aggregate KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Patient Leads</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {totalLeads}
            </span>
            <span className="text-xs text-emerald-600 font-medium">+14% this month</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Across all clinic ad funnels</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Consultations Booked</span>
            <CalendarCheck className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {totalConsultations}
            </span>
            <span className="text-xs text-slate-500">({totalConfirmed} confirmed)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">3D scans & clear aligner visits</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Avg Lead-to-Consultation</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {blendedConversion}%
            </span>
            <span className="text-xs text-emerald-600 font-medium">Top quartile</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Via WhatsApp concierge intake</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active Pipeline Value</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              ${(totalPipeline / 1000).toFixed(1)}k
            </span>
            <span className="text-xs text-slate-500">Est. treatment</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Clear aligner cases in funnel</p>
        </div>
      </div>

      {/* Practices Management Section */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Managed Dental Practices & Performance
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any clinic to drill down into its patient leads CRM, WhatsApp campaigns, and Google Sheets webhook.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-800">{clinics.length}</span> tenant clinics
          </div>
        </div>

        {/* Responsive Table / Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-slate-600 text-xs uppercase font-medium tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Clinic & Doctor</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Leads</th>
                <th className="py-3 px-4">Consultations</th>
                <th className="py-3 px-4">Conv. Rate</th>
                <th className="py-3 px-4">Pipeline</th>
                <th className="py-3 px-4">Webhook Sync</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clinics.map((clinic) => {
                const cLeads = leads.filter((l) => l.clinicId === clinic.id);
                const consults = cLeads.filter(
                  (l) => l.status === 'Consultation Requested' || l.status === 'Confirmed' || l.status === 'Completed'
                ).length;
                const convRate = cLeads.length > 0 ? ((consults / cLeads.length) * 100).toFixed(1) : '0';
                const pipeline = cLeads
                  .filter((l) => l.status !== 'Lost')
                  .reduce((acc, curr) => acc + (curr.estimatedValue || 4500), 0);

                return (
                  <tr key={clinic.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Clinic Branding */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shrink-0 text-sm shadow-xs"
                          style={{ backgroundColor: clinic.brandColor || '#0d9488' }}
                        >
                          {clinic.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate">{clinic.name}</p>
                          <p className="text-xs text-slate-500 truncate">{clinic.doctorName} · {clinic.doctorTitle}</p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4">
                      <div className="text-xs text-slate-700 font-medium">{clinic.city}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[150px]">{clinic.location}</div>
                    </td>

                    {/* Leads */}
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-900 font-semibold">
                      {cLeads.length}
                    </td>

                    {/* Consultations */}
                    <td className="py-3 px-4 font-mono tabular-nums text-teal-700 font-semibold">
                      {consults}
                    </td>

                    {/* Conv Rate */}
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-800">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">{convRate}%</span>
                      </div>
                    </td>

                    {/* Pipeline */}
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-900">
                      ${(pipeline / 1000).toFixed(1)}k
                    </td>

                    {/* Webhook Status */}
                    <td className="py-3 px-4">
                      {clinic.googleSheetsWebhookUrl ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Connected</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                          <span>Ready to link</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setActiveClinicId(clinic.id);
                            setActiveTab('clinic');
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors inline-flex items-center gap-1 shadow-xs"
                        >
                          <span>Open CRM</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            setActiveClinicId(clinic.id);
                            setActiveTab('settings');
                          }}
                          className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                          title="Clinic Configuration & Webhook"
                        >
                          Config
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Practice Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-xs text-sm"
                  style={{ backgroundColor: clinic.brandColor || '#0d9488' }}
                >
                  {clinic.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-[11px] font-mono text-slate-400">ID: {clinic.id.replace('clinic-', '')}</span>
              </div>

              <h3 className="font-bold text-slate-900 mt-3 text-sm line-clamp-1">{clinic.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{clinic.doctorName}</p>

              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{clinic.location}, {clinic.city}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <MessageCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="font-mono">{clinic.whatsappNumber}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {leads.filter((l) => l.clinicId === clinic.id).length} Active Leads
              </span>
              <button
                onClick={() => {
                  setActiveClinicId(clinic.id);
                  setActiveTab('clinic');
                }}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
              >
                <span>Switch View</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add New Dental Clinic */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-bold text-slate-900">Add Dental Practice</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClinic} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Practice / Clinic Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zenith Orthodontics & Smile Bar"
                  value={newClinic.name}
                  onChange={(e) => setNewClinic({ ...newClinic, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Doctor Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Julian Sterling, DDS"
                    value={newClinic.doctorName}
                    onChange={(e) => setNewClinic({ ...newClinic, doctorName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specialty / Credentials
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Orthodontic Specialist"
                    value={newClinic.doctorTitle}
                    onChange={(e) => setNewClinic({ ...newClinic, doctorTitle: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City & State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dallas, TX"
                    value={newClinic.city}
                    onChange={(e) => setNewClinic({ ...newClinic, city: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 500 Main St, Ste 300"
                    value={newClinic.location}
                    onChange={(e) => setNewClinic({ ...newClinic, location: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinic WhatsApp Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +1 555 123 4567"
                    value={newClinic.whatsappNumber}
                    onChange={(e) => setNewClinic({ ...newClinic, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brand Color Accent
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newClinic.brandColor}
                      onChange={(e) => setNewClinic({ ...newClinic, brandColor: e.target.value })}
                      className="w-9 h-9 p-0.5 rounded border border-slate-300 cursor-pointer"
                    />
                    <div className="flex items-center gap-1.5">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.hex}
                          type="button"
                          onClick={() => setNewClinic({ ...newClinic, brandColor: preset.hex })}
                          className={`w-6 h-6 rounded-full transition-transform ${
                            newClinic.brandColor === preset.hex ? 'ring-2 ring-slate-800 scale-110' : ''
                          }`}
                          style={{ backgroundColor: preset.hex }}
                          title={preset.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors shadow-xs"
                >
                  Create & Launch Practice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
