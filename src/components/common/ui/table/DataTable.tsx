import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@/utils/cn';
import DataTableSkeleton from './DataTableSkeleton';

type CellValue = string | number | boolean | null | undefined;

type DataTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T, CellValue>[];
  containerClassName?: string;
  headerRowClassName?: string;
  headerCellClassName?: string;
  bodyClassName?: string;
  bodyCellClassName?: string;
  highlightCondition?: (row: T) => boolean;
  isLoading?: boolean;
  noResultMsg?: string;
};

const DataTable = <T extends object>({
  data,
  columns,
  containerClassName,
  headerRowClassName,
  headerCellClassName,
  bodyClassName,
  bodyCellClassName,
  highlightCondition,
  isLoading = false,
  noResultMsg = '검색 결과가 없습니다',
}: DataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return isLoading ? (
    <DataTableSkeleton rows={10} columns={columns.length} />
  ) : (
    <div className={cn('overflow-hidden rounded-t-md', containerClassName)}>
      <div className="max-h-[400px] overflow-x-auto">
        <table className="relative min-w-full">
          <thead className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={cn(
                  'bg-kt-red-2 bg-opacity-40 text-base text-white backdrop-blur-md',
                  headerRowClassName,
                )}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      'sticky top-0 px-3 py-3',
                      headerCellClassName,
                    )}
                  >
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
          <tbody
            className={cn('text-sm font-light text-gray-100', bodyClassName)}
          >
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="rounded-md border-gray-600 bg-kt-gray-1 bg-opacity-80 py-3 text-center text-gray-400"
                >
                  {noResultMsg}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'whitespace-nowrap px-3 py-3',
                        index === 0 &&
                          'bg-kt-gray-1 bg-opacity-80 font-extrabold',
                        bodyCellClassName,
                        highlightCondition && highlightCondition(row.original)
                          ? 'bg-kt-red-2 font-extrabold opacity-80'
                          : '',
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { DataTable };
