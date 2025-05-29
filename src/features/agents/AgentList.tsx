import CreateUpdateAgentButtonDialog from "./CreateUpdateAgentButtonDialog";
import useAgentStore from "./useAgentStore";
import AgentListItem from "./AgentListItem";

export default function AgentList() {
  const agents = useAgentStore((state) => state.agents);

  if (!agents.length) {
    return (
      <div className="text-muted-foreground m-10 flex flex-col items-center gap-4 text-center">
        <p>No one to serve the soup</p>
        <p className="text-sm italic">There are no agents yet</p>
        <CreateUpdateAgentButtonDialog />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Agents</h1>
        <CreateUpdateAgentButtonDialog />
      </div>

      <div className="flex flex-col gap-2">
        {agents.map((agent, index) => (
          <AgentListItem key={index} agent={agent} />
        ))}
      </div>
    </div>
  );
}
