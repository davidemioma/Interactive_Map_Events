import { create } from "zustand";
import { Event } from "@prisma/client";

interface Props {
  activeEvent: Event | null;
  setActiveEvent: (event: Event) => void;
}

const useActiveEvent = create<Props>((set) => ({
  activeEvent: null,
  setActiveEvent: (event: Event) =>
    set({
      activeEvent: event,
    }),
}));

export default useActiveEvent;
