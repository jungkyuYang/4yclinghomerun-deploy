import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import WatchPointItem from '@/components/game/watchpoint/WatchPointItem';
import WatchPointSkeleton from '@/components/game/watchpoint/WatchPointSkeleton';
import PitcherStatCompareItem from '@/components/game/watchpoint/PitcherStatCompareItem';
import TopPlayerStatCompareItem from '@/components/game/watchpoint/TopPlayerStatCompareItem';
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

  // 버튼으로 경기 이동
  const handleGameNavigation = (direction: 'next' | 'prev') => {
    if ('schedule' in watchPointData && watchPointData.schedule[direction]) {
      const { gameDate, gmkey } = watchPointData.schedule[direction];
      navigate(`/game/watchpoint?${gameDate}&${gmkey}`);
    }
  };

  if (watchPointError || naverWatchPointError)
    return <div>Error: {watchPointError || naverWatchPointError}</div>;

  const isWatchPointDataValid =
    watchPointData &&
    'gameScore' in watchPointData &&
    'schedule' in watchPointData &&
    'homeTeam' in watchPointData &&
    'visitTeam' in watchPointData;
  const isNaverWatchPointDataValid =
    naverWatchPointData &&
    'home' in naverWatchPointData &&
    'away' in naverWatchPointData;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <SectionHeading title="상대 전적 비교" />
        {watchPointLoading || naverWatchPointIsLoading ? (
          <WatchPointSkeleton />
        ) : (
          isWatchPointDataValid && (
            <WatchPointItem
              game={watchPointData.gameScore}
              homeGameRecord={watchPointData.homeTeam.rank}
              awayGameRecord={watchPointData.visitTeam.rank}
              homeVsRecord={watchPointData.homeTeam.vsRecord}
              awayVsRecord={watchPointData.visitTeam.vsRecord}
              onNextGame={() => handleGameNavigation('next')}
              onPrevGame={() => handleGameNavigation('prev')}
              hasNextGame={!!watchPointData.schedule.next}
              hasPrevGame={!!watchPointData.schedule.prev}
            />
          )
        )}
      </div>

      <div>
        <SectionHeading title="선발 투수 비교" />
        {isNaverWatchPointDataValid && (
          <PitcherStatCompareItem
            homeCurrentPitKindStats={
              naverWatchPointData.home.starter.currentPitKindStats
            }
            homeCurrentSeasonStats={
              naverWatchPointData.home.starter.currentSeasonStats
            }
            homeCurrentSeasonStatsOnOpponents={
              naverWatchPointData.home.starter.currentSeasonStatsOnOpponents
            }
            homePlayerInfo={naverWatchPointData.home.starter.playerInfo}
            awayCurrentPitKindStats={
              naverWatchPointData.away.starter.currentPitKindStats
            }
            awayCurrentSeasonStats={
              naverWatchPointData.away.starter.currentSeasonStats
            }
            awayCurrentSeasonStatsOnOpponents={
              naverWatchPointData.away.starter.currentSeasonStatsOnOpponents
            }
            awayPlayerInfo={naverWatchPointData.away.starter.playerInfo}
          />
        )}
      </div>

      <div>
        <SectionHeading title="키 플레이어 비교" />
        {isNaverWatchPointDataValid && (
          <>
            <h1 className="flex justify-center text-base font-bold text-gray-500">
              키플레이어는 팀의 최근 5경기 중 3경기 이상 출장 선수 중 가장
              타율이 높은 선수 입니다.
            </h1>
            <p className="flex justify-center text-base font-bold text-gray-500">
              좌우의 표는 각 ZONE의 타율을 나타낸 HOT & COLD ZONE입니다.
            </p>
            <TopPlayerStatCompareItem
              homeCurrentSeasonStats={
                naverWatchPointData.home.topPlayer.currentSeasonStats
              }
              homeCurrentSeasonStatsOnOpponents={
                naverWatchPointData.home.topPlayer.currentSeasonStatsOnOpponents
              }
              homePlayerInfo={naverWatchPointData.home.topPlayer.playerInfo}
              homeRecentFiveGameStats={
                naverWatchPointData.home.topPlayer.recentFiveGamesStats
              }
              homeHotColdZone={naverWatchPointData.home.topPlayer.hotColdZone}
              awayCurrentSeasonStats={
                naverWatchPointData.away.topPlayer.currentSeasonStats
              }
              awayCurrentSeasonStatsOnOpponents={
                naverWatchPointData.away.topPlayer.currentSeasonStatsOnOpponents
              }
              awayPlayerInfo={naverWatchPointData.away.topPlayer.playerInfo}
              awayRecentFiveGameStats={
                naverWatchPointData.away.topPlayer.recentFiveGamesStats
              }
              awayHotColdZone={naverWatchPointData.away.topPlayer.hotColdZone}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default WatchPointPage;
