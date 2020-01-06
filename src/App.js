import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Todo from "./Todo";
import HeaderNav from "./HeaderNav";
import MainPage from "./Pages/Main";

import firebase from "./services/firebase";

import "antd/dist/antd.css";
import {
  Layout,
  Menu,
  Dropdown,
  Icon,
  Button,
  Row,
  Col,
  Tabs,
  Input,
  Radio,
  Badge
} from "antd";

{
  /* <FirebaseContext.Consumer>
          {firebase => <SignUpForm firebase={firebase} />}
        </FirebaseContext.Consumer> */
}

const LoginPage = () => {
  return <div>LoginPage</div>;
};

const NoMatchPage = () => {
  return <div>NoMatchPage</div>;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = true;

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const App = ({userStore}) => {
  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      userStore.setUser(user);
    });
  }, [userStore]);

  console.log("App");

  return (
    <Router>
      <Layout>
        <HeaderNav />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/" component={MainPage} />
          <Route component={NoMatchPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

// export default App;

export default new inject("userStore")(observer(App));
