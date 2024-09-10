import { useEffect, useLayoutEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { motion, useAnimation, useScroll } from 'framer-motion';

import logo from '@/assets/logo/logo_gray_3d.svg';

const NavigationBarLogo = () => {
  const location = useLocation();
  const [yPos, setYPos] = useState(
    window.innerHeight / 2 - window.innerHeight / 8,
  );
  const [isScrolled, setIsScrolled] = useState(true);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();

  useLayoutEffect(() => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
      controls.set({ scale: 1, y: 0 });
    } else {
      setIsScrolled(false);
      controls.set({ scale: 4, y: yPos });
    }
  }, [controls, yPos]);

  useEffect(() => {
    if (location.pathname !== '/') {
      controls.set({ scale: 1, y: 0 });
    }
  }, [location.pathname, controls]);

  useEffect(() => {
    const handleScroll = () => {
      const progress = scrollYProgress.get();

      if (progress > 0 && progress <= 0.07) {
        setYPos(window.innerHeight / 2 - window.innerHeight / 8);
        controls.start({
          scale: 4,
          y: yPos,
          transition: {
            ease: 'easeIn',
          },
        });
      } else if (progress > 0.07) {
        controls.start({
          scale: 1,
          y: 0,
          transition: {
            ease: 'easeOut',
          },
        });
      }
    };
    scrollYProgress.on('change', handleScroll);
  }, [scrollYProgress, controls, yPos]);

  return (
    <Link to="/" className="fixed left-0 right-0 top-2 mx-auto size-24">
      <motion.img
        src={logo}
        className="drop-shadow-[0_11px_6px_rgb(0,0,0)]"
        initial={isScrolled ? { scale: 1, y: 0 } : { scale: 4, y: yPos }}
        animate={controls}
      />
    </Link>
  );
};

export default NavigationBarLogo;
