import { resolve } from "path";
import { Item } from "../server-state-sync/types";


export const updateItem = (item: Item) => new Promise((resolve) => {
    setTimeout(() => resolve(null), 1000)
});
