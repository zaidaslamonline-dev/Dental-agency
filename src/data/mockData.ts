import { Clinic, Lead, CampaignAttribution } from '../types/crm';

export const INITIAL_CLINICS: Clinic[] = [
  {
    id: 'clinic-smilecraft',
    name: 'SmileCraft Orthodontics & Aligners',
    doctorName: 'Dr. Mitchell Reynolds',
    doctorTitle: 'Orthodontic Specialist & Clear Aligner Master',
    location: '4100 S Congress Ave, Suite 210',
    city: 'Austin, TX',
    phone: '(512) 555-0192',
    whatsappNumber: '+1 512 555 0192',
    brandColor: '#0d9488', // Teal
    active: true,
    welcomeMessage: 'Hi there! 👋 Thanks for inquiring about Clear Aligners at SmileCraft. To reserve your 3D Digital Smile Scan, let us get a few details.',
    googleSheetsWebhookUrl: 'https://script.google.com/macros/s/AKfycbz_SmileCraft_MockHook773/exec',
    webhookSecret: 'sec_df_smilecraft_9882',
    webhookLastSync: '2026-10-31 13:45',
    createdAt: '2025-01-15',
    metrics: {
      totalLeads: 42,
      consultationsBooked: 26,
      confirmedAppointments: 19,
      conversionRate: 45.2,
      pipelineValue: 91200,
    },
  },
  {
    id: 'clinic-apex',
    name: 'Apex Aesthetic Dental Lounge',
    doctorName: 'Dr. Elena Vance',
    doctorTitle: 'Cosmetic & Restorative Dentist',
    location: '9675 Wilshire Blvd, Suite 400',
    city: 'Beverly Hills, CA',
    phone: '(310) 555-0841',
    whatsappNumber: '+1 310 555 0841',
    brandColor: '#0284c7', // Ocean Blue
    active: true,
    welcomeMessage: 'Welcome to Apex Dental. Speak with our clinical concierge to explore our discreet Clear Aligner and aesthetic packages.',
    googleSheetsWebhookUrl: 'https://script.google.com/macros/s/AKfycbw_Apex_MockHook102/exec',
    webhookSecret: 'sec_df_apex_1194',
    webhookLastSync: '2026-10-31 11:20',
    createdAt: '2025-03-20',
    metrics: {
      totalLeads: 29,
      consultationsBooked: 18,
      confirmedAppointments: 14,
      conversionRate: 48.3,
      pipelineValue: 67200,
    },
  },
  {
    id: 'clinic-lumina',
    name: 'Lumina Clear Smile Lounge',
    doctorName: 'Dr. Marcus Hayes',
    doctorTitle: 'Board Certified Orthodontist',
    location: '233 N Michigan Ave, 18th Floor',
    city: 'Chicago, IL',
    phone: '(312) 555-0672',
    whatsappNumber: '+1 312 555 0672',
    brandColor: '#059669', // Emerald
    active: true,
    welcomeMessage: 'Hello! Excited to help you start your invisible aligner journey with Dr. Hayes. Let’s match you with a priority consultation slot.',
    googleSheetsWebhookUrl: 'https://script.google.com/macros/s/AKfycbx_Lumina_MockHook449/exec',
    webhookSecret: 'sec_df_lumina_3490',
    webhookLastSync: '2026-10-30 17:05',
    createdAt: '2025-06-10',
    metrics: {
      totalLeads: 35,
      consultationsBooked: 20,
      confirmedAppointments: 15,
      conversionRate: 42.8,
      pipelineValue: 72000,
    },
  },
  {
    id: 'clinic-purearch',
    name: 'PureArch Dental Collective',
    doctorName: 'Dr. Sofia Morales',
    doctorTitle: 'Dental Surgeon & Smile Architect',
    location: '1100 Brickell Ave, Penthouse B',
    city: 'Miami, FL',
    phone: '(305) 555-0433',
    whatsappNumber: '+1 305 555 0433',
    brandColor: '#4f46e5', // Indigo
    active: true,
    welcomeMessage: 'Welcome to PureArch Miami! Reserve your comprehensive smile consultation and custom Clear Aligner preview today.',
    googleSheetsWebhookUrl: '',
    webhookSecret: 'sec_df_purearch_6619',
    webhookLastSync: null,
    createdAt: '2025-09-01',
    metrics: {
      totalLeads: 18,
      consultationsBooked: 9,
      confirmedAppointments: 7,
      conversionRate: 38.9,
      pipelineValue: 33600,
    },
  },
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    clinicId: 'clinic-smilecraft',
    patientName: 'Emma Richardson',
    phone: '+1 (512) 555-4921',
    email: 'emma.r.austin@example.com',
    procedure: 'Clear Aligners',
    dentalConcern: 'Mild crowding in bottom incisors and small midline gap',
    status: 'New',
    preferredWindow: 'Weekday Afternoons (3pm - 6pm)',
    consentGiven: true,
    consentTimestamp: '2026-10-31 13:24 UTC',
    source: 'Instagram Ad (Clear Aligners Q4)',
    campaignId: 'ig-q4-aligners-01',
    utmSource: 'instagram',
    utmMedium: 'paid_social',
    utmCampaign: 'clear_aligners_smile_scan',
    createdAt: '2026-10-31T13:24:00Z',
    estimatedValue: 4800,
    notes: [
      {
        id: 'note-1',
        author: 'WhatsApp Bot',
        text: 'Patient engaged through Instagram Ad CTA. Completed intake questions and accepted terms of contact.',
        timestamp: '2026-10-31 13:24',
      },
    ],
  },
  {
    id: 'lead-102',
    clinicId: 'clinic-smilecraft',
    patientName: 'David Chen',
    phone: '+1 (512) 555-8812',
    email: 'dchen.tech@example.com',
    procedure: 'Clear Aligners',
    dentalConcern: 'Relapsed alignment after teenage braces 8 years ago',
    status: 'Consultation Requested',
    preferredWindow: 'Saturday Mornings (9am - 12pm)',
    consentGiven: true,
    consentTimestamp: '2026-10-31 11:15 UTC',
    source: 'Instagram Ad (Clear Aligners Q4)',
    campaignId: 'ig-q4-aligners-01',
    utmSource: 'instagram',
    utmMedium: 'paid_social',
    utmCampaign: 'clear_aligners_smile_scan',
    createdAt: '2026-10-31T11:15:00Z',
    estimatedValue: 4500,
    lastContactedAt: '2026-10-31 11:45',
    notes: [
      {
        id: 'note-2',
        author: 'Reception (Jessica)',
        text: 'Sent tentative appointment link for Saturday Nov 7 at 10:30 AM with Dr. Reynolds.',
        timestamp: '2026-10-31 11:45',
      },
    ],
  },
  {
    id: 'lead-103',
    clinicId: 'clinic-smilecraft',
    patientName: 'Jessica Bennett',
    phone: '+1 (512) 555-3390',
    email: 'jess.bennett@example.com',
    procedure: 'Clear Aligners',
    dentalConcern: 'Overjet & wants discreet option before wedding in 6 months',
    status: 'Confirmed',
    preferredWindow: 'Weekday Evenings (5pm - 7pm)',
    consentGiven: true,
    consentTimestamp: '2026-10-30 16:40 UTC',
    source: 'Instagram Ad (Clear Aligners Q4)',
    campaignId: 'ig-q4-aligners-01',
    utmSource: 'instagram',
    utmMedium: 'paid_social',
    utmCampaign: 'clear_aligners_smile_scan',
    createdAt: '2026-10-30T16:40:00Z',
    estimatedValue: 5200,
    lastContactedAt: '2026-10-31 09:30',
    notes: [
      {
        id: 'note-3',
        author: 'Dr. Mitchell Reynolds',
        text: 'Confirmed 3D scan for Tuesday Nov 3 at 5:15 PM. Patient has dental insurance with orthodontic benefit.',
        timestamp: '2026-10-31 09:30',
      },
    ],
  },
  {
    id: 'lead-104',
    clinicId: 'clinic-smilecraft',
    patientName: 'Marcus Sterling',
    phone: '+1 (512) 555-7104',
    procedure: 'Clear Aligners',
    dentalConcern: 'Crossbite and uneven smile line',
    status: 'Contacted',
    preferredWindow: 'Weekday Mornings (8am - 11am)',
    consentGiven: true,
    consentTimestamp: '2026-10-30 14:10 UTC',
    source: 'Instagram Ad (Clear Aligners Q4)',
    campaignId: 'ig-q4-aligners-01',
    createdAt: '2026-10-30T14:10:00Z',
    estimatedValue: 4800,
    lastContactedAt: '2026-10-30 15:20',
    notes: [
      {
        id: 'note-4',
        author: 'Reception (Jessica)',
        text: 'Left WhatsApp voice note with consultation availability. Awaiting patient confirmation.',
        timestamp: '2026-10-30 15:20',
      },
    ],
  },
  {
    id: 'lead-105',
    clinicId: 'clinic-smilecraft',
    patientName: 'Samantha Green',
    phone: '+1 (512) 555-6671',
    procedure: 'Teeth Whitening',
    dentalConcern: 'Stubborn coffee stains and wants brightening alongside aligner evaluation',
    status: 'Completed',
    preferredWindow: 'Friday Afternoon',
    consentGiven: true,
    consentTimestamp: '2026-10-28 09:12 UTC',
    source: 'Website Form',
    createdAt: '2026-10-28T09:12:00Z',
    estimatedValue: 750,
    notes: [
      {
        id: 'note-5',
        author: 'Dr. Reynolds',
        text: 'In-office whitening completed. Expressed strong interest in top aligners in 2 months.',
        timestamp: '2026-10-29 16:00',
      },
    ],
  },
  {
    id: 'lead-106',
    clinicId: 'clinic-smilecraft',
    patientName: 'Tyler Harrison',
    phone: '+1 (512) 555-9014',
    procedure: 'Clear Aligners',
    dentalConcern: 'Spacing between canine and lateral incisor',
    status: 'Lost',
    preferredWindow: 'Weekends only',
    consentGiven: true,
    consentTimestamp: '2026-10-26 12:00 UTC',
    source: 'Instagram Ad (Clear Aligners Q4)',
    campaignId: 'ig-q4-aligners-01',
    createdAt: '2026-10-26T12:00:00Z',
    estimatedValue: 4600,
    notes: [
      {
        id: 'note-6',
        author: 'Reception',
        text: 'Patient relocated out of state before scheduling appointment.',
        timestamp: '2026-10-28 10:00',
      },
    ],
  },
  // Leads for Apex Dental Lounge
  {
    id: 'lead-201',
    clinicId: 'clinic-apex',
    patientName: 'Victoria Castillo',
    phone: '+1 (310) 555-2244',
    procedure: 'Clear Aligners',
    dentalConcern: 'Slight tooth rotation on left lateral incisor',
    status: 'Confirmed',
    preferredWindow: 'Wednesday 2pm',
    consentGiven: true,
    consentTimestamp: '2026-10-31 10:00 UTC',
    source: 'Instagram Ad',
    createdAt: '2026-10-31T10:00:00Z',
    estimatedValue: 5500,
    notes: [
      {
        id: 'note-7',
        author: 'Apex Concierge',
        text: 'VIP booked with Dr. Vance. Pre-screened for express clear aligner package.',
        timestamp: '2026-10-31 10:30',
      },
    ],
  },
  {
    id: 'lead-202',
    clinicId: 'clinic-apex',
    patientName: 'Alexander Price',
    phone: '+1 (310) 555-7733',
    procedure: 'Porcelain Veneers',
    dentalConcern: 'Chipped front tooth and enamel wear',
    status: 'New',
    preferredWindow: 'Flexible',
    consentGiven: true,
    consentTimestamp: '2026-10-31 12:45 UTC',
    source: 'Instagram Ad',
    createdAt: '2026-10-31T12:45:00Z',
    estimatedValue: 12000,
    notes: [],
  },
  // Lead for Lumina Clear Smile Lounge
  {
    id: 'lead-301',
    clinicId: 'clinic-lumina',
    patientName: 'Claire O’Connor',
    phone: '+1 (312) 555-9988',
    procedure: 'Clear Aligners',
    dentalConcern: 'Deep overbite affecting jaw comfort',
    status: 'Consultation Requested',
    preferredWindow: 'Thursday Morning',
    consentGiven: true,
    consentTimestamp: '2026-10-30 15:00 UTC',
    source: 'Instagram Ad',
    createdAt: '2026-10-30T15:00:00Z',
    estimatedValue: 5000,
    notes: [],
  },
  // Lead for PureArch Miami
  {
    id: 'lead-401',
    clinicId: 'clinic-purearch',
    patientName: 'Mateo Delgado',
    phone: '+1 (305) 555-6311',
    procedure: 'Clear Aligners',
    dentalConcern: 'Gap between front incisors, wants invisible aligners',
    status: 'New',
    preferredWindow: 'Friday Afternoon',
    consentGiven: true,
    consentTimestamp: '2026-10-31 08:30 UTC',
    source: 'Instagram Ad',
    createdAt: '2026-10-31T08:30:00Z',
    estimatedValue: 4800,
    notes: [],
  },
];

