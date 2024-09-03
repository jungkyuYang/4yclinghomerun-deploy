import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="flex items-center justify-between bg-red-900 px-20 py-6 font-bold text-white">
      <div className="space-x-6">
        <ul className="flex space-x-6">
          <li>
            <Link to="/">OUR LOGO</Link>
          </li>
          <li>
            <Link to="/introduce">KT WIZ</Link>
          </li>
          <li>
            <Link to="/wiz-park">WIZ PARK</Link>
          </li>
          <li>
            <Link to="/direction">DIRECTION</Link>
          </li>
          <li>
            <Link to="/game">GAME</Link>
          </li>
          <li>
            <Link to="/player">PLAYER</Link>
          </li>
          <li>
            <Link to="/news">NEWS</Link>
          </li>
        </ul>
      </div>

      <div className="space-x-4">
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
    </nav>
  );
};

export default NavigationBar;
