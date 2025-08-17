import { FaHome, FaGamepad, FaGlobe, FaRobot, FaUser } from "react-icons/fa";

export const getNavData = (user) => [
  {
    label: "Home",
    icon: <FaHome className='text-lg' />,
    children: [
      {
        label: "Home",
        path: "/",
      },
      {
        label: "About",
        path: "/about",
      },
    ],
  },
  {
    label: "With Friend",
    icon: <FaGamepad className='text-lg' />,
    children: [
      {
        label: "Online",
        path: "/1v1/friend/online",
      },
      {
        label: "Offline",
        path: "/1v1/friend/offline",
      },
    ],
  },
  {
    label: "Play Online",
    icon: <FaGlobe className='text-lg' />,
    children: [
      {
        label: "Quick Match",
        path: "/online/quick",
      },
      {
        label: "Tournaments",
        path: "/online/tournaments",
      },
    ],
  },
  {
    label: "Play vs Computer",
    icon: <FaRobot className='text-lg' />,
    children: [
      {
        label: "Easy",
        path: "/computer/game?difficulty=easy",
      },
      {
        label: "Medium",
        path: "/computer/game?difficulty=medium",
      },
      {
        label: "Hard",
        path: "/computer/game?difficulty=hard",
      },
    ],
  },
  {
    label: user?.name || "Login",
    icon: user?.avatar || <FaUser className='text-lg' />,
    tab: "Profile",
    authOnly: true,
    children: user
      ? [
          {
            label: "Profile",
            path: `/profile/${user?.username || "null"}`,
          },
          {
            label: "Settings",
            path: "/profile/settings",
          },
          {
            label: "Logout",
            path: "/auth/logout",
          },
        ]
      : [
          {
            label: "Login",
            path: "/auth/login",
          },
          {
            label: "Sign Up",
            path: "/auth/register",
          },
        ],
  },
];
