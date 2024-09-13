import { useState } from 'react';

import Pagination from './Pagination';
import NewsList from './NewsList';
import { TWNewsItem } from '@/types/wNews';

type WizNewsProps = {
  newsList: TWNewsItem[];
};

const WizNews = ({ newsList }: WizNewsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  const currentNews = newsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const pageChangeHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="m-auto mt-10 flex max-w-screen-2xl flex-col gap-4">
      <div className="flex gap-2 text-kt-gray-2">
        <select name="search-news" className="bg-transparent p-2 outline-none">
          <option value="제목">제목</option>
          <option value="내용">내용</option>
        </select>
        <input className="border-b border-b-orange-50 bg-transparent outline-none" />
        <button>검색</button>
      </div>

      <NewsList newsItems={currentNews} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={pageChangeHandler}
      />
    </div>
  );
};

export default WizNews;
