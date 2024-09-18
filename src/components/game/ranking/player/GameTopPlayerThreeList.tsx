const GameTopPlayerThreeList = () => {
  const ListData = [
    {
      rank: 1,
      name: '로하스',
      value: 0.33,
    },
    {
      rank: 2,
      name: '로하스',
      value: 0.33,
    },
    {
      rank: 3,
      name: '로하스',
      value: 0.33,
    },
    ,
  ];

  return (
    <section className="flex flex-col items-center justify-center text-kt-black-1">
      <h1 className="mb-2 text-lg font-bold">평균자책점 TOP3</h1>
      <ul>
        {ListData.map((item) => (
          <li key={item?.rank}>
            {item?.rank}. {item?.name} ({item?.value})
          </li>
        ))}
      </ul>
    </section>
  );
};
export default GameTopPlayerThreeList;
