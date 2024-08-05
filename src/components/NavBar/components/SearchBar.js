function SearchBar({ className, placeholder, value, onChange }) {
  return (
    <input
      className={className}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
export default SearchBar;
