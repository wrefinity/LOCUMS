import { Fragment, useState } from "react";
import Footer from "../components/Footer";
import ShiftForm from "../components/forms/Shift";
import Menu from "../components/Menu";
import SideBar from "../components/SideBar";

const Shift = () => {
   const [showNav, setShowNav] = useState(false);
   return (
      <Fragment>
         <SideBar showNav={showNav} setShowNav={setShowNav} />
         <section className="main_content dashboard_part">
            <Menu showNav={showNav} setShowNav={setShowNav} />
            <Footer />

            <div className="main_content_iner ">
               <ShiftForm />
            </div>
         </section>
      </Fragment>
   );
};

export default Shift;
