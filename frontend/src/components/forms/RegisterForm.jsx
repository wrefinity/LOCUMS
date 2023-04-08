import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import {
   handleInput,
   loaderSize,
   loaderColor,
   validateEmpty,
} from "../../Utils/FormHelper";
import { reseter, register } from "../../Slicer/Auth";
import model from "../../assets/img/hosp.jpg"

const RegisterForm = () => {

   const { user, status, message } = useSelector((state) => state.auth);
   const [registerData, setRegisterData] = useState({
      email: "",
      password: "",
      fullname: "",
      username: "",
      image: "",
      url: "",
      info: "",
      regNumber: "",
      dispensing_software: "",
      address: "",
      county: "",
      eir_code: "",
   });
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);
   const referal = useRef();
   const dispatch = useDispatch();
   const navigate = useNavigate();


   const reset = () => {
      setRegisterData({
         email: "",
         password: "",
         fullname: "",
         username: "",
         image: "",
         url: "",
         info: "",
         regNumber: "",
         dispensing_software: "",
         address: "",
         county: "",
         eir_code: "",
      });
   };

   useEffect(() => {
      referal.current();
   }, [formErrors, status, message, navigate, dispatch]);

   const handleLogin = (e) => {
      e.preventDefault();
      setFormErrors(registerData);
      setIsSubmit(true);
   };

   const dispatchRegister = () => {
      if (isSubmit && status === "idle") {
         dispatch(register(registerData));
         dispatch(reseter());
         setIsSubmit(false);
      }

      if (status === "succeeded") {
         toast.success("Register Sucess", { autoClose: 2000 });
         reset();
         dispatch(reseter());
         setIsSubmit(false);
      }
      if (status === "failed") {
         dispatch(reseter());
         toast.error(message, { autoClose: 4000 });
         setIsSubmit(false);
      }
   };
   referal.current = dispatchRegister;

   return (
      <div className="container-fluid p-5" >
         <div className="col-lg-12">
            <div className="white_box mb_30">
               <div className="row justify-content-center" style={{
                  backgroundImage: `url(${model})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
               }}>
                  <div className="col-lg-6 pt-3">
                     {/* <!-- sign_in  --> */}
                     <div className="modal-content cs_modal" >
                        <div className="modal-header">
                           <h5 className="modal-title text-center">REGISTER</h5>
                        </div>
                        <div className="modal-body">
                           <form onSubmit={handleLogin}>

                              <div className="mb-3 px-5">
                                 <label
                                    className="form-label"
                                    htmlFor="username"
                                 >
                                    Username
                                 </label>
                                 <input
                                    id="username"
                                    type="text"
                                    required
                                    className="form-control"
                                    placeholder="Enter Username"
                                    value={registerData.username}
                                    onChange={(e) => handleInput(e, setRegisterData)}
                                 />
                              </div>
                              <div className="mb-3 px-5">
                                 <label
                                    className="form-label"
                                    htmlFor="email"
                                 >
                                    Email
                                 </label>
                                 <input
                                    type="text"
                                    required
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={registerData.email}
                                    onChange={(e) => handleInput(e, setRegisterData)}
                                 />
                              </div>
                              <div className="mb-3 px-5">
                                 <label
                                    className="form-label"
                                    htmlFor="password"
                                 >
                                    Password
                                 </label>
                                 <input
                                    type="password"
                                    required
                                    className="form-control"
                                    placeholder="Password"
                                    value={registerData.password}
                                    onChange={(e) => handleInput(e, setRegisterData)}
                                 />
                              </div>
                              <div className="mb-3 px-5"><h4>Company Information</h4></div>
                              <div className="mb-3 px-5">
                                 <label
                                    className="form-label"
                                    htmlFor="namer"
                                 >
                                    Company Name
                                 </label>
                                 <input
                                    type="text"
                                    id="namer"
                                    required
                                    className="form-control"
                                    placeholder="Enter company Name"
                                    value={registerData.fullname}
                                    onChange={(e) => handleInput(e, setRegisterData)}
                                 />
                              </div>
                              <div className="mb-3 px-5">
                                 <label
                                    className="form-label"
                                    htmlFor="web"
                                 >
                                    Company Website
                                 </label>
                                 <input
                                    id="web"
                                    type="text"
                                    className="form-control"
                                    placeholder="company website url"
                                    value={registerData.url}
                                    onChange={(e) => handleInput(e, setRegisterData)}
                                 />
                              </div>
                              <div className="mb-3 px-5">
                                 <label
                                    className="form-label"
                                    htmlFor="info"
                                 >
                                    Company Information
                                 </label>
                                 <textarea
                                    id="info"
                                    rows={5}
                                    type="text"
                                    required
                                    className="form-control"
                                    placeholder="company  information"
                                    value={registerData.info}
                                    onChange={(e) => handleInput(e, setRegisterData)}
                                 />
                              </div>


                              <div className="mb-3 px-5">
                                 <h4>Additional Information</h4>
                              </div>
                              <div className="mb-3 px-5">
                                 <label
                                    className="form-label"
                                    htmlFor="addxx"
                                 >
                                    Pharmacy Dispensing Software
                                 </label>
                                 <input
                                    id="addxx"
                                    type="text"
                                    className="form-control"
                                    value={registerData.dispensing_software}
                                    onChange={(e) => handleInput(e, setRegisterData)}
                                 />
                              </div>
                              <div className="mb-3 px-5">
                                 <label
                                    className="form-label"
                                    htmlFor="add"
                                 >
                                    Pharmacy Registration Number
                                 </label>
                                 <input
                                    id="add"
                                    type="text"
                                    required
                                    className="form-control"
                                    placeholder="enter registration number"
                                    value={registerData.regNumber}
                                    onChange={(e) => handleInput(e, setRegisterData)}
                                 />
                              </div>


                              <div className="mb-3 px-5">
                                 <h4>Locations</h4>
                              </div>
                              <div className="mb-3 px-5">
                                 <label
                                    className="form-label"
                                    htmlFor="add"
                                 >
                                    Address
                                 </label>
                                 <input
                                    id="add"
                                    type="text"
                                    required
                                    className="form-control"
                                    placeholder="enter address"
                                    value={registerData.address}
                                    onChange={(e) => handleInput(e, setRegisterData)}
                                 />
                              </div>
                              <div className="mb-3 px-5">
                                 <label
                                    className="form-label"
                                    htmlFor="add"
                                 >
                                    County
                                 </label>
                                 <input
                                    id="add"
                                    type="text"
                                    required
                                    className="form-control"
                                    placeholder="enter address"
                                    value={registerData.county}
                                    onChange={(e) => handleInput(e, setRegisterData)}
                                 />
                              </div>
                              <div className="mb-3 px-5">
                                 <label
                                    className="form-label"
                                    htmlFor="addx"
                                 >
                                    Eir Code
                                 </label>
                                 <input
                                    id="addx"
                                    type="text"
                                    required
                                    className="form-control"
                                    value={registerData.eir_code}
                                    onChange={(e) => handleInput(e, setRegisterData)}
                                 />
                              </div>

                              <div className="px-5">
                                 {status === "laoding" ? (
                                    <LineWave
                                       color={loaderColor}
                                       height={loaderSize}
                                       width={loaderSize}
                                    />
                                 ) : (

                                    <button type="submit" className="btn_1 full_width text-center">
                                       REGISTER
                                    </button>
                                 )}
                              </div>

                              <p>
                                 Need an account?{" "}
                                 <Link
                                    to={"/"}
                                 >
                                    Log in
                                 </Link>
                              </p>

                              <div className="text-center">
                                 <Link to="/forgot-password">
                                    Forget Password?
                                 </Link>
                              </div>
                           </form>
                        </div>
                        <div className="border_style">
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RegisterForm;
