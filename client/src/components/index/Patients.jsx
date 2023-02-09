const Patients = () => {
   return (
      <div className="col-xl-7">
         <div className="white_box QA_section card_height_100">
            <div className="white_box_tittle list_header m-0 align-items-center">
               <div className="main-title mb-sm-15">
                  <h3 className="m-0 nowrap">Patients</h3>
               </div>
               <div className="box_right d-flex lms_block">
                  <div className="serach_field-area2">
                     <div className="search_inner">
                        <form>
                           <div className="search_field">
                              <input type="text" placeholder="Search here..." />
                           </div>
                           <button type="submit">
                              {" "}
                              <i className="ti-search"></i>{" "}
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>

            <div className="QA_table ">
               {/* <!-- table-responsive --> */}
               <table className="table lms_table_active2">
                  <thead>
                     <tr>
                        <th scope="col">Patients Name</th>
                        <th scope="col">department</th>
                        <th scope="col">Appointment Date</th>
                        <th scope="col">Serial Number</th>
                        <th scope="col">Amount</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <th scope="row">
                           <div className="patient_thumb d-flex align-items-center">
                              <div className="student_list_img mr_20">
                                 <img
                                    src="img/patient/pataint.png"
                                    alt=""
                                    srcSet=""
                                 />
                              </div>
                              <p>Jhon Kural</p>
                           </div>
                        </th>
                        <td>Monte Carlo</td>
                        <td>11/03/2020</td>
                        <td>MDC65454</td>
                        <td>
                           <div className="amoutn_action d-flex align-items-center">
                              $29,192
                              <div className="dropdown ms-4">
                                 <a
                                    className=" dropdown-toggle hide_pils"
                                    href="#"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                 >
                                    <i className="fas fa-ellipsis-v"></i>
                                 </a>

                                 <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuLink"
                                 >
                                    <a className="dropdown-item" href="#">
                                       View
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Edit
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Delete
                                    </a>
                                 </div>
                              </div>
                           </div>{" "}
                        </td>
                     </tr>
                     <tr>
                        <th scope="row">
                           <div className="patient_thumb d-flex align-items-center">
                              <div className="student_list_img mr_20">
                                 <img
                                    src="img/patient/2.png"
                                    alt=""
                                    srcSet=""
                                 />
                              </div>
                              <p>Jhon Kural</p>
                           </div>
                        </th>
                        <td>Monte Carlo</td>
                        <td>11/03/2020</td>
                        <td>MDC65454</td>
                        <td>
                           <div className="amoutn_action d-flex align-items-center">
                              $29,192
                              <div className="dropdown ms-4">
                                 <a
                                    className=" dropdown-toggle hide_pils"
                                    href="#"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                 >
                                    <i className="fas fa-ellipsis-v"></i>
                                 </a>

                                 <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuLink"
                                 >
                                    <a className="dropdown-item" href="#">
                                       View
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Edit
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Delete
                                    </a>
                                 </div>
                              </div>
                           </div>{" "}
                        </td>
                     </tr>
                     <tr>
                        <th scope="row">
                           <div className="patient_thumb d-flex align-items-center">
                              <div className="student_list_img mr_20">
                                 <img
                                    src="img/patient/3.png"
                                    alt=""
                                    srcSet=""
                                 />
                              </div>
                              <p>Jhon Kural</p>
                           </div>
                        </th>
                        <td>Monte Carlo</td>
                        <td>11/03/2020</td>
                        <td>MDC65454</td>
                        <td>
                           <div className="amoutn_action d-flex align-items-center">
                              $29,192
                              <div className="dropdown ms-4">
                                 <a
                                    className=" dropdown-toggle hide_pils"
                                    href="#"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                 >
                                    <i className="fas fa-ellipsis-v"></i>
                                 </a>

                                 <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuLink"
                                 >
                                    <a className="dropdown-item" href="#">
                                       View
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Edit
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Delete
                                    </a>
                                 </div>
                              </div>
                           </div>{" "}
                        </td>
                     </tr>
                     <tr>
                        <th scope="row">
                           <div className="patient_thumb d-flex align-items-center">
                              <div className="student_list_img mr_20">
                                 <img
                                    src="img/patient/4.png"
                                    alt=""
                                    srcSet=""
                                 />
                              </div>
                              <p>Jhon Kural</p>
                           </div>
                        </th>
                        <td>Monte Carlo</td>
                        <td>11/03/2020</td>
                        <td>MDC65454</td>
                        <td>
                           <div className="amoutn_action d-flex align-items-center">
                              $29,192
                              <div className="dropdown ms-4">
                                 <a
                                    className=" dropdown-toggle hide_pils"
                                    href="#"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                 >
                                    <i className="fas fa-ellipsis-v"></i>
                                 </a>

                                 <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuLink"
                                 >
                                    <a className="dropdown-item" href="#">
                                       View
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Edit
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Delete
                                    </a>
                                 </div>
                              </div>
                           </div>{" "}
                        </td>
                     </tr>
                     <tr>
                        <th scope="row">
                           <div className="patient_thumb d-flex align-items-center">
                              <div className="student_list_img mr_20">
                                 <img
                                    src="img/patient/5.png"
                                    alt=""
                                    srcSet=""
                                 />
                              </div>
                              <p>Jhon Kural</p>
                           </div>
                        </th>
                        <td>Monte Carlo</td>
                        <td>11/03/2020</td>
                        <td>MDC65454</td>
                        <td>
                           <div className="amoutn_action d-flex align-items-center">
                              $29,192
                              <div className="dropdown ms-4">
                                 <a
                                    className=" dropdown-toggle hide_pils"
                                    href="#"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                 >
                                    <i className="fas fa-ellipsis-v"></i>
                                 </a>

                                 <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuLink"
                                 >
                                    <a className="dropdown-item" href="#">
                                       View
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Edit
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Delete
                                    </a>
                                 </div>
                              </div>
                           </div>{" "}
                        </td>
                     </tr>
                     <tr>
                        <th scope="row">
                           <div className="patient_thumb d-flex align-items-center">
                              <div className="student_list_img mr_20">
                                 <img
                                    src="img/patient/6.png"
                                    alt=""
                                    srcSet=""
                                 />
                              </div>
                              <p>Jhon Kural</p>
                           </div>
                        </th>
                        <td>Monte Carlo</td>
                        <td>11/03/2020</td>
                        <td>MDC65454</td>
                        <td>
                           <div className="amoutn_action d-flex align-items-center">
                              $29,192
                              <div className="dropdown ms-4">
                                 <a
                                    className=" dropdown-toggle hide_pils"
                                    href="#"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                 >
                                    <i className="fas fa-ellipsis-v"></i>
                                 </a>

                                 <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuLink"
                                 >
                                    <a className="dropdown-item" href="#">
                                       View
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Edit
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Delete
                                    </a>
                                 </div>
                              </div>
                           </div>{" "}
                        </td>
                     </tr>
                     <tr>
                        <th scope="row">
                           <div className="patient_thumb d-flex align-items-center">
                              <div className="student_list_img mr_20">
                                 <img
                                    src="img/patient/6.png"
                                    alt=""
                                    srcSet=""
                                 />
                              </div>
                              <p>Jhon Kural</p>
                           </div>
                        </th>
                        <td>Monte Carlo</td>
                        <td>11/03/2020</td>
                        <td>MDC65454</td>
                        <td>
                           <div className="amoutn_action d-flex align-items-center">
                              $29,192
                              <div className="dropdown ms-4">
                                 <a
                                    className=" dropdown-toggle hide_pils"
                                    href="#"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                 >
                                    <i className="fas fa-ellipsis-v"></i>
                                 </a>

                                 <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuLink"
                                 >
                                    <a className="dropdown-item" href="#">
                                       View
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Edit
                                    </a>
                                    <a className="dropdown-item" href="#">
                                       Delete
                                    </a>
                                 </div>
                              </div>
                           </div>{" "}
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default Patients;
