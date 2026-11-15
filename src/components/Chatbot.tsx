'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import Image from 'next/image';
import { CHAT_GREETING, CHAT_SUGGESTIONS } from '@/lib/portfolio-knowledge';
import { TriquetraIcon, openSicMundus } from '@/components/CommandPalette';
import { useSound } from '@/components/SoundSystem';
import { useExperience } from '@/components/ExperienceContext';

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
    <div className="space-y-1.5 leading-relaxed text-[13px] sm:text-sm">
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
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-accent-bronze shrink-0" />
              <span className="flex-1 text-text-primary">{rendered}</span>
            </div>
          );
        }

        return <div key={i} className="text-text-primary">{rendered}</div>;
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
      parts.push(<strong key={key++} className="font-semibold text-text-primary">{m[2]}</strong>);
    } else if (m[4]) {
      parts.push(
        <code key={key++} className="px-1.5 py-0.5 rounded bg-bg-tertiary text-accent-bronze font-mono text-[11px] border border-border-subtle">
          {m[4]}
        </code>,
      );
    } else if (m[6] && m[7]) {
      parts.push(
        <a key={key++} href={m[7]} target={m[7].startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer"
           className="text-accent-bronze hover:text-text-primary underline underline-offset-2 transition-colors">{m[6]}</a>,
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
  const { playClick, playChime } = useSound();
  const { renderMode } = useExperience();

  const nextId = () => `m-${++idRef.current}`;

  /* Scroll helper */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  /* Close & wipe session */
  const handleClose = useCallback(() => {
    playClick();
    abortRef.current?.abort();
    setIsOpen(false);
    setMessages([]);
    setInput('');
    setStreaming(false);
  }, [playClick]);

  /* Greet on open */
  const greetedRef = useRef(false);
  useEffect(() => {
    if (isOpen && !greetedRef.current) {
      greetedRef.current = true;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      greetedRef.current = false;
    }
  }, [isOpen]);

  /* Initialise greeting message when opening */
  const handleOpen = () => {
    playClick();
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
  }, [isOpen, handleClose]);

  /* Send / stream */
  const send = async (text: string) => {
    const q = text.trim();
    if (!q || streaming) return;

    playClick();
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
      playChime();
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
        {/* Ambient Bronze Aura in 3D Mode */}
        {!isOpen && renderMode === '3d' && (
          <span
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent-bronze/40 via-accent-primary/20 to-accent-bronze/40 blur-md opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-300 pointer-events-none"
            aria-hidden="true"
          />
        )}

        <button
          onClick={() => (isOpen ? handleClose() : handleOpen())}
          aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
          aria-expanded={isOpen}
          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs sm:text-sm transition-all duration-300 motion-reduce:transition-none active:scale-95 cursor-pointer ${
            isOpen
              ? 'bg-bg-tertiary border border-border-subtle text-text-primary shadow-hud'
              : 'bg-bg-card border border-accent-bronze/60 hover:border-accent-bronze text-text-primary shadow-glow hover:scale-105'
          }`}
        >
          {/* Pulsing Beacon Dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
            {renderMode === '3d' && (
              <span className="absolute inset-0 animate-ping rounded-full bg-accent-bronze opacity-75 motion-reduce:animate-none" />
            )}
            <span className="relative rounded-full h-2.5 w-2.5 bg-accent-bronze shadow-[0_0_8px_var(--color-accent-bronze)]" />
          </span>

          {/* Terminal prompt icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-text-secondary' : 'text-accent-bronze'}`} aria-hidden="true">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>

          <span className="tracking-tight font-bold text-text-primary">{isOpen ? 'Close' : 'Ask AI'}</span>

          {!isOpen && (
            <span className="hidden min-[360px]:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-accent-bronze/20 text-text-primary border border-accent-bronze/40 tracking-wider">
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
        className={`fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] inset-x-3 sm:inset-x-auto sm:right-6 sm:w-[420px] z-50 h-[min(560px,calc(100dvh-5.5rem-env(safe-area-inset-bottom)))] flex flex-col rounded-2xl overflow-hidden border
          bg-bg-glass-card backdrop-blur-2xl ${renderMode === '3d' ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),0_0_25px_var(--color-accent-bronze-dim)]' : 'shadow-card'}
          transition-all duration-200 ease-out motion-reduce:transition-none origin-bottom-right
          ${isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto border-border-subtle'
            : 'opacity-0 scale-95 translate-y-3 pointer-events-none invisible border-transparent'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-bg-card shrink-0">
          <div className="flex items-center gap-2.5">
            {/* Authentic 'A' Logo from top tab/favicon */}
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-border-subtle flex items-center justify-center bg-bg-primary shrink-0 p-0.5">
              <Image
                src="/icon.png"
                alt="A Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="leading-tight">
              <h3 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                Amrit AI
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze shadow-[0_0_5px_var(--color-accent-bronze)]" />
                <button
                  type="button"
                  onClick={() => openSicMundus()}
                  title="Sic Mundus Creatus Est — Open Command Palette"
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-bg-tertiary border border-border-subtle text-accent-bronze hover:border-accent-bronze hover:bg-bg-card transition-colors cursor-pointer"
                >
                  <TriquetraIcon className="w-2.5 h-2.5 text-accent-bronze" />
                  <span>SIC MUNDUS</span>
                </button>
              </h3>
              <p className="font-mono text-[10px] text-text-secondary">portfolio intelligence</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bronze cursor-pointer"
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
                    ? 'bg-bg-tertiary text-text-primary border border-border-subtle rounded-br-sm'
                    : msg.isError
                      ? 'bg-red-950/40 text-red-300 border border-red-500/30 rounded-bl-sm'
                      : 'bg-bg-card text-text-primary border border-border-subtle rounded-bl-sm'
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
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-bg-card border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze animate-pulse [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze animate-pulse [animation-delay:300ms]" />
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
                  className="font-mono text-[11px] text-text-secondary hover:text-text-primary bg-bg-card hover:bg-bg-tertiary border border-border-subtle hover:border-accent-bronze/60 rounded-full px-2.5 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bronze cursor-pointer"
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
          className="p-3 border-t border-border-subtle bg-bg-card shrink-0"
        >
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about ReleaseTrace, ThreatDesk, Linux, stack…"
              disabled={streaming}
              maxLength={2000}
              className="flex-1 bg-bg-primary border border-border-subtle focus:border-accent-bronze focus:ring-1 focus:ring-accent-bronze/40 rounded-xl px-3 py-2 text-[13px] sm:text-sm text-text-primary placeholder:text-text-secondary outline-none transition-all disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={!input.trim() || streaming}
              className="p-2 rounded-xl bg-accent-bronze hover:bg-accent-bronze/90 text-bg-primary font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bronze cursor-pointer"
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="mt-1.5 text-center font-mono text-[9px] text-text-tertiary select-none">
            Esc to close · session-only memory · Gemini AI
          </p>
        </form>
      </div>
    </>
  );
}
