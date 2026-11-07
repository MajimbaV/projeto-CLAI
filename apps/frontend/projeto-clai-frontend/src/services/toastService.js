const listeners = new Set();

export function subscribeToToast(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function emitirToast(message, type = "info", duration = 4000) {
  if (!message) return;

  listeners.forEach((listener) => {
    listener({
      message,
      type,
      duration,
    });
  });
}

export const toastService = {
  show: emitirToast,

  success(message, duration) {
    emitirToast(message, "success", duration);
  },

  error(message, duration) {
    emitirToast(message, "error", duration);
  },

  info(message, duration) {
    emitirToast(message, "info", duration);
  },
};
