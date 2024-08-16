import { useRef, useEffect } from "react";

function SearchBar({ className, placeholder, value, onChange }) {
  const searchRef = useRef(null);

  useEffect(() => {
    const focusSearchInput = () => {
      // early return for if already focused on search input
      if (document.activeElement === searchRef.current) return;
      searchRef.current.focus();
    };

    const clearSearchInput = () => {
      searchRef.current.value = "";
      focusSearchInput();
    };

    const handlePressEnter = (e) => {
      if (e.key === "Enter") clearSearchInput();
    };

    document.addEventListener("keydown", handlePressEnter);

    focusSearchInput();

    return () => {
      document.removeEventListener("keydown", handlePressEnter);
    };
  }, []);

  return (
    <input
      ref={searchRef}
      className={className}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
export default SearchBar;
