import { ReactNode } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  name: string;
  className?: string;
  fallback?: ReactNode;
};

export default function UserAvatar(props: Props) {
  const { className, name } = props;

  return (
    <Avatar>
      <AvatarImage
        className={className}
        src={`https://api.dicebear.com/9.x/identicon/svg?seed=${name}`}
      />
    </Avatar>
  );
}
