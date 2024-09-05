import { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { motion, useAnimation, useScroll } from 'framer-motion';

import logo from '../../assets/images/logo/logo_white.png';

const NavigationBarLogo = () => {
  const location = useLocation();
  const [yPos, setYPos] = useState(
    window.innerHeight / 2 - window.innerHeight / 8,
  );
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (location.pathname !== '/') {
      controls.set({ scale: 1, y: 0 });
    }
  }, [location.pathname]);

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
  }, [scrollYProgress]);

  return (
    <Link to="/" className="fixed left-0 right-0 top-7 mx-auto size-24">
      <motion.img
        src={logo}
        className="drop-shadow-[0_11px_6px_rgb(0,0,0)]"
        initial={{
          scale: 4,
          y: yPos,
        }}
        animate={controls}
      />
    </Link>
  );
};

export default NavigationBarLogo;
