"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am KraftCoder's AI assistant. Ask me anything about our services, team, or blog posts.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add placeholder assistant message that will be populated by stream
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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] h-[500px] flex flex-col rounded-3xl bg-white border border-zinc-200 shadow-[0_16px_48px_rgba(0,0,0,0.12)] overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between bg-zinc-950 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20">
                <Sparkles className="h-4 w-4 text-white animate-sparkle" />
              </div>
              <div>
                <h4 className="text-sm font-black tracking-tight">KraftCoder Assistant</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">On-site Guide</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={index}
                  className={`flex gap-3 max-w-[85%] ${
                    isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-bold shadow-sm ${
                      isAssistant
                        ? "bg-zinc-950 border-zinc-900 text-white"
                        : "bg-primary border-primary text-white"
                    }`}
                  >
                    {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isAssistant
                        ? "bg-white border border-zinc-200 text-zinc-800 rounded-tl-none"
                        : "bg-primary text-white rounded-tr-none"
                    }`}
                  >
                    {msg.content === "" && isLoading ? (
                      <div className="flex items-center gap-1 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Panel */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-zinc-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about team, blog or services..."
              className="flex-1 h-12 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-primary/45 focus:ring-4 focus:ring-primary/5 transition-all text-zinc-900 placeholder:text-zinc-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white hover:bg-primary/95 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-sm"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* ── Toggle Trigger Bubble ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-white border border-zinc-800 hover:bg-zinc-900 transition-all hover:scale-105 active:scale-95 shadow-[0_12px_32px_rgba(0,0,0,0.15)] group relative"
        aria-label="Toggle assistant"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageSquare className="relative z-10 h-6 w-6" />
      </button>
    </div>
  );
}
