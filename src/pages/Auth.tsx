import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import useStores from "../stores/useStores"
import AuthService from "../services/firebase";
import { Form, Icon, Input, Button, message } from "antd";

const AuthPage = observer(({ form }) => {
  const { userStore } = useStores();
  const history = useHistory();

  useEffect(() => {
    autorun(() => {
      userStore.isAuth && history.push("/");
    });
  }, [userStore.isAuth, history]);

  const [isRegisterMode, setRegisterMode] = useState(false);

  const handleLoginSubmit = (event: any) => {
    event.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        AuthService.signInWithEmailAndPassword(values.email, values.password)
          .then(authUser => {
            userStore.setUser(authUser);
          })
          .catch(error => {
            message.error(error.message);
          });
      }
    });
  };

  const handleRegisterSubmit = (event: any) => {
    event.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        AuthService.createUserWithEmailAndPassword(
          values.email,
          values.password
        )
          .then(authUser => {
            userStore.setUser(authUser);
          })
          .catch(error => {
            message.error(error.message);
          });
      }
    });
  };

  return (
    <Form
      onSubmit={event => {
        isRegisterMode ? handleRegisterSubmit(event) : handleLoginSubmit(event);
      }}
      className="login-form"
      style={{ maxWidth: "300px", margin: "31vh auto" }}
    >
      <Form.Item>
        {form.getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "Введите валидный email"
            },
            { required: true, message: "Введите email" }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator("password", {
          rules: [{ required: true, message: "Введите пароль" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Пароль"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ width: "100%" }}
        >
          {isRegisterMode ? "Зарегистрироваться" : "Войти"}
        </Button>
        {isRegisterMode ? (
          <>
            Или{" "}
            <a
              href="#login"
              onClick={event => {
                event.preventDefault();
                setRegisterMode(false);
              }}
            >
              войти
            </a>
          </>
        ) : (
            <>
              Или{" "}
              <a
                href="#register"
                onClick={event => {
                  event.preventDefault();
                  setRegisterMode(true);
                }}
              >
                зарегистрироваться
            </a>
            </>
          )}
      </Form.Item>
    </Form>
  );
});

const AuthPageWithForm = Form.create({})(AuthPage);

export default AuthPageWithForm;
