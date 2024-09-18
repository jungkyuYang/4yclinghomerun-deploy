import ErrorBoundary from '@/components/error/ErrorBoundary';
import CardArea from '@/components/player/CardArea';
import CardItem from '@/components/player/CardItem';

import PitcherError from '@/components/player/pitcher/PitcherError';
import PitcherSkeleton from '@/components/player/pitcher/PitcherSkeleton';
import useAxios from '@/hooks/useAxios';
import { TPlayer } from '@/types/player';
import { useLocation } from 'react-router-dom';

const PitcherPage = () => {
  const location = useLocation();

  const {
    data: pitcherData,
    isLoading,
    isError,
  } = useAxios<TPlayer[]>({
    method: 'GET',
    url: `api${location.pathname}list`,
    initialData: [],
    shouldFetchOnMount: true,
  });

  return (
    <div>
      {isLoading ? (
        <PitcherSkeleton />
      ) : (
        <ErrorBoundary fallback={<PitcherError />}>
          <CardArea isError={isError}>
            {pitcherData.map((item, index) => (
              <CardItem key={index} items={item} />
            ))}
          </CardArea>
        </ErrorBoundary>
      )}
    </div>
  );
};

export default PitcherPage;
