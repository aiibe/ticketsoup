import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFilterTickets } from "../useFilterTickets";

export function TabList() {
  const { open, closed, inProgress } = useFilterTickets();

  return (
    <TabsList className="w-full">
      <TabsTrigger value="open">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{open.length}</Badge>
          <span>Open</span>
        </div>
      </TabsTrigger>

      <TabsTrigger value="in-progress">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{inProgress.length}</Badge>
          <span>In Progress</span>
        </div>
      </TabsTrigger>

      <TabsTrigger value="closed">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{closed.length}</Badge>
          <span>Closed</span>
        </div>
      </TabsTrigger>
    </TabsList>
  );
}
