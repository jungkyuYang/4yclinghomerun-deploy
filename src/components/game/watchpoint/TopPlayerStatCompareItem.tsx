import StatRow from './StatRow';
import {
  ToplayerStatType,
  TopPlayerStatOnOpponentType,
  TopPlayerInfoType,
  TopPlayerRecentFiveGameStatType,
  TopPlayerHotColdZoneType,
} from '@/types/WatchPointType';
import { GetPlayerImg } from '@/api/GetPlayerImg';
import HotColdZone from './HotColdZone';

type TopPlayerDataProps = {
  homeCurrentSeasonStats: ToplayerStatType;
  homeCurrentSeasonStatsOnOpponents: TopPlayerStatOnOpponentType;
  homePlayerInfo: TopPlayerInfoType;
  homeRecentFiveGameStats: TopPlayerRecentFiveGameStatType;
  homeHotColdZone: TopPlayerHotColdZoneType[];
  awayCurrentSeasonStats: ToplayerStatType;
  awayCurrentSeasonStatsOnOpponents: TopPlayerStatOnOpponentType;
  awayPlayerInfo: TopPlayerInfoType;
  awayRecentFiveGameStats: TopPlayerRecentFiveGameStatType;
  awayHotColdZone: TopPlayerHotColdZoneType[];
};

const TopPlayerStatCompareItem = ({
  homeCurrentSeasonStats,
  homeCurrentSeasonStatsOnOpponents,
  homePlayerInfo,
  homeRecentFiveGameStats,
  homeHotColdZone,
  awayCurrentSeasonStats,
  awayCurrentSeasonStatsOnOpponents,
  awayPlayerInfo,
  awayRecentFiveGameStats,
  awayHotColdZone,
}: TopPlayerDataProps) => {
  const { imageUrl: homeTopPlayerImg } = GetPlayerImg(homePlayerInfo.pCode);
  const { imageUrl: awayTopPlayerImg } = GetPlayerImg(awayPlayerInfo.pCode);

  return (
    <main className="w-full p-8 text-white">
      <section className="flex items-center justify-center gap-12">
        <HotColdZone data={awayHotColdZone} />
        <article className="flex w-7/12 flex-col items-center">
          {/* 탑 플레이어 */}
          <header className="flex items-center gap-16">
            <figure className="text-center">
              <img
                src={awayTopPlayerImg}
                alt={awayPlayerInfo.name}
                className="mb-4 h-32 w-32 rounded-full border-2 border-kt-gray-2 object-contain"
              />
              <figcaption className="text-xl font-bold">
                {awayPlayerInfo.name}
              </figcaption>
            </figure>
            <p className="animate-gradient bg-gradient-to-tr from-yellow-300 to-red-800 bg-clip-text text-3xl font-extrabold text-transparent">
              VS
            </p>
            <figure className="text-center">
              <img
                src={homeTopPlayerImg}
                alt={homePlayerInfo.name}
                className="mb-4 h-32 w-32 rounded-full border-2 border-kt-gray-2 object-contain"
              />
              <figcaption className="text-xl font-bold">
                {homePlayerInfo.name}
              </figcaption>
            </figure>
          </header>

          <div className="mt-4 h-1 w-full rounded-full bg-kt-gray-2"></div>

          {/* 탑 플레이어 스탯 */}
          <section className="w-full">
            <StatRow
              label="타율"
              away={awayCurrentSeasonStats.hra}
              home={homeCurrentSeasonStats.hra}
            />
            <StatRow
              label="안타"
              away={awayCurrentSeasonStats.hit}
              home={homeCurrentSeasonStats.hit}
            />
            <StatRow
              label="홈런"
              away={awayCurrentSeasonStats.hr}
              home={homeCurrentSeasonStats.hr}
            />
            <StatRow
              label="타점"
              away={awayCurrentSeasonStats.rbi}
              home={homeCurrentSeasonStats.rbi}
            />
            <StatRow
              label="상대 전적"
              away={`타율 ${awayCurrentSeasonStatsOnOpponents.hra} · 안타 ${awayCurrentSeasonStatsOnOpponents.hit} · 홈런 ${awayCurrentSeasonStatsOnOpponents.hr}`}
              home={`타율 ${homeCurrentSeasonStatsOnOpponents.hra} · 안타 ${homeCurrentSeasonStatsOnOpponents.hit} · 홈런 ${homeCurrentSeasonStatsOnOpponents.hr}`}
            />
            <StatRow
              label="최근 5경기"
              away={`타율 ${awayRecentFiveGameStats.hra} · 안타 ${awayRecentFiveGameStats.hit} · 홈런 ${awayRecentFiveGameStats.hr}`}
              home={`타율 ${homeRecentFiveGameStats.hra} · 안타 ${homeRecentFiveGameStats.hit} · 홈런 ${homeRecentFiveGameStats.hr}`}
            />
          </section>
        </article>
        <HotColdZone data={homeHotColdZone} />
      </section>
    </main>
  );
};
export default TopPlayerStatCompareItem;
