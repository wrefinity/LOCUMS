import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import FAQ from "./pages/FAQ";
import Layout from "./components/Layout";
import PostJobs from "./pages/PostJobs";
import Shift from "./pages/Shift";
import Category from "./pages/Category";
import Branch from "./pages/Branch";

function App() {
   return (
      <ScrollToTop>
         <ToastContainer />
         <Routes>

            <Route path="/" element={<Layout />}>
               <Route path="/" element={< Login />} />
               <Route path="/dash" element={<Index />} />
               <Route path="/register" element={<Register />} />
               <Route path="/faq" element={<FAQ />} />
               <Route path="/jobs" element={<PostJobs />} />
               <Route path="/forgot-password" element={<ForgotPassword />} />
               <Route path="/categories" element={<Category />} />
               <Route path="/shifts" element={<Shift />} />
               <Route path="/branches" element={<Branch />} />
               <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
         </Routes>
      </ScrollToTop>
   );
}


const ProtectUserRoute = ({ children }) => {
   const [cookies] = useCookies();
   const user = cookies.user;
   if (!user) {
      return <Navigate to="/" replace />;
   }
   return children;
};

const ProtectAdminRoute = ({ children }) => {
   const [cookies] = useCookies();
   const user = cookies.user;
   if (!user) {
      return <Navigate to="/" replace />;
   } else if (!user.isAdmin) {
      return <Navigate to="/" replace />;
   }
   return children;
};

const PreventMultipleLogin = ({ children }) => {
   const [cookies] = useCookies();
   const user = cookies.user;
   if (user) {
      return <Navigate to="/dash" replace />;
   } else {
      return children;
   }
};
const ScrollToTop = ({ children }) => {
   const location = useLocation();
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [location]);
   return children;
};
export default App; 