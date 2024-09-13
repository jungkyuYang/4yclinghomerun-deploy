import { useState } from 'react';

import DetailPageLayout from '@/common/DetailPageLayout';
import TabNavigation from '@/common/TabNavigation';

import WizNews from '@/components/wiz-news/WizNews';

import { wNewsListData } from '@/mocks/wiz-news/WizNewsList';
import { wNewsPressData } from '@/mocks/wiz-news/WizPressList';
import { wNewsRoomData } from '@/mocks/wiz-news/WizNewsRoomList';

const NewsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabList = ['wiz소식', 'wiz보도자료', 'wiz뉴스룸'];

  const tabData = [wNewsListData, wNewsPressData, wNewsRoomData];

  return (
    <>
      <DetailPageLayout
        topImg="https://www.ktwiz.co.kr/static/media/sub_bg.1d3f5321.png"
        title="wiz 뉴스"
        subTitle="kt wiz의 새소식을 발빠르게 전해 드립니다."
      >
        <TabNavigation
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabList={tabList}
        />
        <WizNews newsList={tabData[selectedTab]} />
      </DetailPageLayout>
    </>
  );
};

export default NewsPage;
