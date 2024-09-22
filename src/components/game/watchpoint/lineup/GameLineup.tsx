import TeamLineup from './TeamLineup';
import { useLineupStore } from '@/stores/LineupStore';

const GameLineup = () => {
  const { gameInfo } = useLineupStore();
  const isKtwiz = gameInfo.home === 'KT';

  return (
    <main className="flex w-full gap-20 overflow-hidden">
      <section className="w-1/2">
        <TeamLineup isHome={false} isKtwiz={!isKtwiz} />
      </section>
      <section className="w-1/2">
        <TeamLineup isHome={true} isKtwiz={isKtwiz} />
      </section>
    </main>
  );
};

export default GameLineup;
