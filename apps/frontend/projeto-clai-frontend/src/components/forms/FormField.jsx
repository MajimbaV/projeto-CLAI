import "./FormControls.css";

export default function FormField({
  id,
  name,
  label,
  value = "",
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  readOnly = false,
  error,
  min,
  max,
  step,
  autoComplete,
}) {
  const fieldId = id || name;

  return (
    <div className="clai-field">
      <label htmlFor={fieldId}>
        {label}
        {required && <span className="clai-required"> *</span>}
      </label>
      <input
        id={fieldId}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        step={step}
        autoComplete={autoComplete}
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
