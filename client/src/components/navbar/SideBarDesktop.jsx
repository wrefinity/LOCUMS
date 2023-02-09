import React from "react";
import { Link } from "react-router-dom";


const SideBarDesktop = ({ showNav, setShowNav }) => {
   return (
      // <!-- sidebar  -->
      // <!-- sidebar part here -->
      <nav className="sidebar">
         <div className="logo d-flex justify-content-between">
            <a href="index.html">
               <img src="img/logo.png" alt="" />
            </a>
            <div className="sidebar_close_icon d-lg-none">
               <i className="ti-menu"></i>
            </div>
            <div
               className="sidebar_close_icon d-lg-none"
               onClick={() => setShowNav(!showNav)}
            >
               <i className="ti-close"></i>
            </div>
         </div>
         <ul id="sidebar_menu">
            <li className="">
               <Link to="/dash">
                  {/* <!-- <i className="fas fa-th"></i> --> */}
                  <img src="img/menu-icon/1.svg" alt="" />
                  <span>Dashboard</span>
               </Link>
            </li>
            <li className="">
               <Link to="/shifts">
                  {/* <!-- <i className="fas fa-th"></i> --> */}
                  <img src="img/menu-icon/1.svg" alt="" />
                  <span>Add Shift</span>
               </Link>
            </li>

            <li className="">
               <Link to="/branches">
                  {/* <!-- <i className="fas fa-th"></i> --> */}
                  <img src="img/menu-icon/1.svg" alt="" />
                  <span>Branches</span>
               </Link>
            </li>
            <li className="">
               <Link to="/locums">
                  {/* <!-- <i className="fas fa-th"></i> --> */}
                  <img src="img/menu-icon/1.svg" alt="" />
                  <span>Aproved Locums </span>
               </Link>
            </li>
            <li className="">
               <Link to="/hubs">
                  {/* <!-- <i className="fas fa-th"></i> --> */}
                  <img src="img/menu-icon/1.svg" alt="" />
                  <span> CPD Hub</span>
               </Link>
            </li>
            <li className="">
               <Link to="/resources_hubs">
                  {/* <!-- <i className="fas fa-th"></i> --> */}
                  <img src="img/menu-icon/1.svg" alt="" />
                  <span> Resource Hub</span>
               </Link>
            </li>

            <li className="">
               <Link to="/jobs">
                  <i className="fa fa-user" style={{ fontSize: "1.4rem" }}></i>
                  <span>PostJobs</span>
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
   );
};

export default SideBarDesktop;