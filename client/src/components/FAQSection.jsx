const FAQSection = () => {
   return (
      <div className="container-fluid p-0">
         <div className="row justify-content-center">
            <div className="col-lg-12">
               <div className="white_box mb_30">
                  <div className="box_header ">
                     <div className="main-title">
                        <h3 className="mb-0">Faq</h3>
                     </div>
                  </div>
                  {/* <!-- accordian --> */}
                  <div
                     className="accordion accordion_custom mb_50"
                     id="accordion_ex"
                  >
                     <div className="card">
                        <div className="card-header" id="headingOne">
                           <h2 className="mb-0">
                              <a
                                 href="#"
                                 className="btn"
                                 type="button"
                                 data-bs-toggle="collapse"
                                 data-bs-target="#collapseOne"
                                 aria-expanded="true"
                                 aria-controls="collapseOne"
                              >
                                 Example 0
                              </a>
                           </h2>
                        </div>

                        <div
                           id="collapseOne"
                           className="collapse show"
                           aria-labelledby="headingOne"
                           data-parent="#accordion_ex"
                        >
                           <div className="card-body">
                              <p>
                                 Cum sociis natoque penatibus et magnis dis
                                 parturient montes, nascetur ridiculus mus.
                                 Donec quam felis, ultricies nec, pellentesque
                                 eu, pretium quis, sem. Nulla consequat massa
                                 quis enim. Donec pede justo, fringilla vel,
                                 aliquet nec, vulputate eget, arcu. In enim
                                 justo, rhoncus ut, imperdiet a, venenatis
                                 vitae, justo.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="card">
                        <div className="card-header" id="headingTwo">
                           <h2 className="mb-0">
                              <a
                                 href="#"
                                 className="btn collapsed"
                                 type="button"
                                 data-bs-toggle="collapse"
                                 data-bs-target="#collapseTwo"
                                 aria-expanded="false"
                                 aria-controls="collapseTwo"
                              >
                                 Example 1
                              </a>
                           </h2>
                        </div>
                        <div
                           id="collapseTwo"
                           className="collapse"
                           aria-labelledby="headingTwo"
                           data-parent="#accordion_ex"
                        >
                           <div className="card-body">
                              <p>
                                 Cum sociis natoque penatibus et magnis dis
                                 parturient montes, nascetur ridiculus mus.
                                 Donec quam felis, ultricies nec, pellentesque
                                 eu, pretium quis, sem. Nulla consequat massa
                                 quis enim. Donec pede justo, fringilla vel,
                                 aliquet nec, vulputate eget, arcu. In enim
                                 justo, rhoncus ut, imperdiet a, venenatis
                                 vitae, justo.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="card">
                        <div className="card-header" id="headingThree">
                           <h2 className="mb-0">
                              <a
                                 href="#"
                                 className="btn collapsed"
                                 type="button"
                                 data-bs-toggle="collapse"
                                 data-bs-target="#collapseThree"
                                 aria-expanded="false"
                                 aria-controls="collapseThree"
                              >
                                 Example 2
                              </a>
                           </h2>
                        </div>
                        <div
                           id="collapseThree"
                           className="collapse"
                           aria-labelledby="headingThree"
                           data-parent="#accordion_ex"
                        >
                           <div className="card-body">
                              <p>
                                 Cum sociis natoque penatibus et magnis dis
                                 parturient montes, nascetur ridiculus mus.
                                 Donec quam felis, ultricies nec, pellentesque
                                 eu, pretium quis, sem. Nulla consequat massa
                                 quis enim. Donec pede justo, fringilla vel,
                                 aliquet nec, vulputate eget, arcu. In enim
                                 justo, rhoncus ut, imperdiet a, venenatis
                                 vitae, justo.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="card">
                        <div className="card-header">
                           <h2 className="mb-0">
                              <a
                                 href="#"
                                 className="btn collapsed"
                                 type="button"
                                 data-bs-toggle="collapse"
                                 data-bs-target="#collapseThree3"
                                 aria-expanded="false"
                                 aria-controls="collapseThree"
                              >
                                 Example 3
                              </a>
                           </h2>
                        </div>
                        <div
                           id="collapseThree3"
                           className="collapse"
                           aria-labelledby="headingThree3"
                           data-parent="#accordion_ex"
                        >
                           <div className="card-body">
                              <p>
                                 Cum sociis natoque penatibus et magnis dis
                                 parturient montes, nascetur ridiculus mus.
                                 Donec quam felis, ultricies nec, pellentesque
                                 eu, pretium quis, sem. Nulla consequat massa
                                 quis enim. Donec pede justo, fringilla vel,
                                 aliquet nec, vulputate eget, arcu. In enim
                                 justo, rhoncus ut, imperdiet a, venenatis
                                 vitae, justo.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="card">
                        <div className="card-header">
                           <h2 className="mb-0">
                              <a
                                 href="#"
                                 className="btn collapsed"
                                 type="button"
                                 data-bs-toggle="collapse"
                                 data-bs-target="#collapseThree4"
                                 aria-expanded="false"
                                 aria-controls="collapseThree"
                              >
                                 Example 4
                              </a>
                           </h2>
                        </div>
                        <div
                           id="collapseThree4"
                           className="collapse"
                           aria-labelledby="headingThree3"
                           data-parent="#accordion_ex"
                        >
                           <div className="card-body">
                              <p>
                                 Cum sociis natoque penatibus et magnis dis
                                 parturient montes, nascetur ridiculus mus.
                                 Donec quam felis, ultricies nec, pellentesque
                                 eu, pretium quis, sem. Nulla consequat massa
                                 quis enim. Donec pede justo, fringilla vel,
                                 aliquet nec, vulputate eget, arcu. In enim
                                 justo, rhoncus ut, imperdiet a, venenatis
                                 vitae, justo.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="card">
                        <div className="card-header" id="headingThree3">
                           <h2 className="mb-0">
                              <a
                                 href="#"
                                 className="btn collapsed"
                                 type="button"
                                 data-bs-toggle="collapse"
                                 data-bs-target="#collapseThree5"
                                 aria-expanded="false"
                                 aria-controls="collapseThree"
                              >
                                 Example 5
                              </a>
                           </h2>
                        </div>
                        <div
                           id="collapseThree5"
                           className="collapse"
                           aria-labelledby="headingThree3"
                           data-parent="#accordion_ex"
                        >
                           <div className="card-body">
                              <p>
                                 Cum sociis natoque penatibus et magnis dis
                                 parturient montes, nascetur ridiculus mus.
                                 Donec quam felis, ultricies nec, pellentesque
                                 eu, pretium quis, sem. Nulla consequat massa
                                 quis enim. Donec pede justo, fringilla vel,
                                 aliquet nec, vulputate eget, arcu. In enim
                                 justo, rhoncus ut, imperdiet a, venenatis
                                 vitae, justo.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* <!-- accordian --> */}
               </div>
            </div>
         </div>
      </div>
   );
};

export default FAQSection;
