"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string; // Переконайся, що тут саме "value"
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <div className={css.searchWrapper}>
      <input
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={css.searchInput}
      />
    </div>
  );
};

export default SearchBox;
