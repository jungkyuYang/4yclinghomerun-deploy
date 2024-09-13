import { Link } from 'react-router-dom';

import { MdDateRange } from 'react-icons/md';
import { GrFormView } from 'react-icons/gr';

import { formatTimeStamp } from '@/utils/formattingDate';
import { TWNewsItem } from '@/types/wNews';

type NewsListProps = {
  newsItems: TWNewsItem[];
};

const NewsList = ({ newsItems }: NewsListProps) => {
  return (
    <ul>
      {newsItems.map((news) => (
        <li
          key={news.updDttm}
          className="group m-4 rounded-sm bg-gradient-to-r from-kt-black-5 to-transparent transition duration-200 hover:bg-gradient-to-l"
        >
          <Link to={``} className="flex gap-4">
            {news.thumbImgUrl && (
              <img
                src={news.thumbImgUrl}
                alt={news.artcTitle}
                width={300}
                className="border-8 border-kt-black-5 transition-all duration-200 group-hover:border-kt-gray-1"
              />
            )}
            <div className="flex w-full justify-between">
              <p className="w-4/5 px-3 py-6">
                <h3 className="mb-3 text-2xl font-bold">{news.artcTitle}</h3>
                <span>{news.artcContents}</span>
              </p>
              <p className="w-1/5 p-3">
                <span className="flex items-center justify-end gap-1">
                  {formatTimeStamp(news.updDttm)}
                  <MdDateRange />
                </span>
                <span className="flex items-center justify-end gap-1">
                  {news.viewCnt}
                  <GrFormView />
                </span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
