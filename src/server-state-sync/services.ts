import { backendTodos } from "./backend";
import { Item } from "./types";

export const fetchTodos = (fail: boolean = false): Promise<Item[]> =>
    new Promise((resolve, reject) => {
        setTimeout(() => fail ? reject("Something bad happened!") : resolve(backendTodos), 1000);
    })

export const addTodo = (todo: string) => new Promise<Item>((resolve) => {
    setTimeout(() => {
        const lastItem = backendTodos.at(-1)
        const newItem = {
            id: lastItem ? lastItem.id : 1,
            text: todo,
        }
        backendTodos.push(newItem);
        resolve(newItem);
    }, 1000);
});


export const editTodo = (todo: Item) => new Promise<Item>((resolve) => {
    setTimeout(() => {
        const idx = backendTodos.findIndex(item => item.id === todo.id);
        backendTodos[idx] = todo;
        resolve(todo);
    }, 1000);
});


