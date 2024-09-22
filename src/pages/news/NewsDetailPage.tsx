import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import naverNewsDetailData from '@/mocks/wiz-news/NaverNewsDetail';

const NewsDetailPage = () => {
  const { tab, id } = useParams();

  useEffect(() => {
    console.log(tab, id);
  }, [tab, id]);

  return (
    <div className="m-auto flex max-w-screen-2xl flex-col gap-20">
      <div className="border-ktwhite flex flex-col">
        <div className="flex justify-between border-b border-kt-white p-2 pt-10">
          <span>
            발간일 : {naverNewsDetailData.articleInfo.article.serviceDatetime}
          </span>
          <span>
            최종 수정일 :{' '}
            {naverNewsDetailData.articleInfo.article.modifyDatetime}
          </span>
        </div>
        <h1 className="border-b border-kt-white p-3 text-center text-5xl">
          {naverNewsDetailData.articleInfo.article.title}
        </h1>
        <p className="p-2 text-center">
          {naverNewsDetailData.articleInfo.article.reporter}
        </p>
      </div>

      <div className="m-auto flex max-w-screen-lg flex-col gap-10">
        <strong className="text-3xl">
          {naverNewsDetailData.articleInfo.article.subcontent}
        </strong>
        {/* 뉴스 기사 본문 */}
        <p
          dangerouslySetInnerHTML={{
            __html: naverNewsDetailData.articleInfo.article.content,
          }}
        />
        <span className="text-right text-sm">
          {naverNewsDetailData.articleInfo.copyright}
        </span>
      </div>
    </div>
  );
};

export default NewsDetailPage;
