import React, { useState, useEffect, useRef } from 'react';
import { useCRM } from '../../context/CRMContext';
import { ChatMessage } from '../../types/crm';
import {
  Send,
  Check,
  CheckCheck,
  RotateCcw,
  Smartphone,
  Maximize2,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Calendar,
  Building2
} from 'lucide-react';

interface IntakeState {
  step: 'name' | 'phone' | 'concern' | 'window' | 'consent' | 'confirmed';
  patientName: string;
  phone: string;
  concern: string;
  window: string;
  consentGiven: boolean;
}

export const PatientChatDemo: React.FC = () => {
  const { activeClinic, addLead, setActiveTab, setSelectedLead, showToast } = useCRM();

  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState<string | null>(null);

  const [intake, setIntake] = useState<IntakeState>({
    step: 'name',
    patientName: '',
    phone: '',
    concern: '',
    window: '',
    consentGiven: false,
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  const initialBotMessage: ChatMessage = {
    id: 'msg-1',
    sender: 'bot',
    text: `Hi there! 👋 Welcome to ${activeClinic.name}. Thanks for inquiring about our Clear Aligners special! I'm Sarah, orthodontic patient coordinator for ${activeClinic.doctorName}.\n\nMay I ask your first and last name so I can check availability for your 3D digital smile scan?`,
    timestamp: '12:01 PM',
    status: 'read',
    quickReplies: ['Sophia Martinez', 'Jordan Lee', 'Liam Carter'],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addBotMessage = (text: string, quickReplies?: string[], isConsentPrompt?: boolean) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'bot',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
          quickReplies,
          isConsentPrompt,
        },
      ]);
    }, 700);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    // Append user message
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'read',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // State machine progression
    if (intake.step === 'name') {
      setIntake((prev) => ({ ...prev, patientName: text, step: 'phone' }));
      addBotMessage(
        `Pleasure to meet you, ${text}! ✨ To send you appointment confirmation and coordinate with ${activeClinic.doctorName}, what's the best mobile phone number to reach you on?`,
        ['+1 (512) 555-0149', '+1 (310) 555-8821']
      );
    } else if (intake.step === 'phone') {
      setIntake((prev) => ({ ...prev, phone: text, step: 'concern' }));
      addBotMessage(
        `Thank you! What is your main dental concern or smile goal with Clear Aligners?`,
        [
          'Crowded lower & front teeth',
          'Noticeable gap between teeth',
          'Relapse after braces years ago',
          'Deep bite / jaw alignment',
          'Discreet wedding smile prep',
        ]
      );
    } else if (intake.step === 'concern') {
      setIntake((prev) => ({ ...prev, concern: text, step: 'window' }));
      addBotMessage(
        `Understood. Clear Aligners are very effective for ${text.toLowerCase()}. When is your preferred time for a 30-minute 3D digital smile scan consultation at our ${activeClinic.city} lounge?`,
        [
          'Weekday Mornings (9am - 12pm)',
          'Weekday Afternoons (1pm - 5pm)',
          'Weekday Evenings (5pm - 7pm)',
          'Saturday Morning',
        ]
      );
    } else if (intake.step === 'window') {
      setIntake((prev) => ({ ...prev, window: text, step: 'consent' }));
      addBotMessage(
        `Almost done! 📋 Before we save your reservation in our schedule, please review our consent agreement:\n\n"I consent to ${activeClinic.name} contacting me via WhatsApp, SMS, or phone regarding my dental consultation, appointment confirmations, and Clear Aligner treatment options. I understand I can opt out at any time."\n\nDo you give consent to be contacted?`,
        ['✅ Yes, I Consent & Reserve My Consultation', '❌ Decline Consent'],
        true
      );
    } else if (intake.step === 'consent') {
      if (text.toLowerCase().includes('yes') || text.toLowerCase().includes('consent')) {
        const finalIntake = { ...intake, consentGiven: true, step: 'confirmed' as const };
        setIntake(finalIntake);

        // CREATE REAL LEAD IN CRM
        const newLead = addLead({
          clinicId: activeClinic.id,
          patientName: finalIntake.patientName || 'Anonymous Patient',
          phone: finalIntake.phone || '+1 (555) 000-0000',
          procedure: 'Clear Aligners',
          dentalConcern: finalIntake.concern || 'Clear Aligner Smile Assessment',
          status: 'New',
          preferredWindow: finalIntake.window || 'Flexible',
          consentGiven: true,
          consentTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
          source: 'Instagram Ad (Clear Aligners Q4) via WhatsApp Intake',
          estimatedValue: 4800,
          notes: [
            {
              id: `note-${Date.now()}`,
              author: 'WhatsApp Bot',
              text: `Intake completed via simulated conversational flow. Concern: "${finalIntake.concern}". Preferred slot: "${finalIntake.window}". Explicit consent captured.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        });

        setCreatedLeadId(newLead.id);

        addBotMessage(
          `🎉 Excellent, ${finalIntake.patientName}! Your priority Clear Aligner consultation request has been reserved.\n\n📅 Preferred Window: ${finalIntake.window}\n🦷 Procedure: Clear Aligners\n👨‍⚕️ Clinician: ${activeClinic.doctorName}\n🔖 Ref ID: #DF-${newLead.id.slice(-5)}\n\nOur clinic concierge has received your request and will reach out shortly with exact appointment slots. Have a wonderful day!`
        );
      } else {
        setIntake((prev) => ({ ...prev, step: 'name' }));
        addBotMessage(
          `Understood! We respect your privacy. No personal data was saved to our clinic CRM. Feel free to restart the intake anytime whenever you're ready.`
        );
      }
    }
  };

  const handleReset = () => {
    setIntake({
      step: 'name',
      patientName: '',
      phone: '',
      concern: '',
      window: '',
      consentGiven: false,
    });
    setCreatedLeadId(null);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `Hi there! 👋 Welcome to ${activeClinic.name}. Thanks for inquiring about our Clear Aligners special! I'm Sarah, orthodontic patient coordinator for ${activeClinic.doctorName}.\n\nMay I ask your first and last name so I can check availability for your 3D digital smile scan?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        quickReplies: ['Sophia Martinez', 'Jordan Lee', 'Liam Carter'],
      },
    ]);
  };

  return (
    <div className="space-y-4 pb-20 md:pb-12 max-w-4xl mx-auto">
      {/* Top Banner & Demo Clarification */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">
              SIMULATOR DEMO · Simulated WhatsApp Patient Intake Flow
            </p>
            <p className="text-amber-800/90 mt-0.5">
              This interactive simulator demonstrates how patients arriving from Instagram ads engage in a conversational intake for Clear Aligners. Not connected to a real WhatsApp account. Submissions seamlessly sync to your DentalFlow CRM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-amber-100/50 rounded-lg border border-amber-200 flex items-center gap-1.5 transition-colors"
          >
            {isPhoneFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{isPhoneFrame ? 'Expand Full View' : 'Phone Mockup'}</span>
          </button>
          <button
            onClick={handleReset}
            className="px-2.5 py-1.5 text-xs font-medium text-amber-900 bg-amber-200/60 hover:bg-amber-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className={`mx-auto transition-all ${isPhoneFrame ? 'max-w-md' : 'w-full'}`}>
        <div className="bg-slate-900 rounded-3xl p-2 sm:p-3 shadow-2xl border-4 border-slate-800">
          
          {/* Simulated Mobile Status Bar (when in phone frame) */}
          {isPhoneFrame && (
            <div className="flex items-center justify-between px-4 py-1.5 text-[11px] font-mono text-slate-400">
              <span>9:41</span>
              <div className="w-16 h-4 bg-slate-800 rounded-full" />
              <span>5G 100%</span>
            </div>
          )}

          {/* WhatsApp Header */}
          <div className="bg-[#075E54] text-white px-4 py-3 rounded-t-2xl flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm ring-2 ring-white/30"
                  style={{ backgroundColor: activeClinic.brandColor || '#0d9488' }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-[#075E54]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm text-white leading-tight">
                    {activeClinic.name}
                  </h3>
                  <span title="Verified Dental Practice">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                  </span>
                </div>
                <p className="text-[11px] text-teal-100 flex items-center gap-1">
                  <span>Online</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate max-w-[160px]">Concierge · {activeClinic.doctorName}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-teal-100">
              <Video className="w-4 h-4 cursor-pointer hover:text-white" />
              <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
              <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="wa-chat-bg h-[460px] sm:h-[500px] overflow-y-auto p-4 space-y-3">
            {/* Encryption notice */}
            <div className="text-center">
              <span className="inline-block bg-[#fff5c4] text-[#54656f] text-[10px] px-3 py-1 rounded-md shadow-2xs">
                🔒 Messages are end-to-end encrypted in real WhatsApp. This is an interactive demo for {activeClinic.name}.
              </span>
            </div>

            {/* Render Messages */}
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#d9fdd3] text-slate-900 rounded-tr-none'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {isUser && <CheckCheck className="w-3.5 h-3.5 text-sky-500" />}
                    </div>
                  </div>

                  {/* Quick Reply Suggestions */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && !isUser && (
                    <div className="flex flex-wrap gap-1.5 pt-1 max-w-[90%]">
                      {msg.quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(reply)}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all shadow-2xs hover:scale-102 active:scale-98 ${
                            reply.startsWith('✅')
                              ? 'bg-teal-700 text-white hover:bg-teal-800'
                              : reply.startsWith('❌')
                              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              : 'bg-white hover:bg-teal-50 text-teal-800 border border-teal-300'
                          }`}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-2xl rounded-tl-none w-16 shadow-xs border border-slate-100">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* CRM Lead Created Banner */}
          {createdLeadId && (
            <div className="bg-teal-900 text-white p-3 border-t border-teal-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-300" />
                <span className="font-semibold">New Lead Captured in DentalFlow CRM!</span>
              </div>
              <button
                onClick={() => {
                  setActiveTab('clinic');
                  showToast('Opened patient dossier in Clinic CRM');
                }}
                className="px-2.5 py-1 text-xs font-bold text-slate-900 bg-teal-300 hover:bg-teal-200 rounded-md transition-colors flex items-center gap-1"
              >
                <span>View in CRM</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Input Bar */}
          <div className="bg-[#f0f2f5] px-3 py-2 rounded-b-2xl flex items-center gap-2">
            <button className="text-slate-500 hover:text-slate-700 p-1">
              <Smile className="w-5 h-5" />
            </button>
            <button className="text-slate-500 hover:text-slate-700 p-1">
              <Paperclip className="w-4 h-4" />
            </button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex-1 flex items-center"
            >
              <input
                type="text"
                placeholder={
                  intake.step === 'name'
                    ? 'Type your name...'
                    : intake.step === 'phone'
                    ? 'Type your phone number...'
                    : intake.step === 'concern'
                    ? 'Type your alignment concern...'
                    : 'Type a message...'
                }
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full bg-white px-3.5 py-2 text-xs sm:text-sm rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
            </form>

            {inputVal.trim() ? (
              <button
                onClick={() => handleSendMessage()}
                className="w-9 h-9 rounded-full bg-[#00a884] text-white flex items-center justify-center hover:bg-[#008f6f] transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition-colors">
                <Mic className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
