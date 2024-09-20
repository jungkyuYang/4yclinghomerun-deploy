import { useAxios } from '@/hooks/useAxios';

import {
  WatchPointPitcherStatType,
  PitcherStatOnOpponentType,
  PitchKindStatType,
  PitchInfoType,
} from '@/types/WatchPointType';

interface NaverWatchPointData {
  currentPitKindStats: PitchKindStatType[];
  currentSeasonStats: WatchPointPitcherStatType;
  currentSeasonStatsOnOpponents: PitcherStatOnOpponentType;
  playerInfo: PitchInfoType;
}

interface GetNaverWatchPointResponse {
  result: {
    previewData: {
      homeStarter: NaverWatchPointData;
      awayStarter: NaverWatchPointData;
    };
  };
}

const GetNaverWatchPoint = (gmkey: string) => {
  const processData = (data: GetNaverWatchPointResponse) => {
    const { homeStarter, awayStarter } = data.result.previewData;
    return {
      home: {
        currentPitKindStats: homeStarter.currentPitKindStats,
        currentSeasonStats: homeStarter.currentSeasonStats,
        currentSeasonStatsOnOpponents:
          homeStarter.currentSeasonStatsOnOpponents,
        playerInfo: homeStarter.playerInfo,
      },
      away: {
        currentPitKindStats: awayStarter.currentPitKindStats,
        currentSeasonStats: awayStarter.currentSeasonStats,
        currentSeasonStatsOnOpponents:
          awayStarter.currentSeasonStatsOnOpponents,
        playerInfo: awayStarter.playerInfo,
      },
    };
  };

  return useAxios<GetNaverWatchPointResponse, ReturnType<typeof processData>>({
    method: 'GET',
    url: `/game/navergameinfo?gmkey=${gmkey}`,
    initialData: {
      result: {
        previewData: {
          homeStarter: {
            currentPitKindStats: [],
            currentSeasonStats: {} as WatchPointPitcherStatType,
            currentSeasonStatsOnOpponents: {} as PitcherStatOnOpponentType,
            playerInfo: {} as PitchInfoType,
          },
          awayStarter: {
            currentPitKindStats: [],
            currentSeasonStats: {} as WatchPointPitcherStatType,
            currentSeasonStatsOnOpponents: {} as PitcherStatOnOpponentType,
            playerInfo: {} as PitchInfoType,
          },
        },
      },
    },
    shouldFetchOnMount: !!gmkey,
    processData,
  });
};

export { GetNaverWatchPoint };
