import { useState } from 'react';

import { useAxios } from '@/hooks/useAxios';
import { ICheerListReponse, TCard } from '@/types/player';

import ErrorBoundary from '@/components/error/ErrorBoundary';
import CardArea from '@/components/player/common/CardArea';
import CardError from '@/components/player/common/CardError';
import CardSkeleton from '@/components/player/common/CardSkeleton';
import CardItem from '@/components/player/common/CardItem';
import SectionLayout from '@/components/player/common/SectionLayout';
import SearchInput from '@/components/common/ui/SearchInput';

const CheerPage = () => {
  const [filteredSearch, setFilteredSearch] = useState<TCard[]>([]);

  const {
    data: cheerData,
    isLoading,
    isError,
  } = useAxios<any>({
    method: 'GET',
    url: `player/cheerleader`,
    initialData: [],
    shouldFetchOnMount: true,
    processData: (data: ICheerListReponse) => data.data.list,
  });

  const handleSearch = (searchTerm: string) => {
    const sanitizedSearchTerm = searchTerm.replace(/\s+/g, '');
    const results = (cheerData as TCard[]).filter((item) =>
      item.leaderName.includes(sanitizedSearchTerm),
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
      <SectionLayout title="응원단">
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <ErrorBoundary fallback={<CardError />}>
            <CardArea isError={isError}>
              {filteredSearch.length > 0
                ? filteredSearch.map((item, index) => (
                    <CardItem key={index} items={item} type="cheer" />
                  ))
                : (cheerData as TCard[]).map((item, index) => (
                    <CardItem key={index} items={item} type="cheer" />
                  ))}
            </CardArea>
          </ErrorBoundary>
        )}
      </SectionLayout>
    </>
  );
};
export default CheerPage;
