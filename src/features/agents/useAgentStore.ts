import { Agent } from "@/api/agents";
import { create } from "zustand";

type AgentState = {
  agents: Agent[];
  setAgents: (agents: Agent[]) => void;
  addAgent: (agent: Agent) => void;
  removeAgent: (id: string) => void;
  updateAgent: (agent: Agent) => void;
};

const initState: Pick<AgentState, "agents"> = {
  agents: [],
};

const useAgentStore = create<AgentState>((set) => ({
  ...initState,
  setAgents: (agents) => set({ agents }),
  addAgent: (agent) => set((state) => ({ agents: [agent, ...state.agents] })),
  removeAgent: (id) =>
    set((state) => ({ agents: state.agents.filter((t) => t.id !== id) })),
  updateAgent: (agent) =>
    set((state) => ({
      agents: state.agents.map((t) => (t.id === agent.id ? agent : t)),
    })),
}));

export default useAgentStore;
