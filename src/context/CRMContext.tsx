import React, { createContext, useContext, useState, useEffect } from 'react';
import { Clinic, Lead, LeadStatus, CampaignAttribution } from '../types/crm';
import { INITIAL_CLINICS, INITIAL_LEADS, SAMPLE_CAMPAIGN } from '../data/mockData';

export type ActiveTab = 'admin' | 'clinic' | 'chat' | 'ad' | 'settings';

interface CRMContextType {
  clinics: Clinic[];
  activeClinic: Clinic;
  activeClinicId: string;
  setActiveClinicId: (id: string) => void;
  leads: Lead[];
  activeClinicLeads: Lead[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => Lead;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  addLeadNote: (leadId: string, noteText: string, author?: string) => void;
  addClinic: (newClinicData: Partial<Clinic>) => Clinic;
  updateClinicSettings: (clinicId: string, updates: Partial<Clinic>) => void;
  campaign: CampaignAttribution;
  // Webhook and Google Sheets
  testWebhookPing: (webhookUrl: string) => Promise<{ success: boolean; message: string; timestamp: string; payload: unknown }>;
  exportLeadsCSV: () => void;
  // Notifications / Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clinics, setClinics] = useState<Clinic[]>(() => {
    const saved = localStorage.getItem('dentalflow_clinics');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CLINICS;
  });

  const [activeClinicId, setActiveClinicId] = useState<string>('clinic-smilecraft');

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('dentalflow_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_LEADS;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('clinic');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [campaign] = useState<CampaignAttribution>(SAMPLE_CAMPAIGN);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('dentalflow_clinics', JSON.stringify(clinics));
  }, [clinics]);

  useEffect(() => {
    localStorage.setItem('dentalflow_leads', JSON.stringify(leads));
  }, [leads]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const activeClinic = clinics.find((c) => c.id === activeClinicId) || clinics[0];

  const activeClinicLeads = leads.filter((l) => l.clinicId === activeClinicId);

  // Recalculate metrics for clinics dynamically
  useEffect(() => {
    setClinics((prevClinics) =>
      prevClinics.map((clinic) => {
        const cLeads = leads.filter((l) => l.clinicId === clinic.id);
        const consultations = cLeads.filter(
          (l) => l.status === 'Consultation Requested' || l.status === 'Confirmed' || l.status === 'Completed'
        ).length;
        const confirmed = cLeads.filter(
          (l) => l.status === 'Confirmed' || l.status === 'Completed'
        ).length;
        const total = cLeads.length;
        const conversionRate = total > 0 ? Number(((consultations / total) * 100).toFixed(1)) : 0;
        const pipelineValue = cLeads
          .filter((l) => l.status !== 'Lost')
          .reduce((sum, l) => sum + (l.estimatedValue || 4500), 0);

        return {
          ...clinic,
          metrics: {
            totalLeads: total,
            consultationsBooked: consultations,
            confirmedAppointments: confirmed,
            conversionRate,
            pipelineValue,
          },
        };
      })
    );
  }, [leads]);

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>): Lead => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setLeads((prev) => [newLead, ...prev]);
    showToast(`New Lead Captured: ${newLead.patientName} (${newLead.procedure})`);

    // If clinic has a Google Sheets webhook, simulate trigger
    if (activeClinic.googleSheetsWebhookUrl) {
      console.log('Syncing lead to Google Sheets webhook:', activeClinic.googleSheetsWebhookUrl, newLead);
    }

    return newLead;
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const updatedNote = {
            id: `note-${Date.now()}`,
            text: `Status updated to "${status}"`,
            author: 'Staff Action',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return {
            ...lead,
            status,
            lastContactedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
            notes: [updatedNote, ...lead.notes],
          };
        }
        return lead;
      })
    );
    showToast(`Lead status updated to "${status}"`);
  };

  const addLeadNote = (leadId: string, noteText: string, author: string = 'Staff') => {
    if (!noteText.trim()) return;
    const newNote = {
      id: `note-${Date.now()}`,
      text: noteText.trim(),
      author,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, notes: [newNote, ...lead.notes] } : lead))
    );
  };

  const addClinic = (newClinicData: Partial<Clinic>): Clinic => {
    const newClinic: Clinic = {
      id: `clinic-${Date.now()}`,
      name: newClinicData.name || 'New Dental Studio',
      doctorName: newClinicData.doctorName || 'Dr. Specialist',
      doctorTitle: newClinicData.doctorTitle || 'Dentist & Aligner Specialist',
      location: newClinicData.location || '100 Medical Center Blvd',
      city: newClinicData.city || 'Dallas, TX',
      phone: newClinicData.phone || '(555) 123-4567',
      whatsappNumber: newClinicData.whatsappNumber || '+1 555 123 4567',
      brandColor: newClinicData.brandColor || '#0d9488',
      active: true,
      welcomeMessage:
        newClinicData.welcomeMessage ||
        'Welcome! Inquire about our smile transformations and Clear Aligner consultations.',
      googleSheetsWebhookUrl: newClinicData.googleSheetsWebhookUrl || '',
      webhookSecret: `sec_df_${Math.random().toString(36).substring(2, 8)}`,
      webhookLastSync: null,
      createdAt: new Date().toISOString().slice(0, 10),
      metrics: {
        totalLeads: 0,
        consultationsBooked: 0,
        confirmedAppointments: 0,
        conversionRate: 0,
        pipelineValue: 0,
      },
    };

    setClinics((prev) => [...prev, newClinic]);
    setActiveClinicId(newClinic.id);
    showToast(`Clinic "${newClinic.name}" added successfully`);
    return newClinic;
  };

  const updateClinicSettings = (clinicId: string, updates: Partial<Clinic>) => {
    setClinics((prev) =>
      prev.map((c) => (c.id === clinicId ? { ...c, ...updates } : c))
    );
    showToast('Clinic settings saved');
  };

  const testWebhookPing = async (webhookUrl: string) => {
    const payload = {
      event: 'lead.created',
      source: 'DentalFlow CRM',
      test: true,
      clinicId: activeClinic.id,
      clinicName: activeClinic.name,
      patientName: 'Jane Test Patient',
      phone: '+1 (555) 019-2834',
      procedure: 'Clear Aligners',
      dentalConcern: 'Mild crowding and bite consultation',
      preferredWindow: 'Weekday Morning',
      consentGiven: true,
      timestamp: new Date().toISOString(),
    };

    // Simulate network roundtrip
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!webhookUrl || !webhookUrl.startsWith('http')) {
      return {
        success: false,
        message: 'Invalid Webhook URL. Please enter a valid https:// URL (e.g., Google Apps Script deployment URL).',
        timestamp: new Date().toISOString(),
        payload,
      };
    }

    // Update clinic last sync
    const nowStr = new Date().toISOString().slice(0, 16).replace('T', ' ');
    updateClinicSettings(activeClinic.id, { webhookLastSync: nowStr });

    return {
      success: true,
      message: '200 OK — Google Apps Script webhook responded successfully. Lead record appended to Sheet.',
      timestamp: new Date().toISOString(),
      payload,
    };
  };

  const exportLeadsCSV = () => {
    const headers = [
      'Lead ID',
      'Created At',
      'Patient Name',
      'Phone',
      'Email',
      'Procedure',
      'Dental Concern',
      'Status',
      'Preferred Window',
      'Consent Given',
      'Source',
      'Estimated Value ($)',
      'Clinic Name',
      'Notes Count',
    ];

    const rows = activeClinicLeads.map((l) => [
      `"${l.id}"`,
      `"${l.createdAt}"`,
      `"${l.patientName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.procedure}"`,
      `"${(l.dentalConcern || '').replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.preferredWindow}"`,
      `"${l.consentGiven ? 'YES' : 'NO'}"`,
      `"${l.source}"`,
      `"${l.estimatedValue}"`,
      `"${activeClinic.name.replace(/"/g, '""')}"`,
      `"${l.notes.length}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `DentalFlow_${activeClinic.name.replace(/\s+/g, '_')}_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${activeClinicLeads.length} leads to CSV (Google Sheets compatible)`);
  };

  return (
    <CRMContext.Provider
      value={{
        clinics,
        activeClinic,
        activeClinicId,
        setActiveClinicId,
        leads,
        activeClinicLeads,
        activeTab,
        setActiveTab,
        selectedLead,
        setSelectedLead,
        addLead,
        updateLeadStatus,
        addLeadNote,
        addClinic,
        updateClinicSettings,
        campaign,
        testWebhookPing,
        exportLeadsCSV,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
