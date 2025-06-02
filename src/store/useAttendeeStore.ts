import type { Attendee } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AttendeeStore = {
  attendee: Attendee | null;
  setAttendee: (attendee: Attendee) => void;
  clearAttendee: () => void;
};

// Create the Zustand store with persistence
export const useAttendeeStore = create<AttendeeStore>()(
  persist(
    (set) => ({
      attendee: null,
      setAttendee: (attendee) => set({ attendee }),
      clearAttendee: () => set({ attendee: null }),
    }),
    {
      name: "attendee-storage", // unique name for LocalStorage
    }
  )
);