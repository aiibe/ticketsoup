import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/UserAvatar";
import DeleteAgentButtonDialog from "./DeleteAgentButtonDialog.component";
import { Agent } from "@/api/agents";

type Props = {
  agent: Agent;
};

export default function AgentListItem(props: Props) {
  const { agent } = props;

  return (
    <Card className="group py-4">
      <CardContent className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserAvatar name={agent.fullName} />

            <div className="flex flex-col gap-1">
              <div className="font-bold">{agent.fullName}</div>
              <div className="text-xs">{agent.email}</div>
            </div>
          </div>

          <DeleteAgentButtonDialog
            className="hidden group-hover:block"
            agentId={agent.id}
          />
        </div>
      </CardContent>
    </Card>
  );
}
