import React, { useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useState } from "react";
import uuid from "react-uuid";
import TodoActions from "./TodoActions";

const TodoContainer = () => {
  // изменение состояния с методом useState который принимает в начальное состояние пустой массив
  const [todos, setTodos] = useState(localItem());

  //функция времени добавления
  const currentDate = (separator = "") => {
    let newDate = new Date();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    let seconds = newDate.getSeconds();

    return `${separator}${hours}.${
      minutes < 10 ? `0${minutes}` : `${minutes}`
    }.${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  };

  //функция для добавления новой задачи в список
  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuid(), //это тоже метод react с помощью которого получаем уникальное id
      date: currentDate(),
    };
    // добавляем новую задачу к сущ списку
    setTodos([...todos, newTodo]);
  };

  // Функция для удаления задачи из списка по её id
  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((item) => item.id !== id)); //делает фильтр и удаляет по id
  };

  //функция для переключения задачи завершена или не завершена
  const toogleTodoHandler = (id) => {
    setTodos(
      todos?.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted } //изменить задачи наоборот
          : { ...todo };
      })
    );
  };

  // функция для сброса списка задач
  const resetTodosHandler = () => {
    setTodos([]);
  };

  // функция для удаления завершенных задач
  const deleteCompletedTodosHandler = () => {
    setTodos(todos?.filter((item) => !item.isCompleted)); //делает фильтр и удаляет все завершенные задачи
  };

  // этот код считает сколько задач завершено
  const completedTodosCount = todos?.filter((todo) => todo.isCompleted)?.length;

  console.log(todos);

  // функция для изменения значения
  const updateTodoHandler = (id, changeText) => {
    setTodos((prev) =>
      prev?.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: changeText,
              date: currentDate(),
            }
          : todo
      )
    );
  };

  // функция сох в localStorage
  function localItem() {
    return JSON.parse(localStorage.getItem("list")) || [];
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="App">
        <h1>Todo App</h1>
        <TodoForm onAddTodo={addTodoHandler} />
        {!!todos?.length && (
          <TodoActions
            resetTodosHandler={resetTodosHandler}
            deleteCompletedTodosHandler={deleteCompletedTodosHandler}
            isExisitingCompletedTodo={!!completedTodosCount}
          />
        )}

        <TodoList
          todos={todos}
          onDeleteTodo={deleteTodoHandler}
          onToggle={toogleTodoHandler}
          onUpdate={updateTodoHandler}
        />

        {!!completedTodosCount > 0 && (
          <h2>
            You have to completed {completedTodosCount}{" "}
            {completedTodosCount > 1 ? "todos" : "todo"}
          </h2>
        )}
      </div>
    </>
  );
};

export default TodoContainer;
