import { useEffect } from "react";
import "./Toast.css";

const TOAST_CONFIG = {
  success: {
    icon: "✓",
    label: "Sucesso",
  },
  error: {
    icon: "!",
    label: "Erro",
  },
  info: {
    icon: "i",
    label: "Informação",
  },
};

function Toast({ message, type = "info", onClose, duration = 4000 }) {
  const config = TOAST_CONFIG[type] || TOAST_CONFIG.info;

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`toast toast-${TOAST_CONFIG[type] ? type : "info"}`}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <div className="toast-icon" aria-hidden="true">
        {config.icon}
      </div>

      <div className="toast-content">
        <strong>{config.label}</strong>
        <p>{message}</p>
      </div>

      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
