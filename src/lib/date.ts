import { formatDistanceToNow } from "date-fns";

export function dateFromNow(dateString?: string) {
  if (!dateString) return "";
  return formatDistanceToNow(dateString, { addSuffix: true });
}
