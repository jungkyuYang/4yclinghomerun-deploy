export type TGameTeamRankingGraph = {
  date: string;
  rank: number;
};

export type APIGameTeamRankingGraph = {
  data: { list: TGameTeamRankingGraph[] };
};
