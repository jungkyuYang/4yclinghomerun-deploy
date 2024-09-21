import StatRow from './StatRow';
import PitchTypeBar from './PitchTypeBar';

import {
  WatchPointPitcherStatType,
  PitcherStatOnOpponentType,
  PitchKindStatType,
  PitchInfoType,
} from '@/types/WatchPointType';
import { GetPlayerImg } from '@/api/GetPlayerImg';

type PitcherDataProps = {
  homeCurrentPitKindStats: PitchKindStatType[];
  homeCurrentSeasonStats: WatchPointPitcherStatType;
  homeCurrentSeasonStatsOnOpponents: PitcherStatOnOpponentType;
  awayCurrentPitKindStats: PitchKindStatType[];
  awayCurrentSeasonStats: WatchPointPitcherStatType;
  awayCurrentSeasonStatsOnOpponents: PitcherStatOnOpponentType;
  homePlayerInfo: PitchInfoType;
  awayPlayerInfo: PitchInfoType;
};

const PitcherStatCompareItem = ({
  homeCurrentPitKindStats,
  homeCurrentSeasonStats,
  homeCurrentSeasonStatsOnOpponents,
  awayCurrentPitKindStats,
  awayCurrentSeasonStats,
  awayCurrentSeasonStatsOnOpponents,
  homePlayerInfo,
  awayPlayerInfo,
}: PitcherDataProps) => {
  const { imageUrl: homePitcherImg } = GetPlayerImg(homePlayerInfo.pCode);
  const { imageUrl: awayPitcherImg } = GetPlayerImg(awayPlayerInfo.pCode);

  return (
    <main className="w-full p-8 text-white">
      <section className="flex items-center justify-center gap-12">
        <PitchTypeBar stats={awayCurrentPitKindStats} side="left" />
        <article className="flex w-7/12 flex-col items-center">
          {/* 선발 투수 */}
          <header className="flex items-center gap-16">
            <figure className="text-center">
              <img
                src={awayPitcherImg}
                alt={awayPlayerInfo.name}
                className="mb-4 h-32 w-32 rounded-full border-2 border-kt-gray-2 object-contain"
              />
              <figcaption className="text-xl font-bold">
                {awayCurrentSeasonStats.teamName}·{awayPlayerInfo.name}
              </figcaption>
            </figure>
            <p className="animate-gradient bg-gradient-to-tr from-yellow-300 to-red-800 bg-clip-text text-3xl font-extrabold text-transparent">
              VS
            </p>
            <figure className="text-center">
              <img
                src={homePitcherImg}
                alt={homePlayerInfo.name}
                className="mb-4 h-32 w-32 rounded-full border-2 border-kt-gray-2 object-contain"
              />
              <figcaption className="text-xl font-bold">
                {homeCurrentSeasonStats.teamName}·{homePlayerInfo.name}
              </figcaption>
            </figure>
          </header>

          <div className="mt-4 h-1 w-full rounded-full bg-kt-gray-2"></div>

          {/* 선발 투수 스탯 */}
          <section className="w-full">
            <StatRow
              label="승패"
              away={`${awayCurrentSeasonStats.w}승 ${awayCurrentSeasonStats.l}패`}
              home={`${homeCurrentSeasonStats.w}승 ${homeCurrentSeasonStats.l}패`}
            />
            <StatRow
              label="이닝"
              away={awayCurrentSeasonStats.inn2}
              home={homeCurrentSeasonStats.inn2}
            />
            <StatRow
              label="평균자책점"
              away={awayCurrentSeasonStats.era}
              home={homeCurrentSeasonStats.era}
            />
            <StatRow
              label="WHIP"
              away={awayCurrentSeasonStats.whip}
              home={homeCurrentSeasonStats.whip}
            />
            <StatRow
              label="상대전적"
              away={`${awayCurrentSeasonStatsOnOpponents.w}승 ${awayCurrentSeasonStatsOnOpponents.l}패 ERA ${awayCurrentSeasonStatsOnOpponents.era}`}
              home={`${homeCurrentSeasonStatsOnOpponents.w}승 ${homeCurrentSeasonStatsOnOpponents.l}패 ERA ${homeCurrentSeasonStatsOnOpponents.era}`}
            />
          </section>
        </article>
        <PitchTypeBar stats={homeCurrentPitKindStats} side="right" />
      </section>
    </main>
  );
};

export default PitcherStatCompareItem;
