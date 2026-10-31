export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Consultation Requested'
  | 'Confirmed'
  | 'Completed'
  | 'Lost';

export type Procedure =
  | 'Clear Aligners'
  | 'Teeth Whitening'
  | 'Porcelain Veneers'
  | 'Dental Implants'
  | 'Smile Makeover'
  | 'Orthodontic Retainers';

export interface Clinic {
  id: string;
  name: string;
  doctorName: string;
  doctorTitle: string;
  location: string;
  city: string;
  phone: string;
  whatsappNumber: string;
  brandColor: string;
  active: boolean;
  welcomeMessage: string;
  googleSheetsWebhookUrl: string;
  webhookSecret: string;
  webhookLastSync: string | null;
  createdAt: string;
  metrics: {
    totalLeads: number;
    consultationsBooked: number;
    confirmedAppointments: number;
    conversionRate: number;
    pipelineValue: number;
  };
}

export interface LeadNote {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

export interface Lead {
  id: string;
  clinicId: string;
  patientName: string;
  phone: string;
  email?: string;
  procedure: Procedure;
  dentalConcern: string;
  status: LeadStatus;
  preferredWindow: string;
  consentGiven: boolean;
  consentTimestamp: string;
  source: string;
  campaignId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
  estimatedValue: number;
  lastContactedAt?: string;
  notes: LeadNote[];
}

export interface CampaignAttribution {
  id: string;
  name: string;
  clinicId: string;
  headline: string;
  adSpend: number;
  impressions: number;
  clicks: number;
  leads: number;
  consultations: number;
  costPerClick: number;
  costPerLead: number;
  conversionRate: number;
  targetAudience: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'system';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  quickReplies?: string[];
  isConsentPrompt?: boolean;
}
