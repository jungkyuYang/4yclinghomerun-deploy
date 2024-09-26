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
} from '@/types/TeamRanking';
import TeamRankingBarGraph from '@/components/game/ranking/team/TeamRankingBarGraph';
import GameRankingSectionFrame from '@/components/game/GameRankingSectionFrame';
import GameRankingTable from '@/components/game/ranking/GameRankingTable';
import TeamRankingPieGraphFrame from '@/components/game/ranking/team/TeamRankingPieGraphFrame';
import SectionHeading from '@/components/common/typography/SectionHeading';
import { teamRankingPitcherColumns } from '@/data/TeamRankingPitcherTableData';
import { teamRankingYearColumns } from '@/data/TeamRankingYearTableData';
import { teamRankingBatterColumns } from '@/data/TeamRankingBatterTableData';
import BarGraphSkeleton from '@/components/game/ranking/BarGraphSkeleton';

const TeamRankingPage = () => {
  const { data: TeamRankingGraphData, delayLoading: isGraphLoading } = useAxios<
    APITeamRankingGraph,
    TTeamRankingGraph[]
  >({
    url: '/game/rank/periodteamrank',
    method: 'GET',
    initialData: { data: { list: [] } },
    shouldFetchOnMount: true,
    processData: (data: APITeamRankingGraph) => data.data.list,
  });

  const { data: TeamRankingYearTableData, delayLoading: isYearTableLoading } =
    useAxios<APITeamRankingYearTable, TTeamRankingYearTable[]>({
      url: '/game/teamrankbyyear',
      method: 'GET',
      initialData: { data: { list: [] } },
      shouldFetchOnMount: true,
      processData: (data: APITeamRankingYearTable) => data.data.list,
    });

  const {
    data: TeamRankingPitcherTableData,
    delayLoading: isPitcherTableLoading,
  } = useAxios<APITeamRankingPitcherTable, TTeamRankingPitcherTable[]>({
    url: '/game/rank/pitching',
    method: 'GET',
    initialData: { data: { list: [] } },
    shouldFetchOnMount: true,
    processData: (data: APITeamRankingPitcherTable) => data.data.list,
  });

  const {
    data: TeamRankingBatterTableData,
    delayLoading: isBatterTableLoading,
  } = useAxios<APITeamRankingBatterTable, TTeamRankingBatterTable[]>({
    url: '/game/rank/batting',
    method: 'GET',
    initialData: { data: { list: [] } },
    shouldFetchOnMount: true,
    processData: (data: APITeamRankingBatterTable) => data.data.list,
  });

  const {
    data: TeamRankingTeamVSTableData,
    delayLoading: isTeamVSTableLoading,
  } = useAxios<APITeamRankingTeamVSTable, TTeamRankingTeamVSTable[]>({
    url: '/game/rank/teamvs',
    method: 'GET',
    initialData: { data: { list: [] } },
    shouldFetchOnMount: true,
    processData: (data: APITeamRankingTeamVSTable) =>
      data.data.list.filter((item) => item.teamCode === 'KT'),
  });

  if (
    !Array.isArray(TeamRankingGraphData) ||
    !Array.isArray(TeamRankingPitcherTableData) ||
    !Array.isArray(TeamRankingBatterTableData) ||
    !Array.isArray(TeamRankingYearTableData) ||
    !Array.isArray(TeamRankingTeamVSTableData)
  ) {
    return <p>Error</p>;
  }
  return (
    <div className="flex flex-col gap-10">
      <GameRankingSectionFrame
        title="2024 시즌 팀 순위"
        height="h-[50vh]"
        type="graph"
      >
        {isGraphLoading ? (
          <BarGraphSkeleton />
        ) : (
          <TeamRankingBarGraph graphInfo={TeamRankingGraphData} />
        )}
      </GameRankingSectionFrame>
      <GameRankingTable<TTeamRankingYearTable>
        title="2024 시즌 팀 기록"
        tableInfo={TeamRankingYearTableData}
        columns={teamRankingYearColumns}
        isLoading={isYearTableLoading}
      />
      <GameRankingTable<TTeamRankingPitcherTable>
        title="2024 시즌 팀 투수 기록"
        tableInfo={TeamRankingPitcherTableData}
        columns={teamRankingPitcherColumns}
        isLoading={isPitcherTableLoading}
      />
      <GameRankingTable<TTeamRankingBatterTable>
        title="2024 시즌 팀 타자 기록"
        tableInfo={TeamRankingBatterTableData}
        columns={teamRankingBatterColumns}
        isLoading={isBatterTableLoading}
      />
      <div>
        <SectionHeading title="2024 시즌 팀 간 승패" />
        <TeamRankingPieGraphFrame
          graphInfo={TeamRankingTeamVSTableData}
          isLoading={isTeamVSTableLoading}
        />
      </div>
    </div>
  );
};
export default TeamRankingPage;
