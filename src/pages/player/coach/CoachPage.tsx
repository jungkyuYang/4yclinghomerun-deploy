import { useState } from 'react';

import { ICoachListReponse, TCard, TCoach } from '@/types/player';

import ErrorBoundary from '@/components/error/ErrorBoundary';
import SectionLayout from '@/components/player/common/SectionLayout';
import CardArea from '@/components/player/common/CardArea';
import CardItem from '@/components/player/common/CardItem';
import CardSkeleton from '@/components/player/common/CardSkeleton';
import CardError from '@/components/player/common/CardError';
import { useAxios } from '@/hooks/useAxios';
import SearchInput from '@/components/common/ui/SearchInput';
import SectionHeading from '@/components/common/typography/SectionHeading';

const CoachPage = () => {
  const [filteredSearch, setFilteredSearch] = useState<TCard[]>([]);

  const {
    data: coachData,
    isLoading,
    isError,
  } = useAxios<any>({
    method: 'GET',
    url: `player/coachlist`,
    initialData: [],
    shouldFetchOnMount: true,
    processData: (data: ICoachListReponse) => data.data.list,
  });

  const handleSearch = (searchTerm: string) => {
    const sanitizedSearchTerm = searchTerm.replace(/\s+/g, '');
    const results = (coachData as TCard[]).filter((item) =>
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

      <SectionLayout title="코치">
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <ErrorBoundary fallback={<CardError />}>
            <CardArea isError={isError}>
              {filteredSearch.length > 0
                ? filteredSearch.map((item, index) => (
                    <CardItem key={index} items={item} type="coach" />
                  ))
                : (coachData as TCard[]).map((item, index) => (
                    <CardItem key={index} items={item} type="coach" />
                  ))}
            </CardArea>
          </ErrorBoundary>
        )}
      </SectionLayout>
    </>
  );
};
export default CoachPage;
