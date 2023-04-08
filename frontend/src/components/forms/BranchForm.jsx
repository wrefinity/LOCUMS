import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LineWave } from "react-loader-spinner";
import {
   handleInput,
   loaderSize,
   loaderColor,
   validateEmpty,
} from "../../Utils/FormHelper";
import { reseter, createCategory } from "../../Slicer/Categories";

const BranchForm = () => {
   const { status, message } = useSelector((state) => state.categories);
   const [formData, setFormData] = useState({
      name: "",
   });
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);
   const referal = useRef();
   const dispatch = useDispatch();
   const reset = () => {
      setFormData({
         name: "",
      });
   };

   useEffect(() => {
      referal.current();
   }, [formErrors, status, message, dispatch]);

   const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validateEmpty(formData));
      setIsSubmit(true);
   };

   const dispatchFormData = () => {
      if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
         dispatch(createCategory(formData));
         dispatch(reseter());
         setIsSubmit(false);
      }

      if (status === "succeeded" && isSubmit) {
         toast.success("record added", { autoClose: 2000 });
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
   referal.current = dispatchFormData;
   return (
      <div className="container-fluid p-5">
         <div className="row justify-content-center">
            <div className="col-lg-12">
               <div className="white_box mb_30">
                  <div className="row justify-content-center">
                     <div className="col-lg-6 p-5">
                        {/* <!-- sign_in  --> */}
                        <div className="modal-content cs_modal">
                           <div className="modal-header">
                              <h5 className="modal-title">ADD BRANCH </h5>
                           </div>
                           <div className="modal-body ">
                              <form onSubmit={handleSubmit}>
                                 <div className="row px-5">
                                    <input
                                       type="text"
                                       className="form-control"
                                       placeholder="enter branch"
                                       name="name"
                                       value={formData.name}
                                       onChange={(e) => handleInput(e, setFormData)}
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
                                          SUBMIT
                                       </button>
                                    )}
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

export default BranchForm;