import "./FormControls.css";

export default function FormCheckboxGroup({
  name,
  label,
  options = [],
  value = [],
  onChange,
  disabled = false,
}) {
  function toggle(optionValue) {
    const nextValue = value.includes(optionValue)
      ? value.filter((item) => item !== optionValue)
      : [...value, optionValue];

    onChange(nextValue);
  }

  return (
    <fieldset className="clai-checkbox-group" disabled={disabled}>
      <legend>{label}</legend>
      <div className="clai-checkbox-options">
        {options.map((option) => {
          const normalized =
            typeof option === "string"
              ? { value: option, label: option }
              : option;
          const id = `${name}-${normalized.value}`
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "-");

          return (
            <label className="clai-checkbox-option" htmlFor={id} key={id}>
              <input
                id={id}
                type="checkbox"
                name={name}
                checked={value.includes(normalized.value)}
                onChange={() => toggle(normalized.value)}
              />
              <span>{normalized.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
