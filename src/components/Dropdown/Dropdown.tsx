// Dropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./dropdown.module.css";

export interface Option {
  value: string;
  label: string;
}

interface DropDownProps {
  options: Option[];
  onChange: (selectedOption: Option) => void;
}

const Dropdown: React.FC<DropDownProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [focusIndex, setFocusIndex] = useState(-1);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = (event: React.MouseEvent) => {
    console.log("Toggle", event);
    setIsOpen(!isOpen);
  };
  const handleSelection = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.stopPropagation();
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        setFocusIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case "ArrowDown":
        event.preventDefault();
        setFocusIndex((prev) => (prev + 1) % options.length);
        break;
      case "Enter":
      case " ":
        if (focusIndex !== -1) handleSelection(options[focusIndex]);
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && focusIndex !== -1 && optionRefs.current[focusIndex]) {
      optionRefs.current[focusIndex]?.focus();
    }
  }, [isOpen, focusIndex]);

  useEffect(() => {
    if (!isOpen) {
      setFocusIndex(-1);
      toggleButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={styles.dropdown}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-owns={isOpen ? "listboxId" : undefined}
    >
      <button ref={toggleButtonRef} onClick={(event) => handleToggle(event)}>
        {selectedOption ? selectedOption.label : "Select..."}
      </button>
      {isOpen && (
        <ul id="listboxId" role="listbox" className={styles.options}>
          {options.map((option, index) => (
            <li
              ref={(el) => (optionRefs.current[index] = el)}
              key={option.value}
              role="option"
              aria-selected={focusIndex === index}
              // onClick={(event) => {
              //   console.log(event);
              //   // handleSelection(option, event);
              // }}
              style={{ color: focusIndex === index ? "red" : "inherit" }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
