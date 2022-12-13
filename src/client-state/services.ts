import { User } from "./types";

export const fetchCurrentUser = (): Promise<User> => new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: 'Daniele' }), 1000);
});