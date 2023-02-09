import SideBarDesktop from "./navbar/SideBarDesktop";
import SideBarMobile from "./navbar/SideBarMobile";

const SideBar = ({ showNav, setShowNav }) => {
   return (
      <>
         <div className="d-lg-none">
            <SideBarMobile showNav={showNav} setShowNav={setShowNav} />
         </div>
         <div className="d-none d-lg-block">
            <SideBarDesktop />
         </div>
      </>
   );
};

export default SideBar;
