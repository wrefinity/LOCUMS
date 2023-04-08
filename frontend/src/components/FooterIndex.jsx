import React from "react";
import { Link } from "react-router-dom";

const FooterIndex = () => {
  return (
    <div>
      <footer className="mainfooter" role="contentinfo">
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="footer-pad">
                  <h4 className="text-white" >Heading 1</h4>
                  <ul className="list-unstyled list-styler">
                    <li>
                      <Link to={"#"} > Home </Link>
                    </li>
                    <li>
                      <Link to={"#"} > News and Updates</Link>
                    </li>
                    <li>
                      <Link to={"#"} > FAQs</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="footer-pad">
                  <h4 className="text-white">Heading 2</h4>
                  <ul className="list-unstyled list-styler">
                    <li>
                      <Link to={"#"} > Home </Link>
                    </li>
                    <li>
                      <Link to={"#"} > News and Updates</Link>
                    </li>
                    <li>
                      <Link to={"#"} > FAQs</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="footer-pad">
                  <h4 className="text-white">Heading 3</h4>
                  <ul className="list-unstyled list-styler">
                    <li>
                      <Link to={"#"} > Home </Link>
                    </li>
                    <li>
                      <Link to={"#"} > News and Updates</Link>
                    </li>
                    <li>
                      <Link to={"#"} > FAQs</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <h4 className="text-white">Follow Us</h4>
                <ul className="social-network social-circle">
                  <li>
                    <a href="#" className="icoFacebook" title="Facebook">
                      <i class="fab fa-google-plus-g"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icoLinkedin" title="Linkedin">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 copy">
                <p className="text-center">
                  &copy; Copyright 2018 - Locum All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterIndex;
