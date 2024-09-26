import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROUTER_PATH } from '@/constants/constant';
import Layout from './Layout';
import HomePage from '@/pages/HomePage';
import IntroductionPage from '@/pages/Introduction/IntroductionPage';
import WizParkPage from '@/pages/wiz-park/WizParkPage';
import DirectionPage from '@/pages/DirectionPage';
import GamePage from '@/pages/game/GamePage';
import PlayerPage from '@/pages/PlayerPage';
import NewsPage from '@/pages/news/NewsPage';
import LoginPage from '@/pages/LoginPage';
import SingupPage from '@/pages/SignupPage';
import IntroductionClub from '@/pages/Introduction/IntroductionClub';
import IntroductionHistory from '@/pages/Introduction/IntroductionHistory';
import TeamRankingPage from '@/pages/game/ranking/TeamRankingPage';
import PlayerRankingPage from '@/pages/game/ranking/PlayerRankingPage';
import CrowdRankingPage from '@/pages/game/ranking/CrowdRankingPage';
import RankingPage from '@/pages/game/RankingPage';

import SchedulePage from '@/pages/game/SchedulePage';
import BoxScorePage from '@/pages/game/BoxScorePage';
import WatchPointPage from '@/pages/game/WatchPointPage';
import NewsDetailPage from '@/pages/news/NewsDetailPage';
import WizParkIntro from '@/pages/wiz-park/WizParkIntro';
import WizParkGuide from '@/pages/wiz-park/WizParkGuide';
import PitcherPage from '@/pages/player/pitcher/PitcherPage';
import PitcherDetailPage from '@/pages/player/pitcher/PitcherDetailPage';
import HitterPage from '@/pages/player/hitter/HitterPage';
import HitterDetailPage from '@/pages/player/hitter/HitterDetailPage';
import CheerPage from '@/pages/player/cheer/CheerPage';
import CheerDetailPage from '@/pages/player/cheer/CheerDetailPage';
import CoachPage from '@/pages/player/coach/CoachPage';
import CoachDetailPage from '@/pages/player/coach/CoachDetailPage';

const Router = () => {
  const {
    HOME,
    INTRODUCE,
    INTRODUCE_ABOUT,
    INTRODUCE_HISTORY,
    WIZ_PARK,
    WIZ_PARK_INTRO,
    WIZ_PARK_GUIDE,
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
        {
          path: WIZ_PARK,
          element: <WizParkPage />,
          children: [
            { path: WIZ_PARK_INTRO, element: <WizParkIntro /> },
            { path: WIZ_PARK_GUIDE, element: <WizParkGuide /> },
          ],
        },
        { path: DIRECTION, element: <DirectionPage /> },
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
        {
          path: PLAYER,
          element: <PlayerPage />,
          children: [
            { path: 'coach', element: <CoachPage /> },
            { path: 'coach/detail/:id', element: <CoachDetailPage /> },
            { path: 'pitcher', element: <PitcherPage /> },
            { path: 'pitcher/detail/:id', element: <PitcherDetailPage /> },
            { path: 'hitter', element: <HitterPage /> },
            { path: 'hitter/detail/:id', element: <HitterDetailPage /> },
            { path: 'cheer', element: <CheerPage /> },
            { path: 'cheer/detail/:id', element: <CheerDetailPage /> },
          ],
        },
        {
          path: `${NEWS}/:tab`,
          element: <NewsPage />,
          children: [
            { path: `${NEWS}/:tab/detail/:id`, element: <NewsDetailPage /> },
          ],
        },
        { path: LOGIN, element: <LoginPage /> },
        { path: SIGNUP, element: <SingupPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
