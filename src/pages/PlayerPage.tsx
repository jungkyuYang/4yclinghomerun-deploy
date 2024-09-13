import useAxios from '@/hooks/useAxios';

import DetailPageLayout from '@/common/DetailPageLayout';
import CardArea from '@/components/player/CardArea';
import CardItem from '@/components/player/CardItem';
import { useState } from 'react';
import CategoryButton from '@/components/player/CategoryButton';

const PlayerPage = () => {
  const [category, setCategory] = useState('api/player/pitcherlist');

  const { data: pitcherData } = useAxios<TPitcher[]>({
    method: 'GET',
    url: `${category}`,
    initialData: [],
    shouldFetchOnMount: true,
  });

  const handleFetch = (newCategory: string) => {
    setCategory(newCategory);
  };

  return (
    <>
      <DetailPageLayout
        topImg="/src/assets/home/hero/hero_banner.jpg"
        title="Player"
        subTitle="kt wiz의 자랑스런 ‘첫 번째 선수단’을 소개합니다."
      >
        <CategoryButton
          label="코치"
          category="api/player/coachlist"
          onClick={handleFetch}
        />
        <CategoryButton
          label="투수"
          category="api/player/pitcherlist"
          onClick={handleFetch}
        />
        <CategoryButton
          label="내야수"
          category="api/player/infielderlist"
          onClick={handleFetch}
        />
        <CategoryButton
          label="외야수"
          category="api/player/outfielderlist"
          onClick={handleFetch}
        />
        <CategoryButton
          label="응원단"
          category="api/player/cheerleader"
          onClick={handleFetch}
        />

        <CardArea>
          {pitcherData.map((item, index) => (
            <CardItem key={index} items={item} />
          ))}
        </CardArea>
      </DetailPageLayout>
    </>
  );
};

export default PlayerPage;
