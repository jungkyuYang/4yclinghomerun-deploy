export type TGameCrowdRankingSelectYearProps = {
  selectedYear: number;
  isOpenSelectYears: boolean;
  years: number[];
  handlePreviousYear: () => void;
  handleNextYear: () => void;
  handleOpenSelectYears: () => void;
  handleYearClick: (year: number) => void;
};

export type TGameCrowdRankingGraph = {
  crowd: number;
  teamName: string;
};

export type APIGameCrowdRankingData = {
  data: { list: TGameCrowdRankingData[] };
};

export type TGameCrowdRankingData = {
  crowd: number;
  game: number;
  teamCode: string;
  teamName: string;
};
