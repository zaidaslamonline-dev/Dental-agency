import React, { useState, useMemo } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Lead, LeadStatus, Procedure } from '../../types/crm';
import {
  Search,
  Filter,
  Plus,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  Download,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  FileSpreadsheet,
  Columns,
  List,
  User,
  Users,
  ShieldCheck,
  Send,
  MoreVertical
} from 'lucide-react';

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; bg: string; text: string; border: string; indicator: string }
> = {
  New: {
    label: 'New',
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200',
    indicator: 'bg-sky-500',
  },
  Contacted: {
    label: 'Contacted',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    indicator: 'bg-amber-500',
  },
  'Consultation Requested': {
    label: 'Consultation Requested',
    bg: 'bg-purple-50',
    text: 'text-purple-800',
    border: 'border-purple-200',
    indicator: 'bg-purple-500',
  },
  Confirmed: {
    label: 'Confirmed',
    bg: 'bg-teal-50',
    text: 'text-teal-800',
    border: 'border-teal-200',
    indicator: 'bg-teal-600',
  },
  Completed: {
    label: 'Completed',
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    indicator: 'bg-emerald-600',
  },
  Lost: {
    label: 'Lost',
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200',
    indicator: 'bg-slate-400',
  },
};

const ALL_STATUSES: LeadStatus[] = [
  'New',
  'Contacted',
  'Consultation Requested',
  'Confirmed',
  'Completed',
  'Lost',
];

const PROCEDURES_LIST: Procedure[] = [
  'Clear Aligners',
  'Teeth Whitening',
  'Porcelain Veneers',
  'Dental Implants',
  'Smile Makeover',
  'Orthodontic Retainers',
];

