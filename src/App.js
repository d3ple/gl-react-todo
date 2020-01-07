import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import HeaderNav from "./HeaderNav";
import MainPage from "./pages/Main";
import AuthPage from "./pages/Auth";

import AuthService from "./services/firebase";

import "antd/dist/antd.css";
import { Layout } from "antd";

const App = ({ userStore }) => {
  useEffect(() => {
    AuthService.auth.onAuthStateChanged(user => {
      userStore.setUser(user);
    });
  }, [userStore]);

  console.log("App");

  return (
    <Router>
      <Layout>
        <HeaderNav />
        <Switch>
          <Route path="/login" component={AuthPage} />
          <PrivateRoute path="/" component={MainPage} />
          <Route component={NoMatchPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

const NoMatchPage = () => {
  return <div>NoMatchPage</div>;
};

const PrivateRoute = inject("userStore")(
  observer(({ component: Component, userStore, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          userStore.isAuth ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  })
);

export default new inject("userStore")(observer(App));
