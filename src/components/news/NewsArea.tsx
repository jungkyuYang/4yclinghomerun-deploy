import { Link } from 'react-router-dom';

import { TNewsTest } from '@/types/news';
import NewListItem from './NewsItem';

export const NewsArea = ({
  news,
  title,
  isError,
}: {
  news: TNewsTest[];
  title: string;
  isError: boolean;
}) => {
  if (isError) {
    throw new Error('Error');
  }
  // api 요청값을 4개만 출력되도록 임의로 설정
  const newsTest = news.slice(0, 4);
  return (
    <article className="w-full table-auto align-middle">
      <div className="m-auto max-w-[1720px]">
        <section className="flex flex-row items-end justify-between">
          <div className="relative inline-flex items-center overflow-hidden">
            <h2 className="text-7xl font-bold tracking-tight">{title}</h2>
            <img
              src="/src/assets/logo/KTwiz_logo.svg"
              alt="로고"
              className="ml-[20px] w-[60px]"
            />
          </div>
          <button>
            <span className="inline-flex h-14 w-36 items-center justify-center border border-black text-center font-bold hover:bg-[#000000] hover:text-[#FFFFFF]">
              <Link to={`/news`}>더보기</Link>
            </span>
          </button>
        </section>
        <ul className="mt-14 flex flex-row justify-between">
          {newsTest.map((newsItem) => (
            <NewListItem key={newsItem.id} {...newsItem} />
          ))}
        </ul>
      </div>
    </article>
  );
};
