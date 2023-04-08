import React, { Fragment } from "react";
import FooterIndex from "../components/FooterIndex";
import LoginForm from "../components/forms/LoginForm";
import IndexNav from "../components/navbar/IndexNav";

const Login = () => {
   return (
      <Fragment>
         <IndexNav />
         <div className="row">
            <LoginForm />
         </div>
         <FooterIndex />
      </Fragment>
   );
};

export default Login;
