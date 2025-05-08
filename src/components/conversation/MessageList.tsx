import MessageItem, { MessageProps } from "./MessageItem";

type Props = {
  messages: MessageProps[];
};

export default function MessageList(props: Props) {
  const { messages } = props;

  if (!messages.length) return null;

  return (
    <div className="relative flex w-full flex-col gap-4">
      {messages.map((message, index) => (
        <MessageItem key={index} {...message} />
      ))}
    </div>
  );
}
