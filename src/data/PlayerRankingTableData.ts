import { TPlayerRankingTable } from '@/types/GamePlayerRanking ';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<TPlayerRankingTable>();

export const playerColumns = [
  columnHelper.accessor('playerName', {
    cell: (info) => info.getValue(),
    header: '선수명',
  }),
  columnHelper.accessor('teamName', {
    cell: (info) => info.getValue(),
    header: '팀명',
  }),
  columnHelper.accessor('era', {
    cell: (info) => info.getValue(),
    header: '평균자책점',
    sortDescFirst: true,
  }),
  columnHelper.accessor('gamenum', {
    cell: (info) => info.getValue(),
    header: '경기',
    sortDescFirst: true,
  }),
  columnHelper.accessor('w', {
    cell: (info) => info.getValue(),
    header: '승',
    sortDescFirst: true,
  }),
  columnHelper.accessor('l', {
    cell: (info) => info.getValue(),
    header: '패',
    sortDescFirst: true,
  }),
  columnHelper.accessor('sv', {
    cell: (info) => info.getValue(),
    header: '세이브',
    sortDescFirst: true,
  }),
  columnHelper.accessor('hold', {
    cell: (info) => info.getValue(),
    header: '홀드',
    sortDescFirst: true,
  }),
  columnHelper.accessor('wra', {
    cell: (info) => info.getValue(),
    header: '승률',
    sortDescFirst: true,
  }),
  columnHelper.accessor('inn', {
    cell: (info) => info.getValue(),
    header: '이닝',
    sortDescFirst: true,
  }),
  columnHelper.accessor('hit', {
    cell: (info) => info.getValue(),
    header: '피안타',
    sortDescFirst: true,
  }),
  columnHelper.accessor('hr', {
    cell: (info) => info.getValue(),
    header: '피홈런',
    sortDescFirst: true,
  }),
  columnHelper.accessor('bb', {
    cell: (info) => info.getValue(),
    header: '볼넷',
    sortDescFirst: true,
  }),
  columnHelper.accessor('hp', {
    cell: (info) => info.getValue(),
    header: '사구',
    sortDescFirst: true,
  }),
  columnHelper.accessor('kk', {
    cell: (info) => info.getValue(),
    header: '탈삼진',
    sortDescFirst: true,
  }),
  columnHelper.accessor('r', {
    cell: (info) => info.getValue(),
    header: '실점',
    sortDescFirst: true,
  }),
  columnHelper.accessor('er', {
    cell: (info) => info.getValue(),
    header: '자책점',
    sortDescFirst: true,
  }),
] as ColumnDef<TPlayerRankingTable>[];
