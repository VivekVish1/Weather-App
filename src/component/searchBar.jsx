function SearchBar({ value, onChange, onSearch, loading }) {
  return (
    <form className="search-bar" onSubmit={onSearch}>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search any city..."
        aria-label="City name"
      />
      <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Search'}</button>
    </form>
  )
}

export default SearchBar