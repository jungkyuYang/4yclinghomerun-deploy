import { useAxios } from '@/hooks/useAxios';

import {
  WatchPointGameScoreType,
  WatchPointScheduleType,
  WatchPointTeamRankType,
  WatchPointVsRecordType,
} from '@/types/WatchPointType';

interface WatchPointData {
  gameScore: WatchPointGameScoreType;
  schedule: {
    current: WatchPointScheduleType;
    next: WatchPointScheduleType;
    prev: WatchPointScheduleType;
  };
  homeTeamRank: WatchPointTeamRankType;
  visitTeamRank: WatchPointTeamRankType;
  homeTeamWinLose: WatchPointVsRecordType;
  visitTeamWinLose: WatchPointVsRecordType;
}

interface GetWatchPointResponse {
  data: WatchPointData;
}

interface ProcessedWatchPointData {
  gameScore: WatchPointGameScoreType;
  schedule: {
    current: WatchPointScheduleType;
    next: WatchPointScheduleType | null;
    prev: WatchPointScheduleType | null;
  };
  homeTeam: {
    rank: WatchPointTeamRankType;
    vsRecord: WatchPointVsRecordType;
  };
  visitTeam: {
    rank: WatchPointTeamRankType;
    vsRecord: WatchPointVsRecordType;
  };
}

const GetWatchPoint = (gameDate: number, gmkey: string) => {
  const processData = (
    data: GetWatchPointResponse,
  ): ProcessedWatchPointData => {
    return {
      gameScore: data.data.gameScore,
      schedule: {
        current: data.data.schedule.current,
        next: data.data.schedule.next || null,
        prev: data.data.schedule.prev || null,
      },
      homeTeam: {
        rank: data.data.homeTeamRank,
        vsRecord: data.data.homeTeamWinLose,
      },
      visitTeam: {
        rank: data.data.visitTeamRank,
        vsRecord: data.data.visitTeamWinLose,
      },
    };
  };

  return useAxios<GetWatchPointResponse, ProcessedWatchPointData>({
    method: 'GET',
    url: `/game/watchpoint?gameDate=${gameDate}&gmkey=${gmkey}`,
    initialData: {
      data: {
        gameScore: {} as WatchPointGameScoreType,
        schedule: {
          current: {} as WatchPointScheduleType,
          next: {} as WatchPointScheduleType,
          prev: {} as WatchPointScheduleType,
        },
        homeTeamRank: {} as WatchPointTeamRankType,
        visitTeamRank: {} as WatchPointTeamRankType,
        homeTeamWinLose: {} as WatchPointVsRecordType,
        visitTeamWinLose: {} as WatchPointVsRecordType,
      },
    },
    shouldFetchOnMount: !!gameDate || !!gmkey,
    processData,
  });
};

export { GetWatchPoint };
