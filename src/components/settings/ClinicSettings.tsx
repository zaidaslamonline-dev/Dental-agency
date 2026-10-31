import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { APPS_SCRIPT_SNIPPET } from '../../data/mockData';
import {
  Save,
  CheckCircle2,
  FileSpreadsheet,
  Link2,
  Copy,
  Check,
  Send,
  Sparkles,
  Building2,
  User,
  Phone,
  MessageCircle,
  MapPin,
  Palette,
  Shield,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const ClinicSettings: React.FC = () => {
  const {
    activeClinic,
    updateClinicSettings,
    testWebhookPing,
    exportLeadsCSV,
    showToast,
  } = useCRM();

  // Local form state synced to active clinic
  const [formData, setFormData] = useState({
    name: activeClinic.name,
    doctorName: activeClinic.doctorName,
    doctorTitle: activeClinic.doctorTitle,
    location: activeClinic.location,
    city: activeClinic.city,
    phone: activeClinic.phone,
    whatsappNumber: activeClinic.whatsappNumber,
    brandColor: activeClinic.brandColor,
    welcomeMessage: activeClinic.welcomeMessage,
    googleSheetsWebhookUrl: activeClinic.googleSheetsWebhookUrl,
    webhookSecret: activeClinic.webhookSecret,
  });

  const [isCopied, setIsCopied] = useState(false);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [webhookResult, setWebhookResult] = useState<{
    success: boolean;
    message: string;
    timestamp: string;
    payload: unknown;
  } | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateClinicSettings(activeClinic.id, formData);
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_SNIPPET);
    setIsCopied(true);
    showToast('Google Apps Script code copied to clipboard');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleTestWebhook = async () => {
    setIsTestingWebhook(true);
    setWebhookResult(null);
    try {
      const res = await testWebhookPing(formData.googleSheetsWebhookUrl);
      setWebhookResult(res);
      if (res.success) {
        showToast('Webhook ping successful! Google Sheets synced.');
      } else {
        showToast('Webhook test failed. Check URL.');
      }
    } finally {
      setIsTestingWebhook(false);
    }
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
    <div className="space-y-6 pb-20 md:pb-12 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>DentalFlow</span>
            <span aria-hidden="true">·</span>
            <span>Clinic Settings</span>
            <span aria-hidden="true">·</span>
            <span>{activeClinic.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Clinic Configuration & Integrations
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Configure clinic branding, practitioner profiles, WhatsApp communication templates, and Google Sheets pipeline webhooks.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: CLINIC IDENTITY & BRANDING */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">
              Practice Profile & Branding
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinic / Practice Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Brand Accent Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.brandColor}
                  onChange={(e) => setFormData({ ...formData, brandColor: e.target.value })}
                  className="w-9 h-9 p-0.5 rounded border border-slate-300 cursor-pointer"
                />
                <div className="flex items-center gap-1.5">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => setFormData({ ...formData, brandColor: preset.hex })}
                      className={`w-6 h-6 rounded-full transition-transform ${
                        formData.brandColor === preset.hex ? 'ring-2 ring-slate-800 scale-110' : ''
                      }`}
                      style={{ backgroundColor: preset.hex }}
                      title={preset.label}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-slate-500">{formData.brandColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lead Doctor / Clinician Name *
              </label>
              <input
                type="text"
                required
                value={formData.doctorName}
                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Doctor Title / Specialty
              </label>
              <input
                type="text"
                value={formData.doctorTitle}
                onChange={(e) => setFormData({ ...formData, doctorTitle: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City & State / Metro Region
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Street Address / Suite
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinic Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              WhatsApp Concierge Initial Greeting
            </label>
            <textarea
              rows={2}
              value={formData.welcomeMessage}
              onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Sent automatically to patients initiating intake from Instagram or digital ads.
            </p>
          </div>
        </div>

        {/* SECTION 2: BACKEND INTEGRATION READY (GOOGLE APPS SCRIPT & GOOGLE SHEETS) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Google Sheets & Apps Script Integration
                </h2>
                <p className="text-xs text-slate-500">
                  Automatically sync incoming patient inquiries to your Google Spreadsheet in real time.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={exportLeadsCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Webhook Endpoint Configuration */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Google Apps Script Webhook URL (Web App Endpoint)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/AKfyc.../exec"
                  value={formData.googleSheetsWebhookUrl}
                  onChange={(e) => setFormData({ ...formData, googleSheetsWebhookUrl: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs sm:text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  disabled={isTestingWebhook}
                  onClick={handleTestWebhook}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isTestingWebhook ? 'Testing...' : 'Test Webhook Ping'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                When a new patient completes intake and consents, DentalFlow dispatches a JSON POST to this URL.
              </p>
            </div>

            {/* Test Response Inspector */}
            {webhookResult && (
              <div
                className={`p-3.5 rounded-lg border text-xs space-y-2 animate-in fade-in duration-150 ${
                  webhookResult.success
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-1.5">
                    {webhookResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Shield className="w-4 h-4 text-rose-600" />
                    )}
                    <span>{webhookResult.message}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">
                    {webhookResult.timestamp.slice(11, 19)} UTC
                  </span>
                </div>

                <div className="bg-slate-900 text-slate-200 p-3 rounded font-mono text-[11px] overflow-x-auto">
                  <p className="text-teal-400 font-semibold mb-1">// Emitted JSON Webhook Payload:</p>
                  <pre>{JSON.stringify(webhookResult.payload, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Copy-Pasteable Google Apps Script Code */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Ready-to-Use Google Apps Script Webhook Code
                </h4>
                <p className="text-[11px] text-slate-500">
                  Deploy this snippet in Google Apps Script to write patient leads directly into Google Sheets.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopySnippet}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied!' : 'Copy Script'}</span>
              </button>
            </div>

            <div className="relative">
              <pre className="bg-slate-900 text-slate-200 text-xs font-mono p-4 rounded-xl overflow-x-auto max-h-52 leading-relaxed">
                <code>{APPS_SCRIPT_SNIPPET}</code>
              </pre>
            </div>

            {/* Step-by-step setup guide */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800">3-Step Google Sheets Setup Guide:</span>
              <ol className="list-decimal list-inside space-y-0.5 text-slate-600 pl-1">
                <li>Create a Google Sheet and click <strong>Extensions &gt; Apps Script</strong>.</li>
                <li>Replace the code with the snippet above and click <strong>Deploy &gt; New deployment</strong>.</li>
                <li>Select <strong>Web app</strong>, choose <em>Execute as: Me</em> and <em>Who has access: Anyone</em>, then paste the URL above.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Form Submit Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Clinic Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
