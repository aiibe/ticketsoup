import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAgentStore from "../agents/useAgentStore";
import { assignAgent } from "@/api/tickets";
import { toast } from "sonner";
import { Roles, useCheckRoles } from "../auth/useCheckRoles";
import { pb } from "@/lib/db/pocketbase";
import { Agent } from "@/api/agents";
import UserAvatar from "@/components/UserAvatar";

type Props = {
  defaultValue?: string;
  ticketId: string;
};

export function SelectAssignAgent(props: Props) {
  const { defaultValue = "", ticketId } = props;
  const agentsList = useAgentStore((state) => state.agents);
  const isCustomer = useCheckRoles([Roles.Customers]);

  if (isCustomer) return null;

  async function handleSelect(agentId: string) {
    const { error, data } = await assignAgent(ticketId, agentId);
    if (error) console.log(error);
    if (data) {
      toast.success("Ticket assigned successfully");
    }
  }

  function getAgentName(agent: Agent) {
    const isYou = agent.id === pb.authStore?.record?.id;
    return isYou ? "You" : agent.fullName;
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={handleSelect}>
      <SelectTrigger
        size="sm"
        onClick={(e) => e.stopPropagation()}
        className="data-[placeholder]:text-foreground border-none p-0 shadow-none"
      >
        <SelectValue placeholder="Assign" />
      </SelectTrigger>

      <SelectContent onClick={(e) => e.stopPropagation()}>
        <SelectGroup>
          <SelectLabel>Assign to :</SelectLabel>
          {agentsList.map((agent) => (
            <SelectItem key={agent.id} value={agent.id}>
              <UserAvatar className="h-6 w-6" name={agent.fullName} />

              {getAgentName(agent)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
