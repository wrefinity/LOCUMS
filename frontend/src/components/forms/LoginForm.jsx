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
import { reseter, login } from "../../Slicer/Auth";
import model from "../../assets/img/hosp.jpg"
const LoginForm = () => {
   const { status, message } = useSelector((state) => state.auth);
   const [loginData, setLogin] = useState({
      email: "",
      password: "",
   });
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);
   const referal = useRef();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

   const redirector = () => {
      navigate(from, { replace: true });
   };

   const reset = () => {
      setLogin({
         email: "",
         password: "",
      });
   };

   useEffect(() => {
      referal.current();
   }, [formErrors, status, message, navigate, dispatch]);

   const handleLogin = (e) => {
      e.preventDefault();
      setFormErrors(validateEmpty(loginData));
      setIsSubmit(true);
   };

   const dispatchLogin = () => {
      if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
         dispatch(login(loginData));
         dispatch(reseter());
         setIsSubmit(false);
      }

      if (status === "succeeded" && isSubmit) {
         toast.success("login sucess", { autoClose: 2000 });
         reset();
         dispatch(reseter());
         redirector();
      }
      if (status === "failed") {
         dispatch(reseter());
         toast.error(message, { autoClose: 4000 });
      }
   };
   referal.current = dispatchLogin;
   return (
      <div className="container-fluid p-5">
         <div className="row justify-content-center">
            <div className="col-lg-12">
               <div className="white_box mb_30">
                  <div className="row justify-content-center" style={{
                     backgroundImage: `url(${model})`,
                     backgroundSize: 'cover',
                     backgroundRepeat: 'no-repeat',
                  }}>
                     <div className="col-lg-6 p-5">
                        {/* <!-- sign_in  --> */}
                        <div className="modal-content cs_modal">
                           <div className="modal-header">
                              <h5 className="modal-title">Log in</h5>
                           </div>
                           <div className="modal-body ">
                              <form onSubmit={handleLogin}>
                                 <div className="row px-5">
                                    <input
                                       type="text"
                                       className="form-control"
                                       placeholder="Enter your email"
                                       name="email"
                                       value={loginData.email}
                                       onChange={(e) => handleInput(e, setLogin)}
                                    />
                                 </div>
                                 <div className="row px-5">
                                    <input
                                       type="password"
                                       name="password"
                                       className="form-control"
                                       placeholder="Password"
                                       value={loginData.password}
                                       onChange={(e) => handleInput(e, setLogin)}
                                    />
                                 </div>

                                 <div className="row px-5">
                                    {status === "laoding" ? (
                                       <LineWave
                                          color={loaderColor}
                                          height={loaderSize}
                                          width={loaderSize}
                                       />
                                    ) : (

                                       <button type="submit" className="btn_1 full_width text-center">
                                          LOG-IN
                                       </button>
                                    )}
                                 </div>
                                 <p>
                                    Need an account?{" "}
                                    <Link
                                       to={"/register"}
                                    >
                                       sign in
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
      </div>
   );
};

export default LoginForm;