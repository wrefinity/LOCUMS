import { Fragment, useState } from "react";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import SideBar from "../components/SideBar";

const FAQ = () => {
   const [showNav, setShowNav] = useState();
   return (
      <Fragment>
         <SideBar showNav={showNav} setShowNav={setShowNav} />
         <section className="main_content dashboard_part">
            <Menu showNav={showNav} setShowNav={setShowNav} />
            <Footer />

            <div className="main_content_iner ">
               <FAQSection />
            </div>
         </section>
      </Fragment>
   );
};

export default FAQ;
