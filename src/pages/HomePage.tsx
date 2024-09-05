import { useFetch } from '@/hooks/useFetch';
import { TestNewsUrl } from '@/api/jsonplaceholderdb';

import ErrorBoundary from '@/components/error/ErrorBoundary';
import { NewsArea } from '@/components/news/NewsArea';
import NewsError from '@/components/news/NewsError';
import NewsSkeleton from '@/components/news/NewsSkeleton';

const HomePage = () => {
  const {
    data: news,
    isLoading: isNewsLoading,
    isError: isnewsError,
  } = useFetch(TestNewsUrl, []);

  return (
    <>
      {isNewsLoading ? (
        <NewsSkeleton />
      ) : (
        <ErrorBoundary fallback={<NewsError />}>
          <NewsArea news={news} title="NEWS" isError={isnewsError} />
        </ErrorBoundary>
      )}
    </>
  );
};

export default HomePage;
