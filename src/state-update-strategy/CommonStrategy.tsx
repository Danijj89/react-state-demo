import React, { useState } from 'react';
import { Item } from '../server-state-sync/types';
import { Todo } from './Todo';

const defaultTodos = [
    {id: 1, text: 'todo 1'},
    {id: 2, text: 'todo 2'}
]

export const CommonStrategy = () => {
    const [todos, setTodos] = useState<Item[]>(defaultTodos);

    return (
        <ul>
            {todos.map(todo => <li><Todo todo={todo} setTodos={setTodos}/></li>)}
        </ul>
    );
}
