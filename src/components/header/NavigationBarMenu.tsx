import { ROUTER_PATH } from '@/constants/constant';
import { Link } from 'react-router-dom';

const NavigationBarMenu = () => {
  const { INTRODUCE, WIZ_PARK, DIRECTION, GAME, PLAYER, NEWS } = ROUTER_PATH;
  return (
    <div className="flex w-full justify-between text-2xl font-bold">
      <ul className="flex w-1/2 justify-between">
        <li>
          <Link to={INTRODUCE}>KT WIZ</Link>
        </li>
        <li>
          <Link to={WIZ_PARK}>WIZ PARK</Link>
        </li>
        <li>
          <Link to={DIRECTION}>DIRECTION</Link>
        </li>
      </ul>
      <div className="w-60" />
      <ul className="flex w-1/2 justify-between">
        <li>
          <Link to={GAME}>GAME</Link>
        </li>
        <li>
          <Link to={PLAYER}>PLAYER</Link>
        </li>
        <li>
          <Link to={NEWS}>NEWS</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBarMenu;
