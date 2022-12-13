import create from 'zustand';
import { User } from './types';

type CurrentUserStore = {
    currentUser: User | null;
    setCurrentUser: (user: User) => void;
}

export const useCurrentUserStore = create<CurrentUserStore>((set) => ({
    currentUser: null,
    setCurrentUser: (user: User) => set((state) => ({ ...state, currentUser: user }))
}))