import { BarTooltipProps } from '@nivo/bar';

import GraphTooltipFrame from '../GraphTooltipFrame';
import { TGameCrowdRankingGraph } from '@/types/GameCrowdRanking';

const GraphTooltipCrowdRank = ({
  label,
  value,
}: BarTooltipProps<TGameCrowdRankingGraph>) => {
  return (
    <GraphTooltipFrame>
      <p>{label.slice(7)}</p>
      <p>{`${new Intl.NumberFormat('en-US').format(value)}명`}</p>
    </GraphTooltipFrame>
  );
};

export default GraphTooltipCrowdRank;
