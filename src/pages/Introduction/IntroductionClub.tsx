import { useRef } from 'react';

import { useInView, motion } from 'framer-motion';

import { IntroductionClubData } from '@/mocks/introduction/MockIntroductionClub';
import h1Border from '@/assets/introduction/history_h1_border.png';

const IntroductionClub = () => {
  return (
    <div className="flex flex-col gap-36">
      {IntroductionClubData.map((data, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });

        return (
          <motion.div
            ref={ref}
            className={`flex gap-20 ${index % 2 === 0 && 'flex-row-reverse'}`}
            key={data.id}
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl font-bold text-kt-red-2">
                {data.header}
              </h1>
              <img src={h1Border} className="w-48" />
              <p className="text-lg">{data.desc}</p>
            </div>
            {data.img && <img src={data.img} />}
          </motion.div>
        );
      })}
    </div>
  );
};
export default IntroductionClub;
