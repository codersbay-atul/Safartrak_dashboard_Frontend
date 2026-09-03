import hotToast from "react-hot-toast";

const toastStyle = { fontSize: "14px" };

function toMessage(message, description) {
  const msg = String(message ?? "");
  const desc =
    description != null && String(description).trim()
      ? String(description).trim()
      : "";
  return desc ? `${msg}\n${desc}` : msg;
}

export const toast = {
  success(message, description) {
    hotToast.success(toMessage(message, description), { style: toastStyle });
  },
  error(message, description) {
    hotToast.error(toMessage(message, description), { style: toastStyle });
  },
  warning(message, description) {
    hotToast(toMessage(message, description), { icon: "⚠️", style: toastStyle });
  },
  info(message, description) {
    hotToast(toMessage(message, description), { icon: "ℹ️", style: toastStyle });
  },
};

export const TOAST_EVENT = "safartrak:toast";

/*
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
*/
