import React from "react";

type SearchProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Search({ handleInputChange }: SearchProps) {
  return (
    <div>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="type something here"
      />
    </div>
  );
}

export default Search;
