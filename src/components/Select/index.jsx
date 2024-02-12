import { useEffect, useRef, useState } from "react";
import { isTouchDevice } from "../../utils/isTouchDevice.js";
import SelectSearch from "./SelectSearch.jsx";
import SelectedItem from "./SelectedItem.jsx";

export default function Select(props) {
  const [filteredOptions, setFilteredOptions] = useState(props.options);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isTouched, setIsTouched] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  function clearOptions() {
    props.multiple ? props.onChange([]) : props.onChange(undefined);
  }

  function toggleOption(option) {
    if (!props.multiple && option !== props.value) return props.onChange(props.option);

    if (!props.value.includes(option)) return props.onChange([...props.value, option]);

    props.onChange(props.value.filter((o) => o !== option));
  }

  function isOptionSelected(option) {
    return props.multiple ? props.value.includes(option) : option === props.value;
  }

  function handleContainerKeydown(e) {
    if (e.target != containerRef.current) return;

    switch (e.code) {
      case "Enter":
      case "Space":
        setIsOpen((prev) => !prev);

        if (isOpen) {
          toggleOption(props.options[highlightedIndex]);
          setIsTouched(true);
        }

        break;
      case "ArrowUp":
      case "ArrowDown": {
        e.view.event.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          break;
        }

        const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
        if (newValue >= 0 && newValue < props.options.length) {
          setHighlightedIndex(newValue);
          e.target.querySelectorAll("li")[newValue].scrollIntoView({ block: "nearest" });

          break;
        }
        break;
      }
      case "Escape":
        setIsOpen(false);
        break;
    }
  }

  function getSelectValue() {
    if (props.placeholder && !isTouched) return props.placeholder;
    if (!props.multiple) return props.value;

    return props.value.map((value) => (
      <SelectedItem
        key={value}
        value={value}
        toggleOption={toggleOption}
        selectContainer={containerRef.current}
      />
    ));
  }

  function handleOptionClick(e) {
    e.stopPropagation();
    e.preventDefault();
    setIsTouched(true);

    toggleOption(filteredOptions[highlightedIndex]);
    e.target.value = "";
    setFilteredOptions(props.options);

    document.getElementById("select-search").focus();
  }

  return (
    <>
      {props.search && (
        <SelectSearch
          setFilteredOptions={setFilteredOptions}
          setHighlightedIndex={setHighlightedIndex}
          highlightedIndex={highlightedIndex}
          setIsOpen={setIsOpen}
          setIsTouched={setIsTouched}
          toggleOption={toggleOption}
          filteredOptions={filteredOptions}
          selectContainer={containerRef.current}
          options={props.options}
          placeholder={props.search}
        />
      )}
      <div
        tabIndex={0}
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleContainerKeydown}
        className="select-element relative flex items-center gap-2 rounded-md bg-white p-2 pr-8 after:absolute after:right-2 after:top-1/2 after:border-4 after:border-t-4 after:border-transparent after:border-t-darkBlue"
      >
        <span className="flex flex-grow flex-wrap gap-2">{getSelectValue()}</span>
        {props.multiple && (
          <>
            <button
              type="button"
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                clearOptions();
                containerRef.current.focus();
              }}
              className="cursor-pointer border-none bg-[none] p-0 text-2xl font-extrabold text-[#777] hover:text-red-700 focus:text-red-700"
            >
              ×
            </button>
            <div aria-hidden="true" className="w-[1px] self-stretch bg-[#777]"></div>
          </>
        )}

        <ul
          className="absolute left-0 top-[calc(100%+5px)] z-20 max-h-60 min-w-full overflow-y-auto rounded border border-gray-400 bg-white"
          style={{ display: isOpen ? "block" : "none" }}
        >
          {filteredOptions.map((option, index) => (
            <li
              onClick={handleOptionClick}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option}
              className={`px-2 py-1 cursor-pointer whitespace-nowrap  ${
                isOptionSelected(option) ? "bg-emerald-800 text-white" : ""
              } ${index === highlightedIndex && !isTouchDevice() ? "bg-[#11c76e] text-black" : ""}`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
