import { useAxios } from '@/hooks/useAxios';

import {
  BoxScoreGameScheduleType,
  BoxScoreScoreBoardType,
} from '@/types/BoxScoreType';

interface BoxScoreData {
  schedule: {
    current: BoxScoreGameScheduleType;
    next: BoxScoreGameScheduleType;
    prev: BoxScoreGameScheduleType;
  };
  scoreboard: BoxScoreScoreBoardType[];
}

interface GetBoxScoreResponse {
  data: BoxScoreData;
}

const scheduleInitialState: BoxScoreGameScheduleType = {
  broadcast: '',
  cancelFlag: '',
  crowdCn: 0,
  endFlag: '',
  gameDate: 0,
  gday: 0,
  gmkey: '',
  gmonth: 0,
  gtime: '',
  gyear: '',
  home: '',
  homeKey: '',
  hscore: 0,
  stadium: '',
  stadiumKey: '',
  visit: '',
  visitKey: '',
  vscore: 0,
};

const GetBoxScore = (gameDate: number, gmkey: string) => {
  const { data, isLoading, isError, error } = useAxios<GetBoxScoreResponse>({
    method: 'GET',
    url: `/game/boxscore?gameDate=${gameDate}&gmkey=${gmkey}`,
    initialData: {
      data: {
        schedule: {
          current: scheduleInitialState,
          next: scheduleInitialState,
          prev: scheduleInitialState,
        },
        scoreboard: [],
      },
    },
    shouldFetchOnMount: true,
  });

  return { data, isLoading, isError, error };
};

export { GetBoxScore };
