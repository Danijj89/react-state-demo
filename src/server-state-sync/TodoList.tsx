import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './TodoList.css';
import { addTodo, fetchTodos } from './services';
import { TodoItem } from './TodoItem';
import { ItemCounter } from './ItemCounter';


export const TodoList = () => {
    const [newTodo, setNewTodo] = useState<string>('');
    const [fail, setFail] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const {
        data: todos,
        isLoading,
        isError,
        isSuccess,
        status,
        fetchStatus,
        refetch,
        error,
    } = useQuery(
        {
            queryKey: ['todos'],
            queryFn: () => fetchTodos(fail),
            retry: 0,
            // refetchOnWindowFocus: false
        });

    const todosMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });

    const refresh = () => refetch();

    const onAddTodo = () => {
        todosMutation.mutate(newTodo);
        setNewTodo('');
    }

    return (
        <div className="todo">
            <ItemCounter />
            <h2>Status: {status}</h2>
            <h2>Fetch Status: {fetchStatus}</h2>
            <div>
                <button onClick={refresh}>Refresh</button>
                <input type="checkbox" onChange={(e) => setFail(e.target.checked)} checked={fail} />
                <span>Fail?</span>
            </div>
            {isLoading && 'Loading data...'}
            {isError && `Error: ${error}`}
            {isSuccess &&
                <div className="todo-list">
                    <h2>TODO List</h2>
                    <ul>
                        {todos.map((todo, i) =>
                            <li key={i}>
                                <TodoItem todo={todo} />
                            </li>
                        )}
                    </ul>
                    <div className="todo-list-input">
                        <input
                            onChange={(e) => setNewTodo(e.target.value)}
                            value={newTodo}
                        />
                        <button onClick={onAddTodo}>Add Todo</button>
                    </div>
                </div>
            }
        </div>
    );
}