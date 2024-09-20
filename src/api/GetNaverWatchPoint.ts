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

const currentSeasonStatsInitialState: WatchPointPitcherStatType = {
  bb: 0,
  er: 0,
  era: '',
  gday: '',
  hit: 0,
  hr: 0,
  inn2: '',
  kk: 0,
  l: 0,
  s: 0,
  teamName: '',
  teamCode: '',
  w: 0,
  whip: '',
};

const currentSeasonStatsOnOpponentsInitialState: PitcherStatOnOpponentType = {
  l: 0,
  s: 0,
  w: 0,
  inn: '',
  kk: 0,
  era: '',
  gameCount: 0,
  er: 0,
};

const pitcherInfoInitialState: PitchInfoType = {
  backnum: '',
  birth: '',
  height: '',
  hitType: '',
  name: '',
  pCode: '',
  weight: '',
};

const GetNaverWatchPoint = (gmkey: string) => {
  const { data, isLoading, isError, error } =
    useAxios<GetNaverWatchPointResponse>({
      method: 'GET',
      url: `/game/navergameinfo?gmkey=${gmkey}`,
      initialData: {
        result: {
          previewData: {
            homeStarter: {
              currentPitKindStats: [],
              currentSeasonStats: currentSeasonStatsInitialState,
              currentSeasonStatsOnOpponents:
                currentSeasonStatsOnOpponentsInitialState,
              playerInfo: pitcherInfoInitialState,
            },
            awayStarter: {
              currentPitKindStats: [],
              currentSeasonStats: currentSeasonStatsInitialState,
              currentSeasonStatsOnOpponents:
                currentSeasonStatsOnOpponentsInitialState,
              playerInfo: pitcherInfoInitialState,
            },
          },
        },
      },
      shouldFetchOnMount: !!gmkey,
    });

  return {
    data,
    error,
    isLoading,
    isError,
  };
};

export { GetNaverWatchPoint };
