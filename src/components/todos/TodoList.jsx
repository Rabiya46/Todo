import React from "react";
import styled from "styled-components";
import Todo from "./Todo";

// компонент TodoList принимает пропс todos, onDeleteTodo, onToggle , onUpdate
const TodoList = ({ todos, onDeleteTodo, onToggle, onUpdate }) => {
  return (
    <TodoListContainer>
      {/* маппинг списка задач и создание компонента Todo для каждой задачи */}
      {todos?.map((todo) => (
        <Todo
          todo={todo} // передаем информацию о задаче
          key={todo.id} // уникальный ключ для каждой задачи
          onDeleteTodo={onDeleteTodo} // передаем функцию onDeleteTodo для удаления задачи
          onToggle={onToggle} // передаем функцию onToggle для переключения статуса задачи
          onUpdate={onUpdate} // передает функцию onUpdate для изменения значения
        />
      ))}
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  padding: 10px;
`;
