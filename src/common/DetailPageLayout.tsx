import { motion } from 'framer-motion';
import { MdArrowDownward } from 'react-icons/md';

import Footer from '@/components/footer/Footer';

type DetailPageLayoutProps = {
  topImg: string;
  title: string;
  subTitle: string;
  children: React.ReactNode;
};

const DetailPageLayout = ({
  topImg,
  title,
  subTitle,
  children,
}: DetailPageLayoutProps) => {
  return (
    <div className="relative min-h-screen">
      {/* 상단 이미지 */}
      <div className="fixed left-0 top-0 h-full w-full">
        <img
          src={topImg}
          alt="topImg"
          className="h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-55"></div>
      </div>

      <div className="relative z-10">
        {/* 상단 타이틀 */}
        <div className="flex h-[65vh] flex-col items-center justify-center gap-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-extrabold text-white shadow-inner">
              {title}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl font-extrabold text-gray-200 shadow-inner"
          >
            {subTitle}
          </motion.p>
        </div>

        {/* 스크롤 컨텐츠 */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="bg-gradient-to-b relative h-64 w-full from-transparent via-black/60 to-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <MdArrowDownward size={50} color="white" />
              </motion.div>
            </div>
          </div>
          <div className="bg-black p-4 px-20 text-white">
            <div className="h-full">{children}</div>
          </div>
        </motion.div>
      </div>
      <div className="bg-gradient-to-b relative h-44 w-full from-black via-transparent to-white"></div>
      <footer className="relative z-20">
        <Footer />
      </footer>
    </div>
  );
};

export default DetailPageLayout;
