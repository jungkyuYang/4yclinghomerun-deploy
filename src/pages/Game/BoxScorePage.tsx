import { useLocation, useNavigate } from 'react-router-dom';

import BoxScoreItem from '@/components/game/boxscore/BoxScoreItem';
import BoxScoreSkeleton from '@/components/game/boxscore/BoxScoreSkeleton';
import { GetBoxScore } from '@/api/GetBoxScore';
import { GetMonthSchedule } from '@/api/GetMonthSchedule';
import { useScheduleStore } from '@/stores/ScheduleStore';

const BoxScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { year, month } = useScheduleStore();

  // 쿼리 파라미터 파싱
  const [gameDate, gmkey] = location.search.substring(1).split('&');

  const { data: monthScheduleData } = GetMonthSchedule(year, month);

  // 가장 최근에 완료된 경기 찾기
  const lastFinishedGame = monthScheduleData?.data.list
    .filter((game) => game.status === '3')
    .pop();

  // gameDate나 gmkey가 없을 경우 가장 최근 경기 데이터 사용
  const finalGameDate = parseInt(
    String(gameDate || lastFinishedGame?.gameDate || '0'),
  );
  const finalGmkey = gmkey || lastFinishedGame?.gmkey || '';

  const {
    data: boxScoreData,
    isLoading,
    error,
  } = GetBoxScore(finalGameDate, finalGmkey);

  if (error) return <div>Error: {error}</div>;
  if (!boxScoreData?.data && !isLoading)
    return <div>정보가 존재하지 않습니다.</div>;

  const handleNextGame = () => {
    if (boxScoreData?.data.schedule.next) {
      const { gameDate: nextGameDate, gmkey: nextGmkey } =
        boxScoreData.data.schedule.next;
      navigate(`/game/boxscore?${nextGameDate}&${nextGmkey}`);
    }
  };

  const handlePrevGame = () => {
    if (boxScoreData?.data.schedule.prev) {
      const { gameDate: prevGameDate, gmkey: prevGmkey } =
        boxScoreData.data.schedule.prev;
      navigate(`/game/boxscore?${prevGameDate}&${prevGmkey}`);
    }
  };

  return (
    <div className="mx-10 p-10">
      <h1 className="mb-5 text-2xl font-extrabold">해당 경기 정보</h1>
      {isLoading ? (
        <BoxScoreSkeleton />
      ) : (
        boxScoreData?.data && (
          <BoxScoreItem
            game={boxScoreData.data.schedule.current}
            logo={monthScheduleData?.data.list || []}
            scoreBoard={boxScoreData.data.scoreboard}
            onNextGame={handleNextGame}
            onPrevGame={handlePrevGame}
            hasNextGame={!!boxScoreData.data.schedule.next}
            hasPrevGame={!!boxScoreData.data.schedule.prev}
          />
        )
      )}
    </div>
  );
};

export default BoxScorePage;
