import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { EtcGamesType } from '@/types/BoxScoreType';
import { cn } from '@/utils/cn';

type MainRecordTableProps = {
  etcgames: EtcGamesType[];
};

const columnHelper = createColumnHelper<EtcGamesType>();

const columns = [
  columnHelper.accessor('how', {
    cell: (info) => info.getValue(),
    header: () => '구분',
  }),
  columnHelper.accessor('result', {
    cell: (info) => info.getValue(),
    header: () => '내용',
  }),
];

const MainRecordTable = ({ etcgames }: MainRecordTableProps) => {
  const table = useReactTable({
    data: etcgames,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md bg-kt-gray-2">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-kt-black-5 text-base text-white"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-3 text-left">
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
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={cn(
                      'whitespace-nowrap border-b px-6 py-4',
                      index === 0 && 'bg-kt-gray-1 font-extrabold',
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

export default MainRecordTable;
