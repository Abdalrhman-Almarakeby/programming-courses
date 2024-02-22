import { useRef } from "react";

export default function SelectSearch(props) {
  const searchRef = useRef(null);

  function filterOptions(options) {
    return options
      .filter((option) => option.toLowerCase().includes(searchRef.current.value.toLowerCase()))
      .sort((a, b) => {
        // Find index of search term within a and b
        let aIndex = a.toLowerCase().indexOf(searchRef.current.value.toLowerCase());
        let bIndex = b.toLowerCase().indexOf(searchRef.current.value.toLowerCase());

        // Sort by index, low to high
        if (aIndex < bIndex) return -1;
        if (aIndex > bIndex) return 1;

        // If index is same, sort alphabetically
        if (aIndex === bIndex) {
          if (a.toUpperCase() === "OTHER") return 1;
          if (b.toUpperCase() === "OTHER") return -1;
          return a.localeCompare(b);
        }
      });
  }

  function handleSearchChange() {
    props.setFilteredOptions(filterOptions(props.options));
    props.setIsOpen(true);
    if (props.filteredOptions.length) {
      props.setHighlightedIndex(0);
      props.selectContainer.querySelector("li").scrollIntoView({ block: "nearest" });
    }
  }

  function handleSearchBlur(e) {
    if (e.relatedTarget !== props.selectContainer) props.setIsOpen(false);
    props.setFilteredOptions(props.options);
    e.target.value = "";
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();

      props.toggleOption(props.filteredOptions[props.highlightedIndex]);
      props.setFilteredOptions(props.options);
      e.target.value = "";
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      if (
        props.filteredOptions.length === 1 ||
        (e.key === "ArrowDown" && props.filteredOptions.length - 1 === props.highlightedIndex)
      )
        return;

      const newValue = props.highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
      if (newValue >= 0 && newValue < props.options.length) {
        props.setHighlightedIndex(newValue);
        props.selectContainer.querySelectorAll("li")[newValue].scrollIntoView({ block: "nearest" });
      }
    }
  }

  function handleSearchFocus() {
    props.setIsOpen(true);
  }

  return (
    <input
      type="text"
      onChange={handleSearchChange}
      onKeyDown={handleSearchKeyDown}
      onFocus={handleSearchFocus}
      onBlur={handleSearchBlur}
      ref={searchRef}
      placeholder={props.placeholder}
      id="select-search"
    />
  );
}
