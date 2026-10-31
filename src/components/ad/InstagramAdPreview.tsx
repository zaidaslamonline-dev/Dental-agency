import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  MousePointerClick,
  Layers,
  Smartphone,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const InstagramAdPreview: React.FC = () => {
  const { activeClinic, campaign, setActiveTab } = useCRM();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1428);
  const [format, setFormat] = useState<'feed' | 'story'>('feed');

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const clinicHandle = activeClinic.name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 15);

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-5xl mx-auto">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>DentalFlow</span>
            <span aria-hidden="true">·</span>
            <span>Paid Social Ad Simulation</span>
            <span aria-hidden="true">·</span>
            <span>Meta Ads Attribution</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Instagram Ad & WhatsApp Funnel
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Preview the patient-facing social ad and test the click-to-WhatsApp acquisition pipeline for {activeClinic.name}.
          </p>
        </div>

        {/* Format Selector */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
          <button
            onClick={() => setFormat('feed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              format === 'feed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Instagram Feed Post
          </button>
          <button
            onClick={() => setFormat('story')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              format === 'story' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Story / Reel Ad
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: INSTAGRAM MOCKUP */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-300 shadow-xl overflow-hidden text-slate-900">
            
            {/* Phone Top Notch / Status Bar */}
            <div className="px-5 py-2 flex items-center justify-between text-[11px] font-mono text-slate-500 border-b border-slate-100">
              <span>9:41</span>
              <div className="w-16 h-3 bg-slate-200 rounded-full" />
              <span>Instagram</span>
            </div>

            {/* Post Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-xs"
                  style={{ backgroundColor: activeClinic.brandColor || '#0d9488' }}
                >
                  {activeClinic.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs text-slate-900">@{clinicHandle}.ortho</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">Sponsored · {activeClinic.city}</p>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-500 cursor-pointer" />
            </div>

            {/* AD CREATIVE IMAGE (Custom dental graphic) */}
            <div className="relative aspect-square bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 flex flex-col justify-between p-6 text-white overflow-hidden group select-none">
              {/* Subtle background glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-teal-500/20 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-sky-500/20 blur-2xl" />

              {/* Top Ad Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[11px] tracking-widest font-bold uppercase text-teal-300">
                  Orthodontic Innovation
                </span>
                <span className="text-[10px] font-semibold bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full text-white/90">
                  Limited Q4 Slots
                </span>
              </div>

              {/* Center Artwork / Aligner Visual */}
              <div className="relative z-10 text-center my-auto space-y-4">
                <div className="inline-block relative">
                  {/* Styled Clear Aligner Vector Diagram */}
                  <div className="w-32 h-20 mx-auto relative flex items-center justify-center">
                    <svg viewBox="0 0 120 70" className="w-full h-full drop-shadow-[0_10px_15px_rgba(20,184,166,0.3)]">
                      {/* Dental Arch Arc */}
                      <path
                        d="M 15 55 C 20 20, 100 20, 105 55"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 15 55 C 20 20, 100 20, 105 55"
                        fill="none"
                        stroke="#2dd4bf"
                        strokeWidth="4"
                        strokeDasharray="4 6"
                        strokeLinecap="round"
                      />
                      {/* Clear Aligner Highlights */}
                      <ellipse cx="60" cy="23" rx="14" ry="7" fill="rgba(255,255,255,0.7)" />
                      <ellipse cx="40" cy="27" rx="10" ry="6" fill="rgba(255,255,255,0.5)" />
                      <ellipse cx="80" cy="27" rx="10" ry="6" fill="rgba(255,255,255,0.5)" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold tracking-tight text-white">
                    Clear Aligners
                  </h3>
                  <p className="text-xs text-teal-200/90 font-medium">
                    Virtually Invisible · Custom 3D Smile Scan Included
                  </p>
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 border-t border-white/10 pt-3">
                <span>By {activeClinic.doctorName}</span>
                <span className="text-teal-300 font-semibold text-[11px]">Free Consultation</span>
              </div>
            </div>

            {/* INSTAGRAM CTA BAR (Click to WhatsApp) */}
            <div className="bg-[#128C7E] hover:bg-[#0d7367] transition-colors p-3 text-white flex items-center justify-between cursor-pointer"
              onClick={() => setActiveTab('chat')}
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-white shrink-0 fill-current" />
                <span className="font-bold text-xs uppercase tracking-wider">
                  Send WhatsApp Message
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-white shrink-0 animate-pulse" />
            </div>

            {/* Engagement Action Bar */}
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between text-slate-800">
                <div className="flex items-center gap-4">
                  <button onClick={handleLikeToggle}>
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-800'
                      }`}
                    />
                  </button>
                  <MessageCircle className="w-5 h-5 cursor-pointer text-slate-800" />
                  <Send className="w-5 h-5 cursor-pointer text-slate-800" />
                </div>
                <Bookmark className="w-5 h-5 cursor-pointer text-slate-800" />
              </div>

              {/* Likes counter */}
              <p className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                {likesCount.toLocaleString()} likes
              </p>

              {/* Caption */}
              <div className="text-xs text-slate-800 leading-snug space-y-1">
                <p>
                  <span className="font-bold">@{clinicHandle}.ortho</span> Ready to love your smile without metal braces? ✨ {activeClinic.name} offers precision Clear Aligners with custom 3D digital smile simulation before you start.
                </p>
                <p className="text-slate-500 text-[11px]">
                  Tap <strong>Send WhatsApp Message</strong> above to check consultation availability with {activeClinic.doctorName}.
                </p>
                <p className="text-teal-700 text-[11px]">
                  #ClearAligners #SmileTransformation #Orthodontics #{activeClinic.city.split(',')[0]}Dentist
                </p>
              </div>

              {/* Comments link */}
              <p className="text-[11px] text-slate-400 cursor-pointer pt-1">
                View all 48 comments
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ATTRIBUTION & PERFORMANCE */}
        <div className="lg:col-span-6 space-y-5">
          {/* Funnel Explanation Box */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-teal-950">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>Click-to-WhatsApp Funnel Architecture</span>
            </h3>
            <p className="text-xs text-teal-900/90 mt-1 leading-relaxed">
              When prospective dental patients view this Instagram advertisement on mobile, clicking the <strong>Send WhatsApp Message</strong> CTA opens a direct WhatsApp chat window. Our automated concierge takes their details, captures legal consent, and pushes the lead instantly into DentalFlow CRM.
            </p>
            <div className="mt-3 pt-3 border-t border-teal-200/80 flex items-center justify-between">
              <span className="text-xs font-medium text-teal-800">Ready to test the live flow?</span>
              <button
                onClick={() => setActiveTab('chat')}
                className="px-3 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>Launch Chat Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Campaign Telemetry Metrics */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono text-slate-400">{campaign.id}</span>
                <h4 className="font-bold text-slate-900 text-sm">{campaign.name}</h4>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Active Campaign
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500">Ad Spend</span>
                <p className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  ${campaign.adSpend.toLocaleString()}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500">Impressions</span>
                <p className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {campaign.impressions.toLocaleString()}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500">Link Clicks</span>
                <p className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {campaign.clicks.toLocaleString()}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500">Cost Per Click (CPC)</span>
                <p className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  ${campaign.costPerClick.toFixed(2)}
                </p>
              </div>

              <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-100">
                <span className="text-[11px] text-teal-800">Inbound Leads</span>
                <p className="text-base font-bold text-teal-900 font-mono tabular-nums">
                  {campaign.leads}
                </p>
              </div>

              <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-100">
                <span className="text-[11px] text-teal-800">Cost Per Lead (CPL)</span>
                <p className="text-base font-bold text-teal-900 font-mono tabular-nums">
                  ${campaign.costPerLead.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Audience Targeting Details */}
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
              <span className="font-semibold text-slate-700">Targeting Parameters:</span>
              <p className="text-slate-600">{campaign.targetAudience}</p>
            </div>

            {/* UTM Tag Attribution Breakdown */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                UTM Attribution Parameters
              </span>
              <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] space-y-1 overflow-x-auto">
                <p><span className="text-teal-400">utm_source:</span> {campaign.utmSource}</p>
                <p><span className="text-teal-400">utm_medium:</span> {campaign.utmMedium}</p>
                <p><span className="text-teal-400">utm_campaign:</span> {campaign.utmCampaign}</p>
                <p><span className="text-teal-400">utm_clinic:</span> {activeClinic.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
