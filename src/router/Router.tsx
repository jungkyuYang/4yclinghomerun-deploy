import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Layout';
import HomePage from '@/pages/HomePage';
import IntroductionPage from '@/pages/IntroductionPage';
import WizParkPage from '@/pages/WizParkPage';
import DirectionPage from '@/pages/DirectionPage';
import GamePage from '@/pages/GamePage';
import PlayerPage from '@/pages/PlayerPage';
import NewsPage from '@/pages/news/NewsPage';
import LoginPage from '@/pages/LoginPage';
import SingupPage from '@/pages/SignupPage';
import { ROUTER_PATH } from '@/constants/constant';
import NewsDetailPage from '@/pages/news/NewsDetailPage';

const Router = () => {
  const {
    HOME,
    INTRODUCE,
    WIZ_PARK,
    DIRECTION,
    GAME,
    PLAYER,
    NEWS,
    LOGIN,
    SIGNUP,
  } = ROUTER_PATH;
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: HOME, element: <HomePage /> },
        { path: INTRODUCE, element: <IntroductionPage /> },
        { path: WIZ_PARK, element: <WizParkPage /> },
        { path: DIRECTION, element: <DirectionPage /> },
        { path: GAME, element: <GamePage /> },
        { path: PLAYER, element: <PlayerPage /> },
        {
          path: `${NEWS}/*`,
          element: <NewsPage />,
          children: [{ path: 'detail/:id', element: <NewsDetailPage /> }],
        },
        { path: LOGIN, element: <LoginPage /> },
        { path: SIGNUP, element: <SingupPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
