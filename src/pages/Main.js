import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";

import "antd/dist/antd.css";
import { Layout, Tabs, Input, Radio, message } from "antd";
import TodoList from "../TodoList";

const { Content } = Layout;
const { TabPane } = Tabs;

const Main = ({ todoStore, userStore }) => {
  const [isSearchMode, setSearchMode] = useState(false);

  useEffect(() => {
    todoStore.fetchTodos();
  }, [todoStore, userStore.user]);

  return (
    <Content style={{ padding: "50px 200px", minHeight: "90vh" }}>
      {isSearchMode ? (
        <Input.Search
          placeholder="Введите текст"
          enterButton="Найти"
          size="large"
          onSearch={value => todoStore.setSearchQuery(value)}
        />
      ) : (
        <Input.Search
          placeholder="Введите текст"
          enterButton="Создать"
          size="large"
          onSearch={value =>
            todoStore
              .createTodo(value)
              .then(() => message.success("Запись добавлена"))
          }
        />
      )}

      <Radio.Group
        style={{ marginTop: "8px", marginBottom: "30px" }}
        value={isSearchMode}
        onChange={event => {
          setSearchMode(event.target.value);
          todoStore.setSearchQuery("");
        }}
      >
        <Radio value={false}>Новая запись</Radio>
        <Radio value={true}>Поиск</Radio>
      </Radio.Group>

      <Tabs tabPosition="left">
        <TabPane tab="Все записи" key="1">
          <TodoList
            isFetching={todoStore.isFetching}
            list={todoStore.todoList}
          />
        </TabPane>
        <TabPane tab="Несделанные" key="2">
          <TodoList
            isFetching={todoStore.isFetching}
            list={todoStore.incompletedTodos}
          />
        </TabPane>
        <TabPane tab="Сделанные" key="3">
          <TodoList
            isFetching={todoStore.isFetching}
            list={todoStore.completedTodos}
          />
        </TabPane>
      </Tabs>
    </Content>
  );
};

// export default Main;

export default new inject("todoStore", "userStore")(observer(Main));
