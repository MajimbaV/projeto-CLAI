import "./Selector.css";
import ArrowDown from "../../../assets/Chevron-down.png";

export default function Selector({
  value = "",
  onChange,
  options = [],
  placeholder,
  disabled = false,
}) {
  return (
    <div className="clai-field">
      <img src={ArrowDown} alt="Seta para baixo" className="clai-selector-arrow" />
        <select
            className="clai-selector"
            value={value ?? ""}
            onChange={onChange}
            disabled={disabled}
        >
            {placeholder && <option value="">{placeholder}</option>}
            
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
    </div>
  );
}