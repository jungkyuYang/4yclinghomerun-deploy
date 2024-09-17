import { useEffect, useState } from 'react';

import DetailPageLayout from '@/common/DetailPageLayout';
import TabNavigation from '@/common/TabNavigation';

import WizNews from '@/components/wiz-news/WizNews';

import useAxios from '@/hooks/useAxios';

const NewsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabList = ['wiz소식', 'wiz보도자료', 'wiz뉴스룸'];

  const urls = [
    '/article/newslistpage?itemCount=100&pageNum=1',
    '/article/wizpresslist',
    '/article/navernewslist',
  ];

  // 각 탭에 맞게 초기 데이터 분기 설정
  const initialData =
    selectedTab === 2
      ? { list: [] } // navernewslist는 data.list 형태
      : { data: { list: [] } }; // newslistpage, wizpresslist는 data.data.list 형태

  const { data, isLoading, isError, error } = useAxios({
    url: urls[selectedTab],
    method: 'GET',
    initialData,
    shouldFetchOnMount: true,
  });

  // data 구조에 따라 리스트 반환
  const newsList = selectedTab === 2 ? data?.list || [] : data.data?.list || [];

  // 데이터 확인용(삭제예정)
  useEffect(() => {
    if (data) {
      if (selectedTab === 2 && data.list) {
        console.log('NaverNews List:', data.list);
      } else if (data.data?.list) {
        console.log('WizNews List:', data.data.list);
      }
    }
  }, [data]);

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
        <WizNews
          newsList={newsList}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      </DetailPageLayout>
    </>
  );
};

export default NewsPage;
