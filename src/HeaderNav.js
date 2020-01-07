import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Dropdown, Icon, Button, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";
import UserService from "./services/firebase";

const HeaderNav = ({ userStore }) => {
  const history = useHistory();
  return (
    <>
      {userStore.isAuth && (
        <Layout.Header>
          <Row type="flex" justify="space-between">
            <Col>
              <a style={{ color: 'white', fontWeight: '600', fontSize: '20px' }} href="/"> <span aria-label="rocket" role="img">🚀</span> GL-REACT-TODO </a>
            </Col>
            <Col>
              <Dropdown
                overlay={
                  <Menu onClick="">
                    <Menu.Item
                      key="1"
                      onClick={() => {
                        UserService.signOut();
                        userStore.setUser(null);
                        history.push("/");
                      }}
                    >
                      Выйти
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  {userStore.user ? userStore.user.email : null}
                  <Icon type="down" />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Layout.Header>
      )}
    </>
  );
};

// export default HeaderNav;

export default new inject("userStore")(observer(HeaderNav));
