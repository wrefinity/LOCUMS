import { Fragment, useState } from "react";
import Footer from "../components/Footer";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import Menu from "../components/Menu";
import SideBar from "../components/SideBar";

const ForgotPassword = () => {
   const [showNav, setShowNav] = useState(false);
   return (
      <Fragment>
         <SideBar showNav={showNav} setShowNav={setShowNav} />
         <section className="main_content dashboard_part">
            <Menu showNav={showNav} setShowNav={setShowNav} />
            <Footer />

            <div className="main_content_iner ">
               <ForgotPasswordForm />
            </div>
         </section>
      </Fragment>
   );
};

export default ForgotPassword;
