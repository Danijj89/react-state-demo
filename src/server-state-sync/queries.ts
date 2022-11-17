import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./services";

export const useTodos = () => useQuery({ queryKey: ['todos'], queryFn: () => fetchTodos(false) });