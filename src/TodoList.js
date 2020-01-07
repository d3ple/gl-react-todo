import React from "react";
import { Spin, Skeleton, Alert } from "antd";
import Todo from "./Todo";

const TodoList = ({ isFetching, list }) => {
  return (
    <>
      {isFetching && (
        <Spin size="large">
          <Skeleton active />
        </Spin>
      )}
      {!isFetching && !list.length ? (
        <Alert message="Нет записей" type="info" />
      ) : (
        <>
          {list.map((todo, index) => (
            <Todo
              id={todo.id}
              text={todo.title}
              isDone={todo.isDone}
              key={index + todo.title}
            />
          ))}
        </>
      )}
    </>
  );
};

export default TodoList;
