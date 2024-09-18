import useAxios from '@/hooks/useAxios';

import {
  APIGameTeamRankingGraph,
  TGameTeamRankingGraph,
} from '@/types/GameTeamRanking';
import GameTeamRankingGraph from '@/components/game/ranking/team/GameTeamRankingGraph';
import GameRankingSectionFrame from '@/components/game/GameRankingSectionFrame';

const GameTeamRanking = () => {
  const {
    data: GameTeamRankingTotalData,
    isLoading,
    isError,
    error,
  } = useAxios<APIGameTeamRankingGraph, TGameTeamRankingGraph[]>({
    url: '/game/rank/periodteamrank',
    method: 'GET',
    initialData: { data: { list: [] } },
    shouldFetchOnMount: true,
    processData: (data: APIGameTeamRankingGraph) => data.data.list,
  });

  // 데이터를 받기 전이거나 처리 중일 때는 로딩 처리
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // 에러가 발생했거나 데이터가 배열이 아닌 경우 에러 처리
  if (isError || !Array.isArray(GameTeamRankingTotalData)) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      <GameRankingSectionFrame
        title="2024 시즌 팀 순위"
        height="h-[50vh]"
        type="graph"
      >
        <GameTeamRankingGraph graphInfo={GameTeamRankingTotalData} />
      </GameRankingSectionFrame>
    </div>
  );
};
export default GameTeamRanking;
