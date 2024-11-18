import { useState } from 'react';

import { useAxios } from '@/hooks/useAxios';
import { TCard } from '@/types/player';

import ErrorBoundary from '@/components/error/ErrorBoundary';
import SectionLayout from '@/components/player/common/SectionLayout';
import CardArea from '@/components/player/common/CardArea';
import CardItem from '@/components/player/common/CardItem';
import CardError from '@/components/player/common/CardError';
import CardSkeleton from '@/components/player/common/CardSkeleton';
import SearchInput from '@/components/common/ui/SearchInput';

const HitterPage = () => {
  const [filteredSearch, setFilteredSearch] = useState<TCard[]>([]);

  const {
    data: catcherData,
    isLoading: isCatcherDataLoading,
    isError: isCatcherDataError,
  } = useAxios<TCard[]>({
    method: 'GET',
    url: `player/catcherlist`,
    initialData: [],
    shouldFetchOnMount: true,
  });

  const {
    data: infielderData,
    isLoading: isInfielderDataLoading,
    isError: isInfielderDataError,
  } = useAxios<TCard[]>({
    method: 'GET',
    url: `player/infielderlist`,
    initialData: [],
    shouldFetchOnMount: true,
  });

  const {
    data: outfielderData,
    isLoading: isOutfielderDataLoading,
    isError: isOutfielderDataError,
  } = useAxios<TCard[]>({
    method: 'GET',
    url: `player/outfielderlist`,
    initialData: [],
    shouldFetchOnMount: true,
  });

  const hitterData = [...catcherData, ...infielderData, ...outfielderData];

  const handleSearch = (searchTerm: string) => {
    const sanitizedSearchTerm = searchTerm.replace(/\s+/g, '');
    const results = (hitterData as TCard[]).filter((item) =>
      item.playerName.includes(sanitizedSearchTerm),
    );
    setFilteredSearch(results);
  };

  const selectOptions = ['이름'];

  const getTypeFromPosition = (position: string) => {
    switch (position) {
      case '포수':
        return 'catcher';
      case '내야수':
        return 'infielder';
      case '외야수':
        return 'outfielder';
      default:
        return 'catcher';
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <SearchInput
          onSearch={handleSearch}
          showSelect={true}
          selectOptions={selectOptions}
        />
      </div>

      {filteredSearch.length > 0 ? (
        <SectionLayout title="타자">
          <ErrorBoundary fallback={<CardError />}>
            <CardArea isError={isCatcherDataError}>
              {filteredSearch.map((item, index) => (
                <CardItem
                  key={index}
                  items={item}
                  type={getTypeFromPosition(item.position)}
                />
              ))}
            </CardArea>
          </ErrorBoundary>
        </SectionLayout>
      ) : (
        <>
          <SectionLayout title="포수">
            {isCatcherDataLoading ? (
              <CardSkeleton />
            ) : (
              <ErrorBoundary fallback={<CardError />}>
                <CardArea isError={isCatcherDataError}>
                  {catcherData.map((item, index) => (
                    <CardItem
                      key={index}
                      items={item}
                      type={getTypeFromPosition(item.position)}
                    />
                  ))}
                </CardArea>
              </ErrorBoundary>
            )}
          </SectionLayout>
          <br />
          <SectionLayout title="내야수">
            {isInfielderDataLoading ? (
              <CardSkeleton />
            ) : (
              <ErrorBoundary fallback={<CardError />}>
                <CardArea isError={isInfielderDataError}>
                  {infielderData.map((item, index) => (
                    <CardItem
                      key={index}
                      items={item}
                      type={getTypeFromPosition(item.position)}
                    />
                  ))}
                </CardArea>
              </ErrorBoundary>
            )}
          </SectionLayout>
          <br />
          <SectionLayout title="외야수">
            {isOutfielderDataLoading ? (
              <CardSkeleton />
            ) : (
              <ErrorBoundary fallback={<CardError />}>
                <CardArea isError={isOutfielderDataError}>
                  {outfielderData.map((item, index) => (
                    <CardItem
                      key={index}
                      items={item}
                      type={getTypeFromPosition(item.position)}
                    />
                  ))}
                </CardArea>
              </ErrorBoundary>
            )}
          </SectionLayout>
        </>
      )}
    </>
  );
};
export default HitterPage;
