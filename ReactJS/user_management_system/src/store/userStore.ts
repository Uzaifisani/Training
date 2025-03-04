import {create} from 'zustand';
import { UserResponse, UserState } from '../types';
import { userPage } from '../apis/api';



export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  page: 1,
  limit: 4,
  total: 0,
  totalPages: 0,
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  fetchUsers: async () => {
    const { page, limit } = get();
    const response: UserResponse = await userPage(page, limit);
    set({
      users: response.data,
      total: response.total,
      totalPages: response.total_pages,
    });
  },
}));
