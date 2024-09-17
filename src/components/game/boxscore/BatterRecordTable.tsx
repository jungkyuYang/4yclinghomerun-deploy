import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { BattersType } from '@/types/BoxScoreType';
import { cn } from '@/utils/cn';

type BatterRecordTableProps = {
  data: BattersType[];
};

const columnHelper = createColumnHelper<BattersType>();

const columns = [
  columnHelper.accessor('oneturn', {
    cell: (info) => info.getValue(),
    header: () => '타순',
  }),
  columnHelper.accessor('position', {
    cell: (info) => info.getValue(),
    header: () => '포지션',
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: () => '선수명',
  }),
  ...Array.from({ length: 9 }, (_, i) =>
    columnHelper.accessor(`inn${i + 1}` as keyof BattersType, {
      cell: (info) => info.getValue(),
      header: () => `${i + 1}회`,
    }),
  ),
  columnHelper.accessor('ab', {
    cell: (info) => info.getValue(),
    header: () => '타수',
  }),
  columnHelper.accessor('run', {
    cell: (info) => info.getValue(),
    header: () => '득점',
  }),
  columnHelper.accessor('hit', {
    cell: (info) => info.getValue(),
    header: () => '안타',
  }),
  columnHelper.accessor('rbi', {
    cell: (info) => info.getValue(),
    header: () => '타점',
  }),
  columnHelper.accessor(
    (row) => {
      const battingAvg = row.accmHit / row.accmAb;
      return isNaN(battingAvg) ? '-' : battingAvg.toFixed(3);
    },
    {
      id: 'battingAvg',
      cell: (info) => info.getValue(),
      header: () => '타율',
    },
  ),
];

const BatterRecordTable = ({ data }: BatterRecordTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md bg-kt-gray-1">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-kt-red-2 text-base text-white"
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
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={cn(
                      'whitespace-nowrap border-b border-gray-600 px-3 py-3 text-center',
                      rowIndex === table.getRowModel().rows.length - 1 &&
                        'border-b-0',
                    )}
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

export default BatterRecordTable;
