import React from "react";
import { Link } from "react-router-dom";

const IndexNav = () => {
  return (
    <div>
      <nav className="mb-1 navbar navbar-expand-lg navbar-dark default-color p-3">
        <Link className="navbar-brand" to={"/"}>
          Locum
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent-333"
          aria-controls="navbarSupportedContent-333"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent-333"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link text-white" to={"#"}>
                Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to={"#"}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to={"#"}>
                Service
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <li className="nav-item">
              <a className="nav-link waves-effect waves-light">
                <i className="fas fa-user text-white"> signUp</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default IndexNav;
