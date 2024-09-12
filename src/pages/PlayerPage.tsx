import useAxios from '@/hooks/useAxios';

import DetailPageLayout from '@/common/DetailPageLayout';
import CardArea from '@/components/player/CardArea';
import CardItem from '@/components/player/CardItem';

const PlayerPage = () => {
  const { data: pitcherData } = useAxios<any[]>({
    method: 'GET',
    url: 'api/player/pitcherlist',
    initialData: [],
    shouldFetchOnMount: true,
  });

  return (
    <>
      <DetailPageLayout
        topImg="/src/assets/home/hero/hero_banner.jpg"
        title="Player"
        subTitle="kt wiz의 자랑스런 ‘첫 번째 선수단’을 소개합니다."
      >
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
