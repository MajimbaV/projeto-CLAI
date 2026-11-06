import { useEffect, useState, useRef } from "react";
import SearchIcon from "../../../assets/Search.png";
import "./SearchBar.css";

export function SearchBar({
  value,
  onChange,
  onSearch,
  results = [],
  debounceDelay = 1000,
  onSelect,
  placeholder = "Buscar...",
  disabled = false,
  getLabel = (item) => item.nome, 
  getKey = (item) => item.id 
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const jaPesquisouRef = useRef(false);

  useEffect(() => {
    if (value.trim().length < 3) {
      if (jaPesquisouRef.current) {
        const handler = setTimeout(() => {
          onSearch(value);
          setShowDropdown(false);
          jaPesquisouRef.current = false;
        }, 0);
        
        return () => clearTimeout(handler);
      }
      return;
    }

    const isFirstSearch = !jaPesquisouRef.current;
    const delay = isFirstSearch ? 0 : debounceDelay;

    const handler = setTimeout(() => {
      onSearch(value);
      setShowDropdown(true);
      
      if (isFirstSearch) {
        jaPesquisouRef.current = true;
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [value, onSearch, debounceDelay]);

  const handleSelect = (item) => {
    if (onSelect) {
      onSelect(item);
    }
    setShowDropdown(false);
  };

  return (
    <div className="searchbar-wrapper">
      <img src={SearchIcon} alt="Pesquisar" className="searchbar-icon" />
      
      <input
        type="text"
        className="searchbar-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        disabled={disabled}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
        onFocus={() => { 
          if (value.trim().length >= 3 && results.length > 0) {
            setShowDropdown(true); 
          }
        }}
      />

      {showDropdown && results && results.length > 0 && (
        <ul className="searchbar-dropdown-list">
          {results.slice(0, 5).map((item) => (
            <li 
              key={getKey(item)} 
              className="searchbar-dropdown-item"
              onClick={() => handleSelect(item)}
            >
              {getLabel(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}