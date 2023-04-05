import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import AdminLayout from "layouts/Admin/Admin.js";
import StaffLayout from "layouts/Staff/Staff.js";
import Auth from "./views/auth/Auth";
import VerifyAccount from "./views/auth/VerifyAccount";
import ResetPassword from "./views/auth/ResetPassword";
import ForgotPassword from "./views/auth/ForgotPassword";
import Register from "./views/auth/RegisterForm";

function RouterComp() {
  const { loggedIn, userDetail } = useAuth();
  return (
    <HashRouter>
      {!loggedIn ? (
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/signup" component={Register} />
          <Route path="/accountverify/:verifyToken" component={VerifyAccount} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/passwordreset/:resetToken" component={ResetPassword} />
          {/* <Route component={Auth} /> */}
        </Switch>
      ) : (
        <>
          {userDetail.role === "admin" ? (
            <Switch>
              <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
              />
              <Redirect to="/admin/dashboard/" />
            </Switch>
          ) : null}

          {userDetail.role === "staff" ? (
            <Switch>
              <Route
                path="/staff"
                render={(props) => <StaffLayout {...props} />}
              />
              <Redirect to="/staff/sales/" />
            </Switch>
          ) : null}
        </>
      )}
    </HashRouter>
  );
}
export default RouterComp;
