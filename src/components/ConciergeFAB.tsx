import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { Send, X, Sparkles, Compass, AlertCircle, MoreHorizontal, MessageSquare, CornerDownLeft, Bot, User, HelpCircle, Search, ArrowUp, RotateCcw } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useCursor } from '../context/CursorContext';
import ReactMarkdown from 'react-markdown';

interface ConciergeFABProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onSyncData?: () => void;
  user?: { name: string; email: string; points: number; tier: string } | null;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  richData?: {
    type: 'destination' | 'hotel' | 'tour' | 'restaurant' | 'jet' | 'booking' | 'review' | 'currency';
    title: string;
    subtitle: string;
    price?: string;
    meta?: string;
    linkView?: string;
  };
}

// Automatically changing luxury suggestions/questions to type out
const dynamicQueries = [
  { prefix: "Hey, True! ", highlight: "What can you do?" },
  { prefix: "How much does the Ritz Paris ", highlight: "cost per night?" },
  { prefix: "How can I ", highlight: "help you today?" },
  { prefix: "What is the finest resort in ", highlight: "Bali?" },
  { prefix: "How do I book a private jet to ", highlight: "Tokyo?" },
  { prefix: "Can you recommend a Michelin restaurant in ", highlight: "Paris?" },
  { prefix: "Is there a helicopter tour over ", highlight: "Manhattan?" },
  { prefix: "What is George Harrison's ", highlight: "loyalty status?" }
];

