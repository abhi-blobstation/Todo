import React, { ChangeEvent, useEffect, useState } from "react";
import "./todo.css";
import TodoListCard from "../TodoListCard/TodoListCard";
import { ITodo } from "../../interface/Todo/todo.interface";

const Todo: React.FC = (): JSX.Element => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todoInputValue, setTodoInputValue] = useState<string>("");

  useEffect(() => {
    // Load todo list from local storage
    const getAllTodoItemsFromLocalStorage = localStorage.getItem("Todos") || "";
    getAllTodoItemsFromLocalStorage &&
      setTodos(JSON.parse(getAllTodoItemsFromLocalStorage));
  }, []);

  const updateTodoListInLocalStorage = (payload: ITodo[]) => {
    localStorage.setItem("Todos", JSON.stringify(payload));
  };

  const addTaskHandler = (): void => {
    if (todoInputValue) {
      setTodos((pre) => [...pre, { todo: todoInputValue, isCompleted: false }]);
      setTodoInputValue("");
      updateTodoListInLocalStorage([
        ...todos,
        {
          todo: todoInputValue,
          isCompleted: false,
        },
      ]);
    }
  };

  const todoStatusHandler = (indexForUpdateTodo: number) => {
    const updatedTodos = todos.map((todo: ITodo, index: number) =>
      index === indexForUpdateTodo
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo
    );
    setTodos(updatedTodos);
    updateTodoListInLocalStorage(updatedTodos);
  };

  const deleteTodoHandler = (indexForDeleteTodo: number): void => {
    const finalTodoList = todos.filter(
      (_, index: number) => index !== indexForDeleteTodo
    );
    updateTodoListInLocalStorage(finalTodoList);
    setTodos(finalTodoList);
  };

  return (
    <div className="todo-container flex-all-center">
      <main className="todo-main-wrapper card">
        <header className="todo-header p-4 flex gap-4">
          <input
            type="text"
            value={todoInputValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTodoInputValue(event.target.value)
            }
            className="todo-input rounded"
            placeholder={"Go to the Gym"}
          />
          <button
            className="add-task-btn border rounded"
            onClick={addTaskHandler}
          >
            + Add Todo
          </button>
        </header>
        <section className="todo-list-container flex gap-4 p-4">
          {todos.map((todo: ITodo, index: number) => (
            <TodoListCard
              key={index}
              todo={todo}
              deleteTodoHandler={deleteTodoHandler}
              indexForDeleteTodo={index}
              todoStatusHandler={todoStatusHandler}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Todo;
