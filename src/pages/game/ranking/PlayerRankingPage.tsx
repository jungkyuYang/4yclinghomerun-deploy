import { useState } from 'react';

import GamePlayerRankingTabs from '@/components/game/ranking/player/GamePlayerRankingTabs';
import GameTopPlayerRankingFrame from '@/components/game/ranking/player/GameTopPlayerRankingFrame';

const PlayerRankingPage = () => {
  const [activeTab, setActiveTab] = useState('kt wiz 투수 순위');

  const handleActiveTab = (title: string) => {
    setActiveTab(title);
  };
  return (
    <div className="flex flex-col gap-10">
      <GameTopPlayerRankingFrame />
      <GamePlayerRankingTabs
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
      />
    </div>
  );
};
export default PlayerRankingPage;
