import { TicketExpand } from "@/api/tickets";
import { create } from "zustand";

type TicketState = {
  tickets: TicketExpand[];
  setTickets: (tickets: TicketExpand[]) => void;
  addTicket: (ticket: TicketExpand) => void;
  removeTicket: (id: string) => void;
};

const initState: Pick<TicketState, "tickets"> = {
  tickets: [],
};

const useTicketStore = create<TicketState>((set) => ({
  ...initState,
  setTickets: (tickets) => set({ tickets }),
  addTicket: (ticket) =>
    set((state) => ({ tickets: [ticket, ...state.tickets] })),
  removeTicket: (id) =>
    set((state) => ({ tickets: state.tickets.filter((t) => t.id !== id) })),
}));

export default useTicketStore;
