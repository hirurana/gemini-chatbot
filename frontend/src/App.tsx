import "./App.css";

import { ChatBubble } from "./components/chatBubble";
import { SendMessageForm } from "./components/sendMessageForm";
import { useState } from "react";

import type { Message } from "./components/sendMessageForm";

function App() {
  // TODO: create message state
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="max-w-3xl mx-auto">
      <div>
        {messages.map(({ messageId, messageContent, isBot }: Message) => (
          <ChatBubble
            key={messageId}
            message={messageContent}
            isBotMessage={isBot}
          />
        ))}
      </div>

      <SendMessageForm setMessages={setMessages} />
    </div>
  );
}

export default App;
