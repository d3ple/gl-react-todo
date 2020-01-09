import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import useStores from "../stores/useStores"
import { Layout, Tabs, Input, Radio, message } from "antd";
import TodoList from "../TodoList";


const Main = observer(() => {
  const { todoStore, userStore } = useStores();

  const [isSearchMode, setSearchMode] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");

  useEffect(() => {
    todoStore.fetchTodos();
  }, [todoStore, userStore.user]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      event.shiftKey && event.code === "KeyA" && setCurrentTab("1");
      event.shiftKey && event.code === "KeyU" && setCurrentTab("2");
      event.shiftKey && event.code === "KeyD" && setCurrentTab("3");
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Layout.Content style={{ padding: "50px 200px", minHeight: "90vh" }}>
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
            value={newTodo}
            onChange={(event: any) => setNewTodo(event.target.value)}
            loading={isLoading}
            onSearch={() => {
              if (newTodo.length) {
                setIsLoading(true);
                todoStore
                  .createTodo(newTodo)
                  .then(() => setNewTodo(""))
                  .then(() => setIsLoading(false))
                  .then(() => message.success("Запись добавлена"))
              }
            }
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

      <Tabs tabPosition="left" activeKey={currentTab} onChange={(key) => setCurrentTab(key)}>
        <Tabs.TabPane tab="Все записи" key="1">
          <TodoList
            isFetching={todoStore.isFetching}
            list={todoStore.todoList}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Несделанные" key="2">
          <TodoList
            isFetching={todoStore.isFetching}
            list={todoStore.incompletedTodos}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Сделанные" key="3">
          <TodoList
            isFetching={todoStore.isFetching}
            list={todoStore.completedTodos}
          />
        </Tabs.TabPane>
      </Tabs>
    </Layout.Content>
  );
});

export default Main;