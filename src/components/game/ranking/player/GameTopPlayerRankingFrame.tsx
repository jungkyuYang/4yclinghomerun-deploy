import GameTopPlayerFiveList from './GameTopPlayerFiveList';
import GameTopPlayerThreeFrame from './GameTopPlayerThreeFrame';

const GameTopPlayerRankingFrame = () => {
  return (
    <div className="flex w-full justify-between">
      <GameTopPlayerThreeFrame />
      <GameTopPlayerFiveList />
    </div>
  );
};
export default GameTopPlayerRankingFrame;
