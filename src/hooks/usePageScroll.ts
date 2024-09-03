import { useState, useEffect, useRef } from 'react';

type Section = {
  id: string;
  content: React.ReactNode;
  color: string;
  className?: string;
};

type UsePageScrollOptions = {
  sections: Section[];
  initialSection?: number;
};

interface TouchEventWithPrevY extends TouchEvent {
  prevTouchY?: number;
}

export const usePageScroll = ({
  sections,
  initialSection = 0,
}: UsePageScrollOptions) => {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent | TouchEvent) => {
      event.preventDefault();

      if (scrollTimeout.current) return;

      let delta = 0;
      if (event instanceof WheelEvent) {
        delta = event.deltaY;
      } else if (event instanceof TouchEvent) {
        const touch = event.touches[0];
        const touchEvent = event as TouchEventWithPrevY;
        delta = touch.clientY - (touchEvent.prevTouchY ?? touch.clientY);
        touchEvent.prevTouchY = touch.clientY;
      }

      if (delta > 0 && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
      } else if (delta < 0 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
      }

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 1000);
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touchEvent = event as TouchEventWithPrevY;
      touchEvent.prevTouchY = event.touches[0].clientY;
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [currentSection, sections.length]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const index = sections.findIndex((section) => section.id === hash);
      if (index !== -1) {
        setCurrentSection(index);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [sections]);

  useEffect(() => {
    window.location.hash = sections[currentSection].id;
  }, [currentSection, sections]);

  return { currentSection };
};
