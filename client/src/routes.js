import Dashboard from "views/Dashboard.js";
import Profile from "views/Profile.js";
import AddJob from "views/AddJob.js";
import Approvals from "views/Approvals";
import Users from "views/Users";
import Jobs from "views/Jobs";
import Branches from "views/Branches";
import Changes from "views/Changes.js";
import { HiUsers } from "react-icons/hi";
import { FiPackage, FiUser } from "react-icons/fi";
import { RiDashboardFill, RiAddBoxFill, RiBookReadFill } from "react-icons/ri";
import { FaMoneyBillAlt, FaScrewdriver } from "react-icons/fa";
export const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <RiDashboardFill size="28" />,
    component: Dashboard,
    layout: "/admin",
  },

  {
    path: "/branches",
    name: "Branches",
    icon: <FaMoneyBillAlt size="28" />,
    component: Branches,
    layout: "/admin",
  },

  {
    path: "/Jobs",
    name: "Jobs",
    icon: <FaScrewdriver size="28" />,
    component: Jobs,
    layout: "/admin",
  },

  {
    path: "/users",
    name: "Users",
    icon: <HiUsers size="28" />,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/approvals",
    name: "Locum Approvals",
    icon: <FiPackage size="28" />,
    component: Approvals,
    layout: "/admin",
  },
  {
    path: "/changes",
    name: "Track Changes",
    icon: <RiBookReadFill size="28" />,
    component: Changes,
    layout: "/admin",
  },

  {
    path: "/profile",
    name: "Profile",
    icon: <FiUser size="28" />,
    component: Profile,
    layout: "/admin",
  },
];

export const hidden = [
  {
    path: "/addjob",
    name: "Add Job",
    icon: <RiAddBoxFill size="28" />,
    component: AddJob,
    layout: "/admin",
  },
];
