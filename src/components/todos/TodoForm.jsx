import React from "react";
import { useState } from "react";
import { styled } from "styled-components";

// компонент TodoForm принимает пропс onAddTodo, функцию для добавления новой задачи.
const TodoForm = ({ onAddTodo }) => {
  // с помощью метода useState управляем состоянием значения.
  const [enteredValue, setEnteredValue] = useState("");
  const [error, setError] = useState(""); // Добавляем состояние для ошибки.

  // функция отправки формы.
  const submitHandler = (e) => {
    e.preventDefault(); // предотвращает refresh
    if (enteredValue.trim() === "") {
      // Проверяем, что значение не пусто или не содержит только пробелы.
      setError("Поле не должно быть пустым!"); // устанавливаем сообщение об ошибке
    } else {
      onAddTodo(enteredValue); // вызов функции onAddTodo с значением
      setEnteredValue(""); // очистка значения после добавления задачи
      setError(""); // сбрасываем ошибку.
    }
  };

  return (
    <TodoFormContainer>
      <Form onSubmit={submitHandler}>
        <Input
          type="text"
          value={enteredValue}
          onChange={(e) => setEnteredValue(e.target.value)}
          placeholder="Enter new todo"
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
      {error && <ErrorText>{error}</ErrorText>}
    </TodoFormContainer>
  );
};

export default TodoForm;

const TodoFormContainer = styled.div`
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 45%;
  height: 30px;
  font-size: 1.3rem;
  padding: 25px 15px;
  border: none;
  border-radius: 5px;
  outline: none;
  display: inline-block;
`;

const SubmitButton = styled.button`
  margin-left: 20px;
  height: 50px;
  cursor: pointer;
  background-color: beige;
  font-size: 1.5rem;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: rgb(240, 240, 155);
  }
`;

const ErrorText = styled.p`
  color: red;
`;
