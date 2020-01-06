import React from "react";
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

import { inject, observer } from "mobx-react";

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

const menu = (
  <Menu onClick="">
    <Menu.Item key="1">
      <Icon type="user" />
      Выйти
    </Menu.Item>
  </Menu>
);

const HeaderNav = (props) => {

  // console.log();

  return (
    // <FirebaseContext.Consumer>
    //   {({auth}) => 
      
    <Header>
      <Row type="flex" justify="space-between">
        <Col>
          <a href="#"> GL-REACT-TODO </a>
        </Col>
        <Col>
          <Dropdown overlay={menu}>
            <Button>
            {props.userStore.user ? props.userStore.user.email : null} <Icon type="down" />
            </Button>
          </Dropdown>
        </Col>
      </Row>
      </Header> 
    //   }
    // </FirebaseContext.Consumer>
  );
};

// export default HeaderNav;

export default new inject("userStore")(observer(HeaderNav));
