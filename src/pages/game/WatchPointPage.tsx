import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import WatchPointItem from '@/components/game/watchpoint/WatchPointItem';
import WatchPointSkeleton from '@/components/game/watchpoint/WatchPointSkeleton';
import PitcherStatCompareItem from '@/components/game/watchpoint/PitcherStatCompareItem';
import SectionHeading from '@/components/common/typography/SectionHeading';
import { useScheduleStore } from '@/stores/ScheduleStore';
import { GetMonthSchedule } from '@/api/GetMonthSchedule';
import { GetWatchPoint } from '@/api/GetWatchPoint';
import { GetNaverWatchPoint } from '@/api/GetNaverWatchPoint';
import { GAME_STATUS } from '@/constants/constant';

const WatchPointPage = () => {
  const [finalGameDate, setFinalGameDate] = useState(0);
  const [finalGmkey, setFinalGmkey] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { year, month } = useScheduleStore();

  const { data: monthScheduleData } = GetMonthSchedule(year, month);

  // 가장 최근 경기의 gameDate와 gmkey를 가져옴.
  useEffect(() => {
    const [gameDate, gmkey] = location.search.substring(1).split('&');

    const lastFinishedGame = monthScheduleData?.data.list
      .filter(
        (game) =>
          game.status === GAME_STATUS.PLAYING_NOW ||
          game.status === GAME_STATUS.AFTER_GAME,
      )
      .slice(-1)[0];

    setFinalGameDate(
      parseInt(String(gameDate || lastFinishedGame?.gameDate || '0')),
    );
    setFinalGmkey(gmkey || lastFinishedGame?.gmkey || '');
  }, [location.search, year, month, monthScheduleData]);

  const {
    data: watchPointData,
    isLoading: watchPointLoading,
    error: watchPointError,
  } = GetWatchPoint(finalGameDate, finalGmkey);

  const {
    data: naverWatchPointData,
    isLoading: naverWatchIsLoading,
    isError: naverWatchIsError,
    error,
  } = GetNaverWatchPoint(finalGmkey);

  const handleNextGame = () => {
    if (watchPointData?.data.schedule.next) {
      const { gameDate: nextGameDate, gmkey: nextGmkey } =
        watchPointData.data.schedule.next;
      navigate(`/game/watchpoint?${nextGameDate}&${nextGmkey}`);
    }
  };

  const handlePrevGame = () => {
    if (watchPointData?.data.schedule.prev) {
      const { gameDate: prevGameDate, gmkey: prevGmkey } =
        watchPointData.data.schedule.prev;
      navigate(`/game/watchpoint?${prevGameDate}&${prevGmkey}`);
    }
  };

  if (watchPointError || naverWatchIsError)
    return <div>Error: {watchPointError || error}</div>;
  if (watchPointLoading || naverWatchIsLoading) return <WatchPointSkeleton />;
  if (!watchPointData?.data || !naverWatchPointData?.result) return null;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <SectionHeading title="상대 전적 비교" />
        <WatchPointItem
          game={watchPointData.data.gameScore}
          homeGameRecord={watchPointData.data.homeTeamRank}
          awayGameRecord={watchPointData.data.visitTeamRank}
          homeVsRecord={watchPointData.data.homeTeamWinLose}
          awayVsRecord={watchPointData.data.visitTeamWinLose}
          onNextGame={handleNextGame}
          onPrevGame={handlePrevGame}
          hasNextGame={!!watchPointData.data.schedule.next}
          hasPrevGame={!!watchPointData.data.schedule.prev}
        />
      </div>

      <div>
        <SectionHeading title="선발 투수 비교" />
        <PitcherStatCompareItem
          homeCurrentPitKindStats={
            naverWatchPointData?.result.previewData.homeStarter
              .currentPitKindStats
          }
          homeCurrentSeasonStats={
            naverWatchPointData?.result.previewData.homeStarter
              .currentSeasonStats
          }
          homeCurrentSeasonStatsOnOpponents={
            naverWatchPointData?.result.previewData.homeStarter
              .currentSeasonStatsOnOpponents
          }
          awayCurrentPitKindStats={
            naverWatchPointData?.result.previewData.awayStarter
              .currentPitKindStats
          }
          awayCurrentSeasonStats={
            naverWatchPointData?.result.previewData.awayStarter
              .currentSeasonStats
          }
          awayCurrentSeasonStatsOnOpponents={
            naverWatchPointData?.result.previewData.awayStarter
              .currentSeasonStatsOnOpponents
          }
          homePlayerInfo={
            naverWatchPointData?.result.previewData.homeStarter.playerInfo
          }
          awayPlayerInfo={
            naverWatchPointData?.result.previewData.awayStarter.playerInfo
          }
        />
      </div>
    </div>
  );
};

export default WatchPointPage;
