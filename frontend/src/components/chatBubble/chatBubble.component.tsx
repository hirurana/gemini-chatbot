import { Card, CardBody, ScrollShadow } from "@nextui-org/react";

interface Props {
  message: string;
  isBotMessage: boolean;
}

export const ChatBubble = ({ message, isBotMessage }: Props) => {
  return (
    <Card
      className={`w-fit ${
        isBotMessage
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          : "ml-auto"
      }`}
    >
      <CardBody>
        <ScrollShadow className="max-h-72">
          <p>{message}</p>
        </ScrollShadow>
      </CardBody>
    </Card>
  );
};
