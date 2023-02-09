const ForgotPasswordForm = () => {
   return (
      <div className="container-fluid p-0">
         <div className="row justify-content-center">
            <div className="col-lg-12">
               <div className="white_box mb_30">
                  <div className="row justify-content-center">
                     <div className="col-lg-6">
                        <div className="modal-content cs_modal">
                           <div className="modal-header">
                              <h5 className="modal-title">Forget Password</h5>
                           </div>
                           <div className="modal-body">
                              <form>
                                 <div className="mb-3">
                                    <input
                                       type="text"
                                       className="form-control"
                                       placeholder="Enter your email"
                                    />
                                 </div>
                                 <a
                                    href="#"
                                    className="btn_1 full_width text-center"
                                 >
                                    SEND
                                 </a>
                              </form>
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

export default ForgotPasswordForm;
