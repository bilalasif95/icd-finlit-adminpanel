import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Layout";
import Login from "../pages/login";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import { useUserState } from "../context/UserContext";
import SetPassword from "../pages/setpassword/SetPassword";
import ResetPassword from "../pages/resetpassword/ResetPassword";
import GoogleAuth from "../pages/GoogleAuth/GoogleAuth";
import Verification from "../pages/Verification/Verification"

export default function App() {
  var { isAuthenticated } = useUserState();
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/forgetPassword" component={ForgetPassword} />
        <PublicRoute path="/resetpassword" component={ResetPassword} />
        <PublicRoute path="/setpassword" component={SetPassword} />
        <PublicRoute path="/googleAuth" component={GoogleAuth} />
        <PublicRoute path="/verification" component={Verification} />
      </Switch>
    </HashRouter>
  );

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}