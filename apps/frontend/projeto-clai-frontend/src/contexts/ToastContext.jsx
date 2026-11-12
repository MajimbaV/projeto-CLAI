import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Toast from "../components/toast/Toast";
import { ToastContext } from "./ToastContextValue";
import { subscribeToToast } from "../services/toastService";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const showToast = useCallback((message, type = "info", duration = 4000) => {
    if (!message) return;

    const novoToast = {
      id: ++idRef.current,
      message: String(message),
      type,
      duration,
    };

    setToasts((atuais) => [...atuais, novoToast]);

    return novoToast.id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((atuais) => atuais.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToToast(({ message, type, duration }) => {
      showToast(message, type, duration);
    });

    return unsubscribe;
  }, [showToast]);

  const value = useMemo(
    () => ({
      showToast,
      removeToast,
      success: (message, duration) => showToast(message, "success", duration),
      sucess: (message, duration) => showToast(message, "success", duration),
      error: (message, duration) => showToast(message, "error", duration),
      info: (message, duration) => showToast(message, "info", duration),
    }),
    [showToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast-container" aria-label="Notificações">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
