import React from 'react';
import { useTodos } from './queries';

export const ItemCounter = () => {
    const { data: todos } = useTodos();

    return (
        <h3>
            <span>Count: </span>
            <span>{todos?.length || 0}</span>
        </h3>
    );
}