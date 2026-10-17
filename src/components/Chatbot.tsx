'use client';

import { useState, useEffect, useRef, memo } from 'react';
import Image from 'next/image';
import { CHAT_GREETING, CHAT_SUGGESTIONS } from '@/lib/portfolio-knowledge';
import { TriquetraIcon, openSicMundus } from '@/components/CommandPalette';

/* ── Types ── */
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

/* ── Lightweight Markdown Renderer ── */
const Formatted = memo(function Formatted({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1 leading-relaxed text-[13px] sm:text-sm">
      {lines.map((raw, i) => {
        const trimmed = raw.trim();
        if (!trimmed) return <div key={i} className="h-1" />;

        const isBullet = /^[-•*]\s/.test(trimmed);
        const isNumbered = /^\d+\.\s/.test(trimmed);
        const clean = isBullet
          ? trimmed.replace(/^[-•*]\s+/, '')
          : isNumbered
            ? trimmed.replace(/^\d+\.\s+/, '')
            : raw;

        const rendered = renderInline(clean);

        if (isBullet || isNumbered) {
          return (
            <div key={i} className="flex items-start gap-2 pl-0.5">
              <span className="mt-[7px] w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
              <span className="flex-1">{rendered}</span>
            </div>
          );
        }

        return <div key={i}>{rendered}</div>;
      })}
    </div>
  );
});

