import { create } from 'zustand';
import { UserState, User } from '../types';

export const useUserStore = create<UserState>((set) => ({
  users: [],
  addUsers: (newUsers: User[]) => {
    set((state) => ({
      users: [...state.users, ...newUsers],
    }));
  },
  addSingleUser: (newUser: User) => {
    set((state) => ({
      users: [...state.users, newUser],
    }));
  },
  deleteUserFromStore: (id: number) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
  updateUser: (updatedUser: User) => {
    set((state) => ({
      users: state.users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    }));
  },
}));
