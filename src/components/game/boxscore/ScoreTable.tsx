import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { BoxScoreScoreBoardType } from '@/types/BoxScoreType';

const columnHelper = createColumnHelper<BoxScoreScoreBoardType>(); // type-safe한 방식으로 column을 생성하기 위한 helper

// column 정의
const columns = [
  // columnHelper.accessor는 데이터 객체의 key를 받아 column을 생성함
  columnHelper.accessor('bhomeName', {
    cell: (info) => info.getValue(),
    header: () => '팀',
  }),
  ...Array.from({ length: 9 }, (_, i) =>
    columnHelper.accessor(`score${i + 1}` as keyof BoxScoreScoreBoardType, {
      cell: (info) => info.getValue(),
      header: () => `${i + 1}회`,
    }),
  ),
  columnHelper.accessor('run', {
    cell: (info) => info.getValue(),
    header: () => 'R',
  }),
  columnHelper.accessor('hit', {
    cell: (info) => info.getValue(),
    header: () => 'H',
  }),
  columnHelper.accessor('error', {
    cell: (info) => info.getValue(),
    header: () => 'E',
  }),
  columnHelper.accessor('ballfour', {
    cell: (info) => info.getValue(),
    header: () => 'B',
  }),
];

interface ScoreTableProps {
  scoreBoard: BoxScoreScoreBoardType[];
}

const ScoreTable = ({ scoreBoard }: ScoreTableProps) => {
  // useReactTable hook을 사용하여 table을 생성
  const table = useReactTable({
    data: scoreBoard,
    columns,
    getCoreRowModel: getCoreRowModel(), // 기본적인 행 모델 생성
  });

  return (
    <div className="overflow-hidden rounded-md bg-kt-gray-1">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-kt-red-2 text-base uppercase text-white"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-3 py-3 text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm font-light text-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap px-3 py-3 text-center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreTable;
