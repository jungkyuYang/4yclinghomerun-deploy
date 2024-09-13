import { cn } from '@/utils/cn';

type TabNavigationProps = {
  tabList: string[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};

const TabNavigation = ({
  tabList,
  selectedTab,
  setSelectedTab,
}: TabNavigationProps) => {
  const activeStyle =
    'border-b-rose-500 font-bold text-rose-500 transition-all duration-200';

  return (
    <>
      <ul className="flex justify-center gap-1 text-xl">
        {tabList.map((tabName, index) => (
          <li
            key={tabName}
            className={cn(
              selectedTab === index ? activeStyle : '',
              'cursor-pointer border-b px-6 py-3',
            )}
            onClick={() => setSelectedTab(index)}
          >
            {tabName}
          </li>
        ))}
      </ul>
    </>
  );
};
export default TabNavigation;
