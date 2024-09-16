// 박스스코어 스케줄 타입
export type BoxScoreGameScheduleType = {
  broadcast: string;
  cancelFlag: string; // '0' | '1'?
  crowdCn: number;
  endFlag: string;
  gameDate: number;
  gday: number;
  gmkey: string;
  gmonth: number;
  gtime: string;
  gyear: string;
  home: string;
  homeKey: string;
  hscore: number;
  stadium: string;
  stadiumKey: string;
  visit: string;
  visitKey: string;
  vscore: number;
};

// 박스스코어 scoreboard 타입
export type BoxScoreScoreBoardType = {
  ballfour: string;
  bhome: number;
  bhomeName: string;
  error: string;
  gameDate: number;
  hit: string;
  run: string;
  score1: string;
  score10: string;
  score11: string;
  score12: string;
  score2: string;
  score3: string;
  score4: string;
  score5: string;
  score6: string;
  score7: string;
  score8: string;
  score9: string;
};
