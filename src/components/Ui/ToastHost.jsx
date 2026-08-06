import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, Check, Info, X } from "lucide-react";
import { TOAST_EVENT } from "./toast";

const DEFAULT_DURATION_MS = 4500;
const MAX_VISIBLE = 4;
const EXIT_MS = 200;

const DEFAULT_DESCRIPTIONS = {
  success: "You're all set.",
  error: "Please try again.",
  warning: "Please review this carefully.",
  info: "Here's a quick update.",
};

const TYPE_STYLES = {
  success: {
    accent: "border-l-emerald-500",
    iconWrap: "bg-emerald-500/15 text-emerald-400",
    Icon: Check,
  },
  error: {
    accent: "border-l-rose-500",
    iconWrap: "bg-rose-500/15 text-rose-400",
    Icon: X,
  },
  warning: {
    accent: "border-l-[#F5B400]",
    iconWrap: "bg-[#F5B400]/15 text-[#F5B400]",
    Icon: AlertTriangle,
  },
  info: {
    accent: "border-l-sky-500",
    iconWrap: "bg-sky-500/15 text-sky-400",
    Icon: Info,
  },
};

function resolveType(type) {
  return TYPE_STYLES[type] ? type : "info";
}

function ToastItem({ item, onDismiss }) {
  const [exiting, setExiting] = useState(false);
  const remainingRef = useRef(DEFAULT_DURATION_MS);
  const startedAtRef = useRef(Date.now());
  const timerRef = useRef(null);
  const closingRef = useRef(false);

  const type = resolveType(item.type);
  const { accent, iconWrap, Icon } = TYPE_STYLES[type];
  const title = item.message;
  const description = item.description || DEFAULT_DESCRIPTIONS[type];

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    clearTimer();
    setExiting(true);
    window.setTimeout(() => onDismiss(item.id), EXIT_MS);
  }, [clearTimer, item.id, onDismiss]);

  const startTimer = useCallback(() => {
    clearTimer();
    startedAtRef.current = Date.now();
    timerRef.current = window.setTimeout(close, remainingRef.current);
  }, [clearTimer, close]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  const handleMouseEnter = () => {
    if (closingRef.current) return;
    clearTimer();
    remainingRef.current = Math.max(
      0,
      remainingRef.current - (Date.now() - startedAtRef.current)
    );
  };

  const handleMouseLeave = () => {
    if (closingRef.current) return;
    startTimer();
  };

  return (
    <div className={exiting ? "toast-exit" : "toast-enter"}>
      <div
        role="alert"
        aria-live="assertive"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`toast-item pointer-events-auto flex w-[calc(100vw-32px)] items-start gap-3 rounded-2xl border border-white/[0.08] border-l-[3px] bg-[#18181B]/95 px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.55)] sm:w-[320px] md:w-[380px] lg:w-[400px] ${accent}`}
      >
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconWrap}`}
          aria-hidden="true"
        >
          <Icon className="h-4 w-4" strokeWidth={2.5} />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-[16px] font-semibold leading-snug tracking-tight text-zinc-50">
            {title}
          </p>
          {description ? (
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">
              {description}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Dismiss notification"
          className="group -mr-1 -mt-0.5 flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-colors duration-150 hover:bg-white/[0.06] hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B400]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]"
        >
          <X className="h-3.5 w-3.5 transition-colors" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}

export default function ToastHost() {
  const [items, setItems] = useState([]);

  const dismiss = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  useEffect(() => {
    const onToast = (event) => {
      const detail = event?.detail;
      if (!detail?.message) return;

      setItems((prev) => [detail, ...prev].slice(0, MAX_VISIBLE));
    };

    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed top-4 right-4 z-[9999] flex flex-col gap-3.5"
      aria-live="polite"
      aria-relevant="additions"
    >
      {items.map((item) => (
        <ToastItem key={item.id} item={item} onDismiss={dismiss} />
      ))}
    </div>
  );
}
