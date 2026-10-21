import "./FormControls.css";

export default function FormSelect({
  id,
  name,
  label,
  value = "",
  onChange,
  options = [],
  placeholder = "Selecione uma opção",
  required = false,
  disabled = false,
  error,
}) {
  const fieldId = id || name;

  return (
    <div className="clai-field">
      <label htmlFor={fieldId}>
        {label}
        {required && <span className="clai-required"> *</span>}
      </label>
      <select
        id={fieldId}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const normalized =
            typeof option === "string"
              ? { value: option, label: option }
              : option;

          return (
            <option key={normalized.value} value={normalized.value}>
              {normalized.label}
            </option>
          );
        })}
      </select>
      {error && (
        <span className="clai-field-error" id={`${fieldId}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
