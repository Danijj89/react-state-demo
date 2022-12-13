import { backendTodos } from "./backend";
import { Item } from "./types";

export const fetchTodos = (fail: boolean = false): Promise<Item[]> =>
    new Promise((resolve, reject) => {
        setTimeout(() => fail ? reject("Something bad happened!") : resolve(backendTodos), 1000);
    })

export const addTodo = (todo: string): Promise<Item> => new Promise((resolve) => {
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


export const editTodo = (todo: Item): Promise<Item> => new Promise<Item>((resolve, reject) => {
    // setTimeout(() => {
    //     const idx = backendTodos.findIndex(item => item.id === todo.id);
    //     backendTodos[idx] = todo;
    //     resolve(todo);
    // }, 1000);
    setTimeout(() => {
        reject(null)
    }, 1000);
});
