type SearchFormProps = {
  searchText: string;
  setSeatchText: (text: string) => void;
};

export default function SearchForm({searchText, setSeatchText}: SearchFormProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <input
        value={searchText}
        onChange={(e) => {
          setSeatchText(e.target.value);
        }}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
