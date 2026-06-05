"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Send, Sparkles, BookOpen, BrainCircuit, Code2, Play, Mic, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) return null;

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
          const lastIndex = updated.length - 1;
          const lastMsg = updated[lastIndex];
          if (lastMsg && lastMsg.role === "assistant") {
            updated[lastIndex] = { ...lastMsg, content: lastMsg.content + chunkText };
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

  // Markdown formatting is now handled by react-markdown directly in the render

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-100 flex justify-end items-end pointer-events-none">
          <div
            ref={chatRef}
            className="flex flex-col w-full h-full sm:w-[420px] sm:h-[min(700px,calc(100vh-120px))] bg-[#fdfcff] sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-indigo-100/50 animate-fade-in font-sans pointer-events-auto"
          >

            {/* Header */}
            <div className="flex bg-[#fdfcff] backdrop-blur-sm rounded-t-3xl items-center justify-between p-4 px-6 absolute top-0 w-full z-10 pointer-events-none">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-indigo-50 shadow-sm pointer-events-auto">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 shrink-0">
                  <Bot />
                </div>
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
                        {/* {isAssistant && (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 shrink-0 ml-1">
                            <Bot />
                          </div>
                        )} */}

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
                              {isAssistant ? (
                                <div className="chat-markdown prose-sm">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                      pre: ({ node, ...props }) => <pre className="bg-zinc-100 p-3 rounded-lg text-[11px] overflow-x-auto my-2 border border-zinc-200 text-zinc-800" {...props} />,
                                      code: ({ node, className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || "");
                                        return !match ? (
                                          <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono text-xs border border-zinc-200" {...props}>
                                            {children}
                                          </code>
                                        ) : (
                                          <code className={className} {...props}>
                                            {children}
                                          </code>
                                        );
                                      },
                                      strong: ({ node, ...props }) => <strong className="text-zinc-900 font-bold" {...props} />,
                                      em: ({ node, ...props }) => <em className="text-zinc-700 italic" {...props} />,
                                      h3: ({ node, ...props }) => <h3 className="font-black text-zinc-900 text-lg mt-5 mb-3" {...props} />,
                                      h4: ({ node, ...props }) => <h4 className="font-extrabold text-zinc-900 text-base mt-4 mb-2" {...props} />,
                                      h5: ({ node, ...props }) => <h5 className="font-bold text-zinc-900 text-sm mt-3 mb-1" {...props} />,
                                      ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 my-2 text-zinc-700 marker:text-indigo-500" {...props} />,
                                      ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1 my-2 text-zinc-700" {...props} />,
                                      p: ({ node, ...props }) => <p className="text-zinc-700 my-1 leading-relaxed" {...props} />
                                    }}
                                  >
                                    {msg.content}
                                  </ReactMarkdown>
                                </div>
                              ) : <p>{msg.content}</p>}
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
                  <Bot />
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
          className="fixed bottom-6 right-6 z-100 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white hover:scale-105 active:scale-95 transition-all shadow-[0_12px_30px_rgba(99,102,241,0.4)] group"
          aria-label="Open assistant"
        >
          <Bot className="h-8 w-8 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
        </button>
      )}
    </>
  );
}