export default function ConciergeFAB({ activeView, setActiveView, onSyncData, user }: ConciergeFABProps) {
  const { formatPrice } = useCurrency();
  const { butlerEnabled } = useCursor();
  
  if (!butlerEnabled) return null;

  const [isOpen, setIsOpen] = useState(false);
  const dragControls = useDragControls();
  const isDragging = useRef(false);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Good day, traveler. I am your Wanderluxe Elite Concierge, powered by our custom server-side intelligence. How may I elevate your journey today?",
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Typewriter effect state
  const [textIndex, setTextIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delay, setDelay] = useState(80);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Typewriter effect logic
  useEffect(() => {
    if (isOpen) return; // Pause typewriter when chatbot is open

    const currentQuery = dynamicQueries[textIndex];
    const fullText = currentQuery.prefix + currentQuery.highlight;

    const handleType = () => {
      if (!isDeleting) {
        // Typing letters
        setSubIndex((prev) => prev + 1);
        if (subIndex === fullText.length) {
          // Finished typing, hold for 3 seconds
          setDelay(3000);
          setIsDeleting(true);
        } else {
          setDelay(60);
        }
      } else {
        // Deleting letters
        setSubIndex((prev) => prev - 1);
        if (subIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % dynamicQueries.length);
          setDelay(500);
        } else {
          setDelay(25);
        }
      }
    };

    const timer = setTimeout(handleType, delay);
    return () => clearTimeout(timer);
  }, [subIndex, isDeleting, textIndex, delay, isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Formulate the currently typed string splits for gradient highlighting
  const currentQuery = dynamicQueries[textIndex];
  const prefixLength = currentQuery.prefix.length;
  const typedString = (currentQuery.prefix + currentQuery.highlight).substring(0, subIndex);

  const prefixPart = typedString.substring(0, prefixLength);
  const highlightPart = typedString.substring(prefixLength);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);
    setError(null);

    try {
      // Map history for Gemini API payload
      const historyPayload = messages.map(msg => ({
        role: msg.role,
        text: msg.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          user: user
        })
      });

      if (!response.ok) {
        throw new Error("Unable to establish communication with the butler server.");
      }

      const data = await response.json();
      
      // Attempt to identify structured elements in the response to show interactive luxury cards
      let richCard: any = data.richData || undefined;
      const responseText = data.response || "";

      if (!richCard) {
        if (responseText.toLowerCase().includes("viceroy bali")) {
          richCard = {
            type: 'hotel',
            title: "Viceroy Bali Jungle Resort",
            subtitle: "Ubud, Bali • Jungle Sanctuary with Private Infinity Plunge Pools",
            price: "$450 / night",
            meta: "Elite Preferred Partner",
            linkView: "explorations"
          };
        } else if (responseText.toLowerCase().includes("gulfstream g650er")) {
          richCard = {
            type: 'jet',
            title: "Gulfstream G650ER Private Jet",
            subtitle: "Transcontinental Ultra-Quiet Cabin (14 Guests)",
            price: "$9,500 / hr",
            meta: "Certified Premium FAA Crew",
            linkView: "jets-cruises"
          };
        } else if (responseText.toLowerCase().includes("ritz paris")) {
          richCard = {
            type: 'hotel',
            title: "Ritz Paris Place Vendôme",
            subtitle: "Paris, France • Gold-gilded Royalty & 3-Star Michelin Gastronomy",
            price: "$850 / night",
            meta: "Historic Elite Heritage Stay",
            linkView: "explorations"
          };
        } else if (responseText.toLowerCase().includes("mount batur")) {
          richCard = {
            type: 'tour',
            title: "Mount Batur Volcano Sunrise Trek",
            subtitle: "Bali, Indonesia • Guided sunrise climb above the clouds",
            price: "$75 / person",
            meta: "Includes private chalet breakfast",
            linkView: "explorations"
          };
        } else if (responseText.toLowerCase().includes("locavore")) {
          richCard = {
            type: 'restaurant',
            title: "Locavore Fine Dining Ubud",
            subtitle: "Ubud • 100% locally sourced premium Indonesian cuisine",
            price: "Fine Gastronomy Index",
            meta: "Requires reservation 48 hrs prior",
            linkView: "explorations"
          };
        }
      }

      if (richCard && onSyncData) {
        // Trigger React client state refetching for dynamic sync (e.g. newly confirmed bookings/reviews)
        onSyncData();
      }

      const butlerMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        text: responseText,
        timestamp: new Date(),
        richData: richCard
      };

      setMessages((prev) => [...prev, butlerMsg]);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputVal);
  };

  const handleQuickQuestion = (q: string) => {
    handleSendMessage(q);
  };

  return (
    <motion.div 
      drag
      dragMomentum={false}
      dragConstraints={{
        left: -windowSize.width + (isOpen ? 460 : 430),
        right: 10,
        top: -windowSize.height + (isOpen ? 560 : 120),
        bottom: 10
      }}
      dragElastic={0.1}
      onDragStart={() => {
        isDragging.current = true;
      }}
      onDragEnd={() => {
        setTimeout(() => {
          isDragging.current = false;
        }, 120);
      }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 touch-none"
    >
      
      {/* 1. CHAT WINDOW OVERLAY */}
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 40, scale: 0.90 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 24, stiffness: 210 }}
            className="w-[calc(100vw-48px)] sm:w-[430px] h-[520px] max-h-[calc(100vh-160px)] rounded-[28px] sm:rounded-[32px] border border-white/10 bg-[#0c0e14]/95 backdrop-blur-3xl shadow-[0_24px_80px_-16px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-slate-200 relative"
          >
            {/* Highly aesthetic glowing ambient background blobs inside */}
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-indigo-500/15 blur-[50px] pointer-events-none" />
            <div className="absolute bottom-16 left-0 w-36 h-36 rounded-full bg-purple-500/10 blur-[50px] pointer-events-none" />

            {/* Chat Header */}
            <div 
              className="p-4 sm:p-5 border-b border-white/5 bg-[#10121a]/85 backdrop-blur-md flex items-center justify-between shrink-0 relative z-10 cursor-grab active:cursor-grabbing select-none"
            >
              <div className="flex items-center gap-3 pointer-events-none select-none">
                {/* Glowing bot indicator ring */}
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-pink-500 p-[2px] shadow-[0_0_15px_rgba(139,92,246,0.3)] shrink-0">
                  <div className="w-full h-full rounded-full bg-[#0a0c10] flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400 animate-pulse" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0c0e14] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[10px] sm:text-[12px] tracking-widest text-slate-300 font-mono">WANDERLUXE CONCIERGE</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] sm:text-[13px] font-black text-white">Elite Virtual Butler</span>
                    <span className="text-[8px] sm:text-[9px] font-black bg-violet-500/20 text-violet-300 px-1.5 sm:px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Connected</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setMessages([
                      {
                        id: 'welcome',
                        role: 'assistant',
                        text: "Good day, traveler. I am your Wanderluxe Elite Concierge, powered by our custom server-side intelligence. How may I elevate your journey today?",
                        timestamp: new Date()
                      }
                    ]);
                    setError(null);
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  title="Clear Conversation"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              onPointerDown={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 relative z-10 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent"
            >
              
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={msg.id} className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    
                    {!isUser && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-violet-500 flex items-center justify-center shrink-0 mt-0.5 border border-white/10 shadow-md text-white">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div className="flex flex-col gap-2 max-w-[82%]">
                      {/* Message Text Bubble */}
                      <div className={`rounded-2xl px-4 py-3 border ${
                        isUser 
                          ? 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 border-t border-fuchsia-400/30 text-white rounded-tr-none font-medium text-[12px] leading-relaxed shadow-lg shadow-fuchsia-950/20' 
                          : 'bg-gradient-to-b from-[#160b24] to-[#0d0716] border-fuchsia-500/20 text-slate-100 rounded-tl-none font-sans shadow-lg'
                      }`}>
                        {isUser ? (
                          msg.text
                        ) : (
                          <div className="prose prose-invert prose-xs text-[12.5px] leading-relaxed text-slate-200">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p className="mb-2 last:mb-0 font-medium">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1 font-medium">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1 font-medium">{children}</ol>,
                                li: ({ children }) => <li className="marker:text-fuchsia-400">{children}</li>,
                                strong: ({ children }) => <strong className="font-extrabold text-fuchsia-300">{children}</strong>,
                                a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-fuchsia-400 hover:underline">{children}</a>
                              }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>

                      {/* Interactive Premium Curated Card */}
                      {msg.richData && (
                        <motion.div 
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-[#191b26] border border-white/10 rounded-2xl p-4 shadow-lg space-y-3 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-xl pointer-events-none" />
                          <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-2">
                            <div>
                              <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                                msg.richData.type === 'booking' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' :
                                msg.richData.type === 'review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/20' :
                                msg.richData.type === 'currency' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/20' :
                                'bg-violet-500/20 text-violet-300'
                              }`}>
                                {msg.richData.type} spotlight
                              </span>
                              <h5 className="font-extrabold text-white text-[13px] tracking-tight mt-1">
                                {msg.richData.title}
                              </h5>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-normal font-medium">
                                {msg.richData.subtitle}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between gap-4 pt-1">
                            <div>
                              <span className="text-[8px] text-slate-500 block uppercase font-mono tracking-wider">
                                {msg.richData.type === 'booking' ? 'Total Reservation' :
                                 msg.richData.type === 'review' ? 'Rating Record' :
                                 msg.richData.type === 'currency' ? 'Luxury Value' :
                                 'Rate Estimate'}
                              </span>
                              <span className={`text-[13px] font-black font-mono ${
                                msg.richData.type === 'booking' ? 'text-emerald-400' :
                                msg.richData.type === 'currency' ? 'text-cyan-400' :
                                'text-amber-400'
                              }`}>{msg.richData.price}</span>
                            </div>
                            <button
                              onClick={() => {
                                if (msg.richData?.linkView) {
                                  setActiveView(msg.richData.linkView);
                                  setIsOpen(false);
                                }
                              }}
                              className={`px-3 py-1.5 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md active:scale-95 flex items-center gap-1 ${
                                msg.richData.type === 'booking' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25' :
                                msg.richData.type === 'currency' ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/25' :
                                msg.richData.type === 'review' ? 'bg-amber-650 hover:bg-amber-600 shadow-amber-650/25' :
                                'bg-violet-600 hover:bg-violet-500 shadow-violet-600/20'
                              }`}
                            >
                              <span>
                                {msg.richData.type === 'booking' ? 'View Itinerary' :
                                 msg.richData.type === 'review' ? 'View Reviews' :
                                 msg.richData.type === 'currency' ? 'View Exchange' :
                                 'Explore Now'}
                              </span>
                              <span>→</span>
                            </button>
                          </div>
                          <div className="text-[9px] font-mono font-bold text-slate-500 flex items-center gap-1 uppercase">
                            <Sparkles className={`w-2.5 h-2.5 ${
                              msg.richData.type === 'booking' ? 'text-emerald-400' :
                              msg.richData.type === 'currency' ? 'text-cyan-400' :
                              'text-violet-400'
                            }`} />
                            <span>{msg.richData.meta}</span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-4 h-4 text-violet-400 animate-spin" />
                  </div>
                  <div className="bg-[#151720]/90 border border-white/5 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3.5 text-[11px] flex items-center gap-2">
                    <span className="font-medium"> butler is analyzing manifests</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 bg-rose-950/20 border border-rose-500/20 rounded-2xl text-rose-400 text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Shelf */}
            <div 
              onPointerDown={(e) => e.stopPropagation()}
              className="px-5 py-3.5 bg-gradient-to-r from-[#0b0512] via-[#10071a] to-[#0b0512] border-t border-white/5 flex gap-2 overflow-x-auto shrink-0 relative z-10 scrollbar-none"
            >
              <button
                onClick={() => handleQuickQuestion("What are the top things to do in Bali?")}
                className="text-[10px] font-extrabold bg-[#1d112d]/80 hover:bg-fuchsia-600/20 hover:text-white border border-fuchsia-500/20 text-slate-200 px-4 py-2.5 rounded-full whitespace-nowrap cursor-pointer transition-all duration-200 active:scale-95 shrink-0 uppercase tracking-wider shadow-[0_2px_8px_rgba(217,70,239,0.1)]"
              >
                🏝️ Bali Curations
              </button>
              <button
                onClick={() => handleQuickQuestion("Tell me about the private jet options.")}
                className="text-[10px] font-extrabold bg-[#1d112d]/80 hover:bg-fuchsia-600/20 hover:text-white border border-fuchsia-500/20 text-slate-200 px-4 py-2.5 rounded-full whitespace-nowrap cursor-pointer transition-all duration-200 active:scale-95 shrink-0 uppercase tracking-wider shadow-[0_2px_8px_rgba(217,70,239,0.1)]"
              >
                ✈️ Jet Charters
              </button>
              <button
                onClick={() => handleQuickQuestion("What Michelin restaurants do we have in Paris?")}
                className="text-[10px] font-extrabold bg-[#1d112d]/80 hover:bg-fuchsia-600/20 hover:text-white border border-fuchsia-500/20 text-slate-200 px-4 py-2.5 rounded-full whitespace-nowrap cursor-pointer transition-all duration-200 active:scale-95 shrink-0 uppercase tracking-wider shadow-[0_2px_8px_rgba(217,70,239,0.1)]"
              >
                🍽️ Paris Dining
              </button>
              <button
                onClick={() => handleQuickQuestion("How does the privacy protection system work?")}
                className="text-[10px] font-extrabold bg-[#1d112d]/80 hover:bg-fuchsia-600/20 hover:text-white border border-fuchsia-500/20 text-slate-200 px-4 py-2.5 rounded-full whitespace-nowrap cursor-pointer transition-all duration-200 active:scale-95 shrink-0 uppercase tracking-wider shadow-[0_2px_8px_rgba(217,70,239,0.1)]"
              >
                🔒 Privacy Protocol
              </button>
            </div>

            {/* Input Form Box */}
            <form 
              onSubmit={handleFormSubmit} 
              onPointerDown={(e) => e.stopPropagation()}
              className="p-4 border-t border-white/5 bg-[#0a0510]/95 flex gap-2.5 items-center shrink-0 relative z-10"
            >
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  placeholder="Speak with your luxury butler..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full text-[13px] py-3.5 pl-4 pr-12 bg-[#140b1f] border border-fuchsia-500/20 text-white rounded-2xl focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 font-medium placeholder-slate-500 transition-all duration-200"
                />
                <div className="absolute right-3 text-[9px] font-mono text-slate-600 flex items-center gap-1 select-none pointer-events-none">
                  <span className="border border-white/10 px-1.5 py-0.5 rounded bg-white/5">Enter</span>
                  <CornerDownLeft className="w-2.5 h-2.5" />
                </div>
              </div>
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 disabled:from-[#1b1524] disabled:to-[#1b1524] disabled:text-slate-600 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg shadow-fuchsia-500/20 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        ) : (
          /* 2. FLOATING ROBOT CHAT PILL BAR (HIGHLY AESTHETIC CHAT BOT PILL INSPIRED BY USER'S IMAGE) */
          <motion.button
            key="chat-pill"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onPointerDown={(e) => {
              // Drag start handled by parent container
            }}
            onClick={() => {
              if (!isDragging.current) {
                setIsOpen(true);
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group flex items-center justify-between p-1.5 pl-6 pr-2 rounded-full border border-fuchsia-500/60 bg-gradient-to-r from-[#170024] via-[#330045] to-[#170024] text-white shadow-[0_0_35px_rgba(217,70,239,0.4),_inset_0_0_15px_rgba(217,70,239,0.2)] hover:shadow-[0_0_45px_rgba(217,70,239,0.7),_inset_0_0_20px_rgba(217,70,239,0.35)] hover:border-fuchsia-400/80 transition-all duration-300 cursor-grab active:cursor-grabbing overflow-hidden w-[calc(100vw-48px)] sm:w-[480px]"
          >
            {/* Glowing Aura Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/10 to-violet-600/10 opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Middle Section: Typewriter Text matching thin elegant font in the image */}
            <div className="flex-1 flex items-center min-w-0 pr-2 text-left">
              <p className="text-[13px] sm:text-[15px] font-light text-slate-100 tracking-wide leading-relaxed truncate select-none">
                <span>{prefixPart}</span>
                <span className="text-white font-normal">
                  {highlightPart}
                </span>
                <span className="inline-block w-[1.5px] h-4.5 bg-fuchsia-500 ml-1.5 animate-pulse align-middle" />
              </p>
            </div>

            {/* Right Section: Circular White Gradient Button with ArrowUp Icon */}
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-b from-white to-slate-100 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.4)] shrink-0 select-none pointer-events-none transition-transform duration-300 group-hover:scale-105">
              <ArrowUp className="w-5 h-5 text-[#200330] stroke-[2.5]" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

