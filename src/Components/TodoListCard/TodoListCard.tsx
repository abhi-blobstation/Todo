import React from "react";
import "./todoListCard.css";
import { ITodo } from "../../interface/Todo/todo.interface";

interface ITodoListCardProps {
  todo: ITodo;
  deleteTodoHandler: (deleteTodoHandler: number) => void;
  indexForDeleteTodo: number;
  todoStatusHandler: (indexForUpdateTodo: number) => void;
}

const TodoListCard: React.FC<ITodoListCardProps> = (props): JSX.Element => {
  const { todo, indexForDeleteTodo, deleteTodoHandler, todoStatusHandler } =
    props;
  return (
    <div className="todo-list-card card p-4 gap-4">
      <span className="todo-text">{todo.todo}</span>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => todoStatusHandler(indexForDeleteTodo)}
      />
      <button
        className="danger-btn"
        onClick={() => deleteTodoHandler(indexForDeleteTodo)}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoListCard;
