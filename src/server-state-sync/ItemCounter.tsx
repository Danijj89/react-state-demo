import { QueryCache, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useTodos } from './queries';
import { Item } from './types';

export const ItemCounter = () => {
    const { data: todos } = useTodos();
    const queryClient = useQueryClient();

    const queryCache: QueryCache = queryClient.getQueryCache()
    const another = queryCache.find<Item[]>(['todos'])

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (todos?.length) setCount(todos.length);
    }, [todos?.length])

    return (
        <h3>
            <span>Count: </span>
            <span>{count || 0}</span>
        </h3>
    );
}