import { cn } from '@/utils/cn';

const CardItem = () => {
  return (
    <>
      <div className="group h-[348px] [perspective:1100px]">
        <div className="relative h-full w-full bg-[linear-gradinet(-12deg,_#FFBEA_50%,#fff_50%)] duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div
            className={cn(
              'card-dynamic-size card-front-back',
              `bg-[linear-gradient(-12deg,_#ffffff_50%,#35383E_50%)]`,
            )}
          >
            선수이름
          </div>

          <div
            className={cn(
              'card-dynamic-size card-front-back rotate-y-180',
              'bg-[linear-gradient(-12deg,_#35383E_50%,#ffffff_50%)]',
            )}
          >
            선수정보
          </div>
        </div>
      </div>
    </>
  );
};
export default CardItem;
