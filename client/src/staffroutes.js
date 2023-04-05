import Profile from "views/staff/Profile.js";

import { FiUser } from "react-icons/fi";

var routes = [
  // {
  //   path: "/sales_service",
  //   name: "Provide Service",
  //   icon: <FaMoneyBillAlt size="28" />,
  //   component: SaleService,
  //   layout: "/staff",
  // },

  {
    path: "/profile",
    name: "Profile",
    icon: <FiUser size="28" />,
    component: Profile,
    layout: "/staff",
  },
];
export default routes;
