import { motion } from 'framer-motion';

import PlayerCompareSkeleton from './PlayerCompareSkeleton';
import HotColdZoneSkeleton from './HotColdZoneSkeleton';

const TopPlayerSkeleton = () => {
  return (
    <motion.main
      className="w-full p-8"
      animate={{
        opacity: [0.7, 1, 0.7],
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      <section className="flex items-center justify-center gap-12">
        <HotColdZoneSkeleton />
        <PlayerCompareSkeleton />
        <HotColdZoneSkeleton />
      </section>
    </motion.main>
  );
};

export default TopPlayerSkeleton;
