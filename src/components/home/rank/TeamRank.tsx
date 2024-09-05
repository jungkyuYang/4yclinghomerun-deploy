type TeamRankProps = {
  rank: number;
  wins: number;
  losses: number;
  ties: number;
  winningPercentage: number;
};

const TeamRank = ({
  rank,
  wins,
  losses,
  ties,
  winningPercentage,
}: TeamRankProps) => {
  return (
    <article className="mx-8 rounded-lg bg-gradient-to-r from-red-600 via-black to-[#EA0101] p-1 shadow-lg">
      <section className="flex items-stretch justify-between rounded-lg bg-gray-900 px-8 py-3 text-white">
        <div className="flex flex-col items-start justify-between">
          <h1 className="text-lg font-semibold">팀 순위</h1>
          <p className="text-8xl font-bold leading-none">{rank}</p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="text-right">
            <h2 className="text-xl font-semibold">현재 우리는</h2>
            <p className="text-3xl text-gray-400">
              {wins}승 {losses}패 {ties}무
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold">승률 {winningPercentage}</p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default TeamRank;
