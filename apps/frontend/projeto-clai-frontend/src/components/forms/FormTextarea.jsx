import "./FormControls.css";

export default function FormTextarea({
  id,
  name,
  label,
  value = "",
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  rows = 3,
  error,
}) {
  const fieldId = id || name;

  return (
    <div className="clai-field clai-field-textarea">
      <label htmlFor={fieldId}>
        {label}
        {required && <span className="clai-required"> *</span>}
      </label>
      <textarea
        id={fieldId}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
      />
      {error && (
        <span className="clai-field-error" id={`${fieldId}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
