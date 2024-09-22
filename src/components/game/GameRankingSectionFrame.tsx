import { cn } from '@/utils/cn';
import GameTeamRankingTitle from './ranking/team/GameTeamRankingTitle';

const GameRankingSectionFrame = ({
  title,
  children,
  type,
  height,
}: {
  title: string;
  children: React.ReactNode;
  type: 'table' | 'graph';
  height?: string;
}) => {
  return (
    <section>
      <GameTeamRankingTitle title={title} />
      {type === 'graph' ? (
        <div className={cn(height, 'w-full border-2 border-kt-gray-2')}>
          {children}
        </div>
      ) : (
        <div>{children}</div>
      )}
    </section>
  );
};
export default GameRankingSectionFrame;
