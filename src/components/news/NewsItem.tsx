import { Link } from 'react-router-dom';

import { TNewsTest } from '@/types/news';

const NewListItem = ({ albumId, id, title, url, thumbnailUrl }: TNewsTest) => {
  return (
    <>
      <li className="w-[400px] list-none">
        <Link to={`/news/${id}`}>
          <div
            style={{
              backgroundImage: `url(${thumbnailUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            className="relative h-[520px] w-full after:invisible after:block after:h-full after:w-full after:bg-[#35393E]"
          >
            <div className="absolute left-2/4 top-2/4 z-10 translate-x-2/4 translate-y-2/4">
              <span>기사보기</span>
            </div>
          </div>
          <h4 className="mb-1 mt-2.5 truncate text-xl font-semibold">
            {title}
          </h4>
          <p className="text-[#717781]">2024.09.05</p>
        </Link>
      </li>
    </>
  );
};
export default NewListItem;
