"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Lead collection flow                                               */
/* ------------------------------------------------------------------ */

type CollectStep = "name" | "email" | "company" | "service" | "challenge" | "done";

const SERVICE_OPTIONS = [
  "Business Consulting",
  "Business Process Services",
  "Managed IT Services",
  "Artificial Intelligence",
  "Data Analytics",
  "Cloud & Hybrid IT",
  "Not sure yet",
];

const STEP_PROMPTS: Record<Exclude<CollectStep, "done">, string> = {
  name: "What's your full name?",
  email: "Thanks, {name}! What's the best email to reach you at?",
  company: "And what company are you with?",
  service: "Which service area are you most interested in?",
  challenge: "Last one — could you briefly describe the challenge or goal you'd like help with?",
};

interface LeadData {
  name: string;
  email: string;
  company: string;
  service: string;
  challenge: string;
}

/* ------------------------------------------------------------------ */
/*  Message types                                                      */
/* ------------------------------------------------------------------ */

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  links?: { label: string; href: string }[];
  followUps?: string[];
}

interface ChatHistoryEntry {
  role: "user" | "assistant";
  content: string;
}

let nextId = 1;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* Detect if the user is confirming a consultation booking */
function isConsultationTrigger(text: string): boolean {
  const q = text.toLowerCase().trim();
  const triggers = [
    "yes, book a consultation",
    "book a consultation",
    "yes please",
    "yes, let's do it",
    "sure",
    "yes",
    "yeah",
    "yep",
    "i'd like to book a consultation",
    "i'd like to book",
  ];
  return triggers.includes(q) || q.includes("book a consultation") || q.includes("i'd like to book");
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Lead collection state */
  const [collecting, setCollecting] = useState(false);
  const [collectStep, setCollectStep] = useState<CollectStep>("name");
  const [leadData, setLeadData] = useState<LeadData>({
    name: "",
    email: "",
    company: "",
    service: "",
    challenge: "",
  });
  /* Track if we just suggested consultation so "yes" triggers the flow */
  const [awaitingConsultConfirm, setAwaitingConsultConfirm] = useState(false);

  /* Scroll to bottom whenever messages change */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* Focus input when chat opens */
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /* Helper: add a bot message */
  const addBotMessage = useCallback(
    (text: string, options?: { links?: Message["links"]; followUps?: string[] }, delay = 0) => {
      const add = () => {
        setMessages((prev) => [
          ...prev,
          { id: nextId++, from: "bot", text, links: options?.links, followUps: options?.followUps },
        ]);
        setIsTyping(false);
      };
      if (delay > 0) {
        setIsTyping(true);
        setTimeout(add, delay);
      } else {
        add();
      }
    },
    [],
  );

  /* Seed greeting on first open */
  const handleOpen = useCallback(() => {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          id: nextId++,
          from: "bot",
          text: "Hi there! I'm Tosh, your virtual assistant. How can I help you today?",
          followUps: [
            "What services do you offer?",
            "Tell me about JTLD",
            "I'd like to book a consultation",
            "How can I contact you?",
          ],
        },
      ]);
    }
  }, [messages.length]);

  /* Start the lead collection flow */
  const startConsultationFlow = useCallback(() => {
    setCollecting(true);
    setCollectStep("name");
    setAwaitingConsultConfirm(false);
    setLeadData({ name: "", email: "", company: "", service: "", challenge: "" });
    addBotMessage(
      "Great! I can help you book a free 30-minute discovery call right here. Let me collect a few details.\n\nWhat's your full name?",
      undefined,
      600,
    );
  }, [addBotMessage]);

  /* Process the next step when collecting lead info */
  const processCollectStep = useCallback(
    (text: string, currentStep: CollectStep, currentLead: LeadData) => {
      switch (currentStep) {
        case "name": {
          const updated = { ...currentLead, name: text };
          setLeadData(updated);
          setCollectStep("email");
          addBotMessage(STEP_PROMPTS.email.replace("{name}", text.split(" ")[0]), undefined, 600);
          break;
        }
        case "email": {
          if (!isValidEmail(text)) {
            addBotMessage("That doesn't look like a valid email. Could you try again?", undefined, 400);
            return;
          }
          const updated = { ...currentLead, email: text };
          setLeadData(updated);
          setCollectStep("company");
          addBotMessage(STEP_PROMPTS.company, undefined, 600);
          break;
        }
        case "company": {
          const updated = { ...currentLead, company: text };
          setLeadData(updated);
          setCollectStep("service");
          addBotMessage(STEP_PROMPTS.service, { followUps: SERVICE_OPTIONS }, 600);
          break;
        }
        case "service": {
          const updated = { ...currentLead, service: text };
          setLeadData(updated);
          setCollectStep("challenge");
          addBotMessage(STEP_PROMPTS.challenge, undefined, 600);
          break;
        }
        case "challenge": {
          const updated = { ...currentLead, challenge: text };
          setLeadData(updated);
          setCollectStep("done");
          setCollecting(false);

          /* Show summary */
          setIsTyping(true);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: nextId++,
                from: "bot",
                text: `Thank you, ${updated.name.split(" ")[0]}! Here's what I've collected:\n\nName: ${updated.name}\nEmail: ${updated.email}\nCompany: ${updated.company}\nService: ${updated.service}\nChallenge: ${updated.challenge}`,
              },
            ]);
            setIsTyping(false);
          }, 600);

          /* Follow-up confirmation */
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: nextId++,
                from: "bot",
                text: "Your request has been submitted! A senior consultant will reach out within one business day to schedule your free discovery call. Is there anything else I can help with?",
                followUps: [
                  "What services do you offer?",
                  "Tell me about your industries",
                  "How can I contact you?",
                ],
              },
            ]);
          }, 1400);
          break;
        }
      }
    },
    [addBotMessage],
  );

  /* Call the LLM API */
  const fetchLLMReply = useCallback(
    async (userText: string, history: ChatHistoryEntry[]) => {
      const updatedHistory: ChatHistoryEntry[] = [...history, { role: "user", content: userText }];

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedHistory }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const reply: string = data.reply || "I'm having trouble responding right now.";
        const suggestConsultation: boolean = data.suggestConsultation ?? false;

        /* Update chat history for context */
        setChatHistory([...updatedHistory, { role: "assistant", content: reply }]);

        /* Build follow-ups */
        const followUps: string[] = suggestConsultation ? ["Yes, book a consultation"] : [];

        setMessages((prev) => [
          ...prev,
          {
            id: nextId++,
            from: "bot",
            text: reply,
            followUps: followUps.length > 0 ? followUps : undefined,
          },
        ]);
        setIsTyping(false);

        if (suggestConsultation) {
          setAwaitingConsultConfirm(true);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId++,
            from: "bot",
            text: "I'm having a little trouble right now. You can reach our team at info@jtldinc.com or call (416) 555-1234.",
            followUps: ["I'd like to book a consultation", "How can I contact you?"],
          },
        ]);
        setIsTyping(false);
      }
    },
    [],
  );

  /* Send a message (from input or quick-reply) */
  const send = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const trimmed = text.trim();
      const userMsg: Message = { id: nextId++, from: "user", text: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      /* If in collection mode, handle the step */
      if (collecting) {
        processCollectStep(trimmed, collectStep, leadData);
        return;
      }

      /* If we suggested consultation and user says yes */
      if (awaitingConsultConfirm && isConsultationTrigger(trimmed)) {
        startConsultationFlow();
        return;
      }

      /* Check if user explicitly wants to book */
      if (isConsultationTrigger(trimmed)) {
        startConsultationFlow();
        return;
      }

      /* Otherwise, call the LLM */
      setIsTyping(true);
      setAwaitingConsultConfirm(false);
      fetchLLMReply(trimmed, chatHistory);
    },
    [collecting, collectStep, leadData, processCollectStep, awaitingConsultConfirm, startConsultationFlow, fetchLLMReply, chatHistory],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* ---------- Chat window ---------- */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col overflow-hidden"
          style={{ height: "min(520px, calc(100vh - 8rem))" }}
        >
          {/* Header */}
          <div className="bg-primary-900 px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75a9.723 9.723 0 01-6.361-2.36.75.75 0 00-.844-.074l-2.812 1.562a.75.75 0 01-1.083-.83l.875-3.066a.75.75 0 00-.076-.656A9.72 9.72 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">Tosh</p>
                <p className="text-primary-300 text-xs mt-0.5">JTLD Virtual Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-300 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50 dark:bg-gray-800">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-primary-700 text-white rounded-br-md"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-md shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  {/* Links */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/40 hover:bg-primary-100 dark:hover:bg-primary-900/60 px-3 py-1.5 rounded-full transition-colors"
                        >
                          {link.label}
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  )}
                  {/* Follow-up quick replies */}
                  {msg.followUps && msg.followUps.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.followUps.map((fu) => (
                        <button
                          key={fu}
                          onClick={() => send(fu)}
                          className="text-xs font-medium text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 border border-primary-200 dark:border-primary-700 px-3 py-1.5 rounded-full transition-colors text-left"
                        >
                          {fu}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={collecting ? "Type your answer..." : "Ask me anything about JTLD..."}
              className="flex-1 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-700 text-white hover:bg-primary-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* ---------- Floating trigger button ---------- */}
      <button
        onClick={() => (open ? setOpen(false) : handleOpen())}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary-700 text-white shadow-lg hover:bg-primary-800 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
        aria-label={open ? "Close Tosh" : "Chat with Tosh"}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        )}
      </button>
    </>
  );
}
