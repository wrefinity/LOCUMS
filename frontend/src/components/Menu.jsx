import React, { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setLogout, getUser } from "../Slicer/Auth"
import { getCategories, reseter as ResetCat } from "../Slicer/Categories";
import decode from "jwt-decode";

const Menu = ({ showNav, setShowNav }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const { user } = useSelector(getUser);

   const token = user?.token;
   if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
         dispatch(setLogout());
      }
   }

   useEffect(() => {
      dispatch(getCategories());
      dispatch(ResetCat())

   }, [dispatch]);

   const handleLogout = () => {
      dispatch(setLogout())
      navigate("/");
   };
   return (
      <div className="container-fluid g-0">
         <div className="row">
            <div className="col-lg-12 p-0">
               <div className="header_iner d-flex justify-content-between align-items-center">
                  <div
                     className="sidebar_icon d-lg-none"
                     onClick={() => setShowNav(!showNav)}
                  >
                     <i className="ti-menu"></i>
                  </div>
                  <div className="serach_field-area">
                     <div className="search_inner">
                        <form action="#">
                           <div className="search_field">
                              <input type="text" placeholder="Search here..." />
                           </div>
                           <button type="submit">
                              {" "}
                              <img src="img/icon/icon_search.svg" alt="" />{" "}
                           </button>
                        </form>
                     </div>
                  </div>
                  <div className="header_right d-flex justify-content-between align-items-center">
                     <div className="header_notification_warp d-flex align-items-center">
                        <li>
                           <a href="#">
                              {" "}
                              <img src="img/icon/bell.svg" alt="" />{" "}
                           </a>
                        </li>
                        <li>
                           <a href="#">
                              {" "}
                              <img src="img/icon/msg.svg" alt="" />{" "}
                           </a>
                        </li>
                     </div>
                     <div className="profile_info">
                        <img src="img/client_img.png" alt="#" />
                        <div className="profile_info_iner">
                           <p>Neurologist </p>
                           <h5>Dr. Robar Smith</h5>
                           <div className="profile_info_details">
                              <Link to={"#"}>
                                 My Profile <i className="ti-user"></i>
                              </Link>
                              <Link to={"#"}>
                                 Settings <i className="ti-settings"></i>
                              </Link>
                              <button type="submit" onClick={handleLogout}>
                                 Log Out <i className="ti-shift-left"></i>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Menu;
