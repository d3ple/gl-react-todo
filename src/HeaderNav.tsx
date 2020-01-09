import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Dropdown, Icon, Button, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import useStores from "./stores/useStores";
import UserService from "./services/firebase";

const HeaderNav = observer(() => {
  const { userStore } = useStores();
  const history = useHistory();

  const styles = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px'
  } as React.CSSProperties

  return (
    <>
      {userStore.isAuth && (
        <Layout.Header>
          <Row type="flex" justify="space-between">
            <Col>
              <a style={styles} href="/"> <span aria-label="rocket" role="img">🚀</span> GL-REACT-TODO </a>
            </Col>
            <Col>
              <Dropdown
                overlay={
                  <Menu>
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
});

export default HeaderNav;