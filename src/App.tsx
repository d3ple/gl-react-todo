import React, { useEffect } from "react";
import { observer } from "mobx-react";
import useStores from "./stores/useStores";
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

const NoMatchPage = () => {
  return <div>Такой страницы не существует</div>;
};

const PrivateRoute = observer(({ component: Component, ...rest }) => {
  const { userStore } = useStores();
  return (
    <Route
      {...rest}
      render={props =>
        userStore.isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
});

const App = observer(() => {
  const { userStore } = useStores();

  useEffect(() => {
    AuthService.auth.onAuthStateChanged(user => {
      userStore.setUser(user);
    });
  }, [userStore]);

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
});

export default App;
