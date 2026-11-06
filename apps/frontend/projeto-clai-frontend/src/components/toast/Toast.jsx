import { useCallback, useEffect, useRef, useState } from "react";
import "./Toast.css";

const EXIT_DURATION = 200;

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
  const [isClosing, setIsClosing] = useState(false);
  const onCloseRef = useRef(onClose);
  const isClosingRef = useRef(false);
  const exitTimerRef = useRef(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const startClosing = useCallback(() => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    setIsClosing(true);

    exitTimerRef.current = setTimeout(() => {
      onCloseRef.current();
    }, EXIT_DURATION);
  }, []);

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(startClosing, duration);

    return () => clearTimeout(timer);
  }, [duration, startClosing]);

  useEffect(
    () => () => {
      clearTimeout(exitTimerRef.current);
    },
    [],
  );

  return (
    <div
      className={`toast toast-${TOAST_CONFIG[type] ? type : "info"}${isClosing ? " toast-exit" : ""}`}
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
        onClick={startClosing}
        aria-label="Fechar notificação"
      >
        ×
      </button>

      {duration > 0 && (
        <div className="toast-progress" aria-hidden="true">
          <div
            className="toast-progress-bar"
            style={{ "--toast-duration": `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
}

export default Toast;
