import React from "react";
import Button from "./UI/Button";
import { RiDeleteBack2Line, RiRefreshLine } from "react-icons/ri";

// компонент TodoActions принимает пропсы такие как: resetTodosHandler, deleteCompletedTodosHandler, isExisitingCompletedTodo.
const TodoActions = ({
  resetTodosHandler, // для очисти задач
  deleteCompletedTodosHandler, //для удаления завершенных задач
  isExisitingCompletedTodo, // для определения завершенных задач
}) => {
  return (
    <div>
      <Button onClick={resetTodosHandler}>
        <RiRefreshLine />
      </Button>
      <Button
        onClick={deleteCompletedTodosHandler}
        disabled={!isExisitingCompletedTodo} // отключение кнопки, если нет завершенных задач
      >
        <RiDeleteBack2Line />
      </Button>
    </div>
  );
};

export default TodoActions;