export const ClinicDashboard: React.FC = () => {
  const {
    activeClinic,
    activeClinicLeads,
    updateLeadStatus,
    addLeadNote,
    addLead,
    exportLeadsCSV,
    setActiveTab,
    selectedLead,
    setSelectedLead,
    showToast,
  } = useCRM();

  // Filters & State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProcedure, setSelectedProcedure] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  // Manual Add Lead state
  const [manualLead, setManualLead] = useState({
    patientName: '',
    phone: '',
    email: '',
    procedure: 'Clear Aligners' as Procedure,
    dentalConcern: '',
    status: 'New' as LeadStatus,
    preferredWindow: 'Weekday Afternoons',
    estimatedValue: 4800,
  });

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return activeClinicLeads.filter((lead) => {
      const matchesSearch =
        lead.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.dentalConcern.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.procedure.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
      const matchesProcedure = selectedProcedure === 'All' || lead.procedure === selectedProcedure;

      return matchesSearch && matchesStatus && matchesProcedure;
    });
  }, [activeClinicLeads, searchQuery, selectedStatus, selectedProcedure]);

  // Metrics
  const stats = useMemo(() => {
    const total = activeClinicLeads.length;
    const newCount = activeClinicLeads.filter((l) => l.status === 'New').length;
    const consultationCount = activeClinicLeads.filter(
      (l) => l.status === 'Consultation Requested'
    ).length;
    const confirmedCount = activeClinicLeads.filter((l) => l.status === 'Confirmed').length;
    const conversion = total > 0 ? (((consultationCount + confirmedCount) / total) * 100).toFixed(1) : '0';

    return { total, newCount, consultationCount, confirmedCount, conversion };
  }, [activeClinicLeads]);

  const handleManualAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualLead.patientName.trim() || !manualLead.phone.trim()) return;

    addLead({
      clinicId: activeClinic.id,
      patientName: manualLead.patientName.trim(),
      phone: manualLead.phone.trim(),
      email: manualLead.email.trim() || undefined,
      procedure: manualLead.procedure,
      dentalConcern: manualLead.dentalConcern.trim() || 'General clear aligner smile evaluation inquiry',
      status: manualLead.status,
      preferredWindow: manualLead.preferredWindow,
      consentGiven: true,
      consentTimestamp: new Date().toISOString(),
      source: 'Clinic Desk / Phone Inbound',
      estimatedValue: manualLead.estimatedValue,
      notes: [
        {
          id: `note-${Date.now()}`,
          author: 'Reception Staff',
          text: 'Patient lead created manually via clinic front desk.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    });

    setIsAddModalOpen(false);
    setManualLead({
      patientName: '',
      phone: '',
      email: '',
      procedure: 'Clear Aligners',
      dentalConcern: '',
      status: 'New',
      preferredWindow: 'Weekday Afternoons',
      estimatedValue: 4800,
    });
  };

  const handleAddNoteToSelected = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;
    addLeadNote(selectedLead.id, newNoteText.trim(), 'Staff Coordinator');
    setNewNoteText('');
    // refresh selected lead reference
    const updated = activeClinicLeads.find((l) => l.id === selectedLead.id);
    if (updated) setSelectedLead(updated);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* Clinic Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-xs text-base shrink-0"
              style={{ backgroundColor: activeClinic.brandColor || '#0d9488' }}
            >
              {activeClinic.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span>Clinic CRM</span>
                <span aria-hidden="true">·</span>
                <span>{activeClinic.city}</span>
                <span aria-hidden="true">·</span>
                <span className="text-teal-700 font-semibold">{activeClinic.doctorName}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
                {activeClinic.name}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {activeClinic.location} · WhatsApp: {activeClinic.whatsappNumber}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2 sm:self-center">
            <button
              onClick={() => setActiveTab('chat')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Test Chat Intake</span>
            </button>
            <button
              onClick={exportLeadsCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 transition-colors shadow-xs"
              title="Download CSV formatted for Google Sheets"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export to Sheets</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Patient Lead</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-5 mt-5 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-500">Total Inquiries</span>
            <p className="text-lg font-bold text-slate-900 font-mono tabular-nums">{stats.total}</p>
          </div>
          <div>
            <span className="text-slate-500">New / Uncontacted</span>
            <p className="text-lg font-bold text-sky-700 font-mono tabular-nums">{stats.newCount}</p>
          </div>
          <div>
            <span className="text-slate-500">Consultation Req.</span>
            <p className="text-lg font-bold text-purple-700 font-mono tabular-nums">{stats.consultationCount}</p>
          </div>
          <div>
            <span className="text-slate-500">Confirmed Slots</span>
            <p className="text-lg font-bold text-teal-700 font-mono tabular-nums">{stats.confirmedCount}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-slate-500">Acquisition Conv.</span>
            <p className="text-lg font-bold text-emerald-700 font-mono tabular-nums">{stats.conversion}%</p>
          </div>
        </div>
      </div>

      {/* Control & Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient name, phone, procedure, or concern..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters and View Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="All">All Statuses ({activeClinicLeads.length})</option>
            {ALL_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st} ({activeClinicLeads.filter((l) => l.status === st).length})
              </option>
            ))}
          </select>

          {/* Procedure Filter */}
          <select
            value={selectedProcedure}
            onChange={(e) => setSelectedProcedure(e.target.value)}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="All">All Procedures</option>
            {PROCEDURES_LIST.map((proc) => (
              <option key={proc} value={proc}>
                {proc}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Kanban Board View"
            >
              <Columns className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Leads Display */}
      {viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 text-slate-600 text-xs uppercase font-medium tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Patient Enquiry</th>
                  <th className="py-3 px-4">Procedure & Concern</th>
                  <th className="py-3 px-4">Lead Status</th>
                  <th className="py-3 px-4">Preferred Slot</th>
                  <th className="py-3 px-4">Source & Attribution</th>
                  <th className="py-3 px-4">Est. Value</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
                      <div className="max-w-sm mx-auto space-y-2">
                        <Users className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="font-semibold text-slate-700">No patient leads found</p>
                        <p className="text-xs text-slate-400">
                          {searchQuery || selectedStatus !== 'All' || selectedProcedure !== 'All'
                            ? 'Try clearing active filters or search terms.'
                            : 'Capture patient leads via the simulated WhatsApp chat intake.'}
                        </p>
                        <button
                          onClick={() => setActiveTab('chat')}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Simulate WhatsApp Lead</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const statusCfg = STATUS_CONFIG[lead.status];
                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                        onClick={() => setSelectedLead(lead)}
                      >
                        {/* Patient Name & Contact */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold text-xs shrink-0">
                              {lead.patientName
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 truncate group-hover:text-teal-700 transition-colors">
                                {lead.patientName}
                              </p>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <span className="font-mono">{lead.phone}</span>
                                {lead.consentGiven && (
                                  <span title="Consent verified">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Procedure & Dental Concern */}
                        <td className="py-3 px-4 max-w-xs">
                          <p className="font-medium text-slate-800 text-xs">{lead.procedure}</p>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5" title={lead.dentalConcern}>
                            {lead.dentalConcern}
                          </p>
                        </td>

                        {/* Status (with inline quick change) */}
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-md border focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
                          >
                            {ALL_STATUSES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Preferred Slot */}
                        <td className="py-3 px-4 text-xs text-slate-700">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[140px]">{lead.preferredWindow}</span>
                          </div>
                        </td>

                        {/* Source */}
                        <td className="py-3 px-4 text-xs text-slate-600">
                          <p className="font-medium truncate max-w-[150px]">{lead.source}</p>
                          <p className="text-[11px] text-slate-400">
                            {new Date(lead.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </p>
                        </td>

                        {/* Value */}
                        <td className="py-3 px-4 font-mono tabular-nums text-xs text-slate-800 font-semibold">
                          ${lead.estimatedValue.toLocaleString()}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="px-2.5 py-1 text-xs font-semibold text-teal-700 hover:text-teal-800 hover:bg-teal-50 rounded-md transition-colors"
                            >
                              Dossier
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* KANBAN PIPELINE VIEW */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
          {ALL_STATUSES.map((statusKey) => {
            const statusConfig = STATUS_CONFIG[statusKey];
            const columnLeads = filteredLeads.filter((l) => l.status === statusKey);

            return (
              <div
                key={statusKey}
                className="bg-slate-100/70 rounded-xl p-3 border border-slate-200 flex flex-col min-w-[220px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${statusConfig.indicator}`} />
                    <span className="text-xs font-bold text-slate-800">{statusConfig.label}</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {columnLeads.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-2 flex-1 overflow-y-auto max-h-[600px] pr-0.5">
                  {columnLeads.length === 0 ? (
                    <div className="py-6 text-center text-slate-400 text-xs">
                      No leads in {statusConfig.label}
                    </div>
                  ) : (
                    columnLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="bg-white p-3 rounded-lg border border-slate-200 hover:border-teal-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <p className="font-semibold text-slate-900 text-xs group-hover:text-teal-700">
                            {lead.patientName}
                          </p>
                          <span className="text-[10px] font-mono text-slate-400">
                            ${lead.estimatedValue}
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-teal-800 mt-0.5">{lead.procedure}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                          {lead.dentalConcern}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                          <span className="truncate max-w-[110px]">{lead.preferredWindow}</span>
                          <span className="text-slate-400">
                            {lead.notes.length} {lead.notes.length === 1 ? 'note' : 'notes'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LEAD DETAIL SLIDE-OVER / MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ backgroundColor: activeClinic.brandColor || '#0d9488' }}
                >
                  {selectedLead.patientName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{selectedLead.patientName}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="font-mono">{selectedLead.phone}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedLead.procedure}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Status Selector & Promotion Bar */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Pipeline Progression
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    Est. Value: ${selectedLead.estimatedValue.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {ALL_STATUSES.map((st) => {
                    const isCurrent = selectedLead.status === st;
                    return (
                      <button
                        key={st}
                        onClick={() => {
                          updateLeadStatus(selectedLead.id, st);
                          setSelectedLead({ ...selectedLead, status: st });
                        }}
                        className={`py-1.5 px-1 text-[11px] font-semibold rounded-md transition-colors text-center truncate ${
                          isCurrent
                            ? 'bg-teal-600 text-white shadow-xs'
                            : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {st.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Patient Dossier Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Dental Procedure</span>
                  <p className="text-sm font-semibold text-slate-900">{selectedLead.procedure}</p>
                </div>
                <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Preferred Window</span>
                  <p className="text-sm font-semibold text-slate-900">{selectedLead.preferredWindow}</p>
                </div>
              </div>

              {/* Patient Concern */}
              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1.5">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Patient Reported Concern
                </span>
                <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-100">
                  "{selectedLead.dentalConcern}"
                </p>
              </div>

              {/* Consent & Compliance Log */}
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>HIPAA & WhatsApp Communication Consent Logged</span>
                </div>
                <div className="text-xs text-emerald-900/80 space-y-1">
                  <p>
                    <span className="font-medium">Consent Status:</span> Explicitly granted via intake dialogue
                  </p>
                  <p>
                    <span className="font-medium">Timestamp:</span> {selectedLead.consentTimestamp}
                  </p>
                  <p>
                    <span className="font-medium">Acquisition Channel:</span> {selectedLead.source}
                  </p>
                </div>
              </div>

              {/* Quick Communication Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Message</span>
                </a>
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-slate-600" />
                  <span>Call Patient</span>
                </a>
              </div>

              {/* Internal Notes & Timeline */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Staff Clinical Notes & Timeline
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedLead.notes.length} entries
                  </span>
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNoteToSelected} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add consultation notes, follow-up status, or scan date..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Log</span>
                  </button>
                </form>

                {/* Notes List */}
                <div className="space-y-2 mt-3">
                  {selectedLead.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="font-semibold text-slate-800">{note.author}</span>
                        <span className="font-mono text-[11px]">{note.timestamp}</span>
                      </div>
                      <p className="text-slate-700">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">ID: {selectedLead.id}</span>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD PATIENT LEAD MANUALLY */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-bold text-slate-900">Add Patient Lead</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAddSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Taylor"
                  value={manualLead.patientName}
                  onChange={(e) => setManualLead({ ...manualLead, patientName: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (Mobile/WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={manualLead.phone}
                    onChange={(e) => setManualLead({ ...manualLead, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={manualLead.email}
                    onChange={(e) => setManualLead({ ...manualLead, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Procedure of Interest
                  </label>
                  <select
                    value={manualLead.procedure}
                    onChange={(e) => setManualLead({ ...manualLead, procedure: e.target.value as Procedure })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {PROCEDURES_LIST.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Initial Status
                  </label>
                  <select
                    value={manualLead.status}
                    onChange={(e) => setManualLead({ ...manualLead, status: e.target.value as LeadStatus })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dental Concern / Alignment Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Crowding on bottom teeth, wants invisible aligners before holiday"
                  value={manualLead.dentalConcern}
                  onChange={(e) => setManualLead({ ...manualLead, dentalConcern: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Slot
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Weekday Evenings"
                    value={manualLead.preferredWindow}
                    onChange={(e) => setManualLead({ ...manualLead, preferredWindow: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Est. Treatment Value ($)
                  </label>
                  <input
                    type="number"
                    step="100"
                    value={manualLead.estimatedValue}
                    onChange={(e) => setManualLead({ ...manualLead, estimatedValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
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
                  Save Lead Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
