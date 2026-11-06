import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, X, Send, Loader2, User, Bot, Trash2, RotateCcw, AlertCircle 
} from 'lucide-react';
import { Destination } from '../types';
import { getActiveDestinations } from '../utils/destinationsHelper';

interface AiPlannerModalProps {
  onClose: () => void;
  onSelectDestination?: (dest: Destination) => void;
  onOpenBudgetPlanner?: (dest: Destination) => void;
}

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export const AiPlannerModal: React.FC<AiPlannerModalProps> = ({ 
  onClose, 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: 'Halo! Saya **Pemandu Jelantara AI**, asisten digital yang siap membantu menjawab pertanyaan seputar wisata alam Indonesia, tips perjalanan, atau informasi destinasi Jelantara 🌿'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: textToSend.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!customText) setInputMessage('');
    setLoading(true);
    setErrorMsg(null);
    setLastFailedMessage(textToSend.trim());

    // Add temporary empty model message for streaming
    setMessages(prev => [...prev, { role: 'model', content: '' }]);

    try {
      const publishedDestinations = getActiveDestinations();

      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          destinations: publishedDestinations
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Gagal mendapatkan respons Pemandu Jelantara AI.' }));
        throw new Error(data.error || 'Gagal mendapatkan respons Pemandu Jelantara AI.');
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullModelReply = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullModelReply += chunk;
          
          setMessages(prev => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: 'model', content: fullModelReply };
            return copy;
          });
        }
      }
      setLastFailedMessage(null);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Terjadi kesalahan pada percakapan Pemandu Jelantara AI.');
      // Remove the empty streaming placeholder
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(undefined, lastFailedMessage);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'model',
        content: 'Percakapan baru dimulai. Ada yang ingin kamu tanyakan mengenai wisata alam Indonesia hari ini? 🏔️'
      }
    ]);
    setErrorMsg(null);
    setLastFailedMessage(null);
  };

  const quickPrompts = [
    "Halo!",
    "Apa itu Jelantara?",
    "Apa yang menarik dari Gunung Bromo?",
    "Kalau ke sana harus bawa apa?",
    "Apa perbedaan hiking dan trekking?",
    "Aku dari Bogor, budget 300 ribu.",
    "Ada pilihan lain yang lebih dekat?",
    "Apa itu wisata berkelanjutan?"
  ];

  // Safe markdown renderer (no dangerouslySetInnerHTML)
  const renderSafeMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      const cleanLine = isBullet ? line.trim().substring(1).trim() : line;

      // Parse bold text **bold**
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-2">
            <span className="text-emerald-700 font-bold">•</span>
            <span>{renderedParts}</span>
          </div>
        );
      }

      return (
        <div key={lineIdx} className={line.trim() === '' ? 'h-2' : 'my-1'}>
          {renderedParts}
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 flex items-center justify-center text-amber-300 shadow-inner">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black">Pemandu Jelantara AI</h3>
              <p className="text-xs text-emerald-200">Travel Consultant & Asisten Wisata Alam</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition flex items-center gap-1.5"
              title="Percakapan Baru"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Percakapan Baru</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-4 bg-gray-50">
          
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-emerald-900 text-white' 
                  : 'bg-emerald-100 text-emerald-900'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-emerald-950 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
              }`}>
                {msg.content ? (
                  renderSafeMarkdown(msg.content)
                ) : (
                  <div className="flex items-center gap-2 text-emerald-800 py-1">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs font-semibold">Pemandu Jelantara sedang menyusun jawaban...</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-rose-800 shadow-sm">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
              {lastFailedMessage && (
                <button
                  onClick={handleRetry}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition flex items-center gap-1 shrink-0 shadow"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Coba Lagi
                </button>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-gray-100 border-t border-gray-200 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-[10px] font-bold text-gray-500 uppercase shrink-0">Contoh Tanya:</span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(undefined, qp)}
              disabled={loading}
              className="bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 whitespace-nowrap shadow-sm transition disabled:opacity-50"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Input Footer */}
        <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Tanyakan apa saja seputar wisata alam, tips, atau destinasi..."
            disabled={loading}
            className="flex-grow bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-800 outline-none transition disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold p-3 rounded-2xl shadow transition flex items-center justify-center shrink-0"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>

      </div>
    </div>
  );
};
