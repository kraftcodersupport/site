"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, BookOpen, BrainCircuit, Code2, Play, Mic } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  { text: "What services do you offer?", icon: BookOpen },
  { text: "Tell me about your team", icon: BrainCircuit },
  { text: "How does your process work?", icon: Code2 },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeakingMode, setIsSpeakingMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to assistant");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No reader found");

      setIsLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg && lastMsg.role === "assistant") {
            lastMsg.content += chunkText;
          }
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => {
        const updated = [...prev];
        const lastMsg = updated[updated.length - 1];
        if (lastMsg && lastMsg.role === "assistant") {
          lastMsg.content = "I'm sorry, I'm having trouble connecting right now. Please try again later.";
        }
        return updated;
      });
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  // Improved markdown formatting for structure
  function formatChatMessage(text: string) {
    if (!text) return "";

    // Simple robust markdown parser
    let formattedText = text
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-zinc-100 p-3 rounded-lg text-xs overflow-x-auto my-2 border border-zinc-200 text-zinc-800"><code>$1</code></pre>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-900 font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-zinc-700 italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-zinc-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono text-xs border border-zinc-200">$1</code>');

    // Split by blocks (paragraphs or lists)
    const lines = formattedText.split('\n');
    let html = '';
    let inList = false;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<div class="h-2"></div>';
        return;
      }

      if (trimmed.startsWith('### ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<h5 class="font-bold text-zinc-900 text-sm mt-3 mb-1">${trimmed.slice(4)}</h5>`;
      } else if (trimmed.startsWith('## ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<h4 class="font-extrabold text-zinc-900 text-base mt-4 mb-2">${trimmed.slice(3)}</h4>`;
      } else if (trimmed.startsWith('# ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<h3 class="font-black text-zinc-900 text-lg mt-5 mb-3">${trimmed.slice(2)}</h3>`;
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!inList) { html += '<ul class="list-none space-y-1 my-2">'; inList = true; }
        html += `<li class="flex items-start gap-2 text-zinc-700"><span class="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span><span>${trimmed.slice(2)}</span></li>`;
      } else if (/^\d+\.\s/.test(trimmed)) {
        if (!inList) { html += '<ul class="list-decimal pl-4 space-y-1 my-2 text-zinc-700">'; inList = true; }
        const content = trimmed.replace(/^\d+\.\s/, '');
        html += `<li>${content}</li>`;
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<p class="text-zinc-700 my-1 leading-relaxed">${trimmed}</p>`;
      }
    });

    if (inList) html += '</ul>';

    return <div dangerouslySetInnerHTML={{ __html: html }} className="chat-markdown" />;
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-100 flex justify-end items-end pointer-events-none">
          <div
            ref={chatRef}
            className="flex flex-col w-full h-full sm:w-[420px] sm:h-[min(700px,calc(100vh-120px))] bg-[#fdfcff] sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-indigo-100/50 animate-fade-in font-sans pointer-events-auto"
          >

            {/* Header */}
            <div className="flex items-center justify-between p-4 px-6 bg-transparent absolute top-0 w-full z-10 pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-indigo-50 shadow-sm pointer-events-auto">
                <Sparkles className="h-3 w-3 text-indigo-500" />
                <span className="text-[10px] font-bold text-indigo-900 tracking-wide uppercase">KraftCoder AI Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-indigo-50 text-zinc-500 hover:text-zinc-900 transition-colors shadow-sm pointer-events-auto"
              >
                <X className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold uppercase">Close</span>
              </button>
            </div>

            {/* Body Content */}
            <div className="flex-1 overflow-y-auto relative z-0 pt-16 flex flex-col">

              {/* Empty State / Welcome Screen */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center flex-1 p-6 animate-fade-in pb-10">
                  {/* Glowing Orb Animated */}
                  <div className="relative w-36 h-36 mb-10 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-linear-to-tr from-indigo-500 via-purple-400 to-pink-300 blur-xl opacity-70 animate-pulse" style={{ animationDuration: '3s' }} />
                    <div className="absolute inset-2 rounded-full bg-linear-to-tr from-indigo-100 via-white to-pink-50 opacity-90 shadow-inner animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute inset-0 rounded-full bg-linear-to-tr from-indigo-500/20 to-pink-400/20 mix-blend-overlay animate-spin" style={{ animationDuration: '10s' }} />
                  </div>

                  <div className="text-center space-y-2 mb-10">
                    <h3 className="text-2xl font-medium text-indigo-950/70 tracking-tight font-serif">
                      Hello there,
                    </h3>
                    <h2 className="text-3xl sm:text-4xl font-serif text-zinc-900 tracking-tight">
                      How can I help<br />you today?
                    </h2>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="w-full max-w-sm flex flex-wrap justify-center gap-2 mb-4">
                    {SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(s.text)}
                        className="flex items-center gap-2 bg-indigo-50/80 hover:bg-indigo-100/80 text-indigo-900 text-xs font-semibold px-4 py-2.5 rounded-2xl transition-all border border-indigo-100/50 shadow-sm"
                      >
                        <s.icon className="h-3.5 w-3.5 opacity-70" />
                        {s.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {messages.length > 0 && (
                <div className="p-4 space-y-6 flex-1">
                  {messages.map((msg, index) => {
                    const isAssistant = msg.role === "assistant";
                    return (
                      <div
                        key={index}
                        className={`flex gap-3 max-w-[85%] ${isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"
                          }`}
                      >
                        {/* Avatar */}
                        {isAssistant && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-indigo-500 to-pink-400 text-white shadow-sm mt-1">
                            <Sparkles className="h-3.5 w-3.5" />
                          </div>
                        )}

                        <div
                          className={`rounded-3xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${isAssistant
                              ? "bg-white border border-indigo-50 text-zinc-800 rounded-tl-sm"
                              : "bg-zinc-900 text-white rounded-tr-sm"
                            }`}
                        >
                          {msg.content === "" && isLoading ? (
                            <div className="flex items-center gap-1.5 py-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              {isAssistant ? formatChatMessage(msg.content) : <p>{msg.content}</p>}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} className="h-2" />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-transparent relative z-10 border-t border-zinc-100">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 bg-white rounded-full p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-zinc-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 shrink-0 ml-1">
                  <div className="h-4 w-4 rounded-full bg-linear-to-tr from-indigo-400 to-pink-400 opacity-80" />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isSpeakingMode ? "Listening..." : "Ask me anything..."}
                  className="flex-1 h-10 px-2 bg-transparent text-sm font-medium focus:outline-none text-zinc-900 placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setIsSpeakingMode(!isSpeakingMode)}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${isSpeakingMode ? 'bg-pink-100 text-pink-600' : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600'}`}
                  title="Speak mode"
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-all disabled:opacity-40 disabled:hover:bg-zinc-900 mr-1"
                >
                  <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-100 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 active:scale-95 transition-all shadow-[0_12px_30px_rgba(99,102,241,0.4)] group"
          aria-label="Open assistant"
        >
          <Sparkles className="h-6 w-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
        </button>
      )}
    </>
  );
}
