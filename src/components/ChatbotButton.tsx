import React, { useState } from "react";
import { ChatWindow } from "./ChatWindow";

export const ChatbotButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="chatbot-btn" onClick={() => setOpen(!open)}>
        <img src="/icons/chatbot.svg" alt="Chatbot" />
      </div>

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
};
