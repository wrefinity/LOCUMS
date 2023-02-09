const HospitalSurvey = () => {
   return (
      <div className="col-lg-12 col-xl-12">
         <div className="white_box mb_30 ">
            <div className="box_header border_bottom_1px  ">
               <div className="main-title">
                  <h3 className="mb_25">Hospital Survey</h3>
               </div>
            </div>
            <div className="income_servay">
               <div className="row">
                  <div className="col-md-3">
                     <div className="count_content">
                        <h3>
                           $ <span className="counter">305</span>{" "}
                        </h3>
                        <p>Today's Income</p>
                     </div>
                  </div>
                  <div className="col-md-3">
                     <div className="count_content">
                        <h3>
                           $ <span className="counter">1005</span>{" "}
                        </h3>
                        <p>This Week's Income</p>
                     </div>
                  </div>
                  <div className="col-md-3">
                     <div className="count_content">
                        <h3>
                           $ <span className="counter">5505</span>{" "}
                        </h3>
                        <p>This Month's Income</p>
                     </div>
                  </div>
                  <div className="col-md-3">
                     <div className="count_content">
                        <h3>
                           $ <span className="counter">155615</span>{" "}
                        </h3>
                        <p>This Year's Income</p>
                     </div>
                  </div>
               </div>
            </div>
            <div id="bar_wev"></div>
         </div>
      </div>
   );
};

export default HospitalSurvey;
