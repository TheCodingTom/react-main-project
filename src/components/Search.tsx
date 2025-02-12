import React from "react";

type SearchProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Search({ handleInputChange }: SearchProps) {
  return (
    <div >
      <input
      style={{padding:"10px"}}
        type="text"
        onChange={handleInputChange}
        placeholder="Search a country..."
      />
    </div>
  );
}

export default Search;
