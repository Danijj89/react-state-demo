import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { TodoList } from './TodoList';

const queryClient = new QueryClient();

export const ReactQuery = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <TodoList />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}