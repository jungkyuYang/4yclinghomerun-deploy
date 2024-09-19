import SearchInput from '../common/ui/SearchInput';

import Pagination from './Pagination';
import NewsList from './NewsList';

import { TWizNewsItem } from '@/types/wizNews';

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
  const itemsPerPage = 5;
  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  const currentNews = newsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <div className="m-auto mt-10 flex max-w-screen-2xl flex-col gap-4">
      <SearchInput onSearch={onSearch} />

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
