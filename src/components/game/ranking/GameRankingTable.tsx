import { DataTable } from '@/ui/table/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import GameRankingSectionFrame from '../GameRankingSectionFrame';

interface WithTeamName {
  teamName: string;
}

interface GameRankingTableProps<T extends WithTeamName> {
  title: string;
  tableInfo: T[];
  columns: ColumnDef<T>[];
}

const GameRankingTable = <T extends WithTeamName>({
  title,
  tableInfo,
  columns,
}: GameRankingTableProps<T>) => {
  const isHighlighted = (row: T) => row.teamName === 'KT';

  return (
    <GameRankingSectionFrame title={title} height="h-[50vh]" type="table">
      <DataTable
        data={tableInfo}
        columns={columns}
        bodyCellClassName="border-b border-gray-600 text-center"
        highlightCondition={isHighlighted}
      />
    </GameRankingSectionFrame>
  );
};

export default GameRankingTable;
