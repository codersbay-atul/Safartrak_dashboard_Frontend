const TOAST_EVENT = "safartrak:toast";

function emitToast(type, message) {
  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT, {
      detail: {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type,
        message: String(message ?? ""),
      },
    })
  );
}

/**
 * Imperative toast API for production messaging.
 * Usage: toast.error("message") | toast.success("message")
 */
export const toast = {
  error(message) {
    emitToast("error", message);
  },
  success(message) {
    emitToast("success", message);
  },
};

export { TOAST_EVENT };
