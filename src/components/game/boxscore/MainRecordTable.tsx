import { createColumnHelper, ColumnDef } from '@tanstack/react-table';

import { EtcGamesType } from '@/types/BoxScoreType';
import { DataTable } from '@/components/common/ui/table/DataTable';

type MainRecordTableProps = {
  etcgames: EtcGamesType[];
  isLoading?: boolean;
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
] as ColumnDef<EtcGamesType>[];

const MainRecordTable = ({ etcgames, isLoading }: MainRecordTableProps) => {
  return (
    <DataTable
      data={etcgames}
      columns={columns}
      bodyCellClassName="border-b border-gray-600"
      headerCellClassName="text-left"
      isLoading={isLoading}
    />
  );
};

export default MainRecordTable;