/** Parse bold, inline code, and markdown links. */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let rest = text;
  let key = 0;

  while (rest.length > 0) {
    const m = rest.match(/(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/);
    if (!m || m.index === undefined) {
      parts.push(<span key={key++}>{rest}</span>);
      break;
    }
    if (m.index > 0) parts.push(<span key={key++}>{rest.slice(0, m.index)}</span>);
    if (m[2]) {
      parts.push(<strong key={key++} className="font-semibold text-white">{m[2]}</strong>);
    } else if (m[4]) {
      parts.push(
        <code key={key++} className="px-1 py-px rounded bg-zinc-800 text-zinc-200 font-mono text-[11px] border border-white/10">
          {m[4]}
        </code>,
      );
    } else if (m[6] && m[7]) {
      parts.push(
        <a key={key++} href={m[7]} target={m[7].startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer"
           className="text-zinc-200 hover:text-white underline underline-offset-2 transition-colors">{m[6]}</a>,
      );
    }
    rest = rest.slice(m.index + m[0].length);
  }
  return parts;
}

/* ── Component ── */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const nextId = () => `m-${++idRef.current}`;

  /* Scroll helper */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  /* Close & wipe session — defined before effects that reference it */
  const handleClose = () => {
    abortRef.current?.abort();
    setIsOpen(false);
    setMessages([]);
    setInput('');
    setStreaming(false);
  };

  /* Greet on open — uses initializer function to avoid setState-in-effect */
  const greetedRef = useRef(false);
  useEffect(() => {
    if (isOpen && !greetedRef.current) {
      greetedRef.current = true;
    }
  }, [isOpen]);

  // Reset greeted flag on close so next open re-greets
  useEffect(() => {
    if (!isOpen) {
      greetedRef.current = false;
    }
  }, [isOpen]);

  /* Initialise greeting message when opening (as initial state via toggle) */
  const handleOpen = () => {
    setMessages([{ id: nextId(), role: 'assistant', content: CHAT_GREETING }]);
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 180);
  };

  /* ESC to close */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  /* Send / stream */
  const send = async (text: string) => {
    const q = text.trim();
    if (!q || streaming) return;

    const userMsg: ChatMessage = { id: nextId(), role: 'user', content: q };
    const asstId = nextId();
    const asstMsg: ChatMessage = { id: asstId, role: 'assistant', content: '' };

    setMessages((prev) => [...prev, userMsg, asstMsg]);
    setInput('');
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    // Gather recent messages for server context (trim to last 12)
    const history = [...messages, userMsg]
      .filter((m) => !m.isError)
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error || `Request failed (${res.status})`,
        );
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let acc = '';

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const snapshot = acc;
        setMessages((prev) =>
          prev.map((m) => (m.id === asstId ? { ...m, content: snapshot } : m)),
        );
      }

      if (!acc.trim()) throw new Error('Empty response');
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      const errText = err instanceof Error ? err.message : 'Something went wrong';
      setMessages((prev) =>
        prev.map((m) =>
          m.id === asstId ? { ...m, content: errText, isError: true } : m,
        ),
      );
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  const sendRef = useRef(send);
  sendRef.current = send;
  const handleOpenRef = useRef(handleOpen);
  handleOpenRef.current = handleOpen;

  /* Listen to external triggers (e.g. from Sic Mundus Command Palette) */
  useEffect(() => {
    const handleOpenChat = () => {
      if (!isOpen) handleOpenRef.current();
    };
    const handleOpenWithPrompt = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (!isOpen) {
        setMessages([{ id: nextId(), role: 'assistant', content: CHAT_GREETING }]);
        setIsOpen(true);
      }
      if (customEvent.detail) {
        setTimeout(() => {
          sendRef.current(customEvent.detail);
        }, 200);
      }
    };

    window.addEventListener('open-chatbot', handleOpenChat);
    window.addEventListener('open-chatbot-with-prompt', handleOpenWithPrompt);

    let deepLinkTimer: NodeJS.Timeout | null = null;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('chat') === '1' && !isOpen) {
        deepLinkTimer = setTimeout(() => {
          handleOpenRef.current();
        }, 50);
      }
    }

    return () => {
      if (deepLinkTimer) clearTimeout(deepLinkTimer);
      window.removeEventListener('open-chatbot', handleOpenChat);
      window.removeEventListener('open-chatbot-with-prompt', handleOpenWithPrompt);
    };
  }, [isOpen]);

  /* ── Render ── */
  const showSuggestions =
    !streaming && messages.length <= 1 && messages[0]?.role === 'assistant';

  return (
    <>
      {/* ── Floating Launcher ── */}
      <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 z-40 group">
        {/* Ambient Emerald Aura (pulses softly so visitor's eye catches it immediately) */}
        {!isOpen && (
          <span
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500/40 via-teal-400/35 to-emerald-500/40 blur-md opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-300 pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Easter Egg Tooltip on Hover */}
        {!isOpen && (
          <div className="absolute -top-9 right-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 whitespace-nowrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0d14]/95 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 shadow-[0_4px_16px_rgba(0,0,0,0.85)] backdrop-blur-md">
              <TriquetraIcon className="w-3 h-3 text-emerald-400" />
              <span>Sic Mundus Creatus Est · Double-click ⌘K</span>
            </div>
          </div>
        )}

        <button
          onClick={() => (isOpen ? handleClose() : handleOpen())}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openSicMundus();
          }}
          aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant (Double click for Sic Mundus Command Bar)'}
          aria-expanded={isOpen}
          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs sm:text-sm transition-all duration-300 motion-reduce:transition-none active:scale-95 ${
            isOpen
              ? 'bg-[#12151f] border border-white/30 text-white shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
              : 'bg-[#0b0e17] border border-emerald-400/60 hover:border-emerald-400 text-white shadow-[0_0_20px_rgba(52,211,153,0.3),0_8px_32px_rgba(0,0,0,0.85)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5),0_10px_36px_rgba(0,0,0,0.95)] hover:scale-105'
          }`}
        >
          {/* Pulsing Beacon Dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
            <span className="relative rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.95)]" />
          </span>

          {/* Terminal prompt icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-zinc-400' : 'text-emerald-400'}`} aria-hidden="true">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>

          <span className="tracking-tight font-bold text-white">{isOpen ? 'Close' : 'Ask AI'}</span>

          {/* Triquetra Easter Egg Knot */}
          <span
            onClick={(e) => {
              e.stopPropagation();
              openSicMundus();
            }}
            title="Sic Mundus Creatus Est — Open Command Palette"
            className="w-5 h-5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 flex items-center justify-center text-emerald-400 transition-colors cursor-pointer"
            aria-label="Sic Mundus Easter Egg"
          >
            <TriquetraIcon className="w-3 h-3" />
          </span>

          {!isOpen && (
            <span className="hidden min-[360px]:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 tracking-wider">
              ONLINE
            </span>
          )}
        </button>
      </div>

      {/* ── Chat Panel ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio AI Assistant"
        aria-hidden={!isOpen}
        className={`fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] inset-x-3 sm:inset-x-auto sm:right-6 sm:w-[400px] z-50 h-[min(540px,calc(100dvh-5.5rem-env(safe-area-inset-bottom)))] flex flex-col rounded-2xl overflow-hidden border
          bg-[#060810]/[0.97] backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95),0_0_20px_rgba(255,255,255,0.02)]
          transition-all duration-200 ease-out motion-reduce:transition-none origin-bottom-right
          ${isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto border-white/10'
            : 'opacity-0 scale-95 translate-y-3 pointer-events-none border-transparent'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] bg-[#0a0d14]/80 shrink-0">
          <div className="flex items-center gap-2.5">
            {/* Authentic A Logo from top tab/favicon */}
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center bg-black/50 shrink-0 p-0.5">
              <Image
                src="/icon.png"
                alt="A Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="leading-tight">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                Amrit AI
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
                <button
                  type="button"
                  onClick={() => openSicMundus()}
                  title="Sic Mundus Creatus Est — Open Command Palette"
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-zinc-900 border border-zinc-700/80 text-emerald-400 hover:border-emerald-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <TriquetraIcon className="w-2.5 h-2.5 text-emerald-400" />
                  <span>SIC MUNDUS</span>
                </button>
              </h3>
              <p className="font-mono text-[10px] text-zinc-500">portfolio intelligence</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-400"
            aria-label="Close assistant"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3.5 overscroll-contain">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[88%] rounded-2xl px-3.5 py-2.5
                  ${msg.role === 'user'
                    ? 'bg-zinc-800/80 text-white border border-white/[0.06] rounded-br-sm'
                    : msg.isError
                      ? 'bg-red-950/40 text-red-300 border border-red-500/20 rounded-bl-sm'
                      : 'bg-[#0d1018] text-zinc-300 border border-white/[0.06] rounded-bl-sm'
                  }`}
              >
                {msg.role === 'user' ? (
                  <p className="text-[13px] sm:text-sm leading-relaxed">{msg.content}</p>
                ) : msg.isError ? (
                  <p className="text-[13px] sm:text-sm leading-relaxed">{msg.content}</p>
                ) : (
                  <Formatted text={msg.content} />
                )}
              </div>
            </div>
          ))}

          {/* Streaming indicator */}
          {streaming && messages.at(-1)?.content === '' && (
            <div className="flex items-start">
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-[#0d1018] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {/* Suggestion chips */}
          {showSuggestions && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {CHAT_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="font-mono text-[11px] text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-zinc-600 rounded-full px-2.5 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-400"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-3 border-t border-white/[0.07] bg-[#080a10]/90 shrink-0"
        >
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, stack, background…"
              disabled={streaming}
              maxLength={2000}
              className="flex-1 bg-[#050608] border border-white/[0.08] focus:border-zinc-500 focus:ring-1 focus:ring-zinc-600/30 rounded-xl px-3 py-2 text-[13px] sm:text-sm text-white placeholder-zinc-600 outline-none transition-all disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={!input.trim() || streaming}
              className="p-2 rounded-xl bg-white hover:bg-zinc-200 text-black transition-colors disabled:opacity-20 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="mt-1.5 text-center font-mono text-[9px] text-zinc-600 select-none">
            Esc to close · session-only memory
          </p>
        </form>
      </div>
    </>
  );
}
