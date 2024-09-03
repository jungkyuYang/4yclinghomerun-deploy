import { Outlet } from 'react-router-dom';

import NavigationBar from '@/components/header/NavigationBar';
import Footer from '@/components/footer/Footer';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />
      <div className="min-h-screen flex-shrink-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
