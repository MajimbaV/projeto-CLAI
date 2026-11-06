import "./ConfirmModal.css";

export function ConfirmModal({
  isOpen,
  title = "Confirmar ação",
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}) {
  if (!isOpen) return null;

  return (
    <div className="clai-modal-overlay" onClick={onCancel}>
      {/* O e.stopPropagation() impede que clicar dentro do modal feche ele */}
      <div className="clai-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="clai-modal-title">{title}</h2>
        <p className="clai-modal-message">{message}</p>
        
        <div className="clai-modal-actions">
          <button className="btn-modal-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn-modal-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}