const TOAST_EVENT = "safartrak:toast";

function emitToast(type, message, description) {
  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT, {
      detail: {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type,
        message: String(message ?? ""),
        description:
          description != null && String(description).trim()
            ? String(description)
            : undefined,
      },
    })
  );
}

/**
 * Imperative toast API for production messaging.
 * Usage:
 *   toast.success("message")
 *   toast.error("message")
 *   toast.success("Title", "Optional description")
 *   toast.warning("message") | toast.info("message")
 */
export const toast = {
  error(message, description) {
    emitToast("error", message, description);
  },
  success(message, description) {
    emitToast("success", message, description);
  },
  warning(message, description) {
    emitToast("warning", message, description);
  },
  info(message, description) {
    emitToast("info", message, description);
  },
};

export { TOAST_EVENT };
