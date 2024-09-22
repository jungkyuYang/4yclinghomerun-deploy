import { useAxios } from '@/hooks/useAxios';

import {
  APITeamRankingBatterTable,
  APITeamRankingGraph,
  APITeamRankingPitcherTable,
  APITeamRankingTeamVSTable,
  APITeamRankingYearTable,
  TTeamRankingBatterTable,
  TTeamRankingGraph,
  TTeamRankingPitcherTable,
  TTeamRankingTeamVSTable,
  TTeamRankingYearTable,
} from '@/types/GameTeamRanking';
import GameTeamRankingBarGraph from '@/components/game/ranking/team/GameTeamRankingBarGraph';
import GameRankingSectionFrame from '@/components/game/GameRankingSectionFrame';
import { teamRankingPitcherColumns } from '@/data/TeamRankingPitcherTableData';
import { teamRankingYearColumns } from '@/data/TeamRankingYearTableData';
import GameRankingTable from '@/components/game/ranking/GameRankingTable';
import { teamRankingBatterColumns } from '@/data/TeamRankingBatterTableData';
import GameTeamRankingPieGraphFrame from '@/components/game/ranking/team/GameTeamRankingPieGraphFrame';
import GameTeamRankingTitle from '@/components/game/ranking/team/GameTeamRankingTitle';

const TeamRankingPage = () => {
  const {
    data: TeamRankingGraphData,
    isLoading: isGraphLoading,
    isError: isGraphError,
    error: graphError,
  } = useAxios<APITeamRankingGraph, TTeamRankingGraph[]>({
    url: '/game/rank/periodteamrank',
    method: 'GET',
    initialData: { data: { list: [] } },
    shouldFetchOnMount: true,
    processData: (data: APITeamRankingGraph) => data.data.list,
  });

  const {
    data: TeamRankingYearTableData,
    // isLoading: isYearTableLoading,
    // isError: isYearTableError,
    // error: yearTableError,
  } = useAxios<APITeamRankingYearTable, TTeamRankingYearTable[]>({
    url: '/game/teamrankbyyear',
    method: 'GET',
    initialData: { data: { list: [] } },
    shouldFetchOnMount: true,
    processData: (data: APITeamRankingYearTable) => data.data.list,
  });

  const {
    data: TeamRankingPitcherTableData,
    // isLoading: isPitcherTableLoading,
    // isError: isPitcherTableError,
    // error: picherTableError,
  } = useAxios<APITeamRankingPitcherTable, TTeamRankingPitcherTable[]>({
    url: '/game/rank/pitching',
    method: 'GET',
    initialData: { data: { list: [] } },
    shouldFetchOnMount: true,
    processData: (data: APITeamRankingPitcherTable) => data.data.list,
  });

  const {
    data: TeamRankingBatterTableData,
    // isLoading: isBatterTableLoading,
    // isError: isBatterTableError,
    // error: batterTableError,
  } = useAxios<APITeamRankingBatterTable, TTeamRankingBatterTable[]>({
    url: '/game/rank/batting',
    method: 'GET',
    initialData: { data: { list: [] } },
    shouldFetchOnMount: true,
    processData: (data: APITeamRankingBatterTable) => data.data.list,
  });

  const {
    data: TeamRankingTeamVSTableData,
    // isLoading: isTeamVSTableLoading,
    // isError: isTeamVSTableError,
    // error: teamVSTableError,
  } = useAxios<APITeamRankingTeamVSTable, TTeamRankingTeamVSTable[]>({
    url: '/game/rank/teamvs',
    method: 'GET',
    initialData: { data: { list: [] } },
    shouldFetchOnMount: true,
    processData: (data: APITeamRankingTeamVSTable) =>
      data.data.list.filter((item) => item.teamCode === 'KT'),
  });

  // 데이터를 받기 전이거나 처리 중일 때는 로딩 처리
  if (isGraphLoading) {
    return <p>Loading...</p>;
  }

  // 에러가 발생했거나 데이터가 배열이 아닌 경우 에러 처리
  if (
    isGraphError ||
    !Array.isArray(TeamRankingGraphData) ||
    !Array.isArray(TeamRankingPitcherTableData) ||
    !Array.isArray(TeamRankingBatterTableData)
  ) {
    return <p>Error: {graphError}</p>;
  }
  return (
    <div className="flex flex-col gap-10">
      <GameRankingSectionFrame
        title="2024 시즌 팀 순위"
        height="h-[50vh]"
        type="graph"
      >
        <GameTeamRankingBarGraph graphInfo={TeamRankingGraphData} />
      </GameRankingSectionFrame>
      {Array.isArray(TeamRankingYearTableData) && (
        <GameRankingTable<TTeamRankingYearTable>
          title="2024 시즌 팀 기록"
          tableInfo={TeamRankingYearTableData}
          columns={teamRankingYearColumns}
        />
      )}
      {Array.isArray(TeamRankingPitcherTableData) && (
        <GameRankingTable<TTeamRankingPitcherTable>
          title="2024 시즌 팀 투수 기록"
          tableInfo={TeamRankingPitcherTableData}
          columns={teamRankingPitcherColumns}
        />
      )}
      {Array.isArray(TeamRankingBatterTableData) && (
        <GameRankingTable<TTeamRankingBatterTable>
          title="2024 시즌 팀 타자 기록"
          tableInfo={TeamRankingBatterTableData}
          columns={teamRankingBatterColumns}
        />
      )}
      {Array.isArray(TeamRankingTeamVSTableData) && (
        <div>
          <GameTeamRankingTitle title="2024 시즌 팀 간 승패" />
          <GameTeamRankingPieGraphFrame
            graphInfo={TeamRankingTeamVSTableData}
          />
        </div>
      )}
    </div>
  );
};
export default TeamRankingPage;
