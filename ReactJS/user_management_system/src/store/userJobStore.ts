import {create} from "zustand";
import { UserJobResponse } from "../types";

interface UserJobState {
  userJobs: UserJobResponse[];
  addUserJob: (userJob: UserJobResponse) => void;
  deleteUserJob: (id: number) => void;
  updateUserJob: (id: number, updatedJob: Partial<UserJobResponse>) => void;
}

export const useUserJobStore = create<UserJobState>((set) => ({
  userJobs: [],
  addUserJob: (userJob) => set((state) => ({ userJobs: [...state.userJobs, userJob] })),
  deleteUserJob: (id) => set((state) => ({ userJobs: state.userJobs.filter((job) => job.id !== id) })),
  updateUserJob: (id, updatedJob) => set((state) => ({
    userJobs: state.userJobs.map((job) => (job.id === id ? { ...job, ...updatedJob } : job)),
  })),
}));
