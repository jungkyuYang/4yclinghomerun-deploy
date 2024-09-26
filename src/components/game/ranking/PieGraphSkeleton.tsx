import { motion } from 'framer-motion';

const PieGraphSkeleton = () => {
  return (
    <div className="flex size-[360px] flex-col border-2 border-kt-gray-2 p-4">
      <svg width="80%" height="80%" viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="transparent"
          stroke="#4B5563"
          strokeWidth="15"
          strokeDasharray="251.2"
          strokeDashoffset="0"
          initial={{ strokeDashoffset: 251.2 }}
          animate={{ strokeDashoffset: 0, opacity: [1, 0.7, 1] }}
          transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity }}
        />
      </svg>
      <div className="mt-10 flex justify-around">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-4 w-12 rounded bg-gray-600"></div>
        ))}
      </div>
    </div>
  );
};
export default PieGraphSkeleton;
