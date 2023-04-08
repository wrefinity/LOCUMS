import React from "react";
import { Link } from "react-router-dom";

const SideBarMobile = ({ showNav, setShowNav }) => {
   return (
      // <!-- sidebar  -->
      // <!-- sidebar part here -->
      <nav
         className="sidebar"
         style={{ zIndex: 100, left: showNav ? -10 : "100%" }}
      >
         <div className="logo d-flex justify-content-between">
            <a href="index.html">
               <img src="img/logo.png" alt="" />
            </a>
            <div
               className="sidebar_close_icon d-lg-none"
               onClick={() => setShowNav(!showNav)}
            >
               <i className="ti-close"></i>
            </div>
         </div>
         <ul id="sidebar_menu">
            <li className="">
               <Link to="/">
                  {/* <!-- <i className="fas fa-th"></i> --> */}
                  <img src="img/menu-icon/1.svg" alt="" />
                  <span>Dashboard</span>
               </Link>
            </li>
            <li className="">
               <Link to="/login">
                  <i
                     className="fa fa-sign-in-alt"
                     style={{ fontSize: "1.4rem" }}
                  ></i>
                  <span>Login</span>
               </Link>
            </li>
            <li className="">
               <Link to="/register">
                  <i className="fa fa-user" style={{ fontSize: "1.4rem" }}></i>
                  <span>Register</span>
               </Link>
            </li>
            <li className="">
               <Link to="/faq">
                  <i className="fa fa-question"></i>
                  <span>FAQ</span>
               </Link>
            </li>
         </ul>
      </nav>
      // {/* <!-- sidebar part end -->
      //  <!--/ sidebar  --> */}
   );
};

export default SideBarMobile;
