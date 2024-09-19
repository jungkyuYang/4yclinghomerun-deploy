import { useState } from 'react';

type SearchInputProps = {
  onSearch: (searchWord: string) => void;
};

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState('');

  const enterKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  const searchHandler = () => {
    onSearch(searchValue);
  };

  return (
    <div className="flex gap-2 text-kt-gray-2">
      <select name="search-news" className="bg-transparent p-2 outline-none">
        <option value="제목">제목</option>
        <option value="내용">내용</option>
      </select>
      <input
        className="border-b border-b-orange-50 bg-transparent outline-none"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={enterKeyHandler}
      />
      <button onClick={searchHandler}>검색</button>
    </div>
  );
};

export default SearchInput;
