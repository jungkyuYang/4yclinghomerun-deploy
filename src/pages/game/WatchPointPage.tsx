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
  const {
    data: watchPointData,
    isLoading: watchPointLoading,
    error: watchPointError,
  } = GetWatchPoint(finalGameDate, finalGmkey);

  const {
    data: naverWatchPointData,
    isLoading: naverWatchPointIsLoading,
    error: naverWatchPointError,
  } = GetNaverWatchPoint(finalGmkey);

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

  const handleNextGame = () => {
    if ('schedule' in watchPointData && watchPointData.schedule.next) {
      const { gameDate: nextGameDate, gmkey: nextGmkey } =
        watchPointData.schedule.next;
      navigate(`/game/watchpoint?${nextGameDate}&${nextGmkey}`);
    }
  };

  const handlePrevGame = () => {
    if ('schedule' in watchPointData && watchPointData.schedule.prev) {
      const { gameDate: prevGameDate, gmkey: prevGmkey } =
        watchPointData.schedule.prev;
      navigate(`/game/watchpoint?${prevGameDate}&${prevGmkey}`);
    }
  };

  if (watchPointError || naverWatchPointError)
    return <div>Error: {watchPointError || naverWatchPointError}</div>;
  if (
    !watchPointData ||
    !('gameScore' in watchPointData) ||
    !('schedule' in watchPointData) ||
    !('homeTeam' in watchPointData) ||
    !('visitTeam' in watchPointData) ||
    !naverWatchPointData ||
    !('home' in naverWatchPointData) ||
    !('away' in naverWatchPointData)
  )
    return null;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <SectionHeading title="상대 전적 비교" />
        {watchPointLoading || naverWatchPointIsLoading ? (
          <WatchPointSkeleton />
        ) : (
          <WatchPointItem
            game={watchPointData.gameScore}
            homeGameRecord={watchPointData.homeTeam.rank}
            awayGameRecord={watchPointData.visitTeam.rank}
            homeVsRecord={watchPointData.homeTeam.vsRecord}
            awayVsRecord={watchPointData.visitTeam.vsRecord}
            onNextGame={handleNextGame}
            onPrevGame={handlePrevGame}
            hasNextGame={!!watchPointData.schedule.next}
            hasPrevGame={!!watchPointData.schedule.prev}
          />
        )}
      </div>

      <div>
        <SectionHeading title="선발 투수 비교" />
        <PitcherStatCompareItem
          homeCurrentPitKindStats={
            naverWatchPointData?.home?.currentPitKindStats
          }
          homeCurrentSeasonStats={naverWatchPointData.home.currentSeasonStats}
          homeCurrentSeasonStatsOnOpponents={
            naverWatchPointData.home.currentSeasonStatsOnOpponents
          }
          homePlayerInfo={naverWatchPointData.home.playerInfo}
          awayCurrentPitKindStats={naverWatchPointData.away.currentPitKindStats}
          awayCurrentSeasonStats={naverWatchPointData.away.currentSeasonStats}
          awayCurrentSeasonStatsOnOpponents={
            naverWatchPointData.away.currentSeasonStatsOnOpponents
          }
          awayPlayerInfo={naverWatchPointData.away.playerInfo}
        />
      </div>
    </div>
  );
};

export default WatchPointPage;
