import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROUTER_PATH } from '@/constants/constant';
import Layout from './Layout';
import HomePage from '@/pages/HomePage';
import IntroductionPage from '@/pages/Introduction/IntroductionPage';
import WizParkPage from '@/pages/WizParkPage';
import DirectionPage from '@/pages/DirectionPage';
import GamePage from '@/pages/Game/GamePage';
import PlayerPage from '@/pages/PlayerPage';
import NewsPage from '@/pages/news/NewsPage';
import LoginPage from '@/pages/LoginPage';
import SingupPage from '@/pages/SignupPage';
import IntroductionClub from '@/pages/Introduction/IntroductionClub';
import IntroductionHistory from '@/pages/Introduction/IntroductionHistory';
import TeamRankingPage from '@/pages/Game/ranking/TeamRankingPage';
import PlayerRankingPage from '@/pages/Game/ranking/PlayerRankingPage';
import CrowdRankingPage from '@/pages/Game/ranking/CrowdRankingPage';
import RankingPage from '@/pages/Game/RankingPage';
import CoachPage from '@/pages/Player/CoachPage';
import PitcherPage from '@/pages/Player/PitcherPage';
import HitterPage from '@/pages/Player/HitterPage';
import CheerPage from '@/pages/Player/CheerPage';
import SchedulePage from '@/pages/Game/SchedulePage';
import BoxScorePage from '@/pages/Game/BoxScorePage';
import WatchPointPage from '@/pages/Game/WatchPointPage';
import NewsDetailPage from '@/pages/news/NewsDetailPage';

const Router = () => {
  const {
    HOME,
    INTRODUCE,
    INTRODUCE_ABOUT,
    INTRODUCE_HISTORY,
    WIZ_PARK,
    DIRECTION,
    GAME,
    GAME_RANKING,
    GAME_RANKING_TEAM,
    GAME_RANKING_BATTER,
    GAME_RANKING_PICHER,
    GAME_RANKING_CROWND,
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
        {
          path: INTRODUCE,
          element: <IntroductionPage />,
          children: [
            { path: INTRODUCE_ABOUT, element: <IntroductionClub /> },
            { path: INTRODUCE_HISTORY, element: <IntroductionHistory /> },
          ],
        },
        { path: WIZ_PARK, element: <WizParkPage /> },
        { path: DIRECTION, element: <DirectionPage /> },
        { path: PLAYER, element: <PlayerPage /> },
        {
          path: PLAYER,
          element: <PlayerPage />,
          children: [
            { path: 'coach', element: <CoachPage /> },
            { path: 'pitcher', element: <PitcherPage /> },
            { path: 'hitter', element: <HitterPage /> },
            { path: 'cheer', element: <CheerPage /> },
          ],
        },
        { path: NEWS, element: <NewsPage /> },
        {
          path: GAME,
          element: <GamePage />,
          children: [
            { path: 'schedule', element: <SchedulePage /> },
            { path: 'boxscore', element: <BoxScorePage /> },
            {
              path: GAME_RANKING,
              element: <RankingPage />,
              children: [
                { path: GAME_RANKING_TEAM, element: <TeamRankingPage /> },
                { path: GAME_RANKING_PICHER, element: <PlayerRankingPage /> },
                { path: GAME_RANKING_BATTER, element: <PlayerRankingPage /> },
                { path: GAME_RANKING_CROWND, element: <CrowdRankingPage /> },
              ],
            },
            { path: 'watchpoint', element: <WatchPointPage /> },
          ],
        },
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
