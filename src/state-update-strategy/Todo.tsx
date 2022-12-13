import React, { Dispatch, SetStateAction, useState } from "react";
import { Item } from "../server-state-sync/types";
import { updateItem } from "./services";

type TodoProps = {
  todo: Item;
  setTodos: Dispatch<SetStateAction<Item[]>>;
};

export const Todo = ({ todo, setTodos }: TodoProps) => {
  const [text, setText] = useState(todo.text);
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = async () => {
    const newTodo = { ...todo, text };
    try {
      await updateItem(newTodo);
      setTodos((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo.id === newTodo.id ? newTodo : prevTodo
        )
      );
    } catch (e: any) {

    }
    setIsEdit(false);
  };

  return (
    <>
      {!isEdit && (
        <>
          <span>{todo.text}</span>
          <button onClick={() => setIsEdit(true)}>edit</button>
        </>
      )}
      {isEdit && (
        <>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={() => setIsEdit(false)}>Cancel</button>
          <button onClick={onEdit}>submit</button>
        </>
      )}
    </>
  );
};
