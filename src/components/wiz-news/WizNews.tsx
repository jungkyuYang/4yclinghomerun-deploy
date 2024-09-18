import Pagination from './Pagination';
import NewsList from './NewsList';

import { TWizNewsItem } from '@/types/wizNews';
import { useState } from 'react';

type WizNewsProps = {
  newsList: TWizNewsItem[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  onSearch: (searchWord: string) => void;
};

const WizNews = ({
  newsList,
  isLoading,
  isError,
  error,
  currentPage,
  onPageChange,
  onSearch,
}: WizNewsProps) => {
  const [searchValue, setSearchValue] = useState('');

  const itemsPerPage = 5;
  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  const currentNews = newsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;

  const enterKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  const searchHandler = () => {
    onSearch(searchValue);
  };

  return (
    <div className="m-auto mt-10 flex max-w-screen-2xl flex-col gap-4">
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
        <button onClick={searchHandler}>검색</button>
      </div>

      <NewsList newsItems={currentNews} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default WizNews;
