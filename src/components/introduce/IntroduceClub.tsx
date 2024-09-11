import DetailPageLayout from '@/common/DetailPageLayout';
import topImg from '@/assets/logo/KTwiz_logo.svg';
import { IntroduceClubData } from '@/mocks/introduce/MockIntroduceClub';

const IntroduceClub = () => {
  return (
    <>
      <DetailPageLayout
        topImg={topImg}
        title="kt wiz는?"
        subTitle="한국 프로야구의 ‘10번째 심장’ kt wiz를 소개합니다!"
      >
        <div className="flex flex-col gap-36">
          {IntroduceClubData.map((data, index) => (
            <div
              className={`flex gap-20 ${index % 2 === 0 && 'flex-row-reverse'}`}
              key={data.id}
            >
              <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold text-kt-red-2">
                  {data.header}
                </h1>
                <p className="text-lg">{data.desc}</p>
              </div>
              {data.img && <img src={data.img} />}
            </div>
          ))}
        </div>
      </DetailPageLayout>
    </>
  );
};
export default IntroduceClub;
