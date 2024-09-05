import { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { motion, useAnimation, useScroll } from 'framer-motion';

import logo from '../../assets/images/logo/logo_white.png';

const NavigationBar = () => {
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
    <nav className="fixed top-0 z-50 flex w-full flex-col items-center bg-[#231F20] px-20 py-6 text-white">
      <div className="flex w-full justify-end">
        <ul className="flex space-x-4">
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="rounded-md border border-white px-3 py-1 text-white transition-all duration-200 hover:bg-white hover:text-red-800"
            >
              JOIN US
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-2 flex justify-between text-2xl font-bold">
        <ul className="flex">
          <li className="w-40 text-right">
            <Link to="/introduce">KT WIZ</Link>
          </li>
          <li className="w-40 text-right">
            <Link to="/wiz-park">WIZ PARK</Link>
          </li>
          <li className="mr-44 w-40 text-right">
            <Link to="/direction">DIRECTION</Link>
          </li>
        </ul>
        <ul className="flex">
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
          <li className="w-40 text-left">
            <Link to="/game">GAME</Link>
          </li>
          <li className="w-40 text-left">
            <Link to="/player">PLAYER</Link>
          </li>
          <li className="w-40 text-left">
            <Link to="/news">NEWS</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
