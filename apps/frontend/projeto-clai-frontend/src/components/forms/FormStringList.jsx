import "./FormControls.css";

export default function FormStringList({
  label,
  items = [],
  onChange,
  disabled = false,
  error,
  itemPlaceholder = "Descreva...",
  addLabel = "+ Adicionar item",
}) {
  function handleItemChange(index, value) {
    const novaLista = [...items];
    novaLista[index] = value;
    onChange(novaLista);
  }

  function handleAdd() {
    onChange([...items, ""]);
  }

  function handleRemove(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="clai-string-list">
      {label && <span className="clai-string-list-label">{label}</span>}

      {items.map((item, index) => (
        <div className="clai-string-list-item" key={index}>
          <input
            type="text"
            value={item}
            placeholder={itemPlaceholder}
            onChange={(event) => handleItemChange(index, event.target.value)}
            disabled={disabled}
            aria-label={
              label ? `${label} — item ${index + 1}` : `Item ${index + 1}`
            }
          />
          <button
            type="button"
            className="clai-string-list-remove"
            onClick={() => handleRemove(index)}
            disabled={disabled}
            aria-label={`Remover item ${index + 1}`}
          >
            ×
          </button>
        </div>
      ))}

      <button
        type="button"
        className="clai-string-list-add"
        onClick={handleAdd}
        disabled={disabled}
      >
        {addLabel}
      </button>

      {error && <span className="clai-field-error">{error}</span>}
    </div>
  );
}