export type TWizNewsItem = {
  updDttm: number;
  imgFilePath?: string;
  artcTitle: string;
  artcContents: string;
  viewCnt: number;
};

export type TNaverNewsItem = {
  aid: number;
  officeName: string;
  title: string;
  subContent: string;
  datetime: string;
  thumbnail: string;
  totalCount: number;
};
