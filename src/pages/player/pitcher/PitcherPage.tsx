import { useState } from 'react';

import { useAxios } from '@/hooks/useAxios';
import { TCard } from '@/types/player';

import ErrorBoundary from '@/components/error/ErrorBoundary';
import CardArea from '@/components/player/common/CardArea';
import CardItem from '@/components/player/common/CardItem';
import CardError from '@/components/player/common/CardError';
import CardSkeleton from '@/components/player/common/CardSkeleton';
import SectionLayout from '@/components/player/common/SectionLayout';
import SearchInput from '@/components/common/ui/SearchInput';

const PitcherPage = () => {
  const [filteredSearch, setFilteredSearch] = useState<TCard[]>([]);

  const {
    data: pitcherData,
    isLoading,
    isError,
  } = useAxios<TCard[]>({
    method: 'GET',
    url: `player/pitcherlist`,
    initialData: [],
    shouldFetchOnMount: true,
  });

  const handleSearch = (searchTerm: string) => {
    const sanitizedSearchTerm = searchTerm.replace(/\s+/g, '');
    const results = (pitcherData as TCard[]).filter((item) =>
      item.playerName.includes(sanitizedSearchTerm),
    );
    setFilteredSearch(results);
  };

  const selectOptions = ['이름'];

  return (
    <>
      <div className="flex justify-end">
        <SearchInput
          onSearch={handleSearch}
          showSelect={true}
          selectOptions={selectOptions}
        />
      </div>

      <SectionLayout title="투수">
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <ErrorBoundary fallback={<CardError />}>
            <CardArea isError={isError}>
              {filteredSearch.length > 0
                ? filteredSearch.map((item, index) => (
                    <CardItem key={index} items={item} type="pitcher" />
                  ))
                : pitcherData.map((item, index) => (
                    <CardItem key={index} items={item} type="pitcher" />
                  ))}
            </CardArea>
          </ErrorBoundary>
        )}
      </SectionLayout>
    </>
  );
};

export default PitcherPage;
