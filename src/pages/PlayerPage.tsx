import DetailPageLayout from '@/common/DetailPageLayout';
import CardArea from '@/components/player/CardArea';
import CardItem from '@/components/player/CardItem';

const PlayerPage = () => {
  return (
    <>
      <DetailPageLayout
        topImg="/src/assets/home/hero/hero_banner.jpg"
        title="Player"
        subTitle="hi"
      >
        <CardArea>
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </CardArea>
      </DetailPageLayout>
    </>
  );
};

export default PlayerPage;
