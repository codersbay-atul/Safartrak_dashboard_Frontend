import { useEffect, useState, useCallback } from "react";
import { TOAST_EVENT } from "./toast";

const DEFAULT_DURATION_MS = 4500;

export default function ToastHost() {
  const [items, setItems] = useState([]);

  const dismiss = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  useEffect(() => {
    const onToast = (event) => {
      const detail = event?.detail;
      if (!detail?.message) return;

      setItems((prev) => [...prev, detail]);

      window.setTimeout(() => {
        dismiss(detail.id);
      }, DEFAULT_DURATION_MS);
    };

    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, [dismiss]);

  if (items.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none"
      aria-live="polite"
      aria-relevant="additions"
    >
      {items.map((item) => (
        <div
          key={item.id}
          role="alert"
          className={`pointer-events-auto rounded-lg border px-3.5 py-2.5 shadow-lg text-[12px] font-medium ${
            item.type === "success"
              ? "border-[#14532d] bg-[#052e16] text-[#86efac]"
              : "border-[#3f3f46] bg-[#18181b] text-zinc-100"
          }`}
        >
          {item.message}
        </div>
      ))}
    </div>
  );
}
