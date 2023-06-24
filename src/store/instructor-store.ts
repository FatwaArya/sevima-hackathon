import { create } from "zustand";

interface InstructorStore {
  instructor: string;
  setInstructor: (instructor: string) => void;
}

export const useInstructorStore = create<InstructorStore>((set) => ({
  instructor: "",
  setInstructor: (instructor) => set({ instructor }),
}));
