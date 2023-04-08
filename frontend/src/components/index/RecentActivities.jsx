import { Fragment } from "react";

const RecentActivities = () => {
   return (
      <Fragment>
         <div className="col-xl-6">
            <div className="white_box card_height_100">
               <div className="box_header border_bottom_1px  ">
                  <div className="main-title">
                     <h3 className="mb_25">Recent Activity</h3>
                  </div>
               </div>
               <div className="Activity_timeline">
                  <ul>
                     <li>
                        <div className="activity_bell"></div>
                        <div className="activity_wrap">
                           <h6>5 min ago</h6>
                           <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Quisque scelerisque
                           </p>
                        </div>
                     </li>
                     <li>
                        <div className="activity_bell"></div>
                        <div className="activity_wrap">
                           <h6>5 min ago</h6>
                           <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Quisque scelerisque
                           </p>
                        </div>
                     </li>
                     <li>
                        <div className="activity_bell"></div>
                        <div className="activity_wrap">
                           <h6>5 min ago</h6>
                           <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Quisque scelerisque
                           </p>
                        </div>
                     </li>
                     <li>
                        <div className="activity_bell"></div>
                        <div className="activity_wrap">
                           <h6>5 min ago</h6>
                           <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Quisque scelerisque
                           </p>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         {/* SECOND ACTIVITY  */}
         <div className="col-xl-6">
            <div className="white_box mb_30">
               <div className="box_header border_bottom_1px  ">
                  <div className="main-title">
                     <h3 className="mb_25">Recent Activity</h3>
                  </div>
               </div>
               <div className="activity_progressbar">
                  <div className="single_progressbar">
                     <h6>USA</h6>
                     <div id="bar1" className="barfiller">
                        <div className="tipWrap">
                           <span className="tip"></span>
                        </div>
                        <span className="fill" data-percentage="95"></span>
                     </div>
                  </div>
                  <div className="single_progressbar">
                     <h6>AFRICA</h6>
                     <div id="bar2" className="barfiller">
                        <div className="tipWrap">
                           <span className="tip"></span>
                        </div>
                        <span className="fill" data-percentage="75"></span>
                     </div>
                  </div>
                  <div className="single_progressbar">
                     <h6>UK</h6>
                     <div id="bar3" className="barfiller">
                        <div className="tipWrap">
                           <span className="tip"></span>
                        </div>
                        <span className="fill" data-percentage="55"></span>
                     </div>
                  </div>
                  <div className="single_progressbar">
                     <h6>CANADA</h6>
                     <div id="bar4" className="barfiller">
                        <div className="tipWrap">
                           <span className="tip"></span>
                        </div>
                        <span className="fill" data-percentage="25"></span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default RecentActivities;
