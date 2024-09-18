import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { cn } from '@/utils/cn';

type CellValue = string | number | boolean | null | undefined;

type DataTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T, CellValue>[];
  containerClassName?: string;
  headerRowClassName?: string;
  headerCellClassName?: string;
  bodyClassName?: string;
  bodyCellClassName?: string;
};

const DataTable = <T extends object>({
  data,
  columns,
  containerClassName,
  headerRowClassName,
  headerCellClassName,
  bodyClassName,
  bodyCellClassName,
}: DataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn('overflow-hidden rounded-t-md', containerClassName)}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={cn(
                  'bg-kt-red-2 bg-opacity-40 text-base text-white',
                  headerRowClassName,
                )}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn('px-3 py-3', headerCellClassName)}
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={cn(
                      'whitespace-nowrap px-3 py-3',
                      index === 0 &&
                        'bg-kt-gray-1 bg-opacity-80 font-extrabold',
                      bodyCellClassName,
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

export { DataTable };
