import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { editTodo } from './services';
import { Item } from './types';

type TodoItemProps = {
    todo: Item;
}


export const TodoItem = ({ todo }: TodoItemProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const [text, setText] = useState<string>(todo.text);
    const queryClient = useQueryClient();

    const editMutation = useMutation({
        mutationFn: editTodo,
        onMutate: async (updatedTodo) => {
            // For optimistic updates

            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['todos'] })

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData(['todos']);

            // Optimistically update to the new value
            queryClient.setQueryData<Item[]>(
                ['todos'],
                (oldTodos) => oldTodos
                    ? oldTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
                    : oldTodos
            )

            setIsEdit(false);

            // Return a context object with the snapshotted value
            return { previousTodos }
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (error, updatedTodo, context) => {
            queryClient.setQueriesData(['todos'], context?.previousTodos)
            alert("Server Error!");
        },

        // You can decide whether still invalidate the query and refetch once settled or on success
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ['todos'] });
        //     setIsEdit(false);
        // }
    });

    const onEdit = () => {
        const editedTodo = { id: todo.id, text };
        editMutation.mutate(editedTodo);
    }

    return (
        <>
            {!isEdit &&
                <>
                    <span>{todo.text}</span>
                    <button onClick={() => setIsEdit(true)}>Edit</button>
                </>
            }
            {isEdit &&
                <>
                    <input value={text} onChange={(e) => setText(e.target.value)} />
                    <button onClick={() => setIsEdit(false)}>Cancel</button>
                    <button onClick={onEdit}>Update</button>
                </>
            }
        </>
    );
}
