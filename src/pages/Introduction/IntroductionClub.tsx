import { IntroductionClubData } from '@/mocks/introduction/MockIntroductionClub';

import IntroductionClubItem from '@/components/introduction/IntroductionClubItem';

const IntroductionClub = () => {
  return (
    <div className="flex flex-col gap-36">
      {IntroductionClubData.map((data, index) => (
        <IntroductionClubItem data={data} index={index} />
      ))}
    </div>
  );
};
export default IntroductionClub;
