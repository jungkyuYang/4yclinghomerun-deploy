import { useEffect, useState } from 'react';

import useAxios from '@/hooks/useAxios';
import GameRankingSectionFrame from '@/components/game/GameRankingSectionFrame';
import {
  APIGameCrowdRankingData,
  TGameCrowdRankingData,
} from '@/types/GameCrowdRanking';
import GameCrowdRankingGraph from '@/components/game/ranking/crowd/GameCrowdRankingGraph';
import GameCrowdRankingSelectYear from '@/components/game/ranking/crowd/GameCrowdRankingSelectYear';

const GameCrowdRanking = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [isOpenSelectYears, setIsOpenSelectYears] = useState<boolean>(false);
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const generatedYears: number[] = [];
    for (let year = new Date().getFullYear(); year >= 2019; year--) {
      generatedYears.push(year);
    }
    setYears(generatedYears);
  }, [selectedYear]);

  const handlePreviousYear = () => {
    if (selectedYear <= 2019) return;
    setSelectedYear((prev) => prev - 1);
  };

  const handleNextYear = () => {
    if (selectedYear >= new Date().getFullYear()) return;
    setSelectedYear((prev) => prev + 1);
  };

  const handleOpenSelectYear = () => {
    setIsOpenSelectYears((isOpenSelectYears) => !isOpenSelectYears);
  };

  // 연도 선택 핸들러
  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setIsOpenSelectYears((isOpenSelectYears) => !isOpenSelectYears);
  };

  const {
    data: GameCrowdRankingTotalData,
    isLoading,
    isError,
    error,
  } = useAxios<APIGameCrowdRankingData, TGameCrowdRankingData[]>({
    url: `/game/rank/crowd?gyear=${selectedYear}`,
    method: 'GET',
    initialData: { data: { list: [] } },
    shouldFetchOnMount: true,
    processData: (data: APIGameCrowdRankingData) => data.data.list,
  });

  // 데이터를 받기 전이거나 처리 중일 때는 로딩 처리
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // 에러가 발생했거나 데이터가 배열이 아닌 경우 에러 처리
  if (isError || !Array.isArray(GameCrowdRankingTotalData)) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      <GameCrowdRankingSelectYear
        selectedYear={selectedYear}
        isOpenSelectYears={isOpenSelectYears}
        years={years}
        handleNextYear={handleNextYear}
        handleOpenSelectYears={handleOpenSelectYear}
        handlePreviousYear={handlePreviousYear}
        handleYearClick={handleYearClick}
      />
      <GameRankingSectionFrame
        title={`${selectedYear} 시즌 누적관중`}
        height="h-[50vh]"
        type="graph"
      >
        {/* <div>{JSON.stringify(GameCrowdRankingTotalData)}</div> */}
        <GameCrowdRankingGraph graphInfo={GameCrowdRankingTotalData} />
      </GameRankingSectionFrame>
    </div>
  );
};
export default GameCrowdRanking;
