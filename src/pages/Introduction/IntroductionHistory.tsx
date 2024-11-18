import { useEffect, useRef } from 'react';

import { useScroll } from 'framer-motion';

import { IntroductionHistoryData } from '@/mocks/introduction/MockIntroductionHistory';
import IntroductionHistoryItem from '@/components/introduction/IntroductionHistoryItem';

const IntroductionHistory = () => {
  const cardFrameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll({
    container: scrollContainerRef,
    layoutEffect: false,
  });

  useEffect(() => {
    const scrollContainer = document.querySelector(
      '.scrollbar-custom',
    ) as HTMLElement | null;
    scrollContainerRef.current = scrollContainer;

    const containerHeight = containerRef.current?.offsetHeight || 0;
    const stickyBoxHeight = scrollContainerRef.current?.clientHeight ?? 0;

    const handleScroll = () => {
      if (!containerRef.current || !cardFrameRef.current) return;

      const scrollPosition = scrollY.get();
      const containerTop = containerRef.current.offsetTop;
      const containerBottom = containerTop + containerHeight;
      const cardFrameWidth = (IntroductionHistoryData.length / 2) * 120;

      if (scrollPosition >= containerTop && scrollPosition <= containerBottom) {
        const progress =
          (scrollPosition - containerTop) / (containerHeight - stickyBoxHeight);
        cardFrameRef.current.style.transform = `translateX(${100 - progress * cardFrameWidth}%)`;
      }
    };

    scrollY.on('change', handleScroll);
    return () => scrollY.clearListeners();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full">
      <div className="absolute inset-0 z-10">
        <div className="pointer-events-none h-full w-full bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
      </div>
      <div className="sticky top-28 h-screen w-full items-center overflow-hidden">
        <div
          ref={cardFrameRef}
          className="absolute flex h-[80vh] w-full translate-x-full transform items-center justify-evenly gap-20"
          style={{ flexBasis: 'auto' }}
        >
          {IntroductionHistoryData.map((item) => (
            <IntroductionHistoryItem listItem={item} key={item.year} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default IntroductionHistory;
