import { TTeamRankingTeamVSTable } from '@/types/TeamRanking';
import TeamRankingPieGraph from './TeamRankingPieGraph';
import PieGraphSkeleton from '../PieGraphSkeleton';

const TeamRankingPieGraphFrame = ({
  graphInfo,
  isLoading,
}: {
  graphInfo: TTeamRankingTeamVSTable[];
  isLoading: boolean;
}) => {
  return (
    <div className="mx-auto grid grid-cols-3 gap-4">
      {graphInfo.map((item) =>
        isLoading ? (
          <PieGraphSkeleton
            key={`${item.teamCode}-${item.vsTeamCode}-${item.teamName}-${item.teamCode}`}
          />
        ) : (
          <TeamRankingPieGraph
            key={`${item.teamCode}-${item.vsTeamCode}-${item.teamName}-${item.teamCode}`}
            graphInfo={item}
          />
        ),
      )}
    </div>
  );
};
export default TeamRankingPieGraphFrame;
