import { NavLink } from 'react-router-dom';

const PlayerNavBar = () => {
  return (
    <>
      <nav className="flex w-full justify-between text-2xl font-bold">
        <ul className="flex w-1/2 justify-between">
          <li>
            <NavLink
              to={INTRODUCE}
              className={({ isActive }) =>
                isActive
                  ? activeStyle
                  : 'transition-all duration-200 hover:text-rose-400'
              }
            >
              KT WIZ
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default PlayerNavBar;
