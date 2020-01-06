import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";

import "antd/dist/antd.css";
import { Layout, Tabs, Input, Radio } from "antd";
import Todo from "../Todo";

const { Content } = Layout;
const { TabPane } = Tabs;

const Main = ({ todoStore, userStore }) => {
  useEffect(() => {
    todoStore.fetchTodos();
  }, [userStore.user]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchMode, setSearchMode] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  return (
    <Content style={{ padding: "50px 200px", minHeight: "90vh" }}>
      {isSearchMode ? (
        <Input.Search
          placeholder="Введите текст"
          enterButton="Найти"
          size="large"
          onSearch={value => todoStore.setSearchQuery(value)}
          onChange={event => todoStore.setSearchQuery(event.target.value)}
        />
      ) : (
        <Input.Search
          placeholder="Введите текст"
          enterButton="Создать"
          size="large"
          onSearch={value => todoStore.createTodo(value)}
          onChange={event => setNewTodo(event.target.value)}
        />
      )}

      <Radio.Group
        style={{ marginTop: "8px", marginBottom: "30px" }}
        value={isSearchMode}
        onChange={event => setSearchMode(event.target.value)}
      >
        <Radio value={false}>Новая запись</Radio>
        <Radio value={true}>Поиск</Radio>
      </Radio.Group>

      <Tabs tabPosition="left">
        <TabPane tab="Все записи" key="1">
          {todoStore.todos.map((todo, index) => (
            <Todo
              id={todo.id}
              text={todo.title}
              isDone={todo.isDone}
              key={index + todo.title}
            />
          ))}
        </TabPane>

        <TabPane tab="Несделанные" key="2">
          {todoStore.incompletedTodos.map((todo, index) => (
            <Todo
              text={todo.title}
              isDone={todo.isDone}
              key={index + todo.title}
            />
          ))}
        </TabPane>

        <TabPane tab="Сделанные" key="3">
          {todoStore.completedTodos.map((todo, index) => (
            <Todo
              text={todo.title}
              isDone={todo.isDone}
              key={index + todo.title}
            />
          ))}
        </TabPane>
      </Tabs>
    </Content>
  );
};

// export default Main;

export default new inject("todoStore", "userStore")(observer(Main));
