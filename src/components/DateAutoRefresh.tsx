import { dateFromNow } from "@/lib/date";
import { useEffect, useState } from "react";

export default function DateAutoRefresh(props: {
  timestamp?: string;
  refreshInterval: number;
}) {
  const { timestamp, refreshInterval } = props;
  const [dateCreated, setDateCreated] = useState(dateFromNow(timestamp));

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      setDateCreated(dateFromNow(timestamp));
    }, refreshInterval);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [refreshInterval, timestamp]);

  return <span className="text-muted-foreground text-xs">{dateCreated}</span>;
}