export const SAMPLE_CAMPAIGN: CampaignAttribution = {
  id: 'ig-q4-aligners-01',
  name: 'IG_ClearAligners_SmileScan_Q4',
  clinicId: 'clinic-smilecraft',
  headline: 'Transform Your Smile Discreetly • Free 3D Scan & Digital Simulation',
  adSpend: 1450,
  impressions: 48200,
  clicks: 1340,
  leads: 38,
  consultations: 24,
  costPerClick: 1.08,
  costPerLead: 38.15,
  conversionRate: 63.1, // lead to consultation
  targetAudience: 'Austin Metro • Ages 22–45 • Interests: Smile Aesthetics, Wellness',
  utmSource: 'instagram',
  utmMedium: 'paid_social',
  utmCampaign: 'clear_aligners_smile_scan',
};

export const APPS_SCRIPT_SNIPPET = `/**
 * Google Apps Script Webhook Endpoint for DentalFlow CRM
 * Paste this in https://script.google.com/ and Deploy as Web App
 * (Execute as: Me, Who has access: Anyone)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Lead ID", 
        "Timestamp", 
        "Patient Name", 
        "Phone", 
        "Procedure", 
        "Dental Concern", 
        "Status", 
        "Preferred Window", 
        "Consent Given", 
        "Source", 
        "Clinic ID"
      ]);
    }
    
    // Append patient lead
    sheet.appendRow([
      data.leadId || Utilities.getUuid(),
      new Date().toISOString(),
      data.patientName || "N/A",
      data.phone || "N/A",
      data.procedure || "Clear Aligners",
      data.dentalConcern || "N/A",
      data.status || "New",
      data.preferredWindow || "Any",
      data.consentGiven ? "YES" : "NO",
      data.source || "DentalFlow WhatsApp Intake",
      data.clinicId || "clinic-default"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Lead recorded in Google Sheet",
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;
