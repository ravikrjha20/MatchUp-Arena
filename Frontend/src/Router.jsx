import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  About,
  Dashboard,
  Error,
  Logout,
  HomePageMinor,
  LearnMore,
  LoginPage,
  Register,
  PlayWithBot,
} from "./Pages";
import PlayWithComputer from "./Pages/Play/PlayWithComp";
import OfflineBoard from "./component/OfflineBoard";
import Profile from "./Pages/ProfilePage";
import MatchmakingPage from "./Pages/Play/MatchMaking";
import SearchResultsPage from "./Pages/SearchResultsPage";
import GameBoard from "./Pages/PlayGround";
import PlayWithFriendPage from "./Pages/Play/PlayWithFriend";

// Create and export the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePageMinor />,
        errorElement: <Error />,
      },
      {
        path: "search",
        element: <SearchResultsPage />,
      },
      {
        path: "About",
        element: <About />,
        errorElement: <Error />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: "1v1/friend/online",
        element: <PlayWithFriendPage />, // Placeholder
        errorElement: <Error />,
      },
      {
        path: "1v1/friend/offline",
        element: <OfflineBoard />, // Placeholder
        errorElement: <Error />,
      },
      {
        path: "online/quick",
        element: <MatchmakingPage />, // Placeholder
        errorElement: <Error />,
      },
      {
        path: "online/quick/letsplay",
        element: <GameBoard />, // Placeholder
        errorElement: <Error />,
      },
      {
        path: "/online/tournaments",
        element: <About />, // Placeholder
        errorElement: <Error />,
      },
      {
        path: "/computer",
        element: <PlayWithBot />, // Placeholder
        errorElement: <Error />,
      },
      {
        path: "/computer/game",
        element: <PlayWithComputer />,
        errorElement: <Error />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/logout",
    element: <Logout />,
  },
]);

export default router;
