export type ScheduleData = {
  place: string;
  date: string;
  time: string;
  homeTeamImage: string;
  awayTeamImage: string;
  homeTeamName: string;
  awayTeamName: string;
};

export type ScheduleItems = {
  schedules: ScheduleData[];
};

export type KtWizMonthSchedule = {
  broadcast: string;
  displayDate: string;
  matchTeamName: string;
  gameDate: number;
  gtime: string;
  gmkey: string;
  home: string;
  homeKey: string;
  homeLogo: string;
  homeScore: number;
  visit: string;
  visitKey: string;
  visitLogo: string;
  visitScore: number;
  stadium: string;
  outcome: '승' | '패' | '무' | '취';
};
