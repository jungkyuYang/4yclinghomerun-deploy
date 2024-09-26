import { motion } from 'framer-motion';

const BarGraphSkeleton = () => {
  return (
    <div className="h-[95%] w-full rounded-lg p-4">
      <div className="flex h-full w-full items-end">
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="mx-0.5 h-full flex-grow"
            initial={{ height: '20%' }}
            animate={{ height: ['20%', '80%', '20%'], opacity: [1, 0.7, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.05,
            }}
          >
            <div className="h-full w-full rounded-t-sm bg-gray-600" />
          </motion.div>
        ))}
      </div>
      <div className="mt-2 h-4 w-full rounded bg-gray-600" />
    </div>
  );
};

export default BarGraphSkeleton;
