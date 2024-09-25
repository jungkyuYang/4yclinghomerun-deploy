import { TTeamRankingTeamVSTable } from '@/types/GameTeamRanking';
import GameTeamRankingPieGraph from './GameTeamRankingPieGraph';

const GameTeamRankingPieGraphFrame = ({
  graphInfo,
}: {
  graphInfo: TTeamRankingTeamVSTable[];
}) => {
  return (
    <div className="mx-auto grid grid-cols-3 gap-4">
      {graphInfo.map((item) => (
        <GameTeamRankingPieGraph
          key={`${item.teamCode}-${item.vsTeamCode}-${item.teamName}-${item.teamCode}`}
          graphInfo={item}
        />
      ))}
    </div>
  );
};
export default GameTeamRankingPieGraphFrame;
