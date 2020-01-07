import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Button, Card, Row, Col, Icon, Tag, Input, message } from "antd";

const Todo = ({ todoStore, text, isDone, id }) => {
  const [newText, setNewText] = useState(text);
  const [isEditingMode, setEditingMode] = useState(false);

  const statusColor = isDone ? "green" : "magenta";
  const statusText = isDone ? "Сделано" : "Не сделано";

  return (
    <>
      <Card>
        {!isEditingMode && (
          <Row type="flex" justify="space-between" align="middle">
            <Col>
              <Tag color={statusColor}>{statusText}</Tag>
              <span>{text}</span>
            </Col>
            <Col>
              {!isDone && (
                <>
                  <Button
                    onClick={() =>
                      todoStore
                        .markAsDone(id)
                        .then(() => message.success("Сделано!"))
                    }
                  >
                    <Icon
                      type="check-circle"
                      style={{ fontSize: 16 }}
                      theme="twoTone"
                    />
                  </Button>
                  <Button onClick={() => setEditingMode(true)}>
                    <Icon
                      type="edit"
                      style={{ fontSize: 16 }}
                      theme="twoTone"
                    />
                  </Button>
                </>
              )}
              <Button
                onClick={() =>
                  todoStore
                    .deleteTodo(id)
                    .then(() => message.success("Запись удалена"))
                }
              >
                <Icon type="delete" style={{ fontSize: 16 }} theme="twoTone" />
              </Button>
            </Col>
          </Row>
        )}
        {isEditingMode && (
          <Row type="flex" justify="space-between" align="middle">
            <Col style={{ width: "70%" }}>
              <Tag color={statusColor}>{statusText}</Tag>
              <Input
                placeholder="Введите текст"
                value={newText}
                style={{ maxWidth: "80%" }}
                onChange={event => setNewText(event.target.value)}
              />
            </Col>
            <Col>
              <Button
                onClick={() => {
                  if (newText) {
                    todoStore
                      .updateTodo(id, newText)
                      .then(() => message.success("Запись изменена"));
                    setEditingMode(false);
                  }
                }}
              >
                <Icon type="save" style={{ fontSize: 16 }} theme="twoTone" />
              </Button>
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
};

// export default Todo;

export default new inject("todoStore")(observer(Todo));
