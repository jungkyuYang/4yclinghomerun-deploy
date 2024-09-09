import { Link } from 'react-router-dom';

type DropdownItemProps = {
  children: React.ReactNode;
  to: string;
};

const DropdownItem = ({ children, to }: DropdownItemProps) => {
  return (
    <Link to={to}>
      <li className="cursor-pointer px-4 py-2 transition-all duration-200 hover:bg-gray-100">
        {children}
      </li>
    </Link>
  );
};

export default DropdownItem;
