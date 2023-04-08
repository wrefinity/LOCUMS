import { Fragment } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import FooterIndex from "../components/FooterIndex";
import IndexNav from "../components/navbar/IndexNav";
const Register = () => {
   return (
      <Fragment>
         <IndexNav />
         <div className="row">
            <RegisterForm />
         </div>
         <FooterIndex />
      </Fragment>
   );
};

export default Register;
