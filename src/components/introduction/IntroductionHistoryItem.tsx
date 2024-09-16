import { TIntroductionHistory } from '@/types/IntroductionHistory';
import { motion } from 'framer-motion';

type THistoryItemProps = {
  cardRef: React.MutableRefObject<null>;
  listItem: TIntroductionHistory;
  isCardInView: boolean;
};

const IntroductionHistoryItem = ({
  cardRef,
  listItem,
  isCardInView,
}: THistoryItemProps) => {
  return (
    <motion.div
      ref={cardRef}
      initial={{ rotateY: 0 }}
      key={listItem.year}
      className="relative flex h-4/5 w-[50vw] items-center justify-center"
      style={{
        transformStyle: 'preserve-3d',
        flexGrow: 0,
        flexShrink: 0,
      }}
      animate={{ rotateY: isCardInView ? 180 : 0 }}
      transition={{ duration: 1 }}
    >
      <section
        className="absolute flex h-full w-full transform items-center justify-center gap-10 rounded-lg bg-gradient-to-br from-kt-white to-kt-gray-2 p-10"
        style={{ transform: 'rotateY(180deg)' }}
      >
        <h1
          className="text-7xl font-semibold text-transparent"
          style={{
            WebkitTextStroke: '1px #35383e',
          }}
        >
          {listItem.year}
        </h1>
        <main className="border-l-2 border-kt-gray-1 p-3">
          {listItem.desc.map((desc) => {
            if (desc === '') {
              return <br />;
            } else {
              return <li className="flex text-kt-gray-1">{desc}</li>;
            }
          })}
        </main>
      </section>
      <section className="absolute flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-kt-white to-kt-gray-2 p-1 [backface-visibility:hidden]">
        <img src={listItem.img} className="h-full w-full rounded-lg" />
      </section>
    </motion.div>
  );
};
export default IntroductionHistoryItem;
