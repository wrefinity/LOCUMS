import { Fragment, useState } from "react";
import Footer from "../components/Footer";
import HospitalStaff from "../components/index/HospitalStaff";
import HospitalSurvey from "../components/index/HospitalSurvey";
import Number from "../components/index/Number";
import Patients from "../components/index/Patients";
import RecentActivities from "../components/index/RecentActivities";
import TotalDeath from "../components/index/TotalDeath";
import TotalRecover from "../components/index/TotalRecover";
import Menu from "../components/Menu";
import SideBar from "../components/SideBar";

const Index = () => {
   const [showNav, setShowNav] = useState();
   return (
      <Fragment>
         <SideBar showNav={showNav} setShowNav={setShowNav} />
         <section className="main_content dashboard_part">
            <Menu showNav={showNav} setShowNav={setShowNav} />
            <Footer />

            <div className="main_content_iner ">
               <div className="container-fluid p-0">
                  <div className="row justify-content-center">
                     <Number />
                     <Patients />
                     <div className="col-xl-5 ">
                        <TotalRecover />
                        <TotalDeath />
                     </div>
                     <HospitalStaff />
                     <RecentActivities />
                  </div>
               </div>
            </div>
         </section>
      </Fragment>
   );
};

export default Index;
