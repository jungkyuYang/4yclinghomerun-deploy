import { create } from 'zustand';

import {
  WatchPointGameScoreType,
  WatchPointPlayerLineupType,
  PitchInfoType,
  TopPlayerInfoType,
} from '@/types/WatchPointType';

type LineupStore = {
  homeLineup: WatchPointPlayerLineupType[];
  visitLineup: WatchPointPlayerLineupType[];
  gameInfo: WatchPointGameScoreType;
  homePitcherInfo: PitchInfoType;
  awayPitcherInfo: PitchInfoType;
  homeTopPlayerInfo: TopPlayerInfoType;
  awayTopPlayerInfo: TopPlayerInfoType;
  setLineupData: (data: Omit<LineupStore, 'setLineupData'>) => void; // 함수 설정하는 데에만 사용함. 함수 자체를 전달하고 싶지 않기 때문.
};

export const useLineupStore = create<LineupStore>((set) => ({
  homeLineup: [],
  visitLineup: [],
  gameInfo: {} as WatchPointGameScoreType,
  homePitcherInfo: {} as PitchInfoType,
  awayPitcherInfo: {} as PitchInfoType,
  homeTopPlayerInfo: {} as TopPlayerInfoType,
  awayTopPlayerInfo: {} as TopPlayerInfoType,
  setLineupData: (data) => set(data),
}));
