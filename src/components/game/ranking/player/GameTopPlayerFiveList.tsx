const GameTopPlayerFiveList = () => {
  const ListData = [
    {
      rank: 1,
      team: 'KT',
      name: '로하스',
      value: 0.33,
    },
    {
      rank: 2,
      team: 'KT',
      name: '로하스',
      value: 0.33,
    },
    {
      rank: 3,
      team: 'KT',
      name: '로하스',
      value: 0.33,
    },
    {
      rank: 4,
      team: 'KT',
      name: '로하스',
      value: 0.33,
    },
    {
      rank: 5,
      team: 'KT',
      name: '로하스',
      value: 0.33,
    },
  ];

  return (
    <section className="ml-5 flex w-1/5 flex-col items-start justify-center text-kt-black-1">
      <h1 className="mb-2 text-xl font-bold text-kt-white">
        <strong className="text-kt-red-2">전체 타자 타율</strong> TOP5
      </h1>
      <ul className="w-full text-kt-white">
        {ListData.map((item) => (
          <li
            key={item?.rank}
            className="mt-2 flex w-full justify-between border-b-[1px] border-kt-gray-2"
          >
            <p>
              {item?.rank}. {item?.name} ({item.team})
            </p>
            <p> ({item?.value})</p>
          </li>
        ))}
      </ul>
      <div className="mt-3 w-full">
        <p className="text-right text-kt-white">※ 2024 정규리그 시즌</p>
      </div>
    </section>
  );
};
export default GameTopPlayerFiveList;
